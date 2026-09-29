import { pageMetadata } from "../site-metadata";
import styles from "../legal.module.css";

export const metadata = pageMetadata("/privacy", "Privacy | Zetbros", "Information handling for the Zetbros website, business enquiries and initial research contact.");

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
        <p className={styles.updated}>Last updated: September 29, 2026</p>
        <p>This page explains information handling for the public Zetbros website, including business enquiries and requests for an initial research conversation. Individual products may have their own privacy information.</p>
        <h2>Information you send us</h2>
        <p>If you use a contact form, we receive your name, email address, selected topic and message. Forms may also accept an optional company name. Please do not include customer records, confidential documents or credentials.</p>
        <h2>How we use it</h2>
        <p>Contact information is used to understand your request, respond to you, arrange an initial discussion and maintain a record of business enquiries. We do not sell personal data submitted through these forms.</p>
        <h2>Where website enquiries are stored</h2>
        <p>The website and its enquiry database are hosted on Cloudflare. Cloudflare may process technical information, including IP addresses, to deliver the website and limit abusive submissions. A website form submission is saved as an enquiry; it is not a claim-file upload or an agreement to a paid service.</p>
        <h2>Research and claim documents</h2>
        <p>The equipment warranty research page invites initial conversations only. This public website does not accept claim uploads. Before any later review of dealer records, the permitted data, redaction, transfer method, reviewers, processing tools including any AI providers, retention and deletion arrangements would be agreed separately.</p>
        <p>Please do not send OEM portal passwords, customer records or confidential manufacturer materials during initial contact. A general website enquiry does not establish the data-handling arrangements for a claim review.</p>
        <h2>Retention</h2>
        <p>We keep business enquiries for as long as reasonably useful for responding, maintaining business records, resolving disputes or meeting applicable legal obligations. You can ask us to delete information where applicable. Any later pilot records would be subject to separately agreed handling arrangements.</p>
        <h2>Security</h2>
        <p>We use technical controls to limit access to submitted website information. No internet service can guarantee absolute security. This page does not claim a certified document-processing service or a secure claim-upload portal.</p>
        <h2>Your requests</h2>
        <p>For information, correction or deletion requests, contact <a href="mailto:support@zetbros.com">support@zetbros.com</a>. For a business or research conversation, contact <a href="mailto:logan@zetbros.com">logan@zetbros.com</a>.</p>
      </article>
    </main>
  );
}
