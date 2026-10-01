import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "./site-metadata";
import { ContactProvider } from "./contact-dialog";
import GlassEffects from "./glass-effects";
import "./globals.css";
import "./studio.css";
import "./glass-effects.css";

export const metadata: Metadata = {
  ...pageMetadata("/", "Zetbros — From zero to something real", "Zetbros takes ideas and real problems from zero to useful products for people and practical systems for businesses."),
  metadataBase: new URL(SITE_URL),
  applicationName: "Zetbros",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png" },
      { url: "/icon-192.png", type: "image/png" },
      { url: "/icon-512.png", type: "image/png" },
    ],
    shortcut: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><head><link rel="preload" href="/fonts/InterVariable.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /></head><body><ContactProvider>{children}<GlassEffects /></ContactProvider></body></html>;
}
