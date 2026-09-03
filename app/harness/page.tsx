import type { Metadata } from "next";
import Link from "next/link";
import styles from "./harness.module.css";

export const metadata: Metadata = {
  title: "Harness — Extensible AI Desktop | Zetbros",
  description:
    "Harness is an extensible AI desktop built on DeepSeek Harness, designed around plugins, tools, workflows, managed changes and recovery.",
};

const pluginExamples = [
  ["GitHub", "Read repositories, issues, pull requests and development context."],
  ["Database", "Give approved workflows controlled access to business data."],
  ["Jira / Tickets", "Create, inspect and update work without leaving the AI workspace."],
  ["Email", "Search, classify, summarize and prepare work around shared mailboxes."],
  ["Browser", "Interact with approved web systems when APIs are not enough."],
  ["Company APIs", "Connect the internal systems that make your company unique."],
  ["Automation", "Trigger repeatable jobs, workflows and operational handoffs."],
  ["Knowledge", "Bring internal documentation and specialist context into the workspace."],
  ["UI", "Add purpose-built interfaces for a team or workflow."],
  ["Models", "Extend how the environment reaches model capabilities and routes."],
];

const lifecycle = [
  ["01", "Receive", "Open the plugin package and inspect its structure."],
  ["02", "Validate", "Check metadata, declared patch and package shape."],
  ["03", "Stage", "Prepare the plugin away from the live working profile."],
  ["04", "Install", "Resolve the plugin dependencies in managed storage."],
  ["05", "Build", "Run its declared build step when one is required."],
  ["06", "Re-check", "Validate the built output before activation."],
  ["07", "Snapshot", "Capture the current working state before changing it."],
  ["08", "Activate", "Apply the plugin and verify the composed configuration."],
  ["09", "Health", "Require the engine to start and respond successfully."],
  ["10", "Restart", "Re-verify after restart; restore the previous state on failure."],
];

const roles = [
  {
    eyebrow: "Developer Harness",
    title: "Code becomes part of the conversation.",
    tools: ["Git", "Terminal", "Code search", "Issues", "CI / build tools"],
  },
  {
    eyebrow: "Operations Harness",
    title: "Move work instead of moving data by hand.",
    tools: ["Email", "ERP", "Spreadsheets", "Reporting", "Automation"],
  },
  {
    eyebrow: "Support Harness",
    title: "Give the agent the context behind the ticket.",
    tools: ["Service desk", "Knowledge", "Customer data", "Diagnostics", "Escalations"],
  },
  {
    eyebrow: "Infrastructure Harness",
    title: "Bring systems, incidents and action into one workspace.",
    tools: ["Monitoring", "Assets", "Logs", "Runbooks", "Operational tools"],
  },
];

const benefits = [
  ["🧩", "Plugin extensibility", "Add capabilities without turning every new requirement into a core-app rewrite."],
  ["🔗", "Connect real tools", "Move from an AI that explains work to an environment that can participate in approved workflows."],
  ["🧠", "Specialized environments", "Shape different Harness setups around development, support, operations, research or internal IT."],
  ["🔄", "Evolve over time", "Change tools, models and workflows as the work changes instead of freezing the product around today's stack."],
  ["🛡️", "Managed changes", "Validate, stage, snapshot, health-check and recover plugin changes instead of blindly dropping code into a live profile."],
  ["🏗️", "Platform, not chatbot", "Keep the core focused while capabilities live as composable extensions around it."],
];

export default function HarnessPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <Link className={styles.brand} href="/">
          <span className={styles.brandMark}>Z</span>
          <span>Zetbros</span>
        </Link>
        <nav className={styles.nav} aria-label="Harness navigation">
          <a href="#plugins">Plugins</a>
          <a href="#benefits">Benefits</a>
          <a href="#how-it-works">How it works</a>
          <a href="#download">Download</a>
        </nav>
        <Link className={styles.backLink} href="/#software">Back to Zetbros</Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.heroGlow} aria-hidden="true" />
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>HARNESS · BY ZETBROS</p>
          <h1>Your AI shouldn&apos;t wait for the next feature.</h1>
          <p className={styles.heroLead}>
            Harness is an extensible AI desktop built on top of DeepSeek Harness. It gives you a stable working environment that can grow through plugins, tools and workflows — so the AI can become useful for the work <em>you</em> actually do.
          </p>
          <div className={styles.heroActions}>
            <a className={styles.primaryButton} href="#plugins">See what plugins unlock <span>→</span></a>
            <a className={styles.secondaryButton} href="#download">Download Harness</a>
          </div>
          <p className={styles.heroNote}>Built on DeepSeek Harness. Extended and packaged by Zetbros.</p>
        </div>

        <div className={styles.constellation} aria-label="Harness plugin architecture illustration">
          <div className={styles.orbitOne} />
          <div className={styles.orbitTwo} />
          <div className={styles.core}>
            <span className={styles.coreSmall}>HARNESS</span>
            <strong>AI Core</strong>
            <span>workspace · engine · recovery</span>
          </div>
          <div className={`${styles.pluginNode} ${styles.nodeGit}`}>Git</div>
          <div className={`${styles.pluginNode} ${styles.nodeMail}`}>Mail</div>
          <div className={`${styles.pluginNode} ${styles.nodeData}`}>Data</div>
          <div className={`${styles.pluginNode} ${styles.nodeTools}`}>Tools</div>
          <div className={`${styles.pluginNode} ${styles.nodeModels}`}>Models</div>
          <div className={`${styles.pluginNode} ${styles.nodeCompany}`}>Your API</div>
        </div>
      </section>

      <section className={styles.statement}>
        <p>A chatbot answers.</p>
        <p className={styles.statementStrong}>Harness becomes capable.</p>
        <span>Connect the systems. Add the tools. Shape the environment. Let the AI move from conversation to work.</span>
      </section>

      <section className={styles.section} id="benefits">
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>WHY HARNESS</p>
          <h2>Build the environment around the job — not the other way around.</h2>
          <p>
            Most AI applications ship with a fixed set of capabilities. When your next requirement appears, you wait for the application to catch up. Harness is designed around a different idea: keep the core dependable, then extend what it can do.
          </p>
        </div>
        <div className={styles.benefitGrid}>
          {benefits.map(([icon, title, text]) => (
            <article className={styles.benefitCard} key={title}>
              <span className={styles.benefitIcon}>{icon}</span>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={`${styles.section} ${styles.pluginSection}`} id="plugins">
        <div className={styles.pluginHeadline}>
          <p className={styles.kicker}>THE PLUGIN IDEA</p>
          <h2>The last integration shouldn&apos;t decide what your AI can do next.</h2>
          <p>
            A plugin adds a capability to the environment without forcing that capability into the Harness core. Different teams can therefore build radically different AI workspaces on top of the same foundation.
          </p>
        </div>

        <div className={styles.beforeAfter}>
          <div className={styles.beforeBox}>
            <span>Traditional app</span>
            <strong>Need a new capability?</strong>
            <p>Modify core → test everything → rebuild → redistribute.</p>
          </div>
          <div className={styles.transitionArrow}>→</div>
          <div className={styles.afterBox}>
            <span>Harness</span>
            <strong>Need a new capability?</strong>
            <p>Build extension → validate → activate → verify.</p>
          </div>
        </div>

        <div className={styles.exampleHeader}>
          <h3>What plugins could unlock</h3>
          <span>Examples of extension targets — not a claim that every connector ships bundled today.</span>
        </div>
        <div className={styles.pluginGrid}>
          {pluginExamples.map(([name, text]) => (
            <article className={styles.pluginCard} key={name}>
              <div className={styles.pluginDot} />
              <h4>{name}</h4>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.darkSection} id="how-it-works">
        <div className={styles.darkIntro}>
          <p className={styles.darkKicker}>MANAGED CHANGE</p>
          <h2>A plugin should earn its way into the working environment.</h2>
          <p>
            Harness Desktop&apos;s plugin flow is designed to inspect and prepare a plugin before touching the working profile, then verify the engine after activation. If the change does not survive verification, the previous snapshot can be restored.
          </p>
        </div>

        <div className={styles.lifecycle}>
          {lifecycle.map(([number, title, text]) => (
            <article className={styles.lifecycleStep} key={number}>
              <span>{number}</span>
              <div>
                <strong>{title}</strong>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </div>

        <div className={styles.failurePath}>
          <div>
            <span className={styles.failureLight} />
            <strong>Plugin change fails health or restart verification</strong>
          </div>
          <span className={styles.failureArrow}>→</span>
          <div className={styles.restoreBox}>
            <span>RECOVERY</span>
            <strong>Return to the previous working state.</strong>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionIntro}>
          <p className={styles.kicker}>ONE HARNESS. DIFFERENT JOBS.</p>
          <h2>The product stays familiar. The capability stack becomes yours.</h2>
          <p>
            The point of extensibility is not to create one enormous installation. It is to give each team the tools its work requires — and leave the rest out.
          </p>
        </div>
        <div className={styles.roleGrid}>
          {roles.map((role) => (
            <article className={styles.roleCard} key={role.eyebrow}>
              <span>{role.eyebrow}</span>
              <h3>{role.title}</h3>
              <div className={styles.toolTags}>
                {role.tools.map((tool) => <em key={tool}>{tool}</em>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.architectureSection}>
        <div className={styles.architectureCopy}>
          <p className={styles.kicker}>KEEP THE CORE SMALL</p>
          <h2>Capabilities grow around Harness — not inside an ever-growing monolith.</h2>
          <p>
            The core can stay focused on the workspace, runtime, plugin management and recovery. Optional capabilities can be composed around it as plugins and workflows.
          </p>
          <p>
            A company that never needs Salesforce should not carry Salesforce logic in its AI desktop. A development team should not inherit an operations stack it never uses. Modularity is not just cleaner engineering — it is how the environment stays understandable.
          </p>
        </div>
        <div className={styles.layerStack} aria-label="Harness architecture layers">
          <div className={styles.layerFour}><span>04</span><b>Business workflows</b><em>What the team actually needs done</em></div>
          <div className={styles.layerThree}><span>03</span><b>Plugins & connectors</b><em>Tools · APIs · data · models · UI</em></div>
          <div className={styles.layerTwo}><span>02</span><b>Harness Desktop</b><em>Workspace · lifecycle · recovery</em></div>
          <div className={styles.layerOne}><span>01</span><b>DeepSeek Harness</b><em>Composable engine foundation</em></div>
        </div>
      </section>

      <section className={styles.permissionSection}>
        <div>
          <p className={styles.kicker}>KNOW WHAT YOU ARE ENABLING</p>
          <h2>Plugins can declare the kind of access they expect.</h2>
          <p>
            Harness can surface declared capability categories such as filesystem, network, shell, models, UI and workspace before activation. That makes plugin review easier to reason about.
          </p>
          <p className={styles.caveat}>
            Important: these declarations are descriptive metadata, not a security sandbox. Plugins are trusted executable code and should be reviewed accordingly.
          </p>
        </div>
        <div className={styles.permissionCloud}>
          <span>filesystem</span><span>network</span><span>shell</span><span>models</span><span>ui</span><span>workspace</span>
        </div>
      </section>

      <section className={styles.futureSection}>
        <p className={styles.kicker}>WHERE THIS CAN GO</p>
        <h2>What if the AI could help build the capability it is missing?</h2>
        <p>
          DeepSeek Harness is composable by design. That creates a powerful direction for Harness: AI-assisted extension development, where a missing integration can become a plugin project rather than a permanent product limitation.
        </p>
        <div className={styles.futureFlow}>
          <span>“I need Harness to work with our internal system.”</span>
          <b>→</b>
          <span>Define the extension</span>
          <b>→</b>
          <span>Review + validate</span>
          <b>→</b>
          <span>Activate capability</span>
        </div>
        <small>This describes the architectural direction and extension model, not a promise that every plugin can currently be generated and installed autonomously.</small>
      </section>

      <section className={styles.downloadSection} id="download">
        <div className={styles.downloadCopy}>
          <p className={styles.kicker}>HARNESS DESKTOP</p>
          <h2>Don&apos;t wait for your AI application to support the next tool you need.</h2>
          <p className={styles.downloadLine}>Extend it.</p>
          <p>
            Harness Desktop currently targets Windows x64. The verified installer is not yet published inside the Zetbros website repository, so we are keeping the public download disabled rather than sending you to a dead file.
          </p>
        </div>
        <div className={styles.downloadCard}>
          <div className={styles.windowsMark}>⊞</div>
          <div>
            <span>Windows x64</span>
            <strong>Harness Desktop</strong>
            <p>Direct installer download will activate here once the release file is uploaded.</p>
          </div>
          <span className={styles.disabledDownload} aria-disabled="true">Installer upload pending</span>
          <Link className={styles.earlyAccess} href="/#contact">Ask about Harness <span>→</span></Link>
        </div>
      </section>

      <footer className={styles.footer}>
        <div>
          <strong>Harness</strong>
          <span>Built by Zetbros on top of the DeepSeek Harness foundation.</span>
        </div>
        <div className={styles.footerLinks}>
          <Link href="/">Zetbros</Link>
          <Link href="/#contact">Contact</Link>
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </div>
      </footer>
    </main>
  );
}
