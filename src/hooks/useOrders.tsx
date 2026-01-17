import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

export const useAdminOrders = () => {
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
      const orderNumber = order.order_number || `LCV-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;
      
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
