import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const ADMIN_AUTH_EMAIL = Deno.env.get("ADMIN_AUTH_EMAIL") ?? "lecompagnonvirtuel@gmail.com";

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { code } = await req.json();

    if (!code) {
      return new Response(JSON.stringify({ success: false, error: "Code requis" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const adminCode = Deno.env.get("ADMIN_ACCESS_CODE");
    if (!adminCode) {
      console.error("ADMIN_ACCESS_CODE not configured");
      return new Response(JSON.stringify({ success: false, error: "Configuration manquante" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    if (code !== adminCode) {
      return new Response(JSON.stringify({ success: false, error: "Code invalide" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const SUPABASE_URL = Deno.env.get("SUPABASE_URL");
    const SUPABASE_SERVICE_ROLE_KEY = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");

    if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
      console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
      return new Response(
        JSON.stringify({
          success: false,
          error: "Configuration Supabase manquante (service role).",
        }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseAdmin = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    // Ensure an auth user exists and password matches admin code
    let userId: string | null = null;

    const { data: created, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: ADMIN_AUTH_EMAIL,
      password: code,
      email_confirm: true,
    });

    if (createError) {
      const { data: usersData, error: usersError } = await supabaseAdmin.auth.admin.listUsers({ perPage: 200 });
      if (usersError) throw usersError;

      const existingUser = usersData.users.find(
        (u) => (u.email ?? "").toLowerCase() === ADMIN_AUTH_EMAIL.toLowerCase()
      );

      if (!existingUser) throw createError;

      userId = existingUser.id;

      const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(userId, {
        password: code,
      });
      if (updateError) throw updateError;
    } else {
      userId = created.user?.id ?? null;
    }

    if (!userId) {
      throw new Error("Could not resolve admin user id");
    }

    // Ensure admin role exists
    const { data: existingRole, error: roleReadError } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("user_id", userId)
      .eq("role", "admin")
      .maybeSingle();

    if (roleReadError) throw roleReadError;

    if (!existingRole) {
      const { error: roleInsertError } = await supabaseAdmin.from("user_roles").insert({
        user_id: userId,
        role: "admin",
      });
      if (roleInsertError) throw roleInsertError;
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error verifying code:", error);
    return new Response(JSON.stringify({ success: false, error: "Erreur serveur" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
