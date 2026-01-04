import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface AppointmentRequest {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  source: string;
}

const handler = async (req: Request): Promise<Response> => {
  console.log("Received appointment notification request");

  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, date, time, source }: AppointmentRequest = await req.json();

    console.log(`Processing appointment for ${name} (${email}) on ${date} at ${time}`);

    // Send confirmation email to the client
    const clientEmailResponse = await resend.emails.send({
      from: "Le Compagnon Virtuel <onboarding@resend.dev>",
      to: [email],
      subject: "✅ Confirmation de votre rendez-vous",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #4f46e5 0%, #0d9488 100%); padding: 30px; border-radius: 16px 16px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">Rendez-vous confirmé ! ✅</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 16px 16px;">
            <p style="font-size: 16px; margin-bottom: 20px;">Bonjour <strong>${name}</strong>,</p>
            
            <p>Nous avons bien reçu votre demande de rendez-vous. Voici les détails :</p>
            
            <div style="background: white; padding: 20px; border-radius: 12px; border: 1px solid #e5e7eb; margin: 20px 0;">
              <p style="margin: 0 0 10px 0;"><strong>📅 Date :</strong> ${date}</p>
              <p style="margin: 0 0 10px 0;"><strong>🕐 Heure :</strong> ${time}</p>
              <p style="margin: 0;"><strong>⏱️ Durée :</strong> 30 minutes</p>
            </div>
            
            <p>Nous vous contacterons à l'heure prévue. En attendant, n'hésitez pas à préparer vos questions !</p>
            
            <p style="margin-top: 30px;">À très bientôt,<br><strong>L'équipe Le Compagnon Virtuel</strong></p>
          </div>
          
          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 20px;">
            © 2024 Le Compagnon Virtuel. Tous droits réservés.
          </p>
        </body>
        </html>
      `,
    });

    console.log("Client email sent:", clientEmailResponse);

    // Send notification email to the admin
    const adminEmailResponse = await resend.emails.send({
      from: "Le Compagnon Virtuel <onboarding@resend.dev>",
      to: ["admin@lecompagnonvirtuel.com"], // Replace with actual admin email
      subject: `🗓️ Nouveau RDV: ${name} - ${date} à ${time}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
        </head>
        <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: #1f2937; padding: 20px; border-radius: 12px 12px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 20px;">🗓️ Nouveau rendez-vous</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 24px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 12px 12px;">
            <h2 style="margin-top: 0;">Informations client</h2>
            <ul style="list-style: none; padding: 0;">
              <li style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Nom :</strong> ${name}</li>
              <li style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Email :</strong> <a href="mailto:${email}">${email}</a></li>
              <li style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Téléphone :</strong> ${phone || "Non renseigné"}</li>
              <li style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Date :</strong> ${date}</li>
              <li style="padding: 8px 0; border-bottom: 1px solid #e5e7eb;"><strong>Heure :</strong> ${time}</li>
              <li style="padding: 8px 0;"><strong>Source :</strong> ${source}</li>
            </ul>
          </div>
        </body>
        </html>
      `,
    });

    console.log("Admin email sent:", adminEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true, 
        clientEmail: clientEmailResponse,
        adminEmail: adminEmailResponse 
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Error in send-appointment-notification:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
