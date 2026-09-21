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
  title: "Zetbros — Products for people and society",
  description:
    "We build useful products for people and society. Explore AIKO, meet Harness, and share an idea or a problem with Zetbros.",
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
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
