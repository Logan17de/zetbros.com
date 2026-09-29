import type { ReactNode } from "react";
import { pageMetadata } from "../site-metadata";
export const metadata = pageMetadata("/terms", "Terms | Zetbros", "Terms for the public Zetbros website. Commercial engagements are governed by separately agreed terms.");
export default function Layout({ children }: { children: ReactNode }) { return children; }
