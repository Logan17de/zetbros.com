"use client";

import { CSSProperties, ElementType, useEffect, useRef, useState } from "react";

type RevealTextProps = {
  as?: ElementType;
  text: string;
  className?: string;
  once?: boolean;
};

export default function RevealText({
  as: Tag = "span",
  text,
  className = "",
  once = true,
}: RevealTextProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

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
      { threshold: 0.35, rootMargin: "0px 0px -8% 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [once]);

  let charIndex = 0;

  return (
    <Tag
      ref={ref}
      className={`revealText ${visible ? "isVisible" : ""} ${className}`.trim()}
      aria-label={text.replace(/\n/g, " ")}
    >
      {text.split("\n").map((line, lineIndex) => (
        <span className="revealLine" key={`${line}-${lineIndex}`} aria-hidden="true">
          {Array.from(line).map((char) => {
            const index = charIndex++;
            return (
              <span
                className="revealChar"
                key={`${index}-${char}`}
                style={{ "--char-index": index } as CSSProperties}
              >
                {char === " " ? "\u00A0" : char}
              </span>
            );
          })}
          {lineIndex < text.split("\n").length - 1 && <br />}
        </span>
      ))}
    </Tag>
  );
}
