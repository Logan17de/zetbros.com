import type { Metadata } from "next";
import "./globals.css";
import "./dynamics.css";
import "./scroll-effects.css";
import "./hero-flow.css";
import "./typography.css";
import "./capability-sections.css";
import "./anchor-nav.css";
import "./ambient-background.css";

export const metadata: Metadata = {
  title: "Zetbros — AI, Infrastructure & Software",
  description:
    "Practical AI, automation, infrastructure, smart hands, web and software support for modern companies.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
