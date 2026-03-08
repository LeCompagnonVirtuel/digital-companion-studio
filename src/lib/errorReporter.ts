import { supabase } from '@/integrations/supabase/client';

interface SystemError {
  alert_type: 'payment_error' | 'api_error' | 'db_error' | 'page_error' | 'performance';
  severity?: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  message?: string;
  source?: string;
  metadata?: Record<string, any>;
}

export async function reportSystemError(error: SystemError) {
  try {
    await supabase.from('system_alerts').insert({
      alert_type: error.alert_type,
      severity: error.severity || 'medium',
      title: error.title,
      message: error.message || null,
      source: error.source || null,
      metadata: error.metadata || {},
      status: 'open',
    });
  } catch (e) {
    console.error('Failed to report system error:', e);
  }
}
