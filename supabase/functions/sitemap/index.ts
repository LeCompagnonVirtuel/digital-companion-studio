import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://www.lecompagnonlabs.cloud";

const staticRoutes = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/developpement-web", changefreq: "monthly", priority: "0.8" },
  { path: "/services/automatisation-ia", changefreq: "monthly", priority: "0.8" },
  { path: "/services/marketing-digital", changefreq: "monthly", priority: "0.8" },
  { path: "/services/design-branding", changefreq: "monthly", priority: "0.8" },
  { path: "/services/applications-mobiles", changefreq: "monthly", priority: "0.8" },
  { path: "/services/community-management", changefreq: "monthly", priority: "0.8" },
  { path: "/services/creation-contenu", changefreq: "monthly", priority: "0.8" },
  { path: "/services/gadgets-numeriques", changefreq: "monthly", priority: "0.8" },
  { path: "/services/ecommerce", changefreq: "monthly", priority: "0.8" },
  { path: "/services/audit-digital", changefreq: "monthly", priority: "0.8" },
  { path: "/services/seo", changefreq: "monthly", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/pricing", changefreq: "monthly", priority: "0.8" },
  { path: "/portfolio", changefreq: "weekly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/boutique", changefreq: "weekly", priority: "0.8" },
  { path: "/careers", changefreq: "monthly", priority: "0.5" },
  { path: "/audit-gratuit", changefreq: "monthly", priority: "0.7" },
  { path: "/demarrer-projet", changefreq: "monthly", priority: "0.7" },
  { path: "/ressources-gratuites", changefreq: "monthly", priority: "0.6" },
  { path: "/legal", changefreq: "yearly", priority: "0.2" },
  { path: "/privacy", changefreq: "yearly", priority: "0.2" },
  { path: "/terms", changefreq: "yearly", priority: "0.2" },
];

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
}

function formatDate(dateStr: string): string {
  return dateStr.split("T")[0];
}

function buildUrl(path: string, lastmod?: string, changefreq?: string, priority?: string): string {
  let xml = `  <url>\n    <loc>${SITE_URL}${escapeXml(path)}</loc>`;
  if (lastmod) xml += `\n    <lastmod>${lastmod}</lastmod>`;
  if (changefreq) xml += `\n    <changefreq>${changefreq}</changefreq>`;
  if (priority) xml += `\n    <priority>${priority}</priority>`;
  xml += `\n  </url>`;
  return xml;
}

Deno.serve(async () => {
  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch published blog posts and products in parallel
    const [blogRes, productsRes, portfolioRes] = await Promise.all([
      supabase
        .from("blog_posts")
        .select("slug, updated_at, published_at")
        .eq("status", "published")
        .order("published_at", { ascending: false }),
      supabase
        .from("digital_products")
        .select("slug, updated_at")
        .eq("status", "published")
        .order("created_at", { ascending: false }),
      supabase
        .from("portfolio_projects")
        .select("slug, updated_at")
        .eq("status", "published")
        .order("created_at", { ascending: false }),
    ]);

    const urls: string[] = [];

    // Static routes
    for (const route of staticRoutes) {
      urls.push(buildUrl(route.path, undefined, route.changefreq, route.priority));
    }

    // Blog posts
    if (blogRes.data) {
      for (const post of blogRes.data) {
        urls.push(buildUrl(`/blog/${escapeXml(post.slug)}`, formatDate(post.updated_at || post.published_at), "monthly", "0.7"));
      }
    }

    // Products
    if (productsRes.data) {
      for (const product of productsRes.data) {
        urls.push(buildUrl(`/boutique/${escapeXml(product.slug)}`, formatDate(product.updated_at), "weekly", "0.7"));
      }
    }

    // Portfolio projects
    if (portfolioRes.data) {
      for (const project of portfolioRes.data) {
        urls.push(buildUrl(`/portfolio/${escapeXml(project.slug)}`, formatDate(project.updated_at), "monthly", "0.6"));
      }
    }

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.join("\n")}
</urlset>`;

    return new Response(sitemap, {
      headers: {
        "Content-Type": "application/xml; charset=utf-8",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Sitemap generation error:", error);
    return new Response("Error generating sitemap", { status: 500 });
  }
});
