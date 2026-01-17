import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";

export interface Order {
  id: string;
  order_number: string;
  customer_email: string;
  customer_name: string | null;
  product_id: string;
  product_title: string;
  price: number;
  currency: string;
  status: string;
  payment_method: string | null;
  payment_id: string | null;
  download_count: number;
  download_link: string | null;
  access_token: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

// Global orders channel
let globalOrdersChannel: ReturnType<typeof supabase.channel> | null = null;
let ordersChannelSubscribers = 0;

const setupGlobalOrdersChannel = (queryClient: ReturnType<typeof useQueryClient>) => {
  if (globalOrdersChannel) {
    ordersChannelSubscribers++;
    return;
  }

  globalOrdersChannel = supabase
    .channel('global_orders_realtime')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'orders',
      },
      (payload) => {
        console.log('🔄 Real-time order update:', payload.eventType);
        queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
        // Also update customers data when orders change
        queryClient.invalidateQueries({ queryKey: ["shop-customers"] });
        queryClient.invalidateQueries({ queryKey: ["advanced-analytics"] });
      }
    )
    .subscribe((status) => {
      console.log('📡 Orders realtime channel status:', status);
    });

  ordersChannelSubscribers = 1;
};

const cleanupGlobalOrdersChannel = () => {
  ordersChannelSubscribers--;
  if (ordersChannelSubscribers <= 0 && globalOrdersChannel) {
    supabase.removeChannel(globalOrdersChannel);
    globalOrdersChannel = null;
    ordersChannelSubscribers = 0;
  }
};

// Admin hook with real-time updates
export const useAdminOrders = () => {
  const queryClient = useQueryClient();
  const isSubscribed = useRef(false);

  // Set up real-time subscription
  useEffect(() => {
    if (!isSubscribed.current) {
      setupGlobalOrdersChannel(queryClient);
      isSubscribed.current = true;
    }

    return () => {
      if (isSubscribed.current) {
        cleanupGlobalOrdersChannel();
        isSubscribed.current = false;
      }
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["admin-orders"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as Order[];
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (order: {
      customer_email: string;
      customer_name?: string;
      product_id: string;
      product_title: string;
      price: number;
      currency?: string;
      payment_method?: string;
      download_link?: string;
      order_number?: string;
    }) => {
      // Generate order number if not provided
      const orderNumber = order.order_number || `LCV-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      
      const { data, error } = await supabase
        .from("orders")
        .insert({
          ...order,
          order_number: orderNumber,
          status: "pending",
        } as any)
        .select()
        .single();

      if (error) throw error;
      return data as Order;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de créer la commande.",
        variant: "destructive",
      });
      console.error("Create order error:", error);
    },
  });
};

export const useUpdateOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Order> & { id: string }) => {
      const { data, error } = await supabase
        .from("orders")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({
        title: "Commande mise à jour",
        description: "La commande a été mise à jour avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour la commande.",
        variant: "destructive",
      });
      console.error("Update order error:", error);
    },
  });
};

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-orders"] });
      toast({
        title: "Commande supprimée",
        description: "La commande a été supprimée avec succès.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer la commande.",
        variant: "destructive",
      });
      console.error("Delete order error:", error);
    },
  });
};
