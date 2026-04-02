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

    const normalizedOrigin = returnBaseUrl.replace(/\/$/, "");
    const returnUrl = `${normalizedOrigin}/boutique/confirmation?order=${order.id}&token=${order.access_token}`;

    const paymentResponse = await fetch(`${supabaseUrl}/functions/v1/moneyfusion-payment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderId: order.id,
        customerEmail: order.customer_email,
        customerName: order.customer_name || "Client",
        productTitle: order.product_title,
        price: order.price,
        returnUrl,
      }),
    });

    const paymentData = await paymentResponse.json();

    if (!paymentResponse.ok || !paymentData?.paymentUrl) {
      console.error("Payment initiation failed:", paymentData);
      return new Response(
        JSON.stringify({
          success: false,
          orderId: order.id,
          orderNumber: order.order_number,
          accessToken: order.access_token,
          message: paymentData?.message || paymentData?.error || "Impossible d'initialiser le paiement",
          details: paymentData?.details || null,
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        orderId: order.id,
        orderNumber: order.order_number,
        accessToken: order.access_token,
        paymentUrl: paymentData.paymentUrl,
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
