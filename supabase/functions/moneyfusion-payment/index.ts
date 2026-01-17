import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('MONEYFUSION_API_KEY');
    if (!apiKey) {
      console.error('MONEYFUSION_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Payment service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { orderId, customerEmail, customerName, productTitle, price, returnUrl }: PaymentRequest = await req.json();

    console.log('Processing payment request:', { orderId, customerEmail, productTitle, price });

    // Validate required fields
    if (!orderId || !customerEmail || !productTitle || !price) {
      console.error('Missing required fields');
      return new Response(
        JSON.stringify({ error: 'Missing required fields' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Convert price to FCFA (assuming price is in EUR, 1 EUR ≈ 656 FCFA)
    const priceInFCFA = Math.round(price * 656);

    // Build webhook URL
    const webhookUrl = `${supabaseUrl}/functions/v1/moneyfusion-webhook`;

    // Prepare articles array
    const articles = [{
      name: productTitle,
      price: priceInFCFA.toString(),
      quantity: 1
    }];

    // Prepare personal_Info for order tracking
    const personalInfo = [
      { orderId: orderId },
      { customerEmail: customerEmail }
    ];

    console.log('Calling Money Fusion API:', {
      totalPrice: priceInFCFA,
      articles,
      nomclient: customerName || 'Client',
      return_url: returnUrl,
      webhook_url: webhookUrl
    });

    // Call Money Fusion API
    const mfResponse = await fetch(`https://api.moneyfusion.net/MyApp/${apiKey}/pay/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'moneyfusion-private-key': apiKey
      },
      body: JSON.stringify({
        totalPrice: priceInFCFA.toString(),
        articles,
        nomclient: customerName || 'Client',
        return_url: returnUrl,
        webhook_url: webhookUrl,
        personal_Info: personalInfo
      })
    });

    const mfData = await mfResponse.json();
    console.log('Money Fusion response:', mfData);

    if (!mfData.statut || !mfData.url) {
      console.error('Money Fusion payment initiation failed:', mfData);
      return new Response(
        JSON.stringify({ error: 'Payment initiation failed', details: mfData }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Update order with payment token
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_id: mfData.token,
        status: 'pending_payment'
      })
      .eq('id', orderId);

    if (updateError) {
      console.error('Failed to update order with payment token:', updateError);
    }

    console.log('Payment initiated successfully:', { token: mfData.token, url: mfData.url });

    return new Response(
      JSON.stringify({
        success: true,
        paymentUrl: mfData.url,
        token: mfData.token
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
