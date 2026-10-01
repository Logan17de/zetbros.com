'use client';

import { useEffect } from 'react';

export default function ScrollRevealMotion({ variant = 'home' }: { variant?: 'home' | 'harness' }) {
  useEffect(() => {
    if (!('IntersectionObserver' in window)) return;
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const selector = variant === 'harness' ? '[data-harness-reveal], [data-reveal]' : '[data-reveal]';
    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter(
      (node) => !node.parentElement?.closest(selector),
    );
    if (preference.matches) return;

    const pending = new Set<HTMLElement>();
    const active = new Set<HTMLElement>();
    let observer: IntersectionObserver;

    function finish(node: HTMLElement) {
      node.classList.remove('isRevealed');
      node.dataset.revealDone = 'true';
      active.delete(node);
      pending.delete(node);
      observer?.unobserve(node);
    }
    function onAnimationEnd(event: AnimationEvent) {
      if (event.target instanceof HTMLElement && active.has(event.target)) finish(event.target);
    }
    function onFocus(event: FocusEvent) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const group = target.closest<HTMLElement>(selector);
      if (group && (pending.has(group) || active.has(group))) finish(group);
    }
    function onPreferenceChange(event: MediaQueryListEvent) {
      if (!event.matches) return;
      for (const node of [...pending, ...active]) finish(node);
      observer.disconnect();
    }

    observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const node = entry.target as HTMLElement;
        if (!pending.has(node)) continue;
        pending.delete(node);
        observer.unobserve(node);
        if (preference.matches || node.contains(document.activeElement)) {
          finish(node);
        } else {
          active.add(node);
          node.classList.add('isRevealed');
        }
      }
    }, { threshold: 0.01, rootMargin: '0px 0px 12% 0px' });

    // Content in or above the opening viewport stays static even if JS loads late.
    const viewportHeight = window.innerHeight;
    for (const node of targets) {
      if (node.dataset.revealDone || node.getBoundingClientRect().top < viewportHeight) continue;
      pending.add(node);
      observer.observe(node);
    }
    document.addEventListener('animationend', onAnimationEnd);
    document.addEventListener('focusin', onFocus);
    preference.addEventListener('change', onPreferenceChange);
    return () => {
      observer.disconnect();
      for (const node of active) node.classList.remove('isRevealed');
      pending.clear();
      active.clear();
      document.removeEventListener('animationend', onAnimationEnd);
      document.removeEventListener('focusin', onFocus);
      preference.removeEventListener('change', onPreferenceChange);
    };
  }, [variant]);

  return null;
}
