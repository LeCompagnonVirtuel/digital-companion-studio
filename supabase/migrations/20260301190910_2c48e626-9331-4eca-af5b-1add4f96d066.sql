-- Create a private storage bucket for product files (PDFs)
INSERT INTO storage.buckets (id, name, public)
VALUES ('product-files', 'product-files', false)
ON CONFLICT (id) DO NOTHING;

-- Only admins can upload/manage product files
CREATE POLICY "Admins can upload product files"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'product-files' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update product files"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'product-files' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete product files"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'product-files' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);

-- Admins can view all product files
CREATE POLICY "Admins can view product files"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'product-files' 
  AND public.has_role(auth.uid(), 'admin'::app_role)
);