import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
};

interface PaymentRequest {
  orderId: string;
  customerEmail: string;
  customerName: string;
  productTitle: string;
  price: number;
  returnUrl: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { orderId, customerEmail, customerName, productTitle, price, returnUrl }: PaymentRequest = await req.json();

    if (!orderId || !customerEmail || !productTitle || !price) {
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const priceInFCFA = Math.round(price);
    const webhookUrl = `${supabaseUrl}/functions/v1/moneyfusion-webhook`;
    const apiUrl = 'https://www.pay.moneyfusion.net/Le_Compagnon_Virtuel/93d0fe45e303be18/pay/';

    const mfPayload = {
      totalPrice: priceInFCFA,
      article: [{ [productTitle]: priceInFCFA }],
      personal_Info: [{ orderId }, { customerEmail }],
      numeroSend: "0000000000",
      nomclient: customerName || 'Client',
      return_url: returnUrl,
      webhook_url: webhookUrl,
    };

    console.log('Calling Money Fusion API:', JSON.stringify(mfPayload));

    const mfResponse = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mfPayload),
    });

    const responseText = await mfResponse.text();
    console.log('Money Fusion response:', responseText);

    let mfData: any = null;
    try {
      mfData = JSON.parse(responseText);
    } catch {
      console.error('Failed to parse response');
    }

    if (!mfData || !mfData.statut || !mfData.url) {
      return new Response(
        JSON.stringify({
          error: 'Payment initiation failed',
          details: mfData,
          message: "La passerelle de paiement n'a pas pu initialiser la transaction.",
        }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    await supabase
      .from('orders')
      .update({ payment_id: mfData.token, status: 'pending_payment' })
      .eq('id', orderId);

    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: mfData.url,
        token: mfData.token,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error: unknown) {
    console.error('Payment error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
