"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function AutomationSolutions() {
  const [buttonTarget, setButtonTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setButtonTarget(document.querySelector<HTMLElement>("#automation .capabilityCopy"));
  }, []);

  if (!buttonTarget) return null;

  return createPortal(
    <a className="automationRealWorldJump" href="/automation-in-practice">
      <span>See automation in practice</span>
      <span className="automationRealWorldJumpArrow" aria-hidden="true">→</span>
    </a>,
    buttonTarget,
  );
}
