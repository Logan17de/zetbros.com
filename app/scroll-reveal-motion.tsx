"use client";

import { useEffect } from "react";

type RevealGroup = {
  selector: string;
  step?: number;
  base?: number;
};

const groups: RevealGroup[] = [
  { selector: ".heroLogoStage", base: 20 },
  { selector: ".heroDiagram", base: 120 },
  { selector: ".serviceGrid .serviceCard", step: 85 },
  { selector: "#ai .aiPanel", base: 40 },
  { selector: ".capabilityPanel", base: 40 },
  { selector: ".capabilityPoints .capabilityPoint", step: 70, base: 90 },
  { selector: ".productGrid .productCard", step: 95 },
  { selector: ".processGrid .processStep", step: 75 },
  { selector: ".contactSection .container > *", base: 40 },
  { selector: ".footerTop", base: 20 },
];

export default function ScrollRevealMotion() {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets: HTMLElement[] = [];

    groups.forEach(({ selector, step = 0, base = 0 }) => {
      document.querySelectorAll<HTMLElement>(selector).forEach((element, index) => {
        element.classList.add("scrollRevealItem");
        element.style.setProperty("--reveal-delay", `${base + index * step}ms`);
        targets.push(element);
      });
    });

    if (reduceMotion) {
      targets.forEach((element) => element.classList.add("isRevealed"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          const element = entry.target as HTMLElement;
          element.classList.add("isRevealed");
          observer.unobserve(element);
        });
      },
      {
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      },
    );

    requestAnimationFrame(() => {
      targets.forEach((element) => observer.observe(element));
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
