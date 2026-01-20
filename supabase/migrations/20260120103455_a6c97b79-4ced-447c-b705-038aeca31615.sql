-- Enable pg_cron and pg_net extensions for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron WITH SCHEMA pg_catalog;
CREATE EXTENSION IF NOT EXISTS pg_net WITH SCHEMA extensions;

-- Grant usage to postgres user
GRANT USAGE ON SCHEMA cron TO postgres;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA cron TO postgres;

-- Schedule abandoned cart reminder to run every hour
SELECT cron.schedule(
  'abandoned-cart-reminder-hourly',
  '0 * * * *', -- every hour at minute 0
  $$
  SELECT net.http_post(
    url := 'https://ewygzjviarsspoytdgrr.supabase.co/functions/v1/abandoned-cart-reminder',
    headers := '{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3eWd6anZpYXJzc3BveXRkZ3JyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjY5NTc0NjIsImV4cCI6MjA4MjUzMzQ2Mn0.9Xi81ufR9vJOqSYyjIm8P0jM24EpWTNkeT4OrZpPP2U"}'::jsonb,
    body := '{}'::jsonb
  ) AS request_id;
  $$
);