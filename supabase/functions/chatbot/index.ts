import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es l'assistant virtuel de Le Compagnon Virtuel, une agence digitale ivoirienne spécialisée en création de sites web, marketing digital, automatisation IA et stratégie de croissance.

Ton rôle est de:
1. Accueillir chaleureusement les visiteurs
2. Répondre aux questions sur les services (sites web, marketing, SEO, automatisation, e-commerce)
3. Qualifier les leads en posant des questions pertinentes sur leur projet
4. Orienter vers les bonnes ressources ou le formulaire de contact

Informations sur l'agence:
- Services: Création de sites web, Marketing digital, SEO/SEA, Automatisation IA, E-commerce, Création de contenu, Branding, Applications mobiles
- Tarifs: Pack Starter à partir de 150 000 FCFA, Pack Croissance à 350 000 FCFA, Pack Scale à 750 000 FCFA
- Délai de réponse: 24h garanti
- Contact: lecompagnonvirtuel@gmail.com
- Téléphone/WhatsApp: +225 0504292778

Ton ton est:
- Professionnel mais chaleureux
- Orienté solution
- Concis et clair
- En français

Pour qualifier un lead, essaie de découvrir:
- Son secteur d'activité
- Son besoin principal (site web, marketing, automatisation...)
- Son budget approximatif
- Son délai

Si l'utilisateur semble prêt à démarrer un projet, invite-le à remplir le formulaire de contact ou à demander un audit gratuit.`;

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Trop de requêtes, veuillez réessayer dans quelques instants." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporairement indisponible." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Erreur du service IA" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Chatbot error:", error);
    return new Response(JSON.stringify({ error: error instanceof Error ? error.message : "Erreur inconnue" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
