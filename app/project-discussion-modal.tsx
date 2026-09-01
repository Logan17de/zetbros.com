"use client";

import { FormEvent, useEffect, useId, useRef, useState } from "react";
import styles from "./project-discussion-modal.module.css";

const SUPABASE_URL = "https://jxvabaqswqembehxligi.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_15lvj9hILL34x7Ou4xAdJw_zWclSENa";

type SubmitState = "idle" | "sending" | "success" | "error";

type ProjectDiscussionModalProps = {
  category: string;
  solution: string;
};

export default function ProjectDiscussionModal({ category, solution }: ProjectDiscussionModalProps) {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState<SubmitState>("idle");
  const [error, setError] = useState("");
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function closeModal() {
    if (state === "sending") return;
    setOpen(false);
    setError("");
    if (state !== "success") setState("idle");
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setState("sending");
    setError("");

    const form = event.currentTarget;
    const data = new FormData(form);

    if (String(data.get("website") || "").trim()) {
      setState("success");
      form.reset();
      return;
    }

    const problem = String(data.get("problem") || "").trim();
    const expected = String(data.get("expected") || "").trim();

    const payload = {
      name: String(data.get("name") || "").trim(),
      email: String(data.get("email") || "").trim(),
      company: String(data.get("company") || "").trim() || null,
      service: `${category} — ${solution}`,
      message: [
        `Selected solution: ${solution}`,
        "",
        "Problem / current situation:",
        problem,
        "",
        "What they want the solution to achieve:",
        expected,
      ].join("\n"),
      source: "zetbros.com/practice-discussion",
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

      if (!response.ok) throw new Error(`Request failed (${response.status})`);

      form.reset();
      setState("success");
    } catch (err) {
      console.error("Zetbros project discussion submission failed", err);
      setError("We couldn't send your project brief right now. Please try again in a moment.");
      setState("error");
    }
  }

  return (
    <>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => {
          setState("idle");
          setError("");
          setOpen(true);
        }}
      >
        Discuss this project <span aria-hidden="true">→</span>
      </button>

      {open && (
        <div
          className={styles.backdrop}
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            ref={dialogRef}
            className={styles.dialog}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
          >
            <button className={styles.close} type="button" onClick={closeModal} aria-label="Close project discussion">
              <span aria-hidden="true">×</span>
            </button>

            {state === "success" ? (
              <div className={styles.successState}>
                <span className={styles.successIcon} aria-hidden="true">✓</span>
                <p className={styles.eyebrow}>Project brief received</p>
                <h2 id={titleId}>Thanks — we have the context.</h2>
                <p>Your brief for <strong>{solution}</strong> has been sent to Zetbros. We can start the conversation from the problem and outcome you described instead of making you repeat everything.</p>
                <button type="button" className={styles.doneButton} onClick={() => setOpen(false)}>Done</button>
              </div>
            ) : (
              <>
                <div className={styles.header}>
                  <p className={styles.eyebrow}>{category} · Project discussion</p>
                  <h2 id={titleId}>Tell us what is happening in your environment.</h2>
                  <p>Give us the problem as it exists today and what you want the finished solution to achieve. We&apos;ll use that as the starting point.</p>
                </div>

                <div className={styles.selectedSolution}>
                  <span>Selected solution</span>
                  <strong>{solution}</strong>
                </div>

                <form className={styles.form} onSubmit={submit}>
                  <div className={styles.twoCol}>
                    <label>
                      <span>Name</span>
                      <input name="name" autoComplete="name" maxLength={120} required placeholder="Your name" autoFocus />
                    </label>
                    <label>
                      <span>Work email</span>
                      <input name="email" type="email" autoComplete="email" maxLength={320} required placeholder="you@company.com" />
                    </label>
                  </div>

                  <label>
                    <span>Company <em>optional</em></span>
                    <input name="company" autoComplete="organization" maxLength={160} placeholder="Company name" />
                  </label>

                  <label>
                    <span>What problem are you dealing with?</span>
                    <textarea
                      name="problem"
                      required
                      minLength={20}
                      maxLength={5000}
                      rows={5}
                      placeholder="Describe the current process, system, infrastructure or issue. What is slow, manual, unreliable, blocked or difficult today?"
                    />
                  </label>

                  <label>
                    <span>What would a good solution look like?</span>
                    <textarea
                      name="expected"
                      required
                      minLength={20}
                      maxLength={5000}
                      rows={4}
                      placeholder="What outcome are you expecting? What should be easier, faster, more reliable, private, automated or better connected when the project is finished?"
                    />
                  </label>

                  <label className={styles.honeypot} aria-hidden="true">
                    Website
                    <input name="website" tabIndex={-1} autoComplete="off" />
                  </label>

                  <div className={styles.footer}>
                    <p>We use this information only to understand and respond to your project enquiry.</p>
                    <button type="submit" disabled={state === "sending"}>
                      {state === "sending" ? "Sending…" : "Send project brief"}
                    </button>
                  </div>

                  {state === "error" && <p className={styles.error} role="alert">{error}</p>}
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
