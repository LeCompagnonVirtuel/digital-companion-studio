import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useMemo } from "react";
import { subDays, format, startOfDay, eachDayOfInterval, parseISO } from "date-fns";
import { fr } from "date-fns/locale";

export interface RevenueData {
  date: string;
  revenue: number;
  orders: number;
}

export interface ConversionMetrics {
  totalVisitors: number;
  cartAdds: number;
  checkoutStarts: number;
  purchases: number;
  cartRate: number;
  checkoutRate: number;
  purchaseRate: number;
}

export interface CustomerTrends {
  newCustomers: number;
  returningCustomers: number;
  vipCustomers: number;
  avgOrderValue: number;
  customerLifetimeValue: number;
}

export interface TrafficSource {
  source: string;
  visits: number;
  percentage: number;
}

export interface ProductPerformance {
  id: string;
  title: string;
  revenue: number;
  sales: number;
  views: number;
  conversionRate: number;
}

export const useAdvancedAnalytics = (days: number = 30) => {
  const queryClient = useQueryClient();

  // Real-time updates
  useEffect(() => {
    const ordersChannel = supabase
      .channel('analytics-orders')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, (payload) => {
        console.log('📊 Analytics: Order update', payload.eventType);
        queryClient.invalidateQueries({ queryKey: ["advanced-analytics"] });
      })
      .subscribe();

    const eventsChannel = supabase
      .channel('analytics-events')
      .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'analytics_events' }, () => {
        queryClient.invalidateQueries({ queryKey: ["advanced-analytics"] });
      })
      .subscribe();

    const customersChannel = supabase
      .channel('analytics-customers')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'shop_customers' }, (payload) => {
        console.log('📊 Analytics: Customer update', payload.eventType);
        queryClient.invalidateQueries({ queryKey: ["advanced-analytics"] });
      })
      .subscribe();

    const productsChannel = supabase
      .channel('analytics-products')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'digital_products' }, (payload) => {
        console.log('📊 Analytics: Product update', payload.eventType);
        queryClient.invalidateQueries({ queryKey: ["advanced-analytics"] });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(ordersChannel);
      supabase.removeChannel(eventsChannel);
      supabase.removeChannel(customersChannel);
      supabase.removeChannel(productsChannel);
    };
  }, [queryClient]);

  const startDate = useMemo(() => subDays(new Date(), days), [days]);

  return useQuery({
    queryKey: ["advanced-analytics", days],
    queryFn: async () => {
      const startDateStr = startDate.toISOString();

      // Fetch all data in parallel
      const [ordersResult, eventsResult, customersResult, productsResult] = await Promise.all([
        supabase
          .from("orders")
          .select("*")
          .gte("created_at", startDateStr)
          .order("created_at", { ascending: true }),
        supabase
          .from("analytics_events")
          .select("*")
          .gte("created_at", startDateStr)
          .order("created_at", { ascending: false }),
        supabase
          .from("shop_customers")
          .select("*"),
        supabase
          .from("digital_products")
          .select("id, title, views_count, sales_count")
          .eq("status", "published"),
      ]);

      const orders = ordersResult.data || [];
      const events = eventsResult.data || [];
      const customers = customersResult.data || [];
      const products = productsResult.data || [];

      // Calculate revenue by day
      const dateRange = eachDayOfInterval({ start: startDate, end: new Date() });
      const revenueByDay: RevenueData[] = dateRange.map(date => {
        const dayStr = format(date, "yyyy-MM-dd");
        const dayOrders = orders.filter(o => 
          format(parseISO(o.created_at), "yyyy-MM-dd") === dayStr && o.status === "paid"
        );
        return {
          date: format(date, "dd MMM", { locale: fr }),
          revenue: dayOrders.reduce((sum, o) => sum + o.price, 0),
          orders: dayOrders.length,
        };
      });

      // Conversion funnel
      const pageViews = events.filter(e => e.event_type === "page_view").length;
      const cartAdds = events.filter(e => e.event_type === "add_to_cart").length;
      const checkoutStarts = events.filter(e => e.event_type === "checkout_start").length;
      const purchases = orders.filter(o => o.status === "paid").length;

      const conversionMetrics: ConversionMetrics = {
        totalVisitors: pageViews || 1,
        cartAdds,
        checkoutStarts,
        purchases,
        cartRate: pageViews > 0 ? (cartAdds / pageViews) * 100 : 0,
        checkoutRate: cartAdds > 0 ? (checkoutStarts / cartAdds) * 100 : 0,
        purchaseRate: checkoutStarts > 0 ? (purchases / checkoutStarts) * 100 : 0,
      };

      // Customer trends
      const newCustomersCount = customers.filter(c => 
        c.first_order_at && new Date(c.first_order_at) >= startDate
      ).length;
      
      const returningCustomers = customers.filter(c => (c.total_orders || 0) >= 2).length;
      const vipCustomers = customers.filter(c => (c.total_spent || 0) >= 100000).length;
      
      const totalRevenue = customers.reduce((sum, c) => sum + (c.total_spent || 0), 0);
      const totalOrders = customers.reduce((sum, c) => sum + (c.total_orders || 0), 0);
      const avgOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;
      const customerLifetimeValue = customers.length > 0 ? totalRevenue / customers.length : 0;

      const customerTrends: CustomerTrends = {
        newCustomers: newCustomersCount,
        returningCustomers,
        vipCustomers,
        avgOrderValue,
        customerLifetimeValue,
      };

      // Product performance
      const productPerformance: ProductPerformance[] = products.map(product => {
        const productOrders = orders.filter(o => o.product_id === product.id && o.status === "paid");
        const revenue = productOrders.reduce((sum, o) => sum + o.price, 0);
        const sales = productOrders.length;
        const views = product.views_count || 0;
        
        return {
          id: product.id,
          title: product.title,
          revenue,
          sales,
          views,
          conversionRate: views > 0 ? (sales / views) * 100 : 0,
        };
      }).sort((a, b) => b.revenue - a.revenue);

      // Summary stats
      const paidOrders = orders.filter(o => o.status === "paid");
      const periodRevenue = paidOrders.reduce((sum, o) => sum + o.price, 0);
      const periodOrders = paidOrders.length;

      // Compare with previous period
      const previousStart = subDays(startDate, days);
      const previousOrdersResult = await supabase
        .from("orders")
        .select("price, status")
        .gte("created_at", previousStart.toISOString())
        .lt("created_at", startDateStr);

      const previousOrders = (previousOrdersResult.data || []).filter(o => o.status === "paid");
      const previousRevenue = previousOrders.reduce((sum, o) => sum + o.price, 0);
      const previousOrderCount = previousOrders.length;

      const revenueChange = previousRevenue > 0 
        ? ((periodRevenue - previousRevenue) / previousRevenue) * 100 
        : periodRevenue > 0 ? 100 : 0;

      const ordersChange = previousOrderCount > 0 
        ? ((periodOrders - previousOrderCount) / previousOrderCount) * 100 
        : periodOrders > 0 ? 100 : 0;

      // Traffic sources from referrers
      const referrerCounts = new Map<string, number>();
      events.filter(e => e.event_type === 'session_start').forEach(e => {
        const ref = (e as any).referrer;
        let source = 'Direct';
        if (ref) {
          try {
            const url = new URL(ref);
            const host = url.hostname.replace('www.', '');
            if (host.includes('google')) source = 'Google';
            else if (host.includes('facebook') || host.includes('fb.')) source = 'Facebook';
            else if (host.includes('instagram')) source = 'Instagram';
            else if (host.includes('twitter') || host.includes('x.com')) source = 'X / Twitter';
            else if (host.includes('linkedin')) source = 'LinkedIn';
            else if (host.includes('tiktok')) source = 'TikTok';
            else if (host.includes('whatsapp')) source = 'WhatsApp';
            else source = host;
          } catch { source = 'Autre'; }
        }
        referrerCounts.set(source, (referrerCounts.get(source) || 0) + 1);
      });
      const totalSessions = Array.from(referrerCounts.values()).reduce((a, b) => a + b, 0) || 1;
      const trafficSources: TrafficSource[] = Array.from(referrerCounts.entries())
        .map(([source, visits]) => ({ source, visits, percentage: (visits / totalSessions) * 100 }))
        .sort((a, b) => b.visits - a.visits)
        .slice(0, 8);

      return {
        revenueByDay,
        conversionMetrics,
        customerTrends,
        productPerformance,
        trafficSources,
        summary: {
          totalRevenue: periodRevenue,
          totalOrders: periodOrders,
          totalCustomers: customers.length,
          avgOrderValue: periodOrders > 0 ? periodRevenue / periodOrders : 0,
          revenueChange,
          ordersChange,
        },
      };
    },
    refetchInterval: 60000, // Refresh every minute
  });
};
