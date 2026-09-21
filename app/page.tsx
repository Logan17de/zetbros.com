import ContactForm from "./contact-form";
import Logo from "./logo";
import RevealBoxText from "./reveal-box-text";
import ScrollRevealMotion from "./scroll-reveal-motion";

const services = [
 {id:"purpose-learning",icon:"ai",tone:"blue",title:"Help people learn",text:"Build tools that make learning part of everyday life."},
 {id:"purpose-everyday",icon:"apps",tone:"cyan",title:"Solve everyday problems",text:"Start with the things people wish worked better."},
 {id:"purpose-create",icon:"code",tone:"orange",title:"Make room for ideas",text:"Turn a useful idea into something people can try."},
 {id:"purpose-people",icon:"company",tone:"green",title:"Build with people",text:"Let real needs and honest feedback guide the work."},
 {id:"purpose-tools",icon:"tool",tone:"violet",title:"Make technology useful",text:"Give people practical ways to learn, create and get things done."},
 {id:"purpose-society",icon:"globe",tone:"blue",title:"Contribute to society",text:"Put what we build into the world with a useful purpose."},
];
const process = [
 ["01","Listen","Understand the idea, the problem and the people it affects."],
 ["02","Explore","Find a practical way to make things better."],
 ["03","Build","Turn the idea into a product people can use."],
 ["04","Share","Put useful work into the hands of people."],
 ["05","Improve","Learn from feedback and keep making it better."],
];
type IconName =
  | "ai"
  | "shield"
  | "flow"
  | "tool"
  | "server"
  | "code"
  | "cloud"
  | "bot"
  | "globe"
  | "gpu"
  | "company"
  | "lock"
  | "apps";

function Icon({ name }: { name: IconName }) {
  const common = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...common}>
      {name === "ai" && <><path d="M9 5a3 3 0 0 0-5 2.2A3.4 3.4 0 0 0 4.6 14 3 3 0 0 0 9 18.6V5Z"/><path d="M15 5a3 3 0 0 1 5 2.2 3.4 3.4 0 0 1-.6 6.8 3 3 0 0 1-4.4 4.6V5Z"/><path d="M9 8H7m2 4H6.5M9 16H7m8-8h2m-2 4h2.5M15 16h2"/></>}
      {name === "shield" && <><path d="M12 3 20 6v5c0 5.1-3.3 8.3-8 10-4.7-1.7-8-4.9-8-10V6l8-3Z"/><path d="m9 12 2 2 4-4"/></>}
      {name === "flow" && <><circle cx="12" cy="4" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="19" cy="18" r="2"/><path d="M12 6v5m0 0-7 5m7-5 7 5"/></>}
      {name === "tool" && <path d="M14.4 6.4a5 5 0 0 0-6.8 6.8L3 17.8a2.3 2.3 0 1 0 3.2 3.2l4.6-4.6a5 5 0 0 0 6.8-6.8l-3 3-3.2-.8-.8-3.2 3.8-3.2Z"/>}
      {name === "server" && <><rect x="4" y="4" width="16" height="6" rx="2"/><rect x="4" y="14" width="16" height="6" rx="2"/><path d="M8 7h.01M8 17h.01M12 7h5M12 17h5"/></>}
      {name === "code" && <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m9 9-3 3 3 3m6-6 3 3-3 3m-2-7-2 8"/></>}
      {name === "cloud" && <path d="M7 18h10a4 4 0 0 0 .8-7.9A6 6 0 0 0 6.4 8.4 4.8 4.8 0 0 0 7 18Z"/>}
      {name === "bot" && <><rect x="5" y="8" width="14" height="10" rx="3"/><path d="M12 5V3m-4 9h.01m8 0h.01M9 15h6"/></>}
      {name === "globe" && <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>}
      {name === "gpu" && <><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 3v3m3-3v3m3-3v3M9 18v3m3-3v3m3-3v3M3 9h3m-3 3h3m-3 3h3m12-6h3m-3 3h3m-3 3h3"/></>}
      {name === "company" && <><circle cx="12" cy="8" r="3"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M4 9a2.5 2.5 0 0 0 0 5m16-5a2.5 2.5 0 0 1 0 5"/></>}
      {name === "lock" && <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>}
      {name === "apps" && <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>}
    </svg>
  );
}

function FlowCard({ className = "", icon, label, tone = "blue" }: { className?: string; icon: IconName; label: string; tone?: string }) {
  return (
    <div className={`flowCard ${className}`}>
      <span className={`miniIcon ${tone}`}><Icon name={icon} /></span>
      <b>{label}</b>
    </div>
  );
}


export default function Home() {
 return (
  <main id="top">
   <ScrollRevealMotion />
   <header className="siteHeader"><div className="container navWrap navWithoutLogo">
    <nav aria-label="Primary navigation"><a href="#ai">Our purpose</a><a href="#infrastructure">For society</a><a href="#automation">Ideas</a><a href="#software">Products</a><a href="#support">Feedback</a><a href="#contact">Contact</a></nav>
    <a className="button buttonGhost navCta" href="#contact">Share an idea</a>
   </div></header>
   <section className="hero section"><div className="container">
    <div className="heroLogoStage" aria-label="Zetbros"><Logo hero /></div>
    <div className="heroGrid"><div className="heroCopy">
     <p className="eyebrow">Useful products. A shared purpose.</p>
     <RevealBoxText as="h1" text="Built for people. Shared with society." variant="hero" delayMs={260} wordGapMs={130} />
     <p className="lede">Zetbros builds products that help people learn, create and get things done. We turn ideas and everyday problems into useful technology, and put it into the world for people to use.</p>
     <div className="actions"><a className="button buttonPrimary" href="#software">Explore our products</a><a className="button buttonGhost" href="#contact">Share an idea or problem</a></div>
    </div><div className="heroDiagram productFlow" aria-label="From your ideas to products that help people">
     <ol className="productFlowSteps">
      <li><span className="flowStepIcon violet"><Icon name="flow" /></span><h3>Your ideas</h3><p>A problem worth solving.</p></li>
      <li><span className="flowStepIcon blue"><Icon name="code" /></span><h3>We build</h3><p>Thoughtful, useful products.</p></li>
      <li><span className="flowStepIcon green"><Icon name="globe" /></span><h3>People benefit</h3><p>Made for everyday life.</p></li>
     </ol>
     <div className="flowProducts">
      <a className="flowProduct" href="https://aiko.zetbros.com"><span className="miniIcon green"><Icon name="gpu" /></span><span><b>AIKO</b><small>Japanese learning</small></span><svg className="flowProductArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg></a>
      <a className="flowProduct" href="/harness"><span className="miniIcon blue"><Icon name="server" /></span><span><b>Harness</b><small>Production in progress</small></span><svg className="flowProductArrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><path d="M5 12h14m-5-5 5 5-5 5" /></svg></a>
     </div>
    </div></div>
   </div></section>
   <section className="section servicesSection" id="services"><div className="container">
    <p className="eyebrow">What we do</p><RevealBoxText as="h2" text="Build useful things. Make a difference." />
    <div className="serviceGrid">{services.map(service=><article className="serviceCard" id={service.id} key={service.title}><span className={`serviceIcon ${service.tone}`}><Icon name={service.icon as IconName} /></span><div><h3>{service.title}</h3><p>{service.text}</p></div></article>)}</div>
   </div></section>
   <section className="section" id="ai"><div className="container aiPanel"><div className="aiCopy">
    <p className="eyebrow">Our purpose</p><RevealBoxText as="h2" text="Technology that gives something back." />
    <p>We believe the things we build should contribute something useful to society. A product can help someone learn, make a difficult task easier, or give an idea a place to begin.</p>
    <ul className="checkList"><li>Real needs before features</li><li>Products people can understand and use</li><li>Ideas welcomed from everyone</li><li>Learning from everyday problems</li><li>Improvement shaped by feedback</li></ul>
   </div><div className="architecture" aria-label="How an idea becomes a useful product">
    <FlowCard icon="flow" label="People" tone="blue" /><span className="downArrow" aria-hidden="true">↓</span><FlowCard icon="ai" label="Ideas & problems" tone="green" /><span className="downArrow" aria-hidden="true">↓</span>
    <div className="archSplit"><FlowCard icon="bot" label="Build" tone="green" /><FlowCard icon="tool" label="Improve" tone="cyan" /></div><span className="downArrow" aria-hidden="true">↓</span><FlowCard icon="globe" label="Useful products" tone="blue" />
   </div></div></section>
   <section className="section capabilitySection capabilitySectionAlt" id="infrastructure"><div className="container capabilityPanel">
    <div className="capabilityCopy"><p className="eyebrow">For society</p><RevealBoxText as="h2" text="Small problems can inspire meaningful products." /><p>We look for opportunities to make everyday life a little better. The starting point can be a frustrating task, a learning challenge, or something you wish existed.</p></div>
    <div className="capabilityPoints"><div className="capabilityPoint"><b>Learning</b><p>Help people build knowledge and confidence, one step at a time.</p></div><div className="capabilityPoint"><b>Everyday work</b><p>Make useful tools easier to reach and everyday tasks easier to do.</p></div><div className="capabilityPoint"><b>Creativity</b><p>Give people space to explore and turn their ideas into something real.</p></div><div className="capabilityPoint"><b>Shared progress</b><p>Build with a purpose that reaches beyond the product itself.</p></div></div>
   </div></section>
   <section className="section capabilitySection" id="automation"><div className="container capabilityPanel">
    <div className="capabilityCopy"><p className="eyebrow">Ideas welcome</p><RevealBoxText as="h2" text="You bring the problem. We listen." /><p>You don’t need a finished pitch or a technical background. Tell us what could be better, who it would help, or what you wish someone would build.</p></div>
    <div className="capabilityPoints"><div className="capabilityPoint"><b>An idea</b><p>Something new that you think could help people.</p></div><div className="capabilityPoint"><b>A problem</b><p>A frustration you keep running into in everyday life.</p></div><div className="capabilityPoint"><b>A different perspective</b><p>A need that current tools don’t seem to understand.</p></div><div className="capabilityPoint"><b>A conversation</b><p>Share what you’re thinking, even if it isn’t fully formed yet.</p></div></div>
   </div></section>
   <section className="section productsSection" id="software"><div className="container">
    <p className="eyebrow">Our products</p><RevealBoxText as="h2" text="Two products. One useful purpose." /><p className="lede">Meet AIKO and Harness, the products we’re building at Zetbros.</p>
    <div className="productGrid">
     <article className="productCard productGreen"><div className="productBadge">A</div><div><h3>AIKO</h3><p>Japanese learning with lessons, practice and progress in one place.</p><a href="https://aiko.zetbros.com">Visit AIKO <span aria-hidden="true">→</span></a></div></article>
     <article className="productCard productBlue"><div className="productBadge">H</div><div><h3>Harness</h3><p>An AI workspace built around tools, plugins and workflows. <strong>Production in progress.</strong></p><a href="/harness">Meet Harness <span aria-hidden="true">→</span></a></div></article>
     <article className="productCard productOrange"><div className="productBadge codeBadge">&lt;/&gt;</div><div><h3>What should we build next?</h3><p>Your idea or everyday problem could inspire what comes next.</p><a href="#contact">Share with us <span aria-hidden="true">→</span></a></div></article>
    </div>
   </div></section>
   <section className="section capabilitySection capabilitySectionAlt" id="support"><div className="container capabilityPanel">
    <div className="capabilityCopy"><p className="eyebrow">Your voice matters</p><RevealBoxText as="h2" text="Better products begin with listening." /><p>Our products should grow around the people who use them. Tell us what works, what feels difficult and what would make them more useful to you.</p></div>
    <div className="capabilityPoints"><div className="capabilityPoint"><b>AIKO feedback</b><p>Tell us about your experience learning with AIKO.</p></div><div className="capabilityPoint"><b>Harness ideas</b><p>Share the tools or workflows you would like an AI workspace to help with.</p></div><div className="capabilityPoint"><b>Something that isn’t working</b><p>Help us understand where a product gets in your way.</p></div><div className="capabilityPoint"><b>A useful improvement</b><p>Small changes can make a meaningful difference.</p></div></div>
   </div></section>
   <section className="section processSection" id="about"><div className="container"><p className="eyebrow">How we build</p><RevealBoxText as="h2" text="From an everyday idea to a useful product." /><div className="processGrid">{process.map(([n,title,text])=><article className="processStep" key={n}><div className="stepTop"><span>{n}</span></div><h3>{title}</h3><p>{text}</p></article>)}</div></div></section>
   <section className="section contactSection" id="contact"><div className="container"><ContactForm /></div></section>
   <footer className="footer"><div className="container footerTop"><Logo small /><div className="footerLinks"><a href="#ai">Our purpose</a><a href="#software">Products</a><a href="#automation">Ideas</a><a href="#support">Feedback</a><a href="#contact">Contact</a></div><div className="legalLinks"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div></div><div className="container copyright">© 2026 Zetbros · Building useful things, together.</div></footer>
  </main>
 );
}
