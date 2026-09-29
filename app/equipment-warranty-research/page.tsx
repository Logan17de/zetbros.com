import ContactForm from "../contact-form";
import Logo from "../logo";
import { pageMetadata } from "../site-metadata";
import styles from "../prospect.module.css";

export const metadata = pageMetadata(
  "/equipment-warranty-research",
  "Equipment Warranty Research | Zetbros",
  "An exploratory study of dealer-controlled reviews for returned or short-paid equipment warranty claims. Start with a conversation, not a document upload."
);

export default function EquipmentWarrantyResearchPage() {
  return <main className={styles.page}>
    <header className={styles.header}>
      <div className={`container ${styles.headerInner}`}>
        <Logo small />
        <nav className={styles.pageNav} aria-label="Primary navigation">
          <a href="/#software">Products</a><a href="/#business">Business solutions</a><a href="/#research">Research</a><a href="/#about">About</a><a href="#conversation">Contact</a>
        </nav>
      </div>
    </header>
    <section className={styles.hero}>
      <div className="container">
        <p className={styles.breadcrumb}><a href="/">Zetbros</a> / Research</p>
        <span className={styles.status}>Research / validation</span>
        <h1>Equipment warranty recovery.</h1>
        <p className={styles.heroLead}>We are researching whether a dealer-controlled review of returned, denied or short-paid manufacturer warranty claims can uncover useful next steps beyond what existing staff and software already catch.</p>
        <p className={styles.intro}>We would like to learn from service and warranty teams at regional agriculture and construction equipment dealerships, initially focusing on North America.</p>
        <div className={styles.actions}>
          <a className="button buttonPrimary" href="#conversation">Request a 20-minute conversation</a>
          <a className={styles.textLink} href="mailto:logan@zetbros.com?subject=Equipment%20warranty%20research">Email Logan</a>
        </div>
        <p className={styles.small}>No preparation, customer documents or system access needed for the first discussion. This is an independent research initiative, not a launched product or a promise of recovery.</p>
      </div>
    </section>
    <section className={styles.section} aria-label="Research participation">
      <div className={`container ${styles.twoColumns}`}>
        <article className={styles.panel}>
          <p className="eyebrow">First, understand the work</p>
          <h2>A conversation before any software.</h2>
          <p>Walk us through one recent returned or short-paid claim, without sharing identifying customer details. Who gathered the evidence? What did the existing tools check? What happened next?</p>
          <p>We also want to hear when the process already works well. Reasons a separate review would be unnecessary are as useful as problems worth investigating.</p>
        </article>
        <article className={styles.panel}>
          <p className="eyebrow">Only by separate agreement</p>
          <h2>A possible later claim review.</h2>
          <p>After a useful conversation, we may agree a small review of redacted historical claims using records and applicable manufacturer rules the dealer is authorized to share.</p>
          <p>The proposed output is a short, source-linked finding report for a dealer reviewer, not an automatically submitted claim. Participation, scope and any commercial terms would be agreed separately.</p>
        </article>
      </div>
    </section>
    <section className={styles.section} aria-labelledby="review-scope">
      <div className={`container ${styles.twoColumns}`}>
        <div>
          <h2 id="review-scope">What we would examine.</h2>
          <ul className={styles.list}>
            <li>Missing or inconsistent supporting documents and repair-order details.</li>
            <li>Denial or short-payment reasons and the evidence behind them.</li>
            <li>Applicable rule passages, versions and dates supplied by the dealer.</li>
            <li>Evidence that might support a correction or resubmission.</li>
            <li>Differences between claimed, approved and paid amounts.</li>
          </ul>
        </div>
        <div>
          <h2>What stays under your control.</h2>
          <ul className={styles.list}>
            <li>No OEM portal passwords or credentials.</li>
            <li>No automatic submissions or changes to dealer systems.</li>
            <li>No replacement of your dealer-management system.</li>
            <li>No guarantee of eligibility, approval or payment; the manufacturer makes its own decisions.</li>
            <li>Your team verifies findings and decides whether to take action.</li>
          </ul>
        </div>
      </div>
    </section>
    <section className={styles.section} id="data-handling" aria-labelledby="handling-title">
      <div className="container">
        <div className={styles.notice}>
          <h2 id="handling-title">Please do not send claim files yet.</h2>
          <p><strong>This public website does not accept claim uploads.</strong> Please keep initial messages free of customer records, confidential manufacturer documents, machine identifiers and credentials.</p>
          <p>Before any later transfer, we would agree the permitted records, redaction, transfer method, authorized reviewers, processing tools including any AI providers, retention and deletion arrangements. Nothing on this page is a claim that a secure document portal or a certified processing service is already available.</p>
          <a className={styles.textLink} href="/privacy">Read the website privacy information</a>
        </div>
      </div>
    </section>
    <section className={styles.section} aria-label="Research approach and contact">
      <div className={`container ${styles.twoColumns}`}>
        <div>
          <h2>Useful means more than plausible.</h2>
          <p>A finding must be accurate, traceable to the supplied evidence and actionable for a dealer reviewer. We would distinguish new information from issues your team already knew about.</p>
          <p>Something missing from our review packet is not automatically missing from the original submission. A payment received after a review is not automatically money recovered because of that review.</p>
        </div>
        <div>
          <h2>Led by Logan at Zetbros.</h2>
          <p>Zetbros is an independent, founder-led technology and product studio. Logan leads product and AI engineering. We are learning this workflow with dealers, not claiming an established warranty-recovery track record.</p>
          <p>We are not affiliated with or endorsed by an equipment manufacturer. Our other products are AIKO and Harness; this research is a separate initiative.</p>
          <a className={styles.textLink} href="/#about">About Zetbros and Logan <span aria-hidden="true">→</span></a>
        </div>
      </div>
    </section>
    <section className={styles.section} id="conversation" aria-label="Request a research conversation">
      <div className="container"><ContactForm variant="research" /></div>
    </section>
    <footer className={styles.footer}>
      <div className={`container ${styles.footerInner}`}>
        <span>Equipment warranty research by Zetbros</span>
        <div className={styles.footerLinks}><a href="/">Home</a><a href="mailto:logan@zetbros.com">logan@zetbros.com</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
      </div>
    </footer>
  </main>;
}
