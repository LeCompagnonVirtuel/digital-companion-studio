import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AbandonedCart {
  session_id: string;
  email?: string;
  items: Array<{
    product_id: string;
    product_title: string;
    price: number;
  }>;
  total: number;
  abandoned_at: string;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const resendApiKey = Deno.env.get("RESEND_API_KEY");

    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get cart items that have been abandoned for more than 1 hour but less than 24 hours
    const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();

    // Get abandoned carts with product details
    const { data: abandonedCarts, error: cartsError } = await supabase
      .from("cart_items")
      .select(`
        session_id,
        created_at,
        product_id,
        digital_products (
          id,
          title,
          price,
          featured_image
        )
      `)
      .lt("created_at", oneHourAgo)
      .gt("created_at", twentyFourHoursAgo);

    if (cartsError) {
      console.error("Error fetching abandoned carts:", cartsError);
      throw cartsError;
    }

    console.log(`Found ${abandonedCarts?.length || 0} potentially abandoned cart items`);

    if (!abandonedCarts || abandonedCarts.length === 0) {
      return new Response(
        JSON.stringify({ message: "No abandoned carts found", processed: 0 }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Group by session_id
    const cartsBySession: Record<string, any[]> = {};
    for (const item of abandonedCarts) {
      if (!cartsBySession[item.session_id]) {
        cartsBySession[item.session_id] = [];
      }
      cartsBySession[item.session_id].push(item);
    }

    console.log(`Grouped into ${Object.keys(cartsBySession).length} sessions`);

    // For each session, check if we've already sent a reminder
    let emailsSent = 0;

    for (const [sessionId, items] of Object.entries(cartsBySession)) {
      // Check if we've already processed this session (you could store this in a separate table)
      // For now, we'll use a simple analytics event check
      const { data: existingReminder } = await supabase
        .from("analytics_events")
        .select("id")
        .eq("session_id", sessionId)
        .eq("event_type", "abandoned_cart_reminder")
        .single();

      if (existingReminder) {
        console.log(`Session ${sessionId} already received reminder, skipping`);
        continue;
      }

      // Get customer email if they started checkout
      const { data: leadData } = await supabase
        .from("leads")
        .select("email, name")
        .ilike("message", `%${sessionId}%`)
        .single();

      if (!leadData?.email && !resendApiKey) {
        // Log the abandoned cart event even if we can't send email
        await supabase.from("analytics_events").insert({
          event_type: "abandoned_cart_detected",
          session_id: sessionId,
          metadata: {
            items: items.map(i => ({
              product_id: i.product_id,
              title: i.digital_products?.title,
              price: i.digital_products?.price
            })),
            total: items.reduce((sum, i) => sum + (i.digital_products?.price || 0), 0)
          }
        });
        continue;
      }

      // If we have Resend API key and email, send the reminder
      if (resendApiKey && leadData?.email) {
        const total = items.reduce((sum, i) => sum + (i.digital_products?.price || 0), 0);
        const productList = items
          .map(i => `• ${i.digital_products?.title} - ${i.digital_products?.price}€`)
          .join("\n");

        const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: white; padding: 30px; text-align: center; border-radius: 12px 12px 0 0; }
    .content { background: #f8fafc; padding: 30px; border: 1px solid #e2e8f0; }
    .product { background: white; padding: 15px; margin: 10px 0; border-radius: 8px; border: 1px solid #e2e8f0; }
    .cta { display: inline-block; background: #6366f1; color: white; padding: 15px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; font-weight: bold; }
    .footer { text-align: center; padding: 20px; color: #64748b; font-size: 14px; }
    .discount { background: #fef3c7; border: 2px dashed #f59e0b; padding: 15px; text-align: center; border-radius: 8px; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>😊 Vous avez oublié quelque chose !</h1>
    </div>
    <div class="content">
      <p>Bonjour ${leadData.name || ""},</p>
      <p>Nous avons remarqué que vous avez laissé des articles dans votre panier. Pas de panique, nous les avons gardés pour vous !</p>
      
      <h3>Votre panier :</h3>
      ${items.map(i => `
        <div class="product">
          <strong>${i.digital_products?.title}</strong><br>
          <span style="color: #6366f1; font-weight: bold;">${i.digital_products?.price}€</span>
        </div>
      `).join("")}
      
      <p style="font-size: 18px; font-weight: bold;">Total: ${total.toFixed(2)}€</p>
      
      <div class="discount">
        🎁 <strong>Offre spéciale !</strong><br>
        Utilisez le code <strong>REVIENS10</strong> pour obtenir 10% de réduction !
      </div>
      
      <center>
        <a href="https://lecompagnonvirtuel.com/boutique/checkout" class="cta">
          Finaliser ma commande →
        </a>
      </center>
      
      <p>Notre garantie satisfait ou remboursé de 30 jours vous couvre. Aucun risque !</p>
      
      <p>À bientôt,<br>L'équipe Le Compagnon Virtuel</p>
    </div>
    <div class="footer">
      <p>© 2024 Le Compagnon Virtuel. Tous droits réservés.</p>
      <p>Côte d'Ivoire | support@lecompagnonvirtuel.com</p>
    </div>
  </div>
</body>
</html>
        `;

        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Le Compagnon Virtuel <noreply@lecompagnonvirtuel.com>",
            to: leadData.email,
            subject: "😊 Vous avez oublié quelque chose dans votre panier !",
            html: emailHtml,
          }),
        });

        if (emailResponse.ok) {
          emailsSent++;
          console.log(`Reminder email sent to ${leadData.email}`);
        } else {
          console.error("Failed to send email:", await emailResponse.text());
        }
      }

      // Record that we sent a reminder
      await supabase.from("analytics_events").insert({
        event_type: "abandoned_cart_reminder",
        session_id: sessionId,
        metadata: {
          email_sent: !!leadData?.email,
          items_count: items.length,
          total: items.reduce((sum, i) => sum + (i.digital_products?.price || 0), 0)
        }
      });
    }

    return new Response(
      JSON.stringify({ 
        message: "Abandoned cart reminders processed",
        sessions_processed: Object.keys(cartsBySession).length,
        emails_sent: emailsSent
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error in abandoned cart reminder:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});