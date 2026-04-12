import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface CheckoutItem {
  productId: string;
  productTitle: string;
  price: number;
  quantity: number;
  downloadLink?: string | null;
}

interface CheckoutRequest {
  customerEmail: string;
  customerName?: string | null;
  items: CheckoutItem[];
  total: number;
  promoCode?: string | null;
  discountAmount?: number;
  discountPercent?: number;
  returnBaseUrl: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const {
      customerEmail,
      customerName,
      items,
      total,
      promoCode,
      discountAmount = 0,
      discountPercent = 0,
      returnBaseUrl,
    }: CheckoutRequest = await req.json();

    if (!customerEmail || !Array.isArray(items) || items.length === 0 || !total || !returnBaseUrl) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const mainItem = items[0];
    const orderTitle = items.length > 1
      ? `${mainItem.productTitle} + ${items.length - 1} autre${items.length > 2 ? "s" : ""}`
      : mainItem.productTitle;

    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_email: customerEmail,
        customer_name: customerName || null,
        product_id: mainItem.productId,
        product_title: orderTitle,
        price: Math.round(total),
        currency: "XOF",
        payment_method: "money_fusion",
        download_link: mainItem.downloadLink || null,
        status: "pending",
        promo_code: promoCode || null,
        discount_amount: discountAmount || 0,
        notes: promoCode ? `Code promo: ${promoCode} (-${discountPercent}%)` : null,
      })
      .select("id, order_number, access_token, customer_email, customer_name, product_title, price")
      .single();

    if (orderError || !order) {
      console.error("Error creating order:", orderError);
      return new Response(
        JSON.stringify({ error: "Unable to create order", message: orderError?.message }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const orderItems = items.map((item) => ({
      order_id: order.id,
      product_id: item.productId,
      product_title: item.productTitle,
      price: item.price,
      quantity: item.quantity,
    }));

    const { error: orderItemsError } = await supabase.from("order_items").insert(orderItems);
    if (orderItemsError) {
      console.error("Error creating order items:", orderItemsError);
    }

    if (promoCode) {
      supabase.rpc("increment_promo_usage", { promo_code_value: promoCode }).then(() => {});
    }

    // Build return URL
    const normalizedOrigin = returnBaseUrl.replace(/\/$/, "");
    const returnUrl = `${normalizedOrigin}/boutique/confirmation?order=${order.id}&token=${order.access_token}`;

    // Call Money Fusion API directly
    const priceInFCFA = Math.round(order.price);
    const webhookUrl = `${supabaseUrl}/functions/v1/moneyfusion-webhook`;
    const apiUrl = "https://www.pay.moneyfusion.net/Le_Compagnon_Virtuel/93d0fe45e303be18/pay/";

    const article = items.map((item) => ({ [item.productTitle]: Math.round(item.price * item.quantity) }));
    const personalInfo = [
      { orderId: order.id },
      { customerEmail: customerEmail },
    ];

    const mfPayload = {
      totalPrice: priceInFCFA,
      article,
      personal_Info: personalInfo,
      numeroSend: "0000000000",
      nomclient: customerName || "Client",
      return_url: returnUrl,
      webhook_url: webhookUrl,
    };

    console.log("Calling Money Fusion API:", JSON.stringify(mfPayload));

    const mfResponse = await fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mfPayload),
    });

    const responseText = await mfResponse.text();
    console.log("Money Fusion response:", responseText);

    let mfData: any = null;
    try {
      mfData = JSON.parse(responseText);
    } catch {
      console.error("Failed to parse Money Fusion response as JSON");
    }

    if (!mfData || !mfData.statut || !mfData.url) {
      console.error("Money Fusion payment initiation failed:", mfData);

      // Try alternate endpoint
      try {
        const altResponse = await fetch("https://pay.moneyfusion.net/Le_Compagnon_Virtuel/93d0fe45e303be18/pay/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(mfPayload),
        });
        const altText = await altResponse.text();
        console.log("Money Fusion alt response:", altText);
        if (altText.startsWith("{")) {
          mfData = JSON.parse(altText);
        }
      } catch (altErr) {
        console.error("Alt endpoint also failed:", altErr);
      }
    }

    if (!mfData || !mfData.statut || !mfData.url) {
      return new Response(
        JSON.stringify({
          success: false,
          orderId: order.id,
          orderNumber: order.order_number,
          accessToken: order.access_token,
          message: mfData?.message || "Impossible d'initialiser le paiement",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Update order with payment token
    await supabase
      .from("orders")
      .update({ payment_id: mfData.token, status: "pending_payment" })
      .eq("id", order.id);

    console.log("Payment initiated successfully:", { token: mfData.token, url: mfData.url });

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        orderNumber: order.order_number,
        accessToken: order.access_token,
        paymentUrl: mfData.url,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Checkout creation error:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";

    return new Response(
      JSON.stringify({ error: "Internal server error", message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
