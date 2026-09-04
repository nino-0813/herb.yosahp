import type { MetadataRoute } from "next";
import { SITE } from "@/site.config";
import { SEO_ARTICLES } from "@/lib/seo-articles";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE.siteUrl;

  const pages = [
    { path: "", priority: 1.0, changeFrequency: "weekly" as const },
    { path: "/first-time", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/menu", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/voice", priority: 0.6, changeFrequency: "monthly" as const },
    { path: "/concept", priority: 0.5, changeFrequency: "monthly" as const },
    { path: "/blog", priority: 0.7, changeFrequency: "weekly" as const },
    { path: "/access", priority: 0.9, changeFrequency: "monthly" as const },
    { path: "/herb-steam-11-herbs-fukuyama-onomichi", priority: 0.8, changeFrequency: "monthly" as const },
    { path: "/reserve", priority: 0.7, changeFrequency: "monthly" as const },
    ...SEO_ARTICLES.map(({ slug }) => ({ path: `/blog/${slug}`, priority: 0.8, changeFrequency: "monthly" as const })),
  ];

  return pages.map((p) => ({
    url: `${base}${p.path}`,
    lastModified: new Date(),
    changeFrequency: p.changeFrequency,
    priority: p.priority,
  }));
}
