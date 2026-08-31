"use client";

import { FormEvent, useState } from "react";
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
          <label>
            <span>What can we help with?</span>
            <select name="service" defaultValue="">
              <option value="">Choose a service</option>
              {services.map((service) => <option key={service}>{service}</option>)}
            </select>
          </label>
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
