-- Table pour les paramètres admin
CREATE TABLE public.admin_settings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    key text NOT NULL UNIQUE,
    value jsonb NOT NULL DEFAULT '{}'::jsonb,
    description text,
    created_at timestamp with time zone NOT NULL DEFAULT now(),
    updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Activer RLS
ALTER TABLE public.admin_settings ENABLE ROW LEVEL SECURITY;

-- Politique: Admins peuvent tout gérer
CREATE POLICY "Admins can manage settings" 
ON public.admin_settings 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Politique: Lecture publique pour certains paramètres du site
CREATE POLICY "Anyone can view public settings" 
ON public.admin_settings 
FOR SELECT 
USING (key IN ('site_name', 'site_description', 'contact_email', 'social_links'));

-- Trigger pour updated_at
CREATE TRIGGER update_admin_settings_updated_at
BEFORE UPDATE ON public.admin_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Activer realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.admin_settings;

-- Insérer les paramètres par défaut
INSERT INTO public.admin_settings (key, value, description) VALUES
('site_name', '"LCV Digital"', 'Nom du site'),
('site_description', '"Agence digitale full-stack"', 'Description du site'),
('contact_email', '"contact@lcvdigital.com"', 'Email de contact principal'),
('notifications', '{"newLeads": true, "weeklyReport": true, "marketingEmails": false}', 'Préférences de notification'),
('social_links', '{"facebook": "", "instagram": "", "linkedin": "", "twitter": ""}', 'Liens réseaux sociaux'),
('business_info', '{"phone": "", "address": "", "hours": ""}', 'Informations entreprise');