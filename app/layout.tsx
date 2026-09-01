import type { Metadata } from "next";
import AiSolutionJump from "./ai-solution-jump";
import InfrastructureSolutions from "./infrastructure-solutions";
import AutomationSolutions from "./automation-solutions";
import "./globals.css";
import "./dynamics.css";
import "./scroll-effects.css";
import "./hero-flow.css";
import "./typography.css";
import "./capability-sections.css";
import "./anchor-nav.css";
import "./ambient-background.css";
import "./page-surface.css";
import "./availability.css";
import "./ai-solutions.css";
import "./ai-solution-jump.css";
import "./infrastructure-solutions.css";
import "./automation-solutions.css";

export const metadata: Metadata = {
  title: "Zetbros — AI, Infrastructure & Software",
  description:
    "Practical AI, automation, infrastructure, smart hands, web and software support for modern companies.",
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
        <AiSolutionJump />
        <InfrastructureSolutions />
        <AutomationSolutions />
      </body>
    </html>
  );
}
