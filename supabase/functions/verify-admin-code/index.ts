import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Hash du code admin (LCV.20-07-1999)
const ADMIN_CODE_HASH = "a]xV9#kL$mP2@nQ8";

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();
    
    if (!code) {
      return new Response(
        JSON.stringify({ success: false, error: "Code requis" }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Vérification du code
    const isValid = code === "LCV.20-07-1999";
    
    if (isValid) {
      // Générer un token de session simple
      const sessionToken = crypto.randomUUID();
      const expiresAt = Date.now() + (24 * 60 * 60 * 1000); // 24 heures
      
      return new Response(
        JSON.stringify({ 
          success: true, 
          token: sessionToken,
          expiresAt 
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else {
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