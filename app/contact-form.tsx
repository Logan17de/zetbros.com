"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import styles from "./contact-form.module.css";

const SUPABASE_URL = "https://jxvabaqswqembehxligi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_15lvj9hILL34x7Ou4xAdJw_zWclSENa";

const services = [
  "AI infrastructure",
  "Private / local AI",
  "AI automation",
  "AI optimization",
  "IT smart hands",
  "Rack & stack / infrastructure",
  "Web / software",
  "Extensions & integrations",
  "Something else",
];

type State = "idle" | "sending" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<State>("idle");
  const [error, setError] = useState("");
  const [serviceOpen, setServiceOpen] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  const serviceRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (serviceRef.current && !serviceRef.current.contains(event.target as Node)) {
        setServiceOpen(false);
      }
    }

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setServiceOpen(false);
    }

    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    // Honeypot field. Real visitors never see or fill this.
    if (String(data.get("website") || "").trim()) {
      setState("success");
      form.reset();
      setSelectedService("");
      return;
    }

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim() || null,
      service: String(data.get("service") || "").trim() || null,
      message: String(data.get("message") || "").trim(),
      source: "zetbros.com",
      status: "new",
    };

    try {
      const response = await fetch(`${SUPABASE_URL}/rest/v1/zetbros_contact_messages`, {
        method: "POST",
        headers: {
          apikey: SUPABASE_PUBLISHABLE_KEY,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }

      form.reset();
      setSelectedService("");
      setServiceOpen(false);
      setState("success");
    } catch (err) {
      console.error("Zetbros contact submission failed", err);
      setError("We couldn't send that message right now. Please try again in a moment.");
      setState("error");
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.intro}>
        <span className={styles.kicker}>Talk to Zetbros</span>
        <h2>Have something you want to improve?</h2>
        <p>
          Whether it&apos;s an AI deployment, an annoying manual workflow, a server that
          needs hands-on support, or an application you want to build — tell us what
          you&apos;re working on.
        </p>
      </div>

      <form className={styles.form} onSubmit={submit}>
        <div className={styles.twoColumns}>
          <label>
            <span>Name</span>
            <input name="name" autoComplete="name" maxLength={120} required placeholder="Your name" />
          </label>
          <label>
            <span>Work email</span>
            <input name="email" type="email" autoComplete="email" maxLength={320} required placeholder="you@company.com" />
          </label>
        </div>

        <div className={styles.twoColumns}>
          <label>
            <span>Company <em>optional</em></span>
            <input name="company" autoComplete="organization" maxLength={160} placeholder="Company name" />
          </label>

          <div className={styles.fieldGroup}>
            <span className={styles.fieldLabel}>What can we help with?</span>
            <div className={styles.customSelect} ref={serviceRef}>
              <input type="hidden" name="service" value={selectedService} />
              <button
                className={`${styles.selectTrigger} ${serviceOpen ? styles.selectTriggerOpen : ""}`}
                type="button"
                aria-haspopup="listbox"
                aria-expanded={serviceOpen}
                aria-controls="service-options"
                onClick={() => setServiceOpen((open) => !open)}
              >
                <span className={selectedService ? styles.selectedValue : styles.placeholderValue}>
                  {selectedService || "Choose a service"}
                </span>
                <span className={`${styles.chevron} ${serviceOpen ? styles.chevronOpen : ""}`} aria-hidden="true">
                  <svg viewBox="0 0 20 20"><path d="m5.5 7.5 4.5 4.5 4.5-4.5" /></svg>
                </span>
              </button>

              {serviceOpen && (
                <div className={styles.selectMenu} id="service-options" role="listbox" aria-label="Choose a service">
                  {services.map((service) => (
                    <button
                      key={service}
                      type="button"
                      role="option"
                      aria-selected={selectedService === service}
                      className={`${styles.selectOption} ${selectedService === service ? styles.selectOptionSelected : ""}`}
                      onClick={() => {
                        setSelectedService(service);
                        setServiceOpen(false);
                      }}
                    >
                      <span>{service}</span>
                      {selectedService === service && <span className={styles.optionCheck} aria-hidden="true">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <label>
          <span>Tell us a little about it</span>
          <textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="What are you trying to build, fix or improve?" />
        </label>

        <label className={styles.honeypot} aria-hidden="true">
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>

        <div className={styles.submitRow}>
          <button type="submit" disabled={state === "sending"}>
            {state === "sending" ? "Sending…" : "Send message"}
          </button>
          <span className={state === "success" ? styles.success : styles.feedback} aria-live="polite">
            {state === "success" ? "Thanks — your message is with us." : state === "error" ? error : "Usually a quick reply, no sales maze."}
          </span>
        </div>
      </form>
    </div>
  );
}
