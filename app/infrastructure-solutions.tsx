"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const infrastructureSolutions = [
  {
    icon: "🌏",
    problem: "Your equipment is in Japan, but the engineers who manage it are somewhere else.",
    name: "Local Technical Hands",
    short: "Your remote engineering team stays in control while Zetbros handles the physical work on-site.",
    detail: "For tasks that cannot be completed through SSH, remote management or a support call, we can act as the local physical extension of your engineering team. Work is performed to an agreed scope and can be coordinated live with your remote engineers.",
    build: ["Cable tracing & patching", "Power cycling", "Console access", "Approved component swaps", "Photo / video evidence", "Indicator checks", "Inventory verification", "Remote engineer coordination"],
    outcome: "Your engineering team can keep ownership of the technical decision-making while physical intervention happens locally in Japan, without sending an engineer internationally for routine hands-on work.",
  },
  {
    icon: "🗄️",
    problem: "Servers, switches or other equipment have arrived, but there is no local team to turn the boxes into an operational rack.",
    name: "Rack & Stack Deployment",
    short: "Move from delivered hardware to mounted, cabled, labelled and tested infrastructure.",
    detail: "We can execute the physical deployment plan for customer-approved hardware: receiving and inventory by arrangement, rack placement, rails, mounting, power and network cabling, labelling, console preparation, connectivity checks and handover documentation.",
    build: ["Receiving by arrangement", "Inventory check", "Rack placement", "Rail installation", "Server / network mounting", "Power cabling", "Network cabling", "Labelling", "Console setup", "Connectivity testing"],
    outcome: "Remote infrastructure teams receive a documented, physically deployed environment that is ready for their configuration and application work.",
  },
  {
    icon: "🧠",
    problem: "You want private or local AI, but GPU hardware, storage, networking, drivers and model serving all have to work together.",
    name: "AI / GPU Infrastructure Deployment",
    short: "Connect the physical infrastructure and the AI runtime instead of treating them as separate projects.",
    detail: "We can design around the intended AI workload, help size the system, deploy the physical environment and configure the software stack required to serve models. The exact GPU platform, drivers, runtime and inference engine are selected for the target workload rather than assumed in advance.",
    build: ["Workload review", "GPU / server sizing", "Storage & network planning", "Rack deployment", "Linux setup", "GPU drivers & runtime", "Containers", "Inference engine", "Model serving", "Monitoring", "Benchmarking"],
    outcome: "A documented AI environment with the rack, operating system, GPU runtime and inference layer designed as one deployment rather than disconnected vendor tasks.",
  },
  {
    icon: "🏢",
    problem: "HQ has standards for a new Japan office or branch, but there is no local implementation team to build and verify the environment.",
    name: "Office & Branch IT Deployment",
    short: "Use the customer’s IT standards and turn them into a working local office environment.",
    detail: "We can coordinate the local implementation of network and endpoint infrastructure using the architecture and policies supplied by your IT team. Carrier or building work remains with the relevant providers; Zetbros can coordinate and verify the technical handoff where it forms part of the project.",
    build: ["Router / firewall deployment", "Switches", "Wi-Fi access points", "VLAN implementation", "Cabling coordination", "Workstation setup", "Docks & monitors", "Meeting-room equipment", "Device onboarding", "Testing & documentation"],
    outcome: "A local office implementation aligned with the standards your central IT team already uses, with the physical setup and verification handled in Japan.",
  },
  {
    icon: "🔄",
    problem: "Infrastructure has grown over time and replacing old equipment feels risky because dependencies and cabling are not fully understood.",
    name: "Infrastructure Refresh & Migration",
    short: "Discover the existing environment first, then replace or migrate it through a controlled plan.",
    detail: "We start by documenting what is physically present and how it is connected. From there, the customer and Zetbros can agree a migration sequence, install replacement equipment, move approved connections, validate the environment and remove or decommission equipment within the agreed scope.",
    build: ["Asset inventory", "Connection tracing", "Rack documentation", "Dependency notes", "Migration plan", "Replacement installation", "Controlled cutover", "Validation", "Decommission support"],
    outcome: "A refresh project based on a known physical baseline and an explicit migration plan instead of making changes to an undocumented environment blindly.",
  },
  {
    icon: "📋",
    problem: "Nobody has a reliable record of what hardware is installed, where it is mounted, or how devices and ports are connected.",
    name: "Infrastructure Audit & Documentation",
    short: "Create a usable physical record of the environment before deciding what needs to change.",
    detail: "We physically inspect the agreed environment and turn what is present into structured documentation. Findings are observations from the inspected scope; recommendations are based on what we can verify rather than assumptions about undocumented systems.",
    build: ["Asset inventory", "Rack positions", "Serial / asset references", "Cable & port mapping", "Photo documentation", "Topology notes", "Visible issue log", "Refresh recommendations"],
    outcome: "Your team gets a current infrastructure baseline that can support troubleshooting, refresh planning, vendor coordination and future project scoping.",
  },
  {
    icon: "🚨",
    problem: "A server or network device cannot be recovered remotely because the next diagnostic step requires someone physically at the site.",
    name: "On-site Incident Support",
    short: "Physical diagnosis and intervention coordinated with the team that owns the system.",
    detail: "When a remote team has exhausted remote access, we can perform agreed physical checks and actions on-site: inspect indicators, connect a console, verify power and cabling, reseat or replace approved components, and support post-change connectivity tests. Response timing depends on scheduling, location, site access and the support arrangement in place.",
    build: ["Visual & indicator checks", "Console connection", "Power verification", "Cable verification", "Approved reseat / replacement", "Remote test assistance", "Photo evidence", "Incident notes"],
    outcome: "The remote engineering team gains a trusted physical execution path for incidents that cannot be resolved through remote management alone.",
  },
];

export default function InfrastructureSolutions() {
  const [sectionTarget, setSectionTarget] = useState<HTMLElement | null>(null);
  const [buttonTarget, setButtonTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSectionTarget(document.querySelector<HTMLElement>("#infrastructure"));
    setButtonTarget(document.querySelector<HTMLElement>("#infrastructure .capabilityCopy"));
  }, []);

  if (!sectionTarget) return null;

  const jumpButton = buttonTarget
    ? createPortal(
        <a className="infraRealWorldJump" href="#infrastructure-real-world">
          <span>See infrastructure in practice</span>
          <span className="infraRealWorldJumpArrow" aria-hidden="true">↓</span>
        </a>,
        buttonTarget,
      )
    : null;

  const solutions = createPortal(
    <div className="container infraSolutions" id="infrastructure-real-world">
      <div className="infraSolutionsHeader">
        <div>
          <p className="eyebrow">Infrastructure in practice</p>
          <h3>Your infrastructure team where you need one — without hiring one locally.</h3>
        </div>
        <div>
          <p>Real situations where a remote IT or engineering team needs reliable physical execution in Japan. Each engagement is scoped around the customer’s standards, site access and existing environment.</p>
          <span className="infraJapanBadge">On-site services · Japan only for now</span>
        </div>
      </div>

      <div className="solutionGrid infraSolutionGrid">
        {infrastructureSolutions.map((solution) => (
          <details className="solutionCard infraSolutionCard" key={solution.name}>
            <summary>
              <span className="solutionIcon infraSolutionIcon" aria-hidden="true">{solution.icon}</span>
              <span>
                <span className="solutionProblemLabel">Real-world problem</span>
                <span className="solutionProblem">{solution.problem}</span>
                <span className="solutionName">{solution.name}</span>
                <span className="solutionShort">{solution.short}</span>
              </span>
              <span className="solutionChevron" aria-hidden="true" />
            </summary>
            <div className="solutionDetails">
              <p>{solution.detail}</p>
              <span className="solutionBuildLabel">What Zetbros can do</span>
              <ul className="solutionBuildList">
                {solution.build.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <span className="solutionOutcomeLabel">Practical outcome</span>
              <p className="solutionOutcome">{solution.outcome}</p>
              <div className="infraSolutionFooter">
                <span>Available in Japan only for now</span>
                <a className="solutionCta" href="#contact">Discuss this project <span>→</span></a>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>,
    sectionTarget,
  );

  return <>{jumpButton}{solutions}</>;
}
