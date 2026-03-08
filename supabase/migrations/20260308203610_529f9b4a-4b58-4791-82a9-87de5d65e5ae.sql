
-- Insert maintenance settings
INSERT INTO public.admin_settings (key, value, description)
VALUES 
  ('maintenance_mode', 'false'::jsonb, 'Active ou désactive le mode maintenance'),
  ('maintenance_message', '"Nous effectuons actuellement une mise à jour pour améliorer votre expérience. Le site sera de retour très bientôt."'::jsonb, 'Message affiché sur la page maintenance'),
  ('maintenance_title', '"🚧 Site en maintenance"'::jsonb, 'Titre de la page maintenance'),
  ('maintenance_estimated_return', 'null'::jsonb, 'Date/heure estimée de retour (ISO string ou null)')
ON CONFLICT DO NOTHING;

-- Update RLS policy to allow public read of maintenance settings
DROP POLICY IF EXISTS "Anyone can view public settings" ON public.admin_settings;
CREATE POLICY "Anyone can view public settings"
  ON public.admin_settings
  FOR SELECT
  USING (key = ANY (ARRAY[
    'site_name', 'site_description', 'contact_email', 'social_links',
    'maintenance_mode', 'maintenance_title', 'maintenance_message', 'maintenance_estimated_return'
  ]));
