-- Create storage bucket for media files
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'media',
  'media',
  true,
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
);

-- Allow public read access to media files
CREATE POLICY "Public can view media files"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'media');

-- Allow authenticated admin users to upload media
CREATE POLICY "Admins can upload media"
ON storage.objects
FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'media' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admin users to update media
CREATE POLICY "Admins can update media"
ON storage.objects
FOR UPDATE
TO authenticated
USING (
  bucket_id = 'media' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Allow authenticated admin users to delete media
CREATE POLICY "Admins can delete media"
ON storage.objects
FOR DELETE
TO authenticated
USING (
  bucket_id = 'media' 
  AND public.has_role(auth.uid(), 'admin')
);

-- Create a table to track media metadata
CREATE TABLE public.media (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER NOT NULL,
  mime_type TEXT NOT NULL,
  alt_text TEXT,
  uploaded_by UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on media table
ALTER TABLE public.media ENABLE ROW LEVEL SECURITY;

-- Anyone can view media metadata
CREATE POLICY "Anyone can view media metadata"
ON public.media
FOR SELECT
USING (true);

-- Only admins can insert media metadata
CREATE POLICY "Admins can insert media metadata"
ON public.media
FOR INSERT
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Only admins can update media metadata
CREATE POLICY "Admins can update media metadata"
ON public.media
FOR UPDATE
USING (public.has_role(auth.uid(), 'admin'));

-- Only admins can delete media metadata
CREATE POLICY "Admins can delete media metadata"
ON public.media
FOR DELETE
USING (public.has_role(auth.uid(), 'admin'));

-- Add trigger for updated_at
CREATE TRIGGER update_media_updated_at
BEFORE UPDATE ON public.media
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();