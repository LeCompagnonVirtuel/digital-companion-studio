import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
}

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

    const userClient = createClient(supabaseUrl, anonKey, {
      global: { headers: { Authorization: authHeader } }
    })
    const token = authHeader.replace('Bearer ', '')
    const { data: claims, error: claimsError } = await userClient.auth.getClaims(token)
    if (claimsError || !claims?.claims) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders })
    }
    const userId = claims.claims.sub as string

    const adminClient = createClient(supabaseUrl, serviceRoleKey)

    const { data: roleData } = await adminClient
      .from('user_roles')
      .select('role')
      .eq('user_id', userId)
      .eq('role', 'admin')
      .maybeSingle()

    if (!roleData) {
      return new Response(JSON.stringify({ error: 'Admin access required' }), { status: 403, headers: corsHeaders })
    }

    const { backup_id } = await req.json()
    if (!backup_id) {
      return new Response(JSON.stringify({ error: 'backup_id required' }), { status: 400, headers: corsHeaders })
    }

    // Get backup record
    const { data: backup, error: fetchError } = await adminClient
      .from('backups')
      .select('*')
      .eq('id', backup_id)
      .single()

    if (fetchError || !backup) {
      return new Response(JSON.stringify({ error: 'Backup not found' }), { status: 404, headers: corsHeaders })
    }

    // Download backup file
    const { data: fileData, error: downloadError } = await adminClient.storage
      .from('backups')
      .download(backup.file_path)

    if (downloadError || !fileData) {
      throw new Error(`Download failed: ${downloadError?.message}`)
    }

    const backupContent = JSON.parse(await fileData.text())
    const tables = backupContent.tables as Record<string, unknown[]>
    const results: Record<string, { success: boolean; count: number; error?: string }> = {}

    // Upsert table by table
    for (const [tableName, rows] of Object.entries(tables)) {
      if (!rows || rows.length === 0) {
        results[tableName] = { success: true, count: 0 }
        continue
      }

      try {
        const { error: upsertError } = await adminClient
          .from(tableName)
          .upsert(rows as Record<string, unknown>[], { onConflict: 'id' })

        if (upsertError) {
          results[tableName] = { success: false, count: 0, error: upsertError.message }
        } else {
          results[tableName] = { success: true, count: rows.length }
        }
      } catch (e) {
        results[tableName] = { success: false, count: 0, error: e.message }
      }
    }

    // Update backup status
    await adminClient
      .from('backups')
      .update({ metadata: { ...backup.metadata, last_restored_at: new Date().toISOString(), restore_results: results } })
      .eq('id', backup_id)

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (error) {
    console.error('Restore error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
