import type { Metadata } from "next";
import Link from "next/link";
import Logo from "../logo";
import RevealBoxText from "../reveal-box-text";
import styles from "./harness.module.css";

export const metadata: Metadata = {
  title: "Harness — Your connected AI workspace | Zetbros",
  description: "A compact guide to Harness: an AI desktop built around plugins, tools and workflows. Production in progress.",
};

type IconName = "plugin" | "link" | "people" | "refresh" | "shield" | "layers" | "code" | "data" | "mail" | "globe" | "tool" | "book" | "model" | "window";
function Icon({ name }: { name: IconName }) {
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {name === "plugin" && <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><path d="M14 17.5h7m-3.5-3.5v7"/></>}
    {name === "link" && <><path d="m9 15 6-6m-6 9-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m0 6a4 4 0 0 0 6 0l4-4a4 4 0 0 0-6-6l-1 1"/></>}
    {name === "people" && <><circle cx="12" cy="8" r="3"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M4 9a2.5 2.5 0 0 0 0 5m16-5a2.5 2.5 0 0 1 0 5"/></>}
    {name === "refresh" && <><path d="M20 7v5h-5M4 17v-5h5"/><path d="M6.2 7a7 7 0 0 1 12-.8L20 9M4 15l1.8 2.8a7 7 0 0 0 12-.8"/></>}
    {name === "shield" && <><path d="m12 3 8 3v5c0 5-3 8-8 10-5-2-8-5-8-10V6l8-3Z"/><path d="m8 12 3 3 5-6"/></>}
    {name === "layers" && <><path d="m3 8 9-5 9 5-9 5-9-5Zm0 5 9 5 9-5M3 18l9 5 9-5"/></>}
    {name === "code" && <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m9 9-3 3 3 3m6-6 3 3-3 3m-2-7-2 8"/></>}
    {name === "data" && <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0"/></>}
    {name === "mail" && <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></>}
    {name === "globe" && <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>}
    {name === "tool" && <path d="M14.4 6.4a5 5 0 0 0-6.8 6.8L3 17.8a2.3 2.3 0 1 0 3.2 3.2l4.6-4.6a5 5 0 0 0 6.8-6.8l-3 3-3.2-.8-.8-3.2 3.8-3.2Z"/>}
    {name === "book" && <><path d="M12 5C8 2 4 3 3 4v15c3-2 6-2 9 0 3-2 6-2 9 0V4c-3-2-6-2-9 1v14"/></>}
    {name === "model" && <><rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 3v3m6-3v3M9 18v3m6-3v3M3 9h3m-3 6h3m12-6h3m-3 6h3M10 10h4v4h-4z"/></>}
    {name === "window" && <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="M3 9h18M8 9v11"/></>}
  </svg>;
}
function Arrow() { return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M4 12h15m-5-5 5 5-5 5"/></svg>; }

const benefits: {icon:IconName; title:string; text:string; from:string; to:string}[] = [
  {icon:"plugin",title:"Add a capability",text:"Extend the workspace with plugins as your needs grow.",from:"Workspace",to:"New tools"},
  {icon:"link",title:"Connect your tools",text:"Bring useful systems and context into one place.",from:"Your tools",to:"Harness"},
  {icon:"people",title:"Make it your own",text:"Choose the tools that fit your work or your team.",from:"Your work",to:"Your setup"},
  {icon:"refresh",title:"Keep improving",text:"Update tools, models and workflows over time.",from:"Feedback",to:"Better tools"},
  {icon:"shield",title:"Review each change",text:"Check plugins, save a snapshot and verify activation.",from:"Review",to:"Activate"},
  {icon:"layers",title:"Keep things focused",text:"A small core, with optional capabilities around it.",from:"Core",to:"Extensions"},
];
const plugins: {icon:IconName; name:string; text:string}[] = [
  {icon:"code",name:"GitHub",text:"Code and project context"},
  {icon:"data",name:"Databases",text:"Approved business data"},
  {icon:"tool",name:"Tickets",text:"Issues and service requests"},
  {icon:"mail",name:"Email",text:"Messages and shared inboxes"},
  {icon:"globe",name:"Browser",text:"Approved web workflows"},
  {icon:"link",name:"Company APIs",text:"Your internal systems"},
  {icon:"refresh",name:"Automation",text:"Repeatable tasks"},
  {icon:"book",name:"Knowledge",text:"Documents and context"},
  {icon:"window",name:"Interfaces",text:"Views for your workflow"},
  {icon:"model",name:"Models",text:"AI capabilities"},
];
const stages = [
  ["Review","Receive and validate the plugin."],
  ["Prepare","Stage, install, build and re-check."],
  ["Save","Snapshot the working state."],
  ["Activate","Apply the verified configuration."],
  ["Verify","Check health and restart; recover if needed."],
];

export default function HarnessPage() {
  return <main className={styles.page}>
    <header className={styles.header}>
      <Logo small />
      <nav className={styles.nav} aria-label="Harness navigation"><a href="#benefits">Overview</a><a href="#plugins">Plugins</a><a href="#how-it-works">How it works</a><a href="#download">Availability</a></nav>
      <Link className={styles.backLink} href="/#software">Back to Zetbros</Link>
    </header>

    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <RevealBoxText as="h1" text="Harness" variant="hero" className={styles.heroTitle} />
        <p className={styles.heroStatement}>Your AI workspace, connected.</p>
        <p className={styles.heroLead}>Bring your tools, knowledge and workflows together. Shape the workspace around what you need to do.</p>
        <div className={styles.heroActions}><a className={styles.primaryButton} href="#plugins">Explore the idea <Arrow /></a><span className={styles.status}><span aria-hidden="true" />Production in progress</span></div>
        <p className={styles.heroNote}>Built by Zetbros on the DeepSeek Harness foundation.</p>
      </div>
      <figure className={styles.workspaceMap} aria-label="Tools, knowledge and models connect through plugins to your Harness workspace">
        <div className={styles.mapInputs}><span><Icon name="tool" />Tools</span><span><Icon name="book" />Knowledge</span><span><Icon name="model" />Models</span></div>
        <div className={styles.mapConnector} aria-hidden="true" />
        <div className={styles.mapBridge}><Icon name="plugin" /><span>Plugins & connections</span></div>
        <div className={styles.mapStem} aria-hidden="true" />
        <div className={styles.mapCore}><Icon name="window" /><div><strong>Harness</strong><span>Your workspace. Your way.</span></div></div>
        <figcaption>Useful capabilities, brought together.</figcaption>
      </figure>
    </section>

    <section className={styles.section} id="benefits">
      <div className={styles.sectionIntro}><RevealBoxText as="h2" text="A workspace that grows with you." className={styles.sectionTitle} /><p>Six simple ideas behind Harness.</p></div>
      <div className={styles.benefitGrid}>{benefits.map(item=><article className={styles.benefit} key={item.title}>
        <div className={styles.benefitHeading}><Icon name={item.icon}/><h3>{item.title}</h3></div>
        <p>{item.text}</p><div className={styles.miniFlow}><span>{item.from}</span><Arrow/><span>{item.to}</span></div>
      </article>)}</div>
    </section>

    <section className={`${styles.section} ${styles.pluginSection}`} id="plugins">
      <div className={styles.sectionIntro}><RevealBoxText as="h2" text="Bring your tools together." className={styles.sectionTitle}/><p>Examples of what plugins could connect. Included connectors will be confirmed at release.</p></div>
      <div className={styles.pluginGrid}>{plugins.map(item=><div className={styles.plugin} key={item.name}><Icon name={item.icon}/><div><h3>{item.name}</h3><p>{item.text}</p></div></div>)}</div>
      <div className={styles.useCases} aria-label="Example workspaces"><div><b>Development</b><span>Code, issues, builds</span></div><div><b>Operations</b><span>Email, reporting, tasks</span></div><div><b>Support</b><span>Tickets, knowledge, context</span></div><div><b>Infrastructure</b><span>Monitoring, logs, runbooks</span></div></div>
    </section>

    <section className={`${styles.section} ${styles.lifecycleSection}`} id="how-it-works">
      <div className={styles.sectionIntro}><RevealBoxText as="h2" text="A considered path for every plugin." className={styles.sectionTitle}/><p>Prepare changes before they reach your working environment.</p></div>
      <ol className={styles.lifecycle}>{stages.map(([title,text],i)=><li key={title}><span className={styles.stageNumber}>{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol>
      <div className={styles.recovery}><Icon name="refresh"/><p>If a change fails verification, restore the previous working state.</p></div>
    </section>

    <section className={`${styles.section} ${styles.detailsSection}`}>
      <div><h2>Small core. Room to grow.</h2><div className={styles.layers} aria-label="Harness architecture"><div><Icon name="people"/><span>Workflows</span><small>The work you want to do</small></div><div><Icon name="plugin"/><span>Plugins</span><small>Tools, data and connections</small></div><div><Icon name="window"/><span>Harness Desktop</span><small>Workspace and recovery</small></div><div><Icon name="layers"/><span>DeepSeek Harness</span><small>The engine foundation</small></div></div></div>
      <div className={styles.accessCopy}><h2>Know what you enable.</h2><p>Review a plugin’s declared access before activation, including files, network, shell, models and workspace.</p><p className={styles.accessNote}><Icon name="shield"/><span>Plugins run trusted code. Access declarations help with review; they do not create a security sandbox.</span></p><details className={styles.futureDetails}><summary>What’s next for Harness?</summary><p>We’re exploring AI-assisted extension development: turning a missing integration into a plugin project. This is a direction for the product, not a currently available autonomous feature.</p></details></div>
    </section>

    <section className={styles.availability} id="download"><div><h2>Harness is taking shape.</h2><p>A Windows x64 release is in development. The download will appear here when it’s ready.</p></div><div className={styles.availabilityActions}><span className={styles.status}><span aria-hidden="true"/>Production in progress</span><Link className={styles.primaryButton} href="/#contact">Share an idea for Harness <Arrow/></Link></div></section>
    <footer className={styles.footer}><p>Harness by Zetbros</p><div><Link href="/">Zetbros</Link><Link href="/#contact">Contact</Link><Link href="/privacy">Privacy</Link><Link href="/terms">Terms</Link></div></footer>
  </main>;
}
