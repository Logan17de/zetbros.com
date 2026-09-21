"use client";
import { FormEvent, useState } from "react";
import styles from "./contact-form.module.css";

export default function ContactForm() {
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
      if (!response.ok) throw new Error(response.status === 429 ? "Please wait a minute before sending another message." : "We couldn’t send your message. Please try again or email support@zetbros.com.");
      form.reset();
      setState("success");
    } catch (err) {
      setError(err instanceof Error ? err.message : "We couldn’t send your message. Please try again.");
      setState("error");
    }
  }
  return (
    <div className={styles.panel}>
      <div className={styles.intro}>
        <h2>An idea? A problem?<br />We’re listening.</h2>
        <p>Tell us what you wish existed or what keeps getting in your way. Big ideas and small, everyday problems are equally welcome.</p>
        <p>Prefer email? <a href="mailto:support@zetbros.com">support@zetbros.com</a></p>
      </div>
      <form className={styles.form} onSubmit={submit}>
        <div className={styles.twoColumns}>
          <label><span>Name</span><input name="name" autoComplete="name" maxLength={120} required placeholder="Your name" /></label>
          <label><span>Email</span><input name="email" type="email" autoComplete="email" maxLength={320} required placeholder="you@example.com" /></label>
        </div>
        <label><span>What would you like to share?</span><select name="service" defaultValue="An idea"><option>An idea</option><option>A problem to solve</option><option>AIKO feedback</option><option>Harness</option><option>Something else</option></select></label>
        <label><span>Your idea or problem</span><textarea name="message" required minLength={10} maxLength={5000} rows={5} placeholder="What could be better, and who would it help?" /></label>
        <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <p className={styles.privacyNote}>We’ll use your details to read and respond to your message. <a href="/privacy">Privacy information</a></p>
        <div className={styles.submitRow}><button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Share with Zetbros"}</button></div>
        <p className={state === "success" ? styles.success : styles.feedback} role="status" aria-live="polite">{state === "success" ? "Thank you. Your message is with us." : state === "error" ? error : ""}</p>
      </form>
    </div>
  );
}
