import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const orderNumber = url.searchParams.get("order");
    const token = url.searchParams.get("token");

    if (!orderNumber || !token) {
      return new Response(
        JSON.stringify({ error: "Paramètres manquants (order, token)." }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, serviceKey);

    // Verify order exists, is paid, and token matches
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*, digital_products:product_id(download_url)")
      .eq("order_number", orderNumber)
      .eq("access_token", token)
      .eq("status", "paid")
      .single();

    if (orderError || !order) {
      console.error("Order verification failed:", orderError);
      return new Response(
        JSON.stringify({ error: "Commande introuvable ou non payée. Vérifiez votre lien." }),
        { status: 403, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get the download_url from the product (stored as storage path)
    const downloadUrl = (order as any).digital_products?.download_url;
    if (!downloadUrl) {
      return new Response(
        JSON.stringify({ error: "Aucun fichier associé à ce produit." }),
        { status: 404, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Increment download count
    await supabase
      .from("orders")
      .update({ download_count: (order.download_count || 0) + 1 })
      .eq("id", order.id);

    // Generate a signed URL for the file (valid 5 minutes)
    const { data: signedData, error: signedError } = await supabase.storage
      .from("product-files")
      .createSignedUrl(downloadUrl, 300); // 5 min

    if (signedError || !signedData?.signedUrl) {
      console.error("Signed URL error:", signedError);
      return new Response(
        JSON.stringify({ error: "Impossible de générer le lien de téléchargement." }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    return new Response(
      JSON.stringify({ url: signedData.signedUrl, product_title: order.product_title }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error: any) {
    console.error("Error in secure-download:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
});
