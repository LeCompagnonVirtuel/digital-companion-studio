import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

const TABLES_TO_BACKUP = [
  'admin_settings',
  'digital_products',
  'orders',
  'order_items',
  'blog_posts',
  'portfolio_projects',
  'shop_customers',
  'promo_codes',
  'leads',
  'product_files',
  'site_content',
  'promo_codes',
  'notifications',
  'media',
]

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const serviceRoleKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY')!

    // Verify user is admin
    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } }
    })
    const token = authHeader.replace('Bearer ', '')
    const { data: claims, error: claimsError } = await userClient.auth.getClaims(token)
    if (claimsError || !claims?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }
    const userId = claims.claims.sub as string

    // Use service role for data export
    const adminClient = createClient(supabaseUrl, serviceRoleKey)

    // Check admin role
    const { data: roleData } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle()

    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), { status: 403, headers: corsHeaders })
    }

    const body = await req.json().catch(() => ({}))
    const backupType = body.type || 'manual'

    // Export all tables
    const backupData: Record<string, unknown[]> = {}
    const tableStats: Record<string, number> = {}

    for (const table of TABLES_TO_BACKUP) {
      const { data, error } = await adminClient.from(table).select('*')
      if (error) {
        console.error(`Error exporting ${table}:`, error.message)
        backupData[table] = []
        tableStats[table] = 0
      } else {
        backupData[table] = data || []
        tableStats[table] = data?.length || 0
      }
    }

    const backupJson = JSON.stringify({
      version: '1.0',
      created_at: new Date().toISOString(),
      type: backupType,
      tables: backupData,
    })

    const sizeBytes = new TextEncoder().encode(backupJson).length
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-')
    const filePath = `backup-${backupType}-${timestamp}.json`

    // Upload to storage
    const { error: uploadError } = await adminClient.storage
      .from('backups')
      .upload(filePath, backupJson, {
        contentType: 'application/json',
        upsert: false,
      })

    if (uploadError) {
      throw new Error(`Upload failed: ${uploadError.message}`)
    }

    // Get user email
    const { data: profile } = await adminClient
      .from('profiles')
      .select('email')
      .eq('user_id', userId)
      .maybeSingle()

    // Insert backup record
    const { data: backup, error: insertError } = await adminClient
      .from('backups')
      .insert({
        type: backupType,
        status: 'completed',
        size_bytes: sizeBytes,
        file_path: filePath,
        tables_included: TABLES_TO_BACKUP,
        created_by: profile?.email || userId,
        metadata: { table_stats: tableStats },
        completed_at: new Date().toISOString(),
      })
      .select()
      .single()

    if (insertError) {
      throw new Error(`Insert failed: ${insertError.message}`)
    }

    return new Response(JSON.stringify({ success: true, backup }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Backup error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
