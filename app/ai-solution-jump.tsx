"use client";

import { useEffect } from "react";

export default function AiSolutionJump() {
  useEffect(() => {
    const aiCopy = document.querySelector<HTMLElement>("#ai .aiCopy");
    const solutions = document.querySelector<HTMLElement>(".aiSolutions");

    if (!aiCopy || !solutions) return;

    solutions.id = "ai-real-world";

    const eyebrow = solutions.querySelector<HTMLElement>(".aiSolutionsHeader .eyebrow");
    const heading = solutions.querySelector<HTMLElement>(".aiSolutionsHeader h3");

    if (eyebrow) eyebrow.textContent = "Real-world AI challenges";
    if (heading) heading.textContent = "Problems companies actually face — and how Zetbros solves them.";

    if (aiCopy.querySelector(".aiRealWorldJump")) return;

    const link = document.createElement("a");
    link.className = "aiRealWorldJump";
    link.href = "#ai-real-world";
    link.setAttribute("aria-label", "See real-world AI problems and Zetbros solutions");

    const label = document.createElement("span");
    label.textContent = "See AI in practice";

    const arrow = document.createElement("span");
    arrow.className = "aiRealWorldJumpArrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "↓";

    link.append(label, arrow);
    aiCopy.appendChild(link);

    return () => {
      link.remove();
    };
  }, []);

  return null;
}
