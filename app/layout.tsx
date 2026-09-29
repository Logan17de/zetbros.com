import type { Metadata } from "next";
import "./globals.css";
import "./dynamics.css";
import "./scroll-effects.css";
import "./hero-flow.css";
import "./typography.css";
import "./capability-sections.css";
import "./anchor-nav.css";
import "./ambient-background.css";
import "./page-surface.css";
import "./ai-solutions.css";
import "./ai-solution-jump.css";
import "./infrastructure-solutions.css";
import "./automation-solutions.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zetbros.com"),
  title: "Zetbros — Products, AI and practical technology",
  description:
    "Zetbros builds useful products and practical systems for people and businesses, including AI, automation and infrastructure project work.",
  applicationName: "Zetbros",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "https://zetbros.com",
    siteName: "Zetbros",
    title: "Zetbros — Products, AI and practical technology",
    description: "Useful products and practical systems for people and businesses.",
  },
  twitter: {
    card: "summary",
    title: "Zetbros — Products, AI and practical technology",
    description: "Useful products and practical systems for people and businesses.",
  },
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
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
