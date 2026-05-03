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

    const { competitor_id, website } = await req.json();
    if (!website) return new Response(JSON.stringify({ error: 'website required' }), { status: 400, headers: corsHeaders });

    const FIRECRAWL_API_KEY = Deno.env.get('FIRECRAWL_API_KEY');
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!FIRECRAWL_API_KEY || !LOVABLE_API_KEY) throw new Error('Missing keys');

    const fcRes = await fetch('https://api.firecrawl.dev/v2/scrape', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${FIRECRAWL_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: website, formats: ['markdown', 'summary'], onlyMainContent: true }),
    });
    const fcData = await fcRes.json();
    if (!fcRes.ok) throw new Error(`Firecrawl: ${JSON.stringify(fcData)}`);

    const markdown = fcData.markdown || fcData.data?.markdown || '';
    const summary = fcData.summary || fcData.data?.summary || markdown.slice(0, 2000);

    // Use Lovable AI to extract competitive insights
    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: 'Tu es un analyste concurrentiel. Réponds en français, en markdown structuré: positionnement, offre, prix, forces, faiblesses, opportunités pour notre agence digitale "Le Compagnon Virtuel".' },
          { role: 'user', content: `Analyse ce concurrent (site: ${website}):\n\n${summary}` },
        ],
      }),
    });
    const aiData = await aiRes.json();
    const insights = aiData.choices?.[0]?.message?.content || 'Aucune analyse disponible';

    if (competitor_id) {
      await admin.from('gi_competitors').update({
        last_scan_at: new Date().toISOString(),
        last_scan_summary: insights,
      }).eq('id', competitor_id);
    }
    await admin.from('gi_actions_log').insert({ action_type: 'competitor_scan', entity_type: 'competitor', entity_id: competitor_id, payload: { website } });

    return new Response(JSON.stringify({ success: true, insights, summary }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
