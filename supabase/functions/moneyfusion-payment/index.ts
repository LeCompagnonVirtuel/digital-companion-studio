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
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let apiKey = Deno.env.get('MONEYFUSION_API_KEY');
    if (!apiKey) {
      console.error('MONEYFUSION_API_KEY not configured');
      return new Response(
        JSON.stringify({ error: 'Payment service not configured' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract the actual API key if a full URL was provided
    // Handle formats like: https://moneyfusion.net/links/ACTUAL_KEY or just ACTUAL_KEY
    if (apiKey.includes('moneyfusion.net/links/')) {
      const match = apiKey.match(/moneyfusion\.net\/links\/([a-zA-Z0-9]+)/);
      if (match && match[1]) {
        apiKey = match[1];
        console.log('Extracted API key from URL format');
      }
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

    // Price is already in FCFA
    const priceInFCFA = Math.round(price);

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

    console.log('Calling Money Fusion API with key:', apiKey.substring(0, 8) + '...');
    console.log('Request payload:', {
      totalPrice: priceInFCFA,
      articles,
      nomclient: customerName || 'Client',
      return_url: returnUrl,
      webhook_url: webhookUrl
    });

    // Try multiple endpoints - Money Fusion API endpoints
    const endpoints = [
      `https://www.pay.moneyfusion.net/Le_Compagnon_Virtuel/58ef45bf053676ab/pay/`,
      `https://pay.moneyfusion.net/Le_Compagnon_Virtuel/58ef45bf053676ab/pay/`,
      `https://moneyfusion.net/api/v1/pay/${apiKey}`,
    ];

    let mfData: any = null;
    let lastError: string = '';

    for (const apiUrl of endpoints) {
      console.log('Trying API URL:', apiUrl);
      
      try {
        const mfResponse = await fetch(apiUrl, {
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

        const responseText = await mfResponse.text();
        console.log('Response status:', mfResponse.status, 'Response text (first 200 chars):', responseText.substring(0, 200));

        // Check if response is JSON
        if (responseText.startsWith('{') || responseText.startsWith('[')) {
          mfData = JSON.parse(responseText);
          console.log('Money Fusion response:', mfData);
          
          if (mfData.statut && mfData.url) {
            console.log('Success with endpoint:', apiUrl);
            break;
          }
        } else {
          lastError = `Endpoint returned HTML instead of JSON: ${apiUrl}`;
          console.log(lastError);
        }
      } catch (endpointError) {
        lastError = endpointError instanceof Error ? endpointError.message : 'Unknown error';
        console.log('Endpoint failed:', apiUrl, lastError);
      }
    }

    if (!mfData || !mfData.statut || !mfData.url) {
      console.error('All Money Fusion endpoints failed. Last error:', lastError);
      console.error('Last response:', mfData);
      return new Response(
        JSON.stringify({ 
          error: 'Payment initiation failed', 
          details: mfData || { message: lastError },
          message: 'La passerelle de paiement n\'a pas pu initialiser la transaction. Veuillez vérifier la clé API Money Fusion.'
        }),
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
