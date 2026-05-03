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

    const { prospect_id, channel = 'email', tone = 'professionnel' } = await req.json();
    if (!prospect_id) return new Response(JSON.stringify({ error: 'prospect_id required' }), { status: 400, headers: corsHeaders });

    const { data: prospect } = await admin.from('gi_prospects').select('*').eq('id', prospect_id).maybeSingle();
    if (!prospect) return new Response(JSON.stringify({ error: 'Prospect not found' }), { status: 404, headers: corsHeaders });

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) throw new Error('LOVABLE_API_KEY missing');

    const aiRes = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${LOVABLE_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: `Tu rédiges des messages de prospection ${tone}s en français pour "Le Compagnon Virtuel", agence digitale (sites web, IA, marketing, e-commerce). Format JSON strict: {"subject":"...","body":"..."}. Le body doit être personnalisé, court (max 150 mots), avec un CTA clair vers un appel découverte. Pas d'emojis exagérés.` },
          { role: 'user', content: `Prospect:\n- Entreprise: ${prospect.company_name}\n- Site: ${prospect.website || 'N/A'}\n- Secteur: ${prospect.industry || 'N/A'}\n- Notes: ${prospect.notes || 'N/A'}\n- Canal: ${channel}\n\nRédige le message au format JSON.` },
        ],
        response_format: { type: 'json_object' },
      }),
    });
    const aiData = await aiRes.json();
    if (!aiRes.ok) throw new Error(`AI: ${JSON.stringify(aiData)}`);
    const content = aiData.choices?.[0]?.message?.content || '{}';
    let parsed: any = {};
    try { parsed = JSON.parse(content); } catch { parsed = { subject: 'Message', body: content }; }

    const { data: msg } = await admin.from('gi_messages').insert({
      prospect_id,
      channel,
      subject: parsed.subject || null,
      body: parsed.body || content,
      status: 'draft',
      generated_by: 'ai',
    }).select().single();

    await admin.from('gi_actions_log').insert({ action_type: 'message_generate', entity_type: 'prospect', entity_id: prospect_id });

    return new Response(JSON.stringify({ success: true, message: msg }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }
});
