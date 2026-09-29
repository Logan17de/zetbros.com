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
        <h2>{research ? "Contact us about the research pilot." : "Contact Zetbros."}</h2>
        <p>{research ? "Tell us about your equipment warranty workflow. A short introduction is enough; no documents or preparation are needed." : "Share an idea, ask about a business project, or tell us what could work better. Your message goes to our support inbox."}</p>
      </div>
      <form className={styles.form} onSubmit={submit}>
        <label><span>Your email</span><input name="email" type="email" autoComplete="email" maxLength={320} required placeholder="you@example.com" /></label>
        <label><span>Subject</span><input name="subject" maxLength={240} required defaultValue={research ? "Equipment warranty research" : ""} placeholder="What is your message about?" /></label>
        <label><span>Message</span><textarea name="message" required minLength={10} maxLength={5000} rows={research ? 4 : 6} placeholder={research ? "Tell us a little about your warranty workflow." : "Tell us what you have in mind."} /></label>
        <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
        <p className={styles.privacyNote}>Please do not include customer records, confidential documents or credentials. We’ll use your details to understand and respond to your enquiry. <a href="/privacy">Privacy information</a></p>
        <div className={styles.submitRow}><button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending…" : "Send message"}</button></div>
        <p className={state === "success" ? styles.success : styles.feedback} role="status" aria-live="polite">{state === "success" ? "Thank you. Your message was sent to support@zetbros.com." : state === "error" ? error : ""}</p>
      </form>
    </div>
  );
}
