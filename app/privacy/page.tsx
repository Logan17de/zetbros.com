import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy | Zetbros",
  description: "Privacy information for zetbros.com.",
};

export default function PrivacyPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/">Zetbros</a>
          <a className={styles.back} href="/">Back to home</a>
        </div>
      </header>
      <article className={styles.article}>
        <h1>Privacy</h1>
        <p className={styles.updated}>Last updated: September 21, 2026</p>

        <p>This page explains the basic information handling for the Zetbros website. As the website and services develop, this policy may be updated to reflect new features or legal requirements.</p>

        <h2>Information you send us</h2>
        <p>If you use a contact form, we receive your name, email address, selected topic, and message. Some forms also accept an optional company name.</p>

        <h2>How we use it</h2>
        <p>Contact information is used to understand your request, respond to you, discuss possible work, and maintain a record of business enquiries. We do not use contact-form submissions to sell personal data.</p>

        <h2>Where it is stored</h2>
        <p>This website and its enquiry database are hosted on Cloudflare. Cloudflare may process technical information, including IP addresses, to deliver the website and limit abusive submissions. This page describes zetbros.com; individual products may have their own privacy information.</p>

        <h2>Retention</h2>
        <p>We keep business enquiries for as long as reasonably useful for responding, maintaining business records, resolving disputes, or meeting applicable legal obligations. You can ask us to delete information where applicable.</p>

        <h2>Security</h2>
        <p>We use reasonable technical controls to limit access to submitted information. No internet service can guarantee absolute security.</p>

        <h2>Your requests</h2>
        <p>For questions about your information, correction requests, or deletion requests, contact <a href="mailto:support@zetbros.com">support@zetbros.com</a>.</p>
      </article>
    </main>
  );
}
