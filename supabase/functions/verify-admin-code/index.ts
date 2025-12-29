import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    
    if (!code) {
      console.log("No code provided");
      return new Response(
        JSON.stringify({ success: false, error: "Code requis" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Récupérer le code admin depuis les secrets
    const adminCode = Deno.env.get("ADMIN_ACCESS_CODE");
    
    if (!adminCode) {
      console.error("ADMIN_ACCESS_CODE not configured");
      return new Response(
        JSON.stringify({ success: false, error: "Configuration manquante" }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Vérification du code
    const isValid = code === adminCode;
    
    console.log("Code verification attempt:", { provided: code.substring(0, 3) + "***", isValid });
    
    if (isValid) {
      // Générer un token de session sécurisé
      const sessionToken = crypto.randomUUID();
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 heures
      
      console.log("Admin login successful, session created");
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          token: sessionToken,
          expiresAt 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
      console.log("Invalid code attempt");
      return new Response(
        JSON.stringify({ success: false, error: "Code invalide" }),
        { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }
  } catch (error) {
    console.error("Error verifying code:", error);
    return new Response(
      JSON.stringify({ success: false, error: "Erreur serveur" }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});