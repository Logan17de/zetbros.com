import type { Metadata } from "next";

export const SITE_URL = "https://zetbros.com";

/** Each public page gets its own canonical URL and share preview. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: new URL(path, SITE_URL).href },
    openGraph: {
      type: "website",
      siteName: "Zetbros",
      url: new URL(path, SITE_URL).href,
      title,
      description,
      images: [{ url: `${SITE_URL}/icon-512.png`, width: 512, height: 512, alt: "Zetbros" }],
    },
    twitter: {
      card: "summary",
      title,
      description,
      images: [`${SITE_URL}/icon-512.png`],
    },
  };
}
