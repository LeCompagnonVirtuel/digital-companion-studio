import { useEffect, useRef, useCallback } from "react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const firstNames = [
  "Awa", "Fatou", "Mamadou", "Aminata", "Kofi", "Adama", "Seydou", "Mariam",
  "Ousmane", "Djénéba", "Moussa", "Khadija", "Ibrahim", "Aïcha", "Youssouf",
  "Bintou", "Abdoulaye", "Salimata", "Jean", "Marie", "Patrick", "Christelle",
  "Franck", "Estelle", "Serge", "Brigitte", "Kouadio", "Adjoua", "Tra Bi", "Lou"
];

const cities = [
  "Abidjan", "Dakar", "Bamako", "Ouagadougou", "Lomé", "Cotonou",
  "Douala", "Kinshasa", "Libreville", "Conakry"
];

const timeAgo = () => {
  const mins = Math.floor(Math.random() * 25) + 2;
  return mins < 60 ? `il y a ${mins} min` : `il y a 1h`;
};

export const SocialProofToasts = () => {
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const productsRef = useRef<{ title: string }[]>([]);

  const fetchProducts = useCallback(async () => {
    const { data } = await supabase
      .from("digital_products")
      .select("title")
      .eq("status", "published")
      .limit(20);
    if (data) productsRef.current = data;
  }, []);

  const showToast = useCallback(() => {
    const products = productsRef.current;
    if (!products.length) return;

    const name = firstNames[Math.floor(Math.random() * firstNames.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const time = timeAgo();

    toast(
      `${name} de ${city} vient d'acheter`,
      {
        description: product.title,
        duration: 5000,
        icon: "🛒",
        position: "bottom-left",
        className: "social-proof-toast",
      }
    );
  }, []);

  useEffect(() => {
    fetchProducts();

    // First toast after 15-30s
    const initialDelay = 15000 + Math.random() * 15000;
    const initialTimeout = setTimeout(() => {
      showToast();
      // Then every 25-50s
      intervalRef.current = setInterval(() => {
        showToast();
      }, 25000 + Math.random() * 25000);
    }, initialDelay);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [fetchProducts, showToast]);

  return null;
};
