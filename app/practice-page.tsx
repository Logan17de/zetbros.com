import Logo from "./logo";
import { ContactTrigger } from "./contact-dialog";
import styles from "./practice-page.module.css";

export type PracticeSolution = {
  id: string;
  title: string;
  summary: string;
  problem: string;
  solution: string;
  detail: string;
  flow: string[];
  build: string[];
  deliverables: string[];
  outcome: string;
  control?: string;
};

type RelatedLink = { href: string; title: string; text: string };
type PracticePageProps = {
  category: string;
  title: string;
  lead: string;
  availability?: string;
  solutions: PracticeSolution[];
  related: RelatedLink[];
};

export default function PracticePage({ category, title, lead, availability, solutions, related }: PracticePageProps) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <div className={styles.brand}><Logo small /></div>
          <nav className={styles.nav} aria-label="Practice page navigation">
            <a href="/#software">Products</a><a href="/#business">Business</a><a href="/#research">Research</a><a href="/#about">About</a><ContactTrigger>Contact</ContactTrigger>
          </nav>
          <a className={styles.backLink} href="/">← Home</a>
        </div>
      </header>
      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}><a href="/">Zetbros</a><span>/</span><span>{category} in practice</span></div>
          <p className={styles.kicker}>{category} · Common business problems and project patterns</p>
          <h1>{title}</h1>
          <p className={styles.heroLead}>{lead}</p>
          <p>These are example project approaches, not customer case studies or claims of completed deployments. Scope and availability are agreed before an engagement.</p>
          {availability && <span className={styles.availability}>{availability}</span>}
          <div className={styles.index} data-glass>
            <span className={styles.indexLabel}>On this page</span>
            <div className={styles.indexLinks}>{solutions.map((solution, index) => <a href={`#${solution.id}`} key={solution.id}>{String(index + 1).padStart(2, "0")} · {solution.title}</a>)}</div>
          </div>
        </div>
      </section>
      <section className={styles.solutions}>
        <div className={styles.container}>
          {solutions.map((solution, index) => (
            <article className={styles.solution} id={solution.id} key={solution.id}>
              <div className={styles.solutionTop}>
                <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>
                <div><div className={styles.solutionTitleRow}><h2>{solution.title}</h2></div><p className={styles.summary}>{solution.summary}</p></div>
              </div>
              <div className={styles.problem} data-glass><span className={styles.label}>Common business problem</span><p>{solution.problem}</p></div>
              <div className={styles.twoCol}>
                <div className={styles.block}><h3>Possible Zetbros approach</h3><p>{solution.solution}</p></div>
                <div className={styles.block}><h3>How we approach it</h3><p>{solution.detail}</p></div>
              </div>
              <div className={styles.flowBlock} data-glass>
                <h3>Typical project flow</h3>
                <div className={styles.flow}>{solution.flow.map((step, stepIndex) => <span key={`${solution.id}-${step}`} style={{ display: "contents" }}><span className={styles.flowStep}>{step}</span>{stepIndex < solution.flow.length - 1 && <span className={styles.flowArrow}>→</span>}</span>)}</div>
              </div>
              <div className={styles.lists}>
                <div className={styles.listBlock}><h3>What we can build or implement</h3><ul>{solution.build.map(item => <li key={item}>{item}</li>)}</ul></div>
                <div className={styles.listBlock}><h3>Typical deliverables</h3><ul>{solution.deliverables.map(item => <li key={item}>{item}</li>)}</ul></div>
              </div>
              {solution.control && <div className={styles.control}><h3>Controls and boundaries</h3><p>{solution.control}</p></div>}
              <div className={styles.outcome}><h3>Intended outcome</h3><p>{solution.outcome}</p></div>
              <ContactTrigger className={styles.solutionCta} subject={`${category} — ${solution.title}`}>Discuss this project <span aria-hidden="true">→</span></ContactTrigger>
            </article>
          ))}
        </div>
      </section>
      <section className={styles.related}>
        <div className={styles.container}><div className={styles.relatedGrid}>
          <div><p className={styles.kicker}>Connected capabilities</p><h2>One project often leads naturally into the next.</h2></div>
          <div className={styles.relatedCards} data-glass>{related.map(item => <a href={item.href} key={item.href}>{item.title}<span>{item.text} →</span></a>)}</div>
        </div></div>
      </section>
      <section className={styles.cta}>
        <div className={styles.container}><div className={styles.ctaBox} data-glass>
          <p className={styles.kicker}>Have a real problem to solve?</p>
          <h2>Tell us about the work. We’ll start with a conversation.</h2>
          <p>We scope projects around your systems, constraints, security requirements and operating process rather than forcing a generic package onto every company. Please do not include confidential records or credentials in an initial enquiry.</p>
          <ContactTrigger className={styles.primary}>Talk to Zetbros</ContactTrigger>
        </div></div>
      </section>
      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <div className={styles.footerLinks}><a href="/">Zetbros</a><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        </div>
      </footer>
    </main>
  );
}
