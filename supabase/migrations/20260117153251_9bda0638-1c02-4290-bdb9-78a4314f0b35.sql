-- Create digital products table
CREATE TABLE public.digital_products (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT NOT NULL UNIQUE,
    short_description TEXT,
    description TEXT,
    problem_solved TEXT,
    benefits TEXT[],
    content_details TEXT[],
    price DECIMAL(10,2) NOT NULL DEFAULT 0,
    original_price DECIMAL(10,2),
    currency TEXT DEFAULT 'EUR',
    category TEXT NOT NULL DEFAULT 'other',
    product_type TEXT NOT NULL DEFAULT 'digital',
    featured_image TEXT,
    images TEXT[],
    preview_url TEXT,
    download_url TEXT,
    file_size TEXT,
    file_format TEXT,
    badge TEXT,
    is_featured BOOLEAN DEFAULT false,
    is_bestseller BOOLEAN DEFAULT false,
    is_new BOOLEAN DEFAULT false,
    is_limited_offer BOOLEAN DEFAULT false,
    limited_offer_end TIMESTAMP WITH TIME ZONE,
    sales_count INTEGER DEFAULT 0,
    views_count INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'draft',
    display_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create product testimonials table
CREATE TABLE public.product_testimonials (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    product_id UUID NOT NULL REFERENCES public.digital_products(id) ON DELETE CASCADE,
    author_name TEXT NOT NULL,
    author_title TEXT,
    author_avatar TEXT,
    content TEXT NOT NULL,
    rating INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create orders table
CREATE TABLE public.orders (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    order_number TEXT NOT NULL UNIQUE,
    customer_email TEXT NOT NULL,
    customer_name TEXT,
    product_id UUID NOT NULL REFERENCES public.digital_products(id),
    product_title TEXT NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'EUR',
    status TEXT NOT NULL DEFAULT 'pending',
    payment_method TEXT,
    payment_id TEXT,
    download_count INTEGER DEFAULT 0,
    download_link TEXT,
    access_token TEXT,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create customers table for tracking
CREATE TABLE public.shop_customers (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    total_orders INTEGER DEFAULT 0,
    total_spent DECIMAL(10,2) DEFAULT 0,
    first_order_at TIMESTAMP WITH TIME ZONE,
    last_order_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create cart items table (for session-based carts)
CREATE TABLE public.cart_items (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id TEXT NOT NULL,
    product_id UUID NOT NULL REFERENCES public.digital_products(id) ON DELETE CASCADE,
    quantity INTEGER DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.digital_products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.product_testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.shop_customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- Digital products: public read for published, admin full access
CREATE POLICY "Anyone can view published products"
ON public.digital_products
FOR SELECT
USING (status = 'published');

CREATE POLICY "Admins can manage all products"
ON public.digital_products
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
);

-- Testimonials: public read, admin write
CREATE POLICY "Anyone can view testimonials"
ON public.product_testimonials
FOR SELECT
USING (true);

CREATE POLICY "Admins can manage testimonials"
ON public.product_testimonials
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
);

-- Orders: admin access only
CREATE POLICY "Admins can view all orders"
ON public.orders
FOR SELECT
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
);

CREATE POLICY "Anyone can create orders"
ON public.orders
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Admins can update orders"
ON public.orders
FOR UPDATE
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
);

-- Customers: admin access only
CREATE POLICY "Admins can manage customers"
ON public.shop_customers
FOR ALL
USING (
    EXISTS (
        SELECT 1 FROM public.user_roles
        WHERE user_roles.user_id = auth.uid()
        AND user_roles.role = 'admin'
    )
);

CREATE POLICY "Anyone can insert customers"
ON public.shop_customers
FOR INSERT
WITH CHECK (true);

-- Cart items: session-based access
CREATE POLICY "Anyone can manage their cart items"
ON public.cart_items
FOR ALL
USING (true);

-- Create indexes for performance
CREATE INDEX idx_digital_products_slug ON public.digital_products(slug);
CREATE INDEX idx_digital_products_status ON public.digital_products(status);
CREATE INDEX idx_digital_products_category ON public.digital_products(category);
CREATE INDEX idx_digital_products_featured ON public.digital_products(is_featured) WHERE is_featured = true;
CREATE INDEX idx_orders_customer_email ON public.orders(customer_email);
CREATE INDEX idx_orders_status ON public.orders(status);
CREATE INDEX idx_cart_items_session ON public.cart_items(session_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_shop_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for automatic timestamp updates
CREATE TRIGGER update_digital_products_updated_at
BEFORE UPDATE ON public.digital_products
FOR EACH ROW
EXECUTE FUNCTION public.update_shop_updated_at();

CREATE TRIGGER update_orders_updated_at
BEFORE UPDATE ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.update_shop_updated_at();

CREATE TRIGGER update_shop_customers_updated_at
BEFORE UPDATE ON public.shop_customers
FOR EACH ROW
EXECUTE FUNCTION public.update_shop_updated_at();

-- Generate order number function
CREATE OR REPLACE FUNCTION public.generate_order_number()
RETURNS TRIGGER AS $$
BEGIN
    NEW.order_number := 'LCV-' || to_char(now(), 'YYYYMMDD') || '-' || substring(NEW.id::text, 1, 8);
    NEW.access_token := encode(gen_random_bytes(32), 'hex');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER set_order_number
BEFORE INSERT ON public.orders
FOR EACH ROW
EXECUTE FUNCTION public.generate_order_number();