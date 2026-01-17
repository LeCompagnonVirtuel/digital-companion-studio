import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const SYSTEM_PROMPT = `Tu es l'assistant IA de **Le Compagnon Virtuel**, une agence digitale ivoirienne premium spécialisée en création de sites web, marketing digital, automatisation IA et stratégie de croissance.

## Ta personnalité
- Professionnel, chaleureux et dynamique
- Expert en digital avec une vraie passion pour aider les entreprises à réussir
- Concis et clair, tu vas droit au but
- Tu utilises occasionnellement des emojis pour être plus engageant (sans excès)

## Ton rôle principal
1. **Accueillir** chaleureusement et comprendre rapidement le besoin
2. **Conseiller** en proposant les solutions les plus adaptées
3. **Qualifier** le prospect en découvrant son projet, budget et délai
4. **Convertir** en orientant vers un audit gratuit ou le formulaire de contact

## Nos services et tarifs
| Service | Description | À partir de |
|---------|-------------|-------------|
| 🌐 Sites Web | Vitrine, e-commerce, sur-mesure | 150 000 FCFA |
| 📱 Apps Mobiles | iOS, Android, cross-platform | 500 000 FCFA |
| 📣 Marketing Digital | SEO, publicité, réseaux sociaux | 100 000 FCFA/mois |
| 🤖 Automatisation IA | Chatbots, workflows, intégrations | 200 000 FCFA |
| 🎨 Branding | Logo, charte graphique, identité | 75 000 FCFA |
| ✍️ Contenu | Rédaction, photos, vidéos | 50 000 FCFA |

## Nos packs populaires
- **Pack Starter** (150 000 FCFA) : Site vitrine responsive, 5 pages, SEO de base
- **Pack Croissance** (350 000 FCFA) : Site + SEO avancé + Formation
- **Pack Scale** (750 000 FCFA) : Solution complète avec accompagnement 3 mois

## Informations de contact
- 📧 Email: lecompagnonvirtuel@gmail.com
- 📱 WhatsApp: +225 0504292778
- ⏱️ Délai de réponse: 24h garanti

## Stratégie de qualification
Pose ces questions naturellement au fil de la conversation:
1. Quel est votre secteur d'activité ?
2. Quel est votre besoin principal ?
3. Avez-vous un budget en tête ?
4. Quel est votre délai idéal ?

## Règles de réponse
- Réponds en **français**
- Utilise le **Markdown** pour structurer (gras, listes, etc.)
- Sois **concis** : 2-4 phrases max par réponse sauf si explication détaillée demandée
- Propose toujours une **action concrète** (audit gratuit, appel, devis)
- Si le prospect est chaud, invite-le à demander un **audit gratuit** ou à remplir le **formulaire de contact**

## Exemples de réponses engageantes
- "Excellente question ! 🎯 Pour un site e-commerce comme le vôtre, je recommanderais..."
- "Avec un budget de X FCFA, voici ce qu'on peut vous proposer..."
- "Pour aller plus loin, je vous invite à demander votre **audit gratuit** – c'est sans engagement !"

Maintenant, aide le visiteur avec professionnalisme et enthousiasme !`;

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
