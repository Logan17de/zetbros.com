import type { ReactNode } from "react";
import { pageMetadata } from "../site-metadata";
export const metadata = pageMetadata("/privacy", "Privacy | Zetbros", "Information handling for the Zetbros website, business enquiries and initial research contact.");
export default function Layout({ children }: { children: ReactNode }) { return children; }
