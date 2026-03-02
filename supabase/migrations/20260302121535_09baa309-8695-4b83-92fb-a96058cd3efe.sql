
-- =============================================
-- 1. product_files: fichiers associés aux produits
-- =============================================
CREATE TABLE public.product_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID NOT NULL REFERENCES public.digital_products(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL DEFAULT 0,
  file_type TEXT NOT NULL DEFAULT 'application/pdf',
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.product_files ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage product files"
  ON public.product_files FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can view product files metadata"
  ON public.product_files FOR SELECT
  USING (true);

CREATE TRIGGER update_product_files_updated_at
  BEFORE UPDATE ON public.product_files
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- 2. order_items: articles par commande (multi-produit)
-- =============================================
CREATE TABLE public.order_items (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.digital_products(id) ON DELETE RESTRICT,
  product_title TEXT NOT NULL,
  price NUMERIC NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage order items"
  ON public.order_items FOR ALL
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create order items"
  ON public.order_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Anyone can view their order items"
  ON public.order_items FOR SELECT
  USING (true);

-- =============================================
-- 3. downloads: historique des téléchargements
-- =============================================
CREATE TABLE public.downloads (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  order_id UUID NOT NULL REFERENCES public.orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES public.digital_products(id) ON DELETE CASCADE,
  file_id UUID REFERENCES public.product_files(id) ON DELETE SET NULL,
  customer_email TEXT NOT NULL,
  ip_address TEXT,
  user_agent TEXT,
  downloaded_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all downloads"
  ON public.downloads FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can create download records"
  ON public.downloads FOR INSERT
  WITH CHECK (true);

-- =============================================
-- 4. Enable Realtime on all e-commerce tables
-- =============================================
ALTER PUBLICATION supabase_realtime ADD TABLE public.product_files;
ALTER PUBLICATION supabase_realtime ADD TABLE public.order_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.downloads;
ALTER PUBLICATION supabase_realtime ADD TABLE public.digital_products;
ALTER PUBLICATION supabase_realtime ADD TABLE public.orders;
ALTER PUBLICATION supabase_realtime ADD TABLE public.cart_items;
ALTER PUBLICATION supabase_realtime ADD TABLE public.analytics_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.profiles;
