'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

const NS = 'http://www.w3.org/2000/svg';
const DURATION = 760;

function fracture(panel: HTMLElement, clickX: number, clickY: number) {
  panel.querySelector('.glassShatter')?.remove();
  const width = panel.clientWidth;
  const height = panel.clientHeight;
  if (!width || !height) return;
  const x = Math.min(Math.max(clickX, 0), width);
  const y = Math.min(Math.max(clickY, 0), height);
  const radius = Math.hypot(width, height) * 1.4;
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'glassShatter');
  svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  svg.setAttribute('preserveAspectRatio', 'none');
  svg.setAttribute('aria-hidden', 'true');

  // Each wedge is a light fragment of the decorative pane, never of its content.
  for (let index = 0; index < 10; index += 1) {
    const start = (index / 10) * Math.PI * 2 - 0.2;
    const end = ((index + 1) / 10) * Math.PI * 2 - 0.2;
    const p1 = [x + Math.cos(start) * radius, y + Math.sin(start) * radius];
    const p2 = [x + Math.cos(end) * radius, y + Math.sin(end) * radius];
    const polygon = document.createElementNS(NS, 'polygon');
    polygon.setAttribute('points', `${x},${y} ${p1[0]},${p1[1]} ${p2[0]},${p2[1]}`);
    polygon.setAttribute('fill', index % 2 ? '#ffffff32' : '#bde0dc4d');
    polygon.setAttribute('stroke', index % 2 ? '#ffffffeb' : '#c6dbd2b8');
    polygon.setAttribute('stroke-width', '1.2');
    const angle = (start + end) / 2;
    polygon.style.setProperty('--shard-x', `${Math.cos(angle) * 18}px`);
    polygon.style.setProperty('--shard-y', `${Math.sin(angle) * 18}px`);
    polygon.style.setProperty('--shard-turn', `${index % 2 ? 2.4 : -2.4}deg`);
    svg.append(polygon);
  }

  const center = document.createElementNS(NS, 'circle');
  center.setAttribute('cx', String(x));
  center.setAttribute('cy', String(y));
  center.setAttribute('r', '18');
  center.setAttribute('fill', 'none');
  center.setAttribute('stroke', '#ffffffea');
  center.setAttribute('stroke-width', '1.5');
  svg.append(center);
  panel.append(svg);
  window.setTimeout(() => svg.remove(), DURATION);
}

export default function GlassEffects() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const panels = Array.from(document.querySelectorAll<HTMLElement>('[data-glass]'));
    const present = panels.length > 0;
    setVisible(present);
    document.documentElement.classList.toggle('glassReady', present);
    const observer = 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
      for (const entry of entries) entry.target.classList.toggle('glassVisible', entry.isIntersecting);
    }, { rootMargin: '120px 0px' }) : null;
    for (const panel of panels) observer?.observe(panel);
    const footer = document.querySelector('main footer');
    const header = document.querySelector<HTMLElement>('main > header');
    const updateHeaderClearance = () => {
      const bottom = header?.getBoundingClientRect().bottom ?? 0;
      document.documentElement.style.setProperty('--glass-header-clearance', `${Math.max(16, Math.ceil(bottom) + 16)}px`);
    };
    updateHeaderClearance();
    const headerObserver = header && 'ResizeObserver' in window ? new ResizeObserver(updateHeaderClearance) : null;
    if (header) headerObserver?.observe(header);
    window.addEventListener('resize', updateHeaderClearance);
    const footerObserver = footer && 'IntersectionObserver' in window ? new IntersectionObserver((entries) => {
      document.documentElement.classList.toggle('glassAtFooter', entries[0].isIntersecting);
      if (entries[0].isIntersecting) updateHeaderClearance();
    }) : null;
    if (footer) footerObserver?.observe(footer);
    return () => {
      observer?.disconnect();
      footerObserver?.disconnect();
      headerObserver?.disconnect();
      window.removeEventListener('resize', updateHeaderClearance);
      document.documentElement.style.removeProperty('--glass-header-clearance');
      for (const panel of panels) panel.classList.remove('glassVisible');
      document.documentElement.classList.remove('glassReady', 'glassAtFooter');
    };
  }, [pathname]);

  useEffect(() => {
    document.documentElement.classList.toggle('glassPaused', paused);
    return () => document.documentElement.classList.remove('glassPaused');
  }, [paused]);

  useEffect(() => {
    function onClick(event: MouseEvent) {
      if (paused || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const target = event.target;
      if (!(target instanceof Element)) return;
      const panel = target.closest<HTMLElement>('[data-glass]');
      if (!panel) return;
      const bounds = panel.getBoundingClientRect();
      const x = event.detail === 0 ? bounds.width / 2 : event.clientX - bounds.left;
      const y = event.detail === 0 ? bounds.height / 2 : event.clientY - bounds.top;
      fracture(panel, x, y);
    }
    document.addEventListener('click', onClick, { capture: true });
    return () => document.removeEventListener('click', onClick, { capture: true });
  }, [paused]);

  if (!visible) return null;
  return <button className="glassMotionToggle" type="button" data-paused={paused} aria-label={paused ? 'Resume glass effects' : 'Pause glass effects'} title={paused ? 'Resume glass effects' : 'Pause glass effects'} onClick={() => {
    if (!paused) document.querySelectorAll('.glassShatter').forEach((node) => node.remove());
    setPaused((value) => !value);
  }}>
    <span aria-hidden="true">{paused ? '▶' : 'Ⅱ'}</span>
  </button>;
}
