import { useEffect } from "react";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

const SITE_URL = "https://www.lecompagnonlabs.cloud";

/**
 * Sets document title, meta tags, canonical link and robots for SEO and social sharing.
 */
export function useDocumentMeta({ title, description, image, url, type = "website", noindex = false }: SEOProps) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${title} | Le Compagnon Virtuel`;

    const resolvedUrl = url || window.location.href.split("?")[0];

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

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", resolvedUrl);

    // Robots
    if (noindex) {
      setMeta("robots", "noindex, nofollow");
    } else {
      const robotsEl = document.querySelector('meta[name="robots"]');
      if (robotsEl) robotsEl.remove();
    }

    if (description) {
      setMeta("description", description);
      setMeta("og:description", description);
      setMeta("twitter:description", description);
    }

    setMeta("og:title", title);
    setMeta("twitter:title", title);
    setMeta("og:type", type);
    setMeta("og:url", resolvedUrl);

    if (image) {
      const absoluteImage = image.startsWith("http") ? image : `${SITE_URL}${image}`;
      setMeta("og:image", absoluteImage);
      setMeta("twitter:image", absoluteImage);
      setMeta("twitter:card", "summary_large_image");
    }

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, image, url, type, noindex]);
}
