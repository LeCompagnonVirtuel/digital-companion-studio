
CREATE EXTENSION IF NOT EXISTS pgcrypto SCHEMA extensions;

CREATE OR REPLACE FUNCTION public.generate_order_number()
 RETURNS trigger
 LANGUAGE plpgsql
 SET search_path TO 'public', 'extensions'
AS $function$
BEGIN
    NEW.order_number := 'LCV-' || to_char(now(), 'YYYYMMDD') || '-' || substring(NEW.id::text, 1, 8);
    NEW.access_token := encode(extensions.gen_random_bytes(32), 'hex');
    RETURN NEW;
END;
$function$;
