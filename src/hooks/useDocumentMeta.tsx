import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSEOSettings, getSEOForPath } from "./useSEOSettings";

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
  noindex?: boolean;
}

const SITE_URL = "https://www.lecompagnonlabs.cloud";

export function useDocumentMeta({ title, description, image, url, type = "website", noindex = false }: SEOProps) {
  const seo = useSEOSettings();
  const location = useLocation();

  useEffect(() => {
    const prevTitle = document.title;

    const pageSEO = getSEOForPath(seo, location.pathname);
    const finalTitle = (pageSEO?.title) || title;
    const finalDescription = (pageSEO?.metaDescription) || description;
    const siteName = seo.siteName || "Le Compagnon Virtuel";

    document.title = `${finalTitle} | ${siteName}`;

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

    if (finalDescription) {
      setMeta("description", finalDescription);
      setMeta("og:description", finalDescription);
      setMeta("twitter:description", finalDescription);
    }

    setMeta("og:title", finalTitle);
    setMeta("twitter:title", finalTitle);
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
  }, [title, description, image, url, type, noindex, seo, location.pathname]);
}
