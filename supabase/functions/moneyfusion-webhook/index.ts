import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface WebhookPayload {
  tokenPay: string;
  statut: string;
  personal_Info?: Array<{ orderId?: string; customerEmail?: string }>;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const payload: WebhookPayload = await req.json();
    console.log('Money Fusion webhook received:', JSON.stringify(payload, null, 2));

    const { tokenPay, statut, personal_Info } = payload;

    if (!tokenPay) {
      console.error('Missing tokenPay in webhook payload');
      return new Response(
        JSON.stringify({ error: 'Missing tokenPay' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Extract orderId from personal_Info
    let orderId: string | undefined;
    if (personal_Info && Array.isArray(personal_Info)) {
      for (const info of personal_Info) {
        if (info.orderId) {
          orderId = info.orderId;
          break;
        }
      }
    }

    console.log('Processing webhook for order:', orderId, 'status:', statut);

    // Find order by payment_id (token)
    let query = supabase.from('orders').select('*');
    
    if (orderId) {
      query = query.eq('id', orderId);
    } else {
      query = query.eq('payment_id', tokenPay);
    }

    const { data: orders, error: fetchError } = await query;

    if (fetchError) {
      console.error('Error fetching order:', fetchError);
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    if (!orders || orders.length === 0) {
      console.error('Order not found for token:', tokenPay);
      return new Response(
        JSON.stringify({ error: 'Order not found' }),
        { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const order = orders[0];
    console.log('Found order:', order.id, order.order_number);

    // Map Money Fusion status to our status
    let newStatus = order.status;
    if (statut === 'paid' || statut === 'success' || statut === 'completed') {
      newStatus = 'completed';
    } else if (statut === 'failed' || statut === 'cancelled' || statut === 'expired') {
      newStatus = 'failed';
    } else if (statut === 'pending') {
      newStatus = 'pending_payment';
    }

    console.log('Updating order status from', order.status, 'to', newStatus);

    // Update order status
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        status: newStatus,
        payment_id: tokenPay,
        updated_at: new Date().toISOString()
      })
      .eq('id', order.id);

    if (updateError) {
      console.error('Error updating order:', updateError);
      return new Response(
        JSON.stringify({ error: 'Failed to update order' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // If payment successful, update product sales count
    if (newStatus === 'completed') {
      console.log('Payment successful, updating sales count for product:', order.product_id);
      
      const { data: product } = await supabase
        .from('digital_products')
        .select('sales_count')
        .eq('id', order.product_id)
        .single();

      if (product) {
        await supabase
          .from('digital_products')
          .update({ sales_count: (product.sales_count || 0) + 1 })
          .eq('id', order.product_id);
      }

      // Update shop_customers
      const { data: existingCustomer } = await supabase
        .from('shop_customers')
        .select('*')
        .eq('email', order.customer_email)
        .single();

      if (existingCustomer) {
        await supabase
          .from('shop_customers')
          .update({
            total_orders: (existingCustomer.total_orders || 0) + 1,
            total_spent: (existingCustomer.total_spent || 0) + order.price,
            last_order_at: new Date().toISOString()
          })
          .eq('id', existingCustomer.id);
      } else {
        await supabase
          .from('shop_customers')
          .insert({
            email: order.customer_email,
            name: order.customer_name,
            total_orders: 1,
            total_spent: order.price,
            first_order_at: new Date().toISOString(),
            last_order_at: new Date().toISOString()
          });
      }

      // Create notification for admin
      await supabase.from('notifications').insert({
        type: 'order',
        title: 'Nouvelle commande payée',
        message: `Commande ${order.order_number} de ${order.customer_email} pour ${order.price}€`,
        data: { orderId: order.id, orderNumber: order.order_number }
      });

      console.log('Order completed successfully:', order.order_number);
    }

    return new Response(
      JSON.stringify({ success: true, status: newStatus }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Webhook error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ error: 'Internal server error', message: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
