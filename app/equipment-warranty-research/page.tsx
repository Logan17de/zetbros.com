import { ContactTrigger } from "../contact-dialog";
import Logo from "../logo";
import { pageMetadata } from "../site-metadata";
import styles from "./research.module.css";

export const metadata = pageMetadata(
  "/equipment-warranty-research",
  "Equipment Warranty Recovery Research | Zetbros",
  "A Zetbros research pilot exploring dealer-controlled review of returned, denied and short-paid equipment warranty claims. Start with a conversation, not a document upload."
);

const tests = [
  "Returned, denied, or short-paid historical manufacturer warranty claims",
  "Missing or inconsistent documentation visible in the supplied claim packet",
  "Relevant rule references from dealer-provided OEM warranty material",
  "Evidence needed for a possible correction or resubmission",
  "Reconciliation of claimed, approved, and paid amounts",
];

const boundaries = [
  "No OEM portal passwords or dealer-system credentials",
  "No autonomous claim submission or resubmission",
  "No independent warranty-coverage or eligibility decision",
  "No replacement of the dealer's DMS or existing warranty process",
  "No recovery guarantee and no fraud accusation",
];

export default function EquipmentWarrantyResearchPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Logo small />
        <nav aria-label="Research navigation"><a href="/#business">Business</a><a href="/#about">About</a><ContactTrigger variant="research">Contact</ContactTrigger></nav>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <span className={styles.status}>Research validation · not a released product</span>
          <p className={styles.eyebrow}>Equipment dealer research</p>
          <h1>Equipment warranty recovery — research pilot.</h1>
          <p className={styles.lead}>Zetbros is validating whether agriculture and construction equipment dealers can reduce warranty-claim rework and recover value from returned or short-paid manufacturer claims through a dealer-controlled review process.</p>
          <div className={styles.actions}>
            <ContactTrigger className={`${styles.primary} solidAction`} variant="research">Request a 20-minute conversation</ContactTrigger>
            <a className={styles.secondary} href="/#about">About Zetbros</a>
          </div>
        </div>
        <aside className={styles.summary} data-glass>
          <span>Current test</span>
          <strong>Start with the workflow, then review up to five historical claims only if the dealer wants to continue.</strong>
          <p>The dealer keeps final authority over every finding and any action that follows.</p>
        </aside>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}><p>01 · What we're testing</p><h2>A narrow recovery-first question.</h2></div>
        <div className={styles.grid}>{tests.map((item) => <div className={styles.card} key={item}><span>✓</span><p>{item}</p></div>)}</div>
      </section>

      <section className={styles.section + " " + styles.soft} data-glass>
        <div className={styles.sectionHeading}><p>02 · Boundaries</p><h2>Dealer-controlled by design.</h2></div>
        <div className={styles.grid}>{boundaries.map((item) => <div className={styles.card} key={item}><span>—</span><p>{item}</p></div>)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeading}><p>03 · How a pilot would work</p><h2>Prove usefulness before building software.</h2></div>
        <ol className={styles.steps}>
          <li><b>20-minute workflow conversation</b><span>No preparation or customer documents are needed. We learn how claims move today and what existing systems already do well.</span></li>
          <li><b>Optional historical review</b><span>If there is a useful question to test, the dealer may choose to provide up to five historical returned, denied, or short-paid claims after the permitted records and data-handling arrangements have been agreed.</span></li>
          <li><b>Rule-backed findings</b><span>Potential documentation gaps or inconsistencies are linked to the applicable rule material the dealer is authorized to provide.</span></li>
          <li><b>Dealer review</b><span>The dealer confirms or rejects each finding and decides whether any correction or resubmission is appropriate.</span></li>
          <li><b>Measure incremental value</b><span>We compare findings against what the existing team and tools already knew. A finding is not useful merely because an AI can describe it.</span></li>
        </ol>
        <p>A document absent from our review packet is not automatically absent from the original claim. A payment received after a review is not automatically money recovered because of that review.</p>
      </section>

      <section className={styles.section + " " + styles.current} data-glass>
        <div>
          <p className={styles.eyebrow}>Current status</p>
          <h2>Research first. Product second.</h2>
          <p>We are testing the problem before committing to a product. Evidence that a dealer's existing process already handles this well is useful too—it tells us not to add another tool where one is not needed.</p>
          <p>This is an independent Zetbros initiative, not an OEM-endorsed program or a claim of a proven warranty-recovery track record. Participation and any later commercial terms would be agreed separately.</p>
        </div>
        <div className={styles.contact}>
          <span>Research contact</span>
          <strong>Zetbros support</strong>
          <ContactTrigger variant="research">Open the contact form</ContactTrigger>
        </div>
      </section>

      <footer className={styles.footer}>
        <div><a href="/">Zetbros</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
      </footer>
    </main>
  );
}
