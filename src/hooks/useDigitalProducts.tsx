import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

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

export const useDigitalProducts = (options?: { 
  category?: string; 
  featured?: boolean;
  limit?: number;
}) => {
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
  });
};

export const useDigitalProduct = (slug: string) => {
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
  });
};

export const useProductTestimonials = (productId: string) => {
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
  });
};

// Admin hooks
export const useAdminDigitalProducts = () => {
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
      queryClient.invalidateQueries({ queryKey: ["admin-digital-products"] });
      queryClient.invalidateQueries({ queryKey: ["digital-products"] });
      toast({
        title: "Produit créé",
        description: "Le produit a été créé avec succès.",
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-digital-products"] });
      queryClient.invalidateQueries({ queryKey: ["digital-products"] });
      queryClient.invalidateQueries({ queryKey: ["digital-product"] });
      toast({
        title: "Produit mis à jour",
        description: "Le produit a été mis à jour avec succès.",
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
      queryClient.invalidateQueries({ queryKey: ["admin-digital-products"] });
      queryClient.invalidateQueries({ queryKey: ["digital-products"] });
      toast({
        title: "Produit supprimé",
        description: "Le produit a été supprimé avec succès.",
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
