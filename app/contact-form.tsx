"use client";
import { FormEvent, useState } from "react";
import styles from "./contact-form.module.css";

type ContactFormProps = { variant?: "general" | "research" };

export default function ContactForm({ variant = "general" }: ContactFormProps) {
  const research = variant === "research";
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (state === "sending") return;
    setState("sending");
    setError("");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!response.ok) throw new Error(response.status === 429 ? "Please wait a minute before sending another message." : "We couldn’t save your message. Please try again or email logan@zetbros.com.");
      form.reset();
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t save your message. Please try again.");
      setState("error");
    }
  }
  return (
    <div className={styles.panel}>
      <div className={styles.intro}>
        <h2>{research ? "Start with a conversation." : "An idea? A business problem? We’re listening."}</h2>
        <p>{research ? "Request a 20-minute discussion about your equipment warranty workflow. A short introduction is enough; no documents or preparation are needed." : "Tell us about an idea, a practical business project or feedback on our products. We start by understanding the problem."}</p>
        <p>Business &amp; research: <a href="mailto:logan@zetbros.com">logan@zetbros.com</a></p>
        {!research && <p>Product support: <a href="mailto:support@zetbros.com">support@zetbros.com</a></p>}
      </div>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.twoColumns}>
          <label><span>Name</span><input name="name" autoComplete="name" maxLength={120} required placeholder="Your name" /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" maxLength={320} required placeholder="you@company.com" /></label>
        </div>
        <label><span>Company (optional)</span><input name="company" autoComplete="organization" maxLength={160} placeholder="Company or dealership name" /></label>
        <label><span>What would you like to discuss?</span><select name="service" defaultValue={research ? "Equipment warranty research" : "An idea"}><option>An idea</option><option>A problem to solve</option><option>Business project</option><option>Equipment warranty research</option><option>AIKO feedback</option><option>Harness</option><option>Something else</option></select></label>
        <label><span>{research ? "A short introduction" : "Your idea or problem"}</span><textarea name="message" required minLength={10} maxLength={5000} rows={research ? 3 : 5} defaultValue={research ? "I’d like to discuss our equipment warranty workflow in a short research conversation." : ""} placeholder="What could be better, and who would it help?" /></label>
        <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <p className={styles.privacyNote}>Please do not include customer records, confidential documents or credentials. We’ll use your details to understand and respond to your enquiry. <a href="/privacy">Privacy information</a></p>
        <div className={styles.submitRow}><button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : research ? "Request a conversation" : "Send enquiry"}</button></div>
        <p className={state === "success" ? styles.success : styles.feedback} role="status" aria-live="polite">{state === "success" ? "Thank you. Your enquiry has been saved. You can also contact Logan directly by email." : state === "error" ? error : ""}</p>
      </form>
    </div>
  );
}
