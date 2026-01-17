import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useEffect, useRef } from "react";

export interface DigitalProduct {
  id: string;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  problem_solved: string | null;
  benefits: string[] | null;
  content_details: string[] | null;
  price: number;
  original_price: number | null;
  currency: string;
  category: string;
  product_type: string;
  featured_image: string | null;
  images: string[] | null;
  preview_url: string | null;
  download_url: string | null;
  file_size: string | null;
  file_format: string | null;
  badge: string | null;
  is_featured: boolean;
  is_bestseller: boolean;
  is_new: boolean;
  is_limited_offer: boolean;
  limited_offer_end: string | null;
  sales_count: number;
  views_count: number;
  status: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface ProductTestimonial {
  id: string;
  product_id: string;
  author_name: string;
  author_title: string | null;
  author_avatar: string | null;
  content: string;
  rating: number;
  is_featured: boolean;
  created_at: string;
}

// Global subscription manager to avoid duplicate channels
let globalProductsChannel: ReturnType<typeof supabase.channel> | null = null;
let channelSubscribers = 0;

const setupGlobalProductsChannel = (queryClient: ReturnType<typeof useQueryClient>) => {
  if (globalProductsChannel) {
    channelSubscribers++;
    return;
  }

  globalProductsChannel = supabase
    .channel('global_products_realtime')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'digital_products',
      },
      (payload) => {
        console.log('🔄 Real-time product update:', payload.eventType, payload);
        // Invalidate all product-related queries
        queryClient.invalidateQueries({ queryKey: ["digital-products"] });
        queryClient.invalidateQueries({ queryKey: ["admin-digital-products"] });
        queryClient.invalidateQueries({ queryKey: ["digital-product"] });
      }
    )
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'product_testimonials',
      },
      (payload) => {
        console.log('🔄 Real-time testimonial update:', payload.eventType);
        queryClient.invalidateQueries({ queryKey: ["product-testimonials"] });
      }
    )
    .subscribe((status) => {
      console.log('📡 Products realtime channel status:', status);
    });

  channelSubscribers = 1;
};

const cleanupGlobalProductsChannel = () => {
  channelSubscribers--;
  if (channelSubscribers <= 0 && globalProductsChannel) {
    supabase.removeChannel(globalProductsChannel);
    globalProductsChannel = null;
    channelSubscribers = 0;
  }
};

// Hook with real-time updates for public products
export const useDigitalProducts = (options?: { 
  category?: string; 
  featured?: boolean;
  limit?: number;
}) => {
  const queryClient = useQueryClient();
  const isSubscribed = useRef(false);

  // Set up global real-time subscription
  useEffect(() => {
    if (!isSubscribed.current) {
      setupGlobalProductsChannel(queryClient);
      isSubscribed.current = true;
    }

    return () => {
      if (isSubscribed.current) {
        cleanupGlobalProductsChannel();
        isSubscribed.current = false;
      }
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["digital-products", options],
    queryFn: async () => {
      let query = supabase
        .from("digital_products")
        .select("*")
        .eq("status", "published")
        .order("display_order", { ascending: true });

      if (options?.category) {
        query = query.eq("category", options.category);
      }

      if (options?.featured) {
        query = query.eq("is_featured", true);
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error } = await query;

      if (error) throw error;
      return data as DigitalProduct[];
    },
    staleTime: 0, // Always consider data stale to ensure freshness
    refetchOnWindowFocus: true,
  });
};

export const useDigitalProduct = (slug: string) => {
  const queryClient = useQueryClient();
  const isSubscribed = useRef(false);

  // Set up global real-time subscription
  useEffect(() => {
    if (!isSubscribed.current) {
      setupGlobalProductsChannel(queryClient);
      isSubscribed.current = true;
    }

    return () => {
      if (isSubscribed.current) {
        cleanupGlobalProductsChannel();
        isSubscribed.current = false;
      }
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["digital-product", slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("digital_products")
        .select("*")
        .eq("slug", slug)
        .eq("status", "published")
        .single();

      if (error) throw error;
      return data as DigitalProduct;
    },
    enabled: !!slug,
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const useProductTestimonials = (productId: string) => {
  const queryClient = useQueryClient();
  const isSubscribed = useRef(false);

  useEffect(() => {
    if (!isSubscribed.current) {
      setupGlobalProductsChannel(queryClient);
      isSubscribed.current = true;
    }

    return () => {
      if (isSubscribed.current) {
        cleanupGlobalProductsChannel();
        isSubscribed.current = false;
      }
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["product-testimonials", productId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("product_testimonials")
        .select("*")
        .eq("product_id", productId)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as ProductTestimonial[];
    },
    enabled: !!productId,
    staleTime: 0,
  });
};

// Admin hooks with real-time updates
export const useAdminDigitalProducts = () => {
  const queryClient = useQueryClient();
  const isSubscribed = useRef(false);

  // Set up global real-time subscription for admin
  useEffect(() => {
    if (!isSubscribed.current) {
      setupGlobalProductsChannel(queryClient);
      isSubscribed.current = true;
    }

    return () => {
      if (isSubscribed.current) {
        cleanupGlobalProductsChannel();
        isSubscribed.current = false;
      }
    };
  }, [queryClient]);

  return useQuery({
    queryKey: ["admin-digital-products"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("digital_products")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data as DigitalProduct[];
    },
    staleTime: 0,
    refetchOnWindowFocus: true,
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (product: Omit<DigitalProduct, 'id' | 'created_at' | 'updated_at'> & { id?: string }) => {
      const { data, error } = await supabase
        .from("digital_products")
        .insert(product as any)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      // Immediately invalidate all product queries
      queryClient.invalidateQueries({ queryKey: ["admin-digital-products"] });
      queryClient.invalidateQueries({ queryKey: ["digital-products"] });
      toast({
        title: "Produit créé",
        description: "Le produit a été créé avec succès et est maintenant visible sur le site.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de créer le produit.",
        variant: "destructive",
      });
      console.error("Create product error:", error);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async ({ id, ...updates }: Partial<DigitalProduct> & { id: string }) => {
      const { data, error } = await supabase
        .from("digital_products")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: (data) => {
      // Immediately invalidate all product queries
      queryClient.invalidateQueries({ queryKey: ["admin-digital-products"] });
      queryClient.invalidateQueries({ queryKey: ["digital-products"] });
      queryClient.invalidateQueries({ queryKey: ["digital-product", data.slug] });
      queryClient.invalidateQueries({ queryKey: ["digital-product"] });
      toast({
        title: "Produit mis à jour",
        description: "Les modifications sont maintenant visibles sur le site.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de mettre à jour le produit.",
        variant: "destructive",
      });
      console.error("Update product error:", error);
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("digital_products")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      // Immediately invalidate all product queries
      queryClient.invalidateQueries({ queryKey: ["admin-digital-products"] });
      queryClient.invalidateQueries({ queryKey: ["digital-products"] });
      queryClient.invalidateQueries({ queryKey: ["digital-product"] });
      toast({
        title: "Produit supprimé",
        description: "Le produit a été retiré du site.",
      });
    },
    onError: (error) => {
      toast({
        title: "Erreur",
        description: "Impossible de supprimer le produit.",
        variant: "destructive",
      });
      console.error("Delete product error:", error);
    },
  });
};
