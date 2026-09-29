import RevealBoxText from "./reveal-box-text";
import styles from "./prospect.module.css";

function BusinessIcon({ kind }: { kind: "ai" | "automation" | "infrastructure" }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {kind === "ai" && <><rect x="6" y="6" width="12" height="12" rx="2" /><path d="M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3M10 10h4v4h-4z" /></>}
    {kind === "automation" && <><circle cx="12" cy="4" r="2" /><circle cx="5" cy="18" r="2" /><circle cx="19" cy="18" r="2" /><path d="M12 6v5m0 0-7 5m7-5 7 5" /></>}
    {kind === "infrastructure" && <><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><path d="M8 7h.01M8 17h.01M12 7h5M12 17h5" /></>}
  </svg>;
}

const businessSolutions = [
  { kind: "ai" as const, title: "AI systems", href: "/ai-in-practice", text: "Knowledge assistants, model serving and controlled integrations, scoped around your data and the work that needs doing." },
  { kind: "automation" as const, title: "Automation", href: "/automation-in-practice", text: "Document processing and connected workflows that reduce repetitive steps while keeping people in control of important decisions." },
  { kind: "infrastructure" as const, title: "Infrastructure", href: "/infrastructure-in-practice", text: "Deployment, technical handover and on-site support for agreed projects. Physical and on-site services are currently limited to Japan." },
];

export function BusinessSolutions() {
  return <section className={`section ${styles.anchor}`} id="business" aria-labelledby="business-title">
    <div className="container">
      <p className="eyebrow">For businesses</p>
      <div id="business-title"><RevealBoxText as="h2" text="Practical systems for real business work." /></div>
      <p className={styles.intro}>We help companies explore operational problems and design practical AI, automation, software and infrastructure projects around the systems they already use.</p>
      <div className={styles.businessGrid}>
        {businessSolutions.map(item => <article className={styles.businessCard} key={item.kind}>
          <span className={styles.icon}><BusinessIcon kind={item.kind} /></span>
          <h3>{item.title}</h3><p>{item.text}</p>
          <a className={styles.textLink} href={item.href}>Explore {item.title.toLowerCase()} <span aria-hidden="true">→</span></a>
        </article>)}
      </div>
      <p className={styles.small}>These are project capabilities and example approaches, not customer case studies. Scope and availability are agreed before an engagement.</p>
    </div>
  </section>;
}

export function ResearchSummary() {
  return <section className={`section ${styles.anchor}`} id="research" aria-labelledby="research-title">
    <div className="container">
      <div className={styles.researchBand}>
        <div>
          <p className="eyebrow">Current research</p>
          <h2 id="research-title">Equipment warranty recovery.</h2>
          <p>Could a dealer-controlled review of returned or short-paid manufacturer claims reveal useful next steps beyond what existing staff and software already catch? We are speaking with equipment dealers to find out.</p>
          <a className="button buttonPrimary" href="/equipment-warranty-research">Explore the research <span aria-hidden="true"> →</span></a>
        </div>
        <div className={styles.researchAside}>
          <span className={styles.status}>Research / validation</span>
          <p>Not a launched product. Not a recovery guarantee.</p>
          <p>Start with a 20-minute conversation. No customer documents or portal access needed.</p>
        </div>
      </div>
    </div>
  </section>;
}

export function AboutZetbros() {
  return <section className={`section ${styles.anchor}`} id="about" aria-labelledby="about-title">
    <div className={`container ${styles.aboutGrid}`}>
      <div>
        <p className="eyebrow">Who we are</p>
        <h2 id="about-title">A small studio. A practical approach.</h2>
        <p className={styles.intro}>Zetbros is an independent, founder-led product and technology studio. We build our own products and investigate real operational problems that could benefit from better software, AI and automation.</p>
        <p className={styles.small}>AIKO, Harness and our research projects share that purpose. A research initiative is not a claim that a finished product or proven customer outcome already exists.</p>
      </div>
      <div className={styles.founder}>
        <span className={styles.monogram} aria-hidden="true">L</span>
        <div><h3>Logan</h3><p>Founder · Product &amp; AI engineering</p></div>
        <p className={styles.founderNote}>Leading the work from the initial problem and prototype through testing and practical implementation.</p>
        <a className={styles.textLink} href="mailto:logan@zetbros.com">logan@zetbros.com</a>
        <a className={styles.textLink} href="https://github.com/Logan17de">Explore Logan’s work on GitHub <span aria-hidden="true">→</span></a>
      </div>
    </div>
  </section>;
}
