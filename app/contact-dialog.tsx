"use client";

import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import ContactForm from "./contact-form";
import styles from "./contact-dialog.module.css";

type ContactVariant = "general" | "research";
type OpenContact = (variant: ContactVariant, trigger: HTMLElement) => void;
const ContactContext = createContext<OpenContact | null>(null);

export function ContactProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<{ variant: ContactVariant; key: number } | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const nextKey = useRef(0);

  useEffect(() => {
    if (!active) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    requestAnimationFrame(() => dialog.querySelector<HTMLInputElement>('input[name="email"]')?.focus());
    return () => { document.body.style.overflow = previousOverflow; };
  }, [active]);

  function close() { dialogRef.current?.close(); }

  return (
    <ContactContext.Provider value={(variant, trigger) => {
      returnFocus.current = trigger;
      setActive({ variant, key: ++nextKey.current });
    }}>
      {children}
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={active?.variant === "research" ? "Contact Zetbros about the research pilot" : "Contact Zetbros"}
        onClose={() => { setActive(null); returnFocus.current?.focus(); }}
        onClick={(event) => {
          if (event.target !== event.currentTarget) return;
          const rect = event.currentTarget.getBoundingClientRect();
          if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) close();
        }}
      >
        <button type="button" className={styles.close} onClick={close} aria-label="Close contact form">×</button>
        {active && <ContactForm key={active.key} variant={active.variant} />}
      </dialog>
    </ContactContext.Provider>
  );
}

export function ContactTrigger({ children, variant = "general", className }: { children: ReactNode; variant?: ContactVariant; className?: string }) {
  const open = useContext(ContactContext);
  if (!open) throw new Error("ContactTrigger must be inside ContactProvider");
  return <button type="button" className={className ? `${styles.styledTrigger} ${className}` : styles.textTrigger} aria-haspopup="dialog" onClick={(event) => open(variant, event.currentTarget)}>{children}</button>;
}
