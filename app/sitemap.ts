import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://zetbros.com";
  const lastModified = new Date("2026-09-29");
  return [
    { url: base, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: base + "/equipment-warranty-research", lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: base + "/ai-in-practice", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: base + "/automation-in-practice", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: base + "/infrastructure-in-practice", lastModified, changeFrequency: "monthly", priority: 0.8 },
    { url: base + "/harness", lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: base + "/privacy", lastModified, changeFrequency: "yearly", priority: 0.3 },
    { url: base + "/terms", lastModified, changeFrequency: "yearly", priority: 0.3 },
  ];
}
