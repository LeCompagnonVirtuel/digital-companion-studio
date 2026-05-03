-- Growth Intelligence tables
CREATE TABLE public.gi_competitors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  website TEXT,
  industry TEXT,
  notes TEXT,
  last_scan_at TIMESTAMPTZ,
  last_scan_summary TEXT,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.gi_prospects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL,
  website TEXT,
  contact_name TEXT,
  contact_email TEXT,
  contact_phone TEXT,
  industry TEXT,
  location TEXT,
  score INTEGER DEFAULT 0,
  digital_maturity JSONB DEFAULT '{}'::jsonb,
  signals JSONB DEFAULT '[]'::jsonb,
  status TEXT NOT NULL DEFAULT 'new',
  source TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.gi_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  prospect_id UUID REFERENCES public.gi_prospects(id) ON DELETE CASCADE,
  channel TEXT NOT NULL DEFAULT 'email',
  subject TEXT,
  body TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'draft',
  generated_by TEXT DEFAULT 'ai',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.gi_searches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  query TEXT NOT NULL,
  search_type TEXT NOT NULL DEFAULT 'prospect',
  results JSONB DEFAULT '[]'::jsonb,
  results_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.gi_actions_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  action_type TEXT NOT NULL,
  entity_type TEXT,
  entity_id UUID,
  payload JSONB DEFAULT '{}'::jsonb,
  status TEXT DEFAULT 'success',
  error TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.gi_competitors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gi_prospects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gi_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gi_searches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gi_actions_log ENABLE ROW LEVEL SECURITY;

-- Admin-only policies (uses existing has_role function)
CREATE POLICY "Admins manage gi_competitors" ON public.gi_competitors
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage gi_prospects" ON public.gi_prospects
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage gi_messages" ON public.gi_messages
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage gi_searches" ON public.gi_searches
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage gi_actions_log" ON public.gi_actions_log
  FOR ALL USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Triggers for updated_at
CREATE TRIGGER update_gi_competitors_updated_at
  BEFORE UPDATE ON public.gi_competitors
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gi_prospects_updated_at
  BEFORE UPDATE ON public.gi_prospects
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_gi_messages_updated_at
  BEFORE UPDATE ON public.gi_messages
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Indexes
CREATE INDEX idx_gi_prospects_status ON public.gi_prospects(status);
CREATE INDEX idx_gi_prospects_score ON public.gi_prospects(score DESC);
CREATE INDEX idx_gi_messages_prospect ON public.gi_messages(prospect_id);
CREATE INDEX idx_gi_actions_log_created ON public.gi_actions_log(created_at DESC);