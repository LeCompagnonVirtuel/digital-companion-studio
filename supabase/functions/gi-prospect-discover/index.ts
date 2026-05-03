import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.45.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });

    const supabase = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_ANON_KEY')!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const token = authHeader.replace('Bearer ', '');
    const { data: claims } = await supabase.auth.getClaims(token);
    if (!claims?.claims?.sub) return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401, headers: corsHeaders });

    const admin = createClient(Deno.env.get('SUPABASE_URL')!, Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!);
    const { data: roleData } = await admin.from('user_roles').select('role').eq('user_id', claims.claims.sub).eq('role', 'admin').maybeSingle();
    if (!roleData) return new Response(JSON.stringify({ error: 'Forbidden' }), { status: 403, headers: corsHeaders });

    const { query, limit = 10 } = await req.json();
    if (!query || typeof query !== 'string') {
      return new Response(JSON.stringify({ error: 'query required' }), { status: 400, headers: corsHeaders });
    }

    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    if (!FIRECRAWL_API_KEY) throw new Error('FIRECRAWL_API_KEY missing');

    const fcRes = await fetch('https://api.firecrawl.dev/v2/search', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${FIRECRAWL_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, limit }),
    });
    const fcData = await fcRes.json();
    if (!fcRes.ok) throw new Error(`Firecrawl: ${JSON.stringify(fcData)}`);

    const results = (fcData.data || fcData.web?.results || []).map((r: any) => ({
      url: r.url, title: r.title, description: r.description,
    }));

    // Score basique: présence de mots-clés digitaux
    const lowMaturityKeywords = ['contact', 'à propos', 'about'];
    const prospects = results.map((r: any) => {
      const text = `${r.title} ${r.description}`.toLowerCase();
      const hasNoSite = !r.url;
      const score = Math.min(100, 50 + (lowMaturityKeywords.some(k => text.includes(k)) ? 20 : 0) + Math.floor(Math.random() * 20));
      return {
        company_name: r.title?.split('|')[0]?.split('-')[0]?.trim() || 'Sans nom',
        website: r.url,
        notes: r.description,
        score,
        source: 'firecrawl_search',
        signals: [{ type: 'search_match', query }],
        status: 'new',
      };
    });

    if (prospects.length > 0) {
      await admin.from('gi_prospects').insert(prospects);
    }
    await admin.from('gi_searches').insert({ query, search_type: 'prospect', results: prospects, results_count: prospects.length });
    await admin.from('gi_actions_log').insert({ action_type: 'prospect_discover', payload: { query, count: prospects.length } });

    return new Response(JSON.stringify({ success: true, count: prospects.length, prospects }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
