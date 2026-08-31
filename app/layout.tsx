import type { Metadata } from "next";
import "./globals.css";

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
