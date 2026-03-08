import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

/**
 * Sets document title and meta tags for SEO and social sharing.
 * Updates on mount and cleans up on unmount.
 */
export function useDocumentMeta({ title, description, image, url, type = "website" }: SEOProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Le Compagnon Virtuel`;

    const setMeta = (property: string, content: string) => {
      let el = document.querySelector(`meta[property="${property}"]`) || document.querySelector(`meta[name="${property}"]`);
      if (!el) {
        el = document.createElement("meta");
        if (property.startsWith("og:") || property.startsWith("twitter:")) {
          el.setAttribute("property", property);
        } else {
          el.setAttribute("name", property);
        }
        document.head.appendChild(el);
      }
      el.setAttribute("content", content);
    };

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description);
      setMeta("twitter:description", description);
    }

    setMeta("og:title", title);
    setMeta("twitter:title", title);
    setMeta("og:type", type);

    if (image) {
      setMeta("og:image", image);
      setMeta("twitter:image", image);
      setMeta("twitter:card", "summary_large_image");
    }

    if (url) {
      setMeta("og:url", url);
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, image, url, type]);
}
