import ContactForm from "./contact-form";
import RevealText from "./reveal-text";

const services = [
  {
    icon: "ai",
    tone: "blue",
    title: "AI Infrastructure",
    text: "Deploy and optimize AI systems for your own environment.",
  },
  {
    icon: "shield",
    tone: "cyan",
    title: "Private & Local AI",
    text: "Run capable AI models inside your company’s infrastructure.",
  },
  {
    icon: "flow",
    tone: "orange",
    title: "Automation",
    text: "Turn repetitive workflows into reliable automated systems.",
  },
  {
    icon: "tool",
    tone: "green",
    title: "IT Smart Hands",
    text: "Hands-on technical support for devices, servers and infrastructure.",
  },
  {
    icon: "server",
    tone: "violet",
    title: "Infrastructure",
    text: "Rack & stack, networking, deployments and on-site support.",
  },
  {
    icon: "code",
    tone: "blue",
    title: "Web & Software",
    text: "Build, integrate and maintain websites, extensions and internal software.",
  },
];

const process = [
  ["01", "Understand", "We learn your goals, challenges and environment."],
  ["02", "Design", "We design the right architecture and approach."],
  ["03", "Build", "We build, test and refine with quality and care."],
  ["04", "Deploy", "We deploy smoothly into your environment with confidence."],
  ["05", "Support", "We stay with you to support, optimize and improve."],
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
  | "apps"
  | "chat";

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
      {name === "tool" && <><path d="M14.4 6.4a5 5 0 0 0-6.8 6.8L3 17.8a2.3 2.3 0 1 0 3.2 3.2l4.6-4.6a5 5 0 0 0 6.8-6.8l-3 3-3.2-.8-.8-3.2 3.8-3.2Z"/></>}
      {name === "server" && <><rect x="4" y="4" width="16" height="6" rx="2"/><rect x="4" y="14" width="16" height="6" rx="2"/><path d="M8 7h.01M8 17h.01M12 7h5M12 17h5"/></>}
      {name === "code" && <><rect x="3" y="4" width="18" height="16" rx="2"/><path d="m9 9-3 3 3 3m6-6 3 3-3 3m-2-7-2 8"/></>}
      {name === "cloud" && <path d="M7 18h10a4 4 0 0 0 .8-7.9A6 6 0 0 0 6.4 8.4 4.8 4.8 0 0 0 7 18Z"/>}
      {name === "bot" && <><rect x="5" y="8" width="14" height="10" rx="3"/><path d="M12 5V3m-4 9h.01m8 0h.01M9 15h6"/></>}
      {name === "globe" && <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"/></>}
      {name === "gpu" && <><rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9" y="9" width="6" height="6" rx="1"/><path d="M9 3v3m3-3v3m3-3v3M9 18v3m3-3v3m3-3v3M3 9h3m-3 3h3m-3 3h3m12-6h3m-3 3h3m-3 3h3"/></>}
      {name === "company" && <><circle cx="12" cy="8" r="3"/><path d="M6 20v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2M4 9a2.5 2.5 0 0 0 0 5m16-5a2.5 2.5 0 0 1 0 5"/></>}
      {name === "lock" && <><rect x="5" y="10" width="14" height="10" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/></>}
      {name === "apps" && <><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></>}
      {name === "chat" && <path d="M21 12a8 8 0 0 1-8 8H7l-4 2 1.2-4.2A8 8 0 1 1 21 12Z"/>}
    </svg>
  );
}

function Logo() {
  return (
    <a className="brand" href="#top" aria-label="Zetbros home">
      <span className="brandMark" aria-hidden="true"><i /><i /></span>
      <span>Zetbros</span>
    </a>
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
      <header className="siteHeader">
        <div className="container navWrap">
          <Logo />
          <nav aria-label="Primary navigation">
            <a href="#services">Services</a>
            <a href="#ai">AI</a>
            <a href="#services">Infrastructure</a>
            <a href="#software">Software</a>
            <a href="#about">About</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="button buttonGhost navCta" href="#contact">Talk to us</a>
        </div>
      </header>

      <section className="hero section">
        <div className="container heroGrid">
          <div className="heroCopy">
            <RevealText as="p" className="eyebrow" text="Technology that works for you." />
            <RevealText as="h1" text={"Build smarter.\nRun simpler."} />
            <p className="lede">Zetbros helps companies build, deploy and maintain AI, software and IT infrastructure — from local AI systems and automation to servers, websites and hands-on technical support.</p>
            <div className="actions">
              <a className="button buttonPrimary" href="#services">Explore what we do</a>
              <a className="button buttonGhost" href="#contact">Talk to us</a>
            </div>
          </div>

          <div className="heroDiagram" aria-label="Zetbros technology diagram">
            <FlowCard className="node localAi" icon="ai" label="Local AI" tone="violet" />
            <FlowCard className="node automation" icon="flow" label="Automation" tone="violet" />
            <FlowCard className="node appsNode" icon="server" label="Your Apps" tone="violet" />
            <FlowCard className="node gpuNode" icon="gpu" label="GPU" tone="green" />
            <FlowCard className="node serverNode" icon="server" label="Server" tone="blue" />
            <FlowCard className="node networkNode" icon="flow" label="Network" tone="orange" />
            <FlowCard className="node cloudNode" icon="cloud" label="Cloud" tone="cyan" />
            <FlowCard className="node agentsNode" icon="bot" label="Agents" tone="cyan" />
            <FlowCard className="node websiteNode" icon="globe" label="Website" tone="violet" />
          </div>
        </div>
      </section>

      <section className="section servicesSection" id="services">
        <div className="container">
          <RevealText as="p" className="eyebrow" text="What we do" />
          <RevealText as="h2" text="Technology, from the rack to the model." />
          <div className="serviceGrid">
            {services.map((service) => (
              <article className="serviceCard" key={service.title}>
                <span className={`serviceIcon ${service.tone}`}><Icon name={service.icon as IconName} /></span>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="ai">
        <div className="container aiPanel">
          <div className="aiCopy">
            <RevealText as="p" className="eyebrow" text="Your AI. Your infrastructure." />
            <RevealText as="h2" text={"Private, local and built\nfor your business."} />
            <p>Run powerful AI in your environment with full control over data, security and performance.</p>
            <ul className="checkList">
              <li>Private</li>
              <li>Customizable</li>
              <li>No dependency on one AI provider</li>
              <li>Optimized for your hardware</li>
              <li>Integrated with company systems</li>
            </ul>
          </div>
          <div className="architecture" aria-label="Private AI architecture">
            <FlowCard icon="company" label="Company" tone="blue" />
            <span className="downArrow">↓</span>
            <FlowCard icon="lock" label="AI Gateway" tone="green" />
            <span className="downArrow">↓</span>
            <div className="archSplit">
              <FlowCard icon="gpu" label="Local Models" tone="green" />
              <FlowCard icon="cloud" label="Cloud Models" tone="cyan" />
            </div>
            <span className="downArrow">↓</span>
            <FlowCard icon="apps" label="Company Tools" tone="blue" />
          </div>
        </div>
      </section>

      <section className="section productsSection" id="software">
        <div className="container">
          <RevealText as="p" className="eyebrow" text="What we build" />
          <RevealText as="h2" text="We also build our own tools." />
          <div className="productGrid">
            <article className="productCard productBlue">
              <div className="productBadge">H</div>
              <div><h3>Harness</h3><p>AI optimization and orchestration tools.</p><a href="#contact">Learn more <span>→</span></a></div>
            </article>
            <article className="productCard productGreen">
              <div className="productBadge">A</div>
              <div><h3>AIKO</h3><p>Adaptive language learning powered by AI.</p><a href="https://aiko.zetbros.com">Learn more <span>→</span></a></div>
            </article>
            <article className="productCard productOrange">
              <div className="productBadge codeBadge">&lt;/&gt;</div>
              <div><h3>Custom AI Tools</h3><p>Internal tools designed around company workflows.</p><a href="#contact">Learn more <span>→</span></a></div>
            </article>
          </div>
        </div>
      </section>

      <section className="section processSection" id="about">
        <div className="container">
          <RevealText as="p" className="eyebrow" text="Our process" />
          <RevealText as="h2" text="From idea to running system." />
          <div className="processGrid">
            {process.map(([n, title, text]) => (
              <article className="processStep" key={n}>
                <div className="stepTop"><span>{n}</span></div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contactSection" id="contact">
        <div className="container">
          <ContactForm />
        </div>
      </section>

      <footer className="footer">
        <div className="container footerTop">
          <Logo />
          <div className="footerLinks">
            <a href="#ai">AI</a><a href="#services">Infrastructure</a><a href="#services">Automation</a><a href="#software">Software</a><a href="#services">Support</a><a href="#contact">Contact</a>
          </div>
          <div className="legalLinks"><a href="/privacy">Privacy</a><a href="/terms">Terms</a></div>
        </div>
        <div className="container copyright">© 2026 Zetbros</div>
      </footer>
    </main>
  );
}
