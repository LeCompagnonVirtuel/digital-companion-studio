import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "https://esm.sh/resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface OrderEmailRequest {
  customerEmail: string;
  customerName: string;
  orderNumber: string;
  productTitle: string;
  price: number;
  currency: string;
  downloadLink: string;
  accessToken: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const {
      customerEmail,
      customerName,
      orderNumber,
      productTitle,
      price,
      currency,
      downloadLink,
      accessToken,
    }: OrderEmailRequest = await req.json();

    console.log("Sending order confirmation email to:", customerEmail);

    const formatPrice = (amount: number, curr: string) => {
      return new Intl.NumberFormat("fr-FR", {
        style: "currency",
        currency: curr || "XOF",
        minimumFractionDigits: 0,
      }).format(amount);
    };

    const confirmationUrl = downloadLink || `${Deno.env.get("SUPABASE_URL")?.replace('.supabase.co', '.lovableproject.com') || ''}/boutique/confirmation?order=${orderNumber}&token=${accessToken}`;

    const emailResponse = await resend.emails.send({
      from: "Le Compagnon Virtuel <onboarding@resend.dev>",
      to: [customerEmail],
      subject: `🎉 Confirmation de commande ${orderNumber} - Votre produit est prêt !`,
      html: `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Confirmation de commande</title>
        </head>
        <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f8fafc;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width: 600px; margin: 0 auto; background-color: #ffffff;">
            <!-- Header -->
            <tr>
              <td style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); padding: 40px 30px; text-align: center;">
                <h1 style="color: #ffffff; margin: 0; font-size: 28px; font-weight: 700;">
                  🎉 Merci pour votre achat !
                </h1>
              </td>
            </tr>
            
            <!-- Content -->
            <tr>
              <td style="padding: 40px 30px;">
                <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 20px;">
                  Bonjour <strong>${customerName || "cher client"}</strong>,
                </p>
                
                <p style="color: #334155; font-size: 16px; line-height: 1.6; margin: 0 0 30px;">
                  Votre paiement a été confirmé avec succès ! Votre produit digital est maintenant disponible au téléchargement.
                </p>

                <!-- Order Summary Box -->
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f1f5f9; border-radius: 12px; margin-bottom: 30px;">
                  <tr>
                    <td style="padding: 24px;">
                      <h3 style="color: #1e293b; margin: 0 0 16px; font-size: 18px;">📦 Récapitulatif de commande</h3>
                      
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">N° Commande</td>
                          <td style="color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${orderNumber}</td>
                        </tr>
                        <tr>
                          <td style="color: #64748b; font-size: 14px; padding: 8px 0;">Produit</td>
                          <td style="color: #1e293b; font-size: 14px; font-weight: 600; text-align: right;">${productTitle}</td>
                        </tr>
                        <tr>
                          <td style="color: #64748b; font-size: 14px; padding: 8px 0; border-top: 1px solid #e2e8f0;">Total payé</td>
                          <td style="color: #059669; font-size: 18px; font-weight: 700; text-align: right; border-top: 1px solid #e2e8f0;">${formatPrice(price, currency)}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>

                <!-- Download Button -->
                <table width="100%" cellpadding="0" cellspacing="0">
                  <tr>
                    <td style="text-align: center; padding: 20px 0;">
                      <a href="${confirmationUrl}" 
                         style="display: inline-block; background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 12px; font-size: 16px; font-weight: 600; box-shadow: 0 4px 14px rgba(99, 102, 241, 0.3);">
                        📥 Télécharger mon produit
                      </a>
                    </td>
                  </tr>
                </table>

                <p style="color: #64748b; font-size: 14px; line-height: 1.6; margin: 30px 0 0; text-align: center;">
                  Ce lien est personnel et sécurisé. Conservez cet email pour accéder à votre produit à tout moment.
                </p>
              </td>
            </tr>

            <!-- Support -->
            <tr>
              <td style="padding: 0 30px 30px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #eff6ff; border-radius: 12px;">
                  <tr>
                    <td style="padding: 20px;">
                      <p style="color: #1e40af; font-size: 14px; margin: 0; text-align: center;">
                        💬 Une question ? Répondez directement à cet email, notre équipe vous répondra rapidement.
                      </p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background-color: #1e293b; padding: 30px; text-align: center;">
                <p style="color: #94a3b8; font-size: 14px; margin: 0 0 10px;">
                  Le Compagnon Virtuel - Agence Digitale
                </p>
                <p style="color: #64748b; font-size: 12px; margin: 0;">
                  © ${new Date().getFullYear()} Tous droits réservés
                </p>
              </td>
            </tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log("Email sent successfully:", emailResponse);

    return new Response(JSON.stringify({ success: true, ...emailResponse }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-order-confirmation function:", error);
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
