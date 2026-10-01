import type { ElementType } from 'react';

type RevealBoxTextProps = {
  as?: ElementType;
  text: string;
  className?: string;
  variant?: 'hero' | 'section' | 'label';
  delayMs?: number;
  wordGapMs?: number;
  once?: boolean;
};

// Keep headings semantic and readable in the server response. Motion belongs to
// the surrounding visual group, never to individual words.
export default function RevealBoxText({ as: Tag = 'h2', text, className = '', variant = 'section' }: RevealBoxTextProps) {
  return <div className={`revealBox revealBox-${variant}`}><Tag className={`revealBoxText ${className}`.trim()}>{text}</Tag></div>;
}
