import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  const startTime = Date.now()
  const results: Record<string, any> = {
    timestamp: new Date().toISOString(),
    services: {},
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL')!
  const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
  const supabase = createClient(supabaseUrl, serviceRoleKey)

  // Test DB connectivity
  try {
    const dbStart = Date.now()
    const { error } = await supabase.from('admin_settings').select('id').limit(1)
    const dbTime = Date.now() - dbStart
    results.services.database = {
      status: error ? 'error' : 'healthy',
      response_time_ms: dbTime,
      error: error?.message || null,
    }
  } catch (e) {
    results.services.database = { status: 'error', response_time_ms: 0, error: String(e) }
  }

  // Test Storage
  try {
    const stStart = Date.now()
    const { error } = await supabase.storage.listBuckets()
    const stTime = Date.now() - stStart
    results.services.storage = {
      status: error ? 'error' : 'healthy',
      response_time_ms: stTime,
      error: error?.message || null,
    }
  } catch (e) {
    results.services.storage = { status: 'error', response_time_ms: 0, error: String(e) }
  }

  // Test Auth service
  try {
    const authStart = Date.now()
    const { error } = await supabase.auth.admin.listUsers({ page: 1, perPage: 1 })
    const authTime = Date.now() - authStart
    results.services.auth = {
      status: error ? 'error' : 'healthy',
      response_time_ms: authTime,
      error: error?.message || null,
    }
  } catch (e) {
    results.services.auth = { status: 'error', response_time_ms: 0, error: String(e) }
  }

  // Active visitors: count UNIQUE sessions in last 5 minutes
  try {
    const fiveMinAgo = new Date(Date.now() - 5 * 60 * 1000).toISOString()
    const { data: recentEvents } = await supabase
      .from('analytics_events')
      .select('session_id')
      .gte('created_at', fiveMinAgo)
      .not('session_id', 'is', null)
    
    // Count unique session_ids
    const uniqueSessions = new Set((recentEvents || []).map(e => e.session_id).filter(Boolean))
    results.active_visitors = uniqueSessions.size
  } catch {
    results.active_visitors = 0
  }

  // Today's visitors (unique sessions today)
  try {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const { data: todayEvents } = await supabase
      .from('analytics_events')
      .select('session_id')
      .gte('created_at', todayStart.toISOString())
      .eq('event_type', 'session_start')
    
    results.today_visitors = todayEvents?.length || 0
  } catch {
    results.today_visitors = 0
  }

  // Today's page views
  try {
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const { count } = await supabase
      .from('analytics_events')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayStart.toISOString())
      .eq('event_type', 'page_view')
    
    results.today_page_views = count || 0
  } catch {
    results.today_page_views = 0
  }

  // Recent orders (last 24h)
  try {
    const dayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
    const { count } = await supabase
      .from('orders')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', dayAgo)
    results.orders_24h = count || 0
  } catch {
    results.orders_24h = 0
  }

  // Open critical alerts
  try {
    const { count } = await supabase
      .from('system_alerts')
      .select('*', { count: 'exact', head: true })
      .eq('status', 'open')
      .eq('severity', 'critical')
    results.critical_alerts = count || 0
  } catch {
    results.critical_alerts = 0
  }

  const totalTime = Date.now() - startTime
  results.total_response_time_ms = totalTime
  results.overall_status = Object.values(results.services).every(
    (s: any) => s.status === 'healthy'
  ) ? 'healthy' : 'degraded'

  return new Response(JSON.stringify(results), {
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  })
})
