"use client";

import { useEffect } from "react";

export default function HarnessProductLink() {
  useEffect(() => {
    const cards = Array.from(document.querySelectorAll<HTMLElement>(".productCard"));
    const harnessCard = cards.find((card) => card.querySelector("h3")?.textContent?.trim() === "Harness");
    const link = harnessCard?.querySelector<HTMLAnchorElement>("a");
    const description = harnessCard?.querySelector<HTMLParagraphElement>("p");

    if (!link) return;

    const previousHref = link.getAttribute("href");
    const previousText = link.innerHTML;
    const previousDescription = description?.textContent ?? null;

    link.href = "/harness";
    link.innerHTML = "Explore Harness <span>→</span>";
    link.setAttribute("aria-label", "Open the Harness product page");

    if (description) {
      description.textContent = "Extensible AI desktop built around plugins, tools and workflows.";
    }

    return () => {
      if (previousHref === null) link.removeAttribute("href");
      else link.setAttribute("href", previousHref);
      link.innerHTML = previousText;
      if (description && previousDescription !== null) description.textContent = previousDescription;
    };
  }, []);

  return null;
}
