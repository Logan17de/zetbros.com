"use client";

import { useEffect } from "react";

export default function AiSolutionJump() {
  useEffect(() => {
    const aiCopy = document.querySelector<HTMLElement>("#ai .aiCopy");
    if (!aiCopy || aiCopy.querySelector(".aiRealWorldJump")) return;

    const link = document.createElement("a");
    link.className = "aiRealWorldJump";
    link.href = "/ai-in-practice";
    link.setAttribute("aria-label", "Open the detailed AI in practice page");

    const label = document.createElement("span");
    label.textContent = "See AI in practice";

    const arrow = document.createElement("span");
    arrow.className = "aiRealWorldJumpArrow";
    arrow.setAttribute("aria-hidden", "true");
    arrow.textContent = "→";

    link.append(label, arrow);
    aiCopy.appendChild(link);

    return () => link.remove();
  }, []);

  return null;
}
