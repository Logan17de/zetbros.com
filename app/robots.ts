import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: "https://zetbros.com/sitemap.xml",
    host: "https://zetbros.com",
  };
}
