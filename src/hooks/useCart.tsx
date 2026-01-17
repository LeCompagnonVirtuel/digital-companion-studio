import { useState, useEffect, useCallback, createContext, useContext, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { DigitalProduct } from "./useDigitalProducts";
import { useToast } from "@/hooks/use-toast";

interface CartItem {
  id: string;
  product: DigitalProduct;
  quantity: number;
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: DigitalProduct) => void;
  removeItem: (productId: string) => void;
  clearCart: () => void;
  isInCart: (productId: string) => boolean;
  total: number;
  itemCount: number;
  isLoading: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const getSessionId = () => {
  let sessionId = localStorage.getItem("cart_session_id");
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem("cart_session_id", sessionId);
  }
  return sessionId;
};

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  const fetchCart = useCallback(async () => {
    try {
      const sessionId = getSessionId();
      const { data: cartItems, error } = await supabase
        .from("cart_items")
        .select(`
          id,
          quantity,
          product_id
        `)
        .eq("session_id", sessionId);

      if (error) throw error;

      if (cartItems && cartItems.length > 0) {
        const productIds = cartItems.map((item) => item.product_id);
        const { data: products, error: productsError } = await supabase
          .from("digital_products")
          .select("*")
          .in("id", productIds)
          .eq("status", "published");

        if (productsError) throw productsError;

        const itemsWithProducts = cartItems
          .map((item) => {
            const product = products?.find((p) => p.id === item.product_id);
            if (!product) return null;
            return {
              id: item.id,
              product: product as DigitalProduct,
              quantity: item.quantity,
            };
          })
          .filter(Boolean) as CartItem[];

        setItems(itemsWithProducts);
      } else {
        setItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCart();

    // Subscribe to realtime updates for cart synchronization across tabs
    const sessionId = getSessionId();
    const cartChannel = supabase
      .channel(`cart-${sessionId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'cart_items',
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => {
          console.log('🛒 Real-time cart update:', payload);
          fetchCart();
        }
      )
      .subscribe();

    // Also listen for product updates to refresh cart with latest prices
    const productsChannel = supabase
      .channel('cart-products-sync')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'digital_products',
        },
        (payload) => {
          console.log('🔄 Product updated, refreshing cart:', payload);
          fetchCart();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'DELETE',
          schema: 'public',
          table: 'digital_products',
        },
        (payload) => {
          console.log('🗑️ Product deleted, refreshing cart:', payload);
          fetchCart();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(cartChannel);
      supabase.removeChannel(productsChannel);
    };
  }, [fetchCart]);

  const addItem = async (product: DigitalProduct) => {
    try {
      const sessionId = getSessionId();
      
      // Check if already in cart
      const existingItem = items.find((item) => item.product.id === product.id);
      if (existingItem) {
        toast({
          title: "Déjà dans le panier",
          description: "Ce produit est déjà dans votre panier.",
        });
        return;
      }

      const { data, error } = await supabase
        .from("cart_items")
        .insert({
          session_id: sessionId,
          product_id: product.id,
          quantity: 1,
        })
        .select()
        .single();

      if (error) throw error;

      setItems((prev) => [
        ...prev,
        { id: data.id, product, quantity: 1 },
      ]);

      toast({
        title: "Ajouté au panier",
        description: `${product.title} a été ajouté à votre panier.`,
      });
    } catch (error) {
      console.error("Error adding to cart:", error);
      toast({
        title: "Erreur",
        description: "Impossible d'ajouter le produit au panier.",
        variant: "destructive",
      });
    }
  };

  const removeItem = async (productId: string) => {
    try {
      const sessionId = getSessionId();
      
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("session_id", sessionId)
        .eq("product_id", productId);

      if (error) throw error;

      setItems((prev) => prev.filter((item) => item.product.id !== productId));

      toast({
        title: "Retiré du panier",
        description: "Le produit a été retiré de votre panier.",
      });
    } catch (error) {
      console.error("Error removing from cart:", error);
      toast({
        title: "Erreur",
        description: "Impossible de retirer le produit du panier.",
        variant: "destructive",
      });
    }
  };

  const clearCart = async () => {
    try {
      const sessionId = getSessionId();
      
      const { error } = await supabase
        .from("cart_items")
        .delete()
        .eq("session_id", sessionId);

      if (error) throw error;

      setItems([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  const isInCart = (productId: string) => {
    return items.some((item) => item.product.id === productId);
  };

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const itemCount = items.length;

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        clearCart,
        isInCart,
        total,
        itemCount,
        isLoading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
