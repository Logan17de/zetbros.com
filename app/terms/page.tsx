import type { Metadata } from "next";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms | Zetbros",
  description: "Website terms for zetbros.com.",
};

export default function TermsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/">Zetbros</a>
          <a className={styles.back} href="/">Back to home</a>
        </div>
      </header>
      <article className={styles.article}>
        <h1>Terms</h1>
        <p className={styles.updated}>Last updated: August 31, 2026</p>

        <p>These terms cover use of the public Zetbros website. Any paid project, support engagement, product subscription, or other commercial service may be governed by separate written terms agreed with the customer.</p>

        <h2>Website information</h2>
        <p>We aim to keep the information on this website useful and accurate, but service descriptions, availability, technical details, and examples may change as Zetbros develops.</p>

        <h2>No automatic service agreement</h2>
        <p>Submitting a contact form or contacting Zetbros does not by itself create a service contract, guarantee availability, or commit either party to a project.</p>

        <h2>Acceptable use</h2>
        <p>Please do not misuse the website, attempt unauthorized access, interfere with its operation, submit malicious content, or use automated systems in a way that materially disrupts the service.</p>

        <h2>Intellectual property</h2>
        <p>Unless otherwise stated, Zetbros website content, branding, interface elements, and original materials are provided for viewing and evaluation and may not be represented as your own.</p>

        <h2>Third-party services</h2>
        <p>The website may use or link to third-party platforms and products. Their services are governed by their own terms and policies.</p>

        <h2>Contact</h2>
        <p>Questions about these website terms can be sent to <a href="mailto:support@zetbros.com">support@zetbros.com</a>.</p>
      </article>
    </main>
  );
}
