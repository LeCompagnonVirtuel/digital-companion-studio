import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect } from "react";

export interface Customer {
  id: string;
  email: string;
  name: string | null;
  total_orders: number | null;
  total_spent: number | null;
  first_order_at: string | null;
  last_order_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface CustomerOrder {
  id: string;
  order_number: string;
  product_title: string;
  price: number;
  currency: string;
  status: string;
  created_at: string;
}

export interface CustomerSegment {
  id: string;
  label: string;
  description: string;
  color: string;
  filter: (customer: Customer) => boolean;
}

// Segmentation rules
export const customerSegments: CustomerSegment[] = [
  {
    id: "vip",
    label: "VIP",
    description: "Plus de 100 000 FCFA dépensés",
    color: "bg-amber-500",
    filter: (c) => (c.total_spent || 0) >= 100000,
  },
  {
    id: "loyal",
    label: "Fidèle",
    description: "3+ commandes",
    color: "bg-emerald-500",
    filter: (c) => (c.total_orders || 0) >= 3,
  },
  {
    id: "returning",
    label: "Récurrent",
    description: "2 commandes",
    color: "bg-blue-500",
    filter: (c) => (c.total_orders || 0) === 2,
  },
  {
    id: "new",
    label: "Nouveau",
    description: "1 commande",
    color: "bg-purple-500",
    filter: (c) => (c.total_orders || 0) === 1,
  },
  {
    id: "inactive",
    label: "Inactif",
    description: "Pas d'achat depuis 90 jours",
    color: "bg-gray-500",
    filter: (c) => {
      if (!c.last_order_at) return false;
      const lastOrder = new Date(c.last_order_at);
      const daysSinceOrder = Math.floor(
        (Date.now() - lastOrder.getTime()) / (1000 * 60 * 60 * 24)
      );
      return daysSinceOrder > 90;
    },
  },
];

export const getCustomerSegment = (customer: Customer): CustomerSegment | null => {
  for (const segment of customerSegments) {
    if (segment.filter(customer)) {
      return segment;
    }
  }
  return null;
};

export const useCustomers = () => {
  const queryClient = useQueryClient();

  // Set up real-time subscription
  useEffect(() => {
    const customersChannel = supabase
      .channel('shop-customers-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'shop_customers',
        },
        () => {
          console.log('Real-time customers update');
          queryClient.invalidateQueries({ queryKey: ["customers"] });
        }
      )
      .subscribe();

    const ordersChannel = supabase
      .channel('orders-for-customers')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'orders',
        },
        () => {
          // Orders affect customer stats
          queryClient.invalidateQueries({ queryKey: ["customers"] });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(customersChannel);
      supabase.removeChannel(ordersChannel);
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["customers"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("shop_customers")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Customer[];
    },
  });
};

export const useCustomerOrders = (customerEmail: string | null) => {
  return useQuery({
    queryKey: ["customer-orders", customerEmail],
    queryFn: async () => {
      if (!customerEmail) return [];
      
      const { data, error } = await supabase
        .from("orders")
        .select("id, order_number, product_title, price, currency, status, created_at")
        .eq("customer_email", customerEmail)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as CustomerOrder[];
    },
    enabled: !!customerEmail,
  });
};

export const useCustomerStats = () => {
  const { data: customers } = useCustomers();

  const stats = {
    total: customers?.length || 0,
    vip: customers?.filter((c) => customerSegments[0].filter(c)).length || 0,
    loyal: customers?.filter((c) => customerSegments[1].filter(c)).length || 0,
    returning: customers?.filter((c) => customerSegments[2].filter(c)).length || 0,
    new: customers?.filter((c) => customerSegments[3].filter(c)).length || 0,
    inactive: customers?.filter((c) => customerSegments[4].filter(c)).length || 0,
    totalRevenue: customers?.reduce((sum, c) => sum + (c.total_spent || 0), 0) || 0,
    avgOrderValue: customers?.length 
      ? (customers.reduce((sum, c) => sum + (c.total_spent || 0), 0) / 
         customers.reduce((sum, c) => sum + (c.total_orders || 0), 0)) || 0
      : 0,
  };

  return stats;
};
