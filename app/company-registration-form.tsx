"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import styles from "./contact-form.module.css";

export default function CompanyRegistrationForm() {
  const [state, setState] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const feedbackRef = useRef<HTMLParagraphElement>(null);
  const sending = useRef(false);

  useEffect(() => {
    if (state === "success") feedbackRef.current?.focus();
    if (state === "error") feedbackRef.current?.scrollIntoView({ block: "nearest" });
  }, [state]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (sending.current) return;
    const fields = new FormData(event.currentTarget);
    const text = (name: string) => String(fields.get(name) || "").trim();
    const company = text("company");
    const payload = {
      company,
      name: text("name"),
      email: text("email"),
      subject: `Company registration — ${company}`,
      message: [
        "Company registration for review",
        "",
        `Company website: ${text("companyWebsite") || "Not provided"}`,
        `Location and service coverage: ${text("coverage")}`,
        `Services offered: ${text("services")}`,
        "",
        "Company introduction:",
        text("introduction"),
        "",
        "Permission to contact this company about registration review and suitable projects: confirmed.",
      ].join("\n"),
      // The existing API reserves website for its hidden spam field.
      website: text("website"),
    };
    sending.current = true;
    setState("sending");
    setError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        setError(response.status === 429
          ? "Please wait a minute before submitting your registration again."
          : "We couldn’t send your registration. Please try again or contact support@zetbros.com.");
        setState("error");
        return;
      }
      setState("success");
    } catch {
      setError("We couldn’t send your registration. Please try again or contact support@zetbros.com.");
      setState("error");
    } finally {
      sending.current = false;
    }
  }

  return (
    <div className={styles.panel}>
      <div className={styles.intro}>
        <h2>Register your company.</h2>
        <p>Tell us what you do and where you work. We review each registration before considering a company for client projects.</p>
      </div>
      {state === "success" ? (
        <div className={styles.form}>
          <p ref={feedbackRef} tabIndex={-1} className={styles.success} role="status">Your registration was sent to support@zetbros.com for review. We’ll review your company’s details and contact you about suitable opportunities. Registration does not guarantee approval or projects.</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={submit} aria-busy={state === "sending"}>
          <div className={styles.fieldPair}>
            <label><span>Company name</span><input name="company" autoComplete="organization" required maxLength={160} placeholder="Your company" /></label>
            <label><span>Contact name</span><input name="name" autoComplete="name" required maxLength={120} placeholder="Your name" /></label>
          </div>
          <div className={styles.fieldPair}>
            <label><span>Business email</span><input name="email" type="email" autoComplete="email" required maxLength={320} placeholder="you@company.com" /></label>
            <label><span>Company website <small>(optional)</small></span><input name="companyWebsite" type="url" pattern="https?://.+" maxLength={500} placeholder="https://yourcompany.com" /></label>
          </div>
          <label><span>Location and service coverage</span><input name="coverage" required maxLength={240} placeholder="For example: Tokyo, Kanto, or across Japan" /></label>
          <label><span>Services you offer</span><input name="services" required maxLength={400} placeholder="For example: IT support, networking, software" /></label>
          <label><span>About your company</span><textarea name="introduction" required minLength={20} maxLength={1500} rows={4} placeholder="Introduce your services, experience, and the kinds of projects you can take on." /></label>
          <label className={styles.consent}><input name="consent" type="checkbox" required /><span>Zetbros may contact me to review this registration and discuss suitable projects.</span></label>
          <label className={styles.honeypot} aria-hidden="true">Website<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <p className={styles.privacyNote}>Your details go to our support team for review. They are not automatically published. Registration does not guarantee approval or projects. <a href="/privacy">Privacy information</a></p>
          <div className={styles.submitRow}><button type="submit" disabled={state === "sending"}>{state === "sending" ? "Sending registration…" : "Send registration"}</button></div>
          <p ref={feedbackRef} className={styles.feedback} role="alert">{state === "error" ? error : ""}</p>
        </form>
      )}
    </div>
  );
}
