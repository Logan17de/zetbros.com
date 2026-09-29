import type { Metadata } from "next";
import { pageMetadata, SITE_URL } from "./site-metadata";
import { ContactProvider } from "./contact-dialog";
import "./globals.css";
import "./dynamics.css";
import "./scroll-effects.css";
import "./hero-flow.css";
import "./typography.css";
import "./capability-sections.css";
import "./anchor-nav.css";
import "./page-surface.css";
import "./ai-solutions.css";
import "./ai-solution-jump.css";
import "./infrastructure-solutions.css";
import "./automation-solutions.css";

export const metadata: Metadata = {
  ...pageMetadata("/", "Zetbros — Technology for society and business", "Zetbros builds useful products for people and practical AI, automation and infrastructure systems for businesses."),
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
  return <html lang="en"><body><ContactProvider>{children}</ContactProvider></body></html>;
}
