
-- Backups tracking table
CREATE TABLE public.backups (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  type text NOT NULL DEFAULT 'manual',
  status text NOT NULL DEFAULT 'pending',
  size_bytes bigint DEFAULT 0,
  file_path text,
  tables_included text[] DEFAULT '{}',
  created_by text,
  error_message text,
  metadata jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now(),
  completed_at timestamptz
);

ALTER TABLE public.backups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage backups"
  ON public.backups FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Private storage bucket for backups
INSERT INTO storage.buckets (id, name, public) VALUES ('backups', 'backups', false);

CREATE POLICY "Admins can manage backup files"
  ON storage.objects FOR ALL
  TO authenticated
  USING (bucket_id = 'backups' AND public.has_role(auth.uid(), 'admin'::public.app_role))
  WITH CHECK (bucket_id = 'backups' AND public.has_role(auth.uid(), 'admin'::public.app_role));
