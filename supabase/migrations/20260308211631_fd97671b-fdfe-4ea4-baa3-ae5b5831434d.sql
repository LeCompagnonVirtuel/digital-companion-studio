
-- Admin activity logs table
CREATE TABLE public.admin_activity_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  admin_email text NOT NULL,
  admin_user_id uuid,
  action text NOT NULL,
  action_type text NOT NULL DEFAULT 'other',
  resource_type text,
  resource_id text,
  page text,
  details jsonb DEFAULT '{}'::jsonb,
  ip_address text,
  user_agent text,
  created_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_activity_logs ENABLE ROW LEVEL SECURITY;

-- Admins can read all logs
CREATE POLICY "Admins can read activity logs"
  ON public.admin_activity_logs FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Admins can insert logs
CREATE POLICY "Admins can insert activity logs"
  ON public.admin_activity_logs FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));

-- Only service role can delete (no delete policy for regular admins)
-- This effectively prevents deletion except via service role

-- Index for filtering
CREATE INDEX idx_activity_logs_created_at ON public.admin_activity_logs(created_at DESC);
CREATE INDEX idx_activity_logs_action_type ON public.admin_activity_logs(action_type);
CREATE INDEX idx_activity_logs_admin_email ON public.admin_activity_logs(admin_email);
