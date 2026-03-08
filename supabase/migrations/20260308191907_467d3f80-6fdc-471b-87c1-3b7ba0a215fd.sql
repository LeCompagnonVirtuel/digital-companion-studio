-- Add unique constraint on key column if not exists, needed for upsert
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'admin_settings_key_key'
  ) THEN
    ALTER TABLE public.admin_settings ADD CONSTRAINT admin_settings_key_key UNIQUE (key);
  END IF;
END $$;

-- Seed SEO keys if they don't exist
INSERT INTO public.admin_settings (key, value, description)
VALUES 
  ('seo_pages', '{}'::jsonb, 'SEO meta tags per page'),
  ('seo_site_name', '"Le Compagnon Virtuel"'::jsonb, 'SEO site name'),
  ('seo_site_description', '""'::jsonb, 'SEO default description'),
  ('seo_twitter_handle', '""'::jsonb, 'Twitter/X handle'),
  ('seo_google_verification', '""'::jsonb, 'Google Search Console verification'),
  ('seo_robots', '"index, follow"'::jsonb, 'Robots directive')
ON CONFLICT (key) DO NOTHING;