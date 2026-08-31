"use client";

import { ElementType, useEffect, useMemo, useRef, useState } from "react";

type RevealBoxTextProps = {
  as?: ElementType;
  text: string;
  className?: string;
  variant?: "hero" | "section" | "label";
  delayMs?: number;
  wordGapMs?: number;
  once?: boolean;
};

export default function RevealBoxText({
  as: Tag = "h2",
  text,
  className = "",
  variant = "section",
  delayMs = 220,
  wordGapMs = 90,
  once = true,
}: RevealBoxTextProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const words = useMemo(() => text.split(/(\s+)/), [text]);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          if (once) observer.unobserve(entry.target);
        } else if (!once) {
          setVisible(false);
        }
      },
      { threshold: 0.28, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [once]);

  let wordIndex = 0;

  return (
    <div
      ref={ref}
      className={`revealBox revealBox-${variant} ${visible ? "isVisible" : ""}`}
    >
      <Tag className={`revealBoxText ${className}`.trim()} aria-label={text}>
        {words.map((token, index) => {
          if (/^\s+$/.test(token)) {
            return <span key={`space-${index}`} aria-hidden="true">{token}</span>;
          }

          const delay = delayMs + wordIndex++ * wordGapMs;
          return (
            <span
              key={`${token}-${index}`}
              className="revealWord"
              style={{ transitionDelay: `${delay}ms` }}
              aria-hidden="true"
            >
              {token}
            </span>
          );
        })}
      </Tag>
    </div>
  );
}
