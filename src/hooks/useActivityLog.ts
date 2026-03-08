import { supabase } from '@/integrations/supabase/client';

interface LogActivityParams {
  action: string;
  action_type: string;
  resource_type?: string;
  resource_id?: string;
  page?: string;
  details?: Record<string, unknown>;
}

export async function logAdminActivity(params: LogActivityParams) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session?.user) return;

    await (supabase.from('admin_activity_logs') as any).insert({
      admin_email: session.user.email || 'unknown',
      admin_user_id: session.user.id,
      action: params.action,
      action_type: params.action_type,
      resource_type: params.resource_type || null,
      resource_id: params.resource_id || null,
      page: params.page || window.location.pathname,
      details: params.details || {},
      user_agent: navigator.userAgent,
    });
  } catch (err) {
    console.error('Failed to log activity:', err);
  }
}
