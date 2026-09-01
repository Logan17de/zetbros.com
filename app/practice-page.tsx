import Logo from "./logo";
import styles from "./practice-page.module.css";

export type PracticeSolution = {
  id: string;
  icon: string;
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

type RelatedLink = {
  href: string;
  title: string;
  text: string;
};

type PracticePageProps = {
  category: string;
  title: string;
  lead: string;
  availability?: string;
  solutions: PracticeSolution[];
  related: RelatedLink[];
};

export default function PracticePage({
  category,
  title,
  lead,
  availability,
  solutions,
  related,
}: PracticePageProps) {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <a className={styles.brand} href="/" aria-label="Zetbros home">
            <Logo small />
          </a>
          <nav className={styles.nav} aria-label="Practice page navigation">
            <a href="/#ai">AI</a>
            <a href="/#infrastructure">Infrastructure</a>
            <a href="/#automation">Automation</a>
            <a href="/#software">Software</a>
            <a href="/#support">Support</a>
            <a href="/#contact">Contact</a>
          </nav>
          <a className={styles.backLink} href="/">← Home</a>
        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.container}>
          <div className={styles.breadcrumb}>
            <a href="/">Zetbros</a><span>/</span><span>{category} in practice</span>
          </div>
          <p className={styles.kicker}>{category} · Real-world problems and solutions</p>
          <h1>{title}</h1>
          <p className={styles.heroLead}>{lead}</p>
          {availability && <span className={styles.availability}>{availability}</span>}

          <div className={styles.index}>
            <span className={styles.indexLabel}>On this page</span>
            <div className={styles.indexLinks}>
              {solutions.map((solution, index) => (
                <a href={`#${solution.id}`} key={solution.id}>
                  {String(index + 1).padStart(2, "0")} · {solution.title}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.solutions}>
        <div className={styles.container}>
          {solutions.map((solution, index) => (
            <article className={styles.solution} id={solution.id} key={solution.id}>
              <div className={styles.solutionTop}>
                <div className={styles.number}>{String(index + 1).padStart(2, "0")}</div>
                <div>
                  <div className={styles.solutionTitleRow}>
                    <span className={styles.solutionIcon} aria-hidden="true">{solution.icon}</span>
                    <h2>{solution.title}</h2>
                  </div>
                  <p className={styles.summary}>{solution.summary}</p>
                </div>
              </div>

              <div className={styles.problem}>
                <span className={styles.label}>Real-world problem</span>
                <p>{solution.problem}</p>
              </div>

              <div className={styles.twoCol}>
                <div className={styles.block}>
                  <h3>Zetbros solution</h3>
                  <p>{solution.solution}</p>
                </div>
                <div className={styles.block}>
                  <h3>How we approach it</h3>
                  <p>{solution.detail}</p>
                </div>
              </div>

              <div className={styles.flowBlock}>
                <h3>Typical project flow</h3>
                <div className={styles.flow}>
                  {solution.flow.map((step, stepIndex) => (
                    <span key={`${solution.id}-${step}`} style={{ display: "contents" }}>
                      <span className={styles.flowStep}>{step}</span>
                      {stepIndex < solution.flow.length - 1 && <span className={styles.flowArrow}>→</span>}
                    </span>
                  ))}
                </div>
              </div>

              <div className={styles.lists}>
                <div className={styles.listBlock}>
                  <h3>What we can build or implement</h3>
                  <ul>{solution.build.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
                <div className={styles.listBlock}>
                  <h3>Typical deliverables</h3>
                  <ul>{solution.deliverables.map((item) => <li key={item}>{item}</li>)}</ul>
                </div>
              </div>

              {solution.control && (
                <div className={styles.control}>
                  <h3>Controls and boundaries</h3>
                  <p>{solution.control}</p>
                </div>
              )}

              <div className={styles.outcome}>
                <h3>Practical outcome</h3>
                <p>{solution.outcome}</p>
              </div>

              <a className={styles.solutionCta} href="/#contact">
                Discuss this project <span>→</span>
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.related}>
        <div className={styles.container}>
          <div className={styles.relatedGrid}>
            <div>
              <p className={styles.kicker}>Connected capabilities</p>
              <h2>One project often leads naturally into the next.</h2>
            </div>
            <div className={styles.relatedCards}>
              {related.map((item) => (
                <a href={item.href} key={item.href}>
                  {item.title}<span>{item.text} →</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className={styles.cta}>
        <div className={styles.container}>
          <div className={styles.ctaBox}>
            <p className={styles.kicker}>Have a real problem to solve?</p>
            <h2>Show us the current environment. We’ll start from what actually exists.</h2>
            <p>We scope projects around your systems, constraints, security requirements and operating process rather than forcing a generic package onto every company.</p>
            <a className={styles.primary} href="/#contact">Talk to Zetbros</a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={`${styles.container} ${styles.footerInner}`}>
          <span>© 2026 Zetbros</span>
          <div className={styles.footerLinks}>
            <a href="/privacy">Privacy</a>
            <a href="/terms">Terms</a>
            <a href="/#contact">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
