"use client";

import { useEffect } from "react";

type RevealGroup = {
  selector: string;
  step?: number;
  base?: number;
};

const homeGroups: RevealGroup[] = [
  { selector: ".heroLogoStage", base: 20 },
  { selector: ".heroDiagram", base: 120 },
  { selector: ".serviceGrid .serviceCard", step: 85 },
  { selector: "#ai .aiPanel", base: 40 },
  { selector: ".aiSolutionsHeader", base: 50 },
  { selector: ".solutionGrid .solutionCard", step: 65, base: 90 },
  { selector: ".capabilityPanel", base: 40 },
  { selector: ".capabilityPoints .capabilityPoint", step: 70, base: 90 },
  { selector: ".productGrid .productCard", step: 95 },
  { selector: ".processGrid .processStep", step: 75 },
  { selector: ".contactSection .container > *", base: 40 },
  { selector: ".footerTop", base: 20 },
];

const harnessGroups: RevealGroup[] = [
  { selector: '[data-harness-reveal="map"]', base: 120 },
  { selector: '[data-harness-reveal="benefit"]', step: 85 },
  { selector: '[data-harness-reveal="plugin"]', step: 50 },
  { selector: '[data-harness-reveal="use-cases"]', base: 40 },
  { selector: '[data-harness-reveal="stage"]', step: 75 },
  { selector: '[data-harness-reveal="recovery"]', base: 40 },
  { selector: '[data-harness-reveal="detail"]', step: 85 },
  { selector: '[data-harness-reveal="availability"]', base: 40 },
];

export default function ScrollRevealMotion({ variant = "home" }: { variant?: "home" | "harness" }) {
  useEffect(() => {
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const targets: HTMLElement[] = [];
    const groups = variant === "harness" ? harnessGroups : homeGroups;

    // Leave server-rendered content visible when observation is unavailable.
    if (!("IntersectionObserver" in window)) return;

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

    const frame = requestAnimationFrame(() => {
      targets.forEach((element) => observer.observe(element));
    });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, [variant]);

  return null;
}
