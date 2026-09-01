"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function InfrastructureSolutions() {
  const [buttonTarget, setButtonTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setButtonTarget(document.querySelector<HTMLElement>("#infrastructure .capabilityCopy"));
  }, []);

  if (!buttonTarget) return null;

  return createPortal(
    <a className="infraRealWorldJump" href="/infrastructure-in-practice">
      <span>See infrastructure in practice</span>
      <span className="infraRealWorldJumpArrow" aria-hidden="true">→</span>
    </a>,
    buttonTarget,
  );
}
