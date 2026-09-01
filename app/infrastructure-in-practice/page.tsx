import type { Metadata } from "next";
import PracticePage, { type PracticeSolution } from "../practice-page";

export const metadata: Metadata = {
  title: "Infrastructure in Practice — Zetbros",
  description: "Detailed real-world infrastructure problems and the on-site solutions Zetbros can provide in Japan.",
};

const solutions: PracticeSolution[] = [
  {
    id: "local-technical-hands",
    icon: "🌏",
    title: "Local Technical Hands",
    summary: "Your remote engineering team stays in control while Zetbros handles the physical work that cannot be done remotely.",
    problem: "A company may have servers, network equipment or office IT in Japan while the engineers who manage it are based elsewhere. When the next troubleshooting step requires a console cable, a power cycle, a component check or a physical cable trace, remote access is no longer enough.",
    solution: "Zetbros can act as the local physical extension of the customer’s engineering team. We perform the agreed hands-on task, coordinate live with the remote engineer when needed, document what was observed and report exactly what was changed.",
    detail: "The customer keeps ownership of the technical decision-making. Before the visit we confirm site access, equipment, task scope, authorization and any replacement parts. On-site work is then performed to the agreed runbook or under live direction, followed by verification and evidence.",
    flow: ["Remote team identifies task", "Scope + site access", "Zetbros on-site", "Physical work / live coordination", "Verification", "Completion notes"],
    build: ["Cable tracing and patching", "Power cycling", "Console connections", "Visual and indicator checks", "Approved RAM / disk / component swaps", "Equipment installation or removal", "Photo / video evidence", "Inventory verification", "Shipping / receiving coordination by arrangement"],
    deliverables: ["Visit scope confirmation", "Before / after evidence where useful", "Actions performed", "Observed hardware state", "Connectivity or power verification", "Part / asset references", "Completion report"],
    control: "All physical work depends on site rules, customer authorization, equipment access and scheduling. Zetbros does not make unapproved configuration or hardware changes simply because an engineer is on-site; the agreed scope remains the execution boundary.",
    outcome: "The remote engineering team gets a reliable physical execution path in Japan without sending one of its own engineers internationally for routine hands-on work.",
  },
  {
    id: "rack-stack",
    icon: "🗄️",
    title: "Rack & Stack Deployment",
    summary: "Turn delivered hardware into a mounted, cabled, labelled and verified environment ready for remote configuration.",
    problem: "Servers, switches, firewalls, storage or GPU equipment may arrive at a Japan site with no local infrastructure team available to install it. The hardware exists, but rails, rack placement, power, network cabling, labels and console access still need to be completed correctly.",
    solution: "Zetbros can execute the physical deployment plan from receiving and inventory by arrangement through mounting, power and network cabling, labelling, console preparation, connectivity checks and handover documentation.",
    detail: "We work from the customer’s approved rack plan, equipment list and network design. If the environment is not yet documented, the deployment can begin with a site review and rack plan. Remote engineers can then take over the operating-system, network or application configuration once the physical layer is ready.",
    flow: ["Equipment / design received", "Inventory + rack plan", "Mount hardware", "Power + network cabling", "Label + console prep", "Test + handover"],
    build: ["Receiving by arrangement", "Inventory verification", "Rack-position planning", "Rail installation", "Server mounting", "Switch / firewall / storage mounting", "PDU connections", "Power cabling", "Network cabling", "Cable management", "Labelling", "Console setup"],
    deliverables: ["Installed equipment list", "Rack-position record", "Cable / port labels", "Power and network verification notes", "Photo documentation", "Open issues list", "Handover report"],
    control: "Power capacity, structured cabling, facility electrical work and datacenter rules remain subject to the site and the relevant qualified providers. Zetbros scopes the work around what the customer and facility permit us to perform.",
    outcome: "The customer receives a documented physical environment that is ready for remote configuration instead of a collection of unopened or partially installed hardware.",
  },
  {
    id: "ai-gpu-infrastructure",
    icon: "🧠",
    title: "AI / GPU Infrastructure Deployment",
    summary: "Connect the rack, operating system, accelerator runtime and inference layer as one deployment instead of separate vendor tasks.",
    problem: "A company may know it wants private or local AI but still has to make GPU, server, CPU, RAM, storage, networking, operating-system, driver, container and model-serving decisions fit together. A physically installed GPU server is not yet a usable AI platform.",
    solution: "Zetbros can work from the intended AI workload outward: size the system, plan the physical environment, deploy the hardware, configure the operating system and accelerator runtime, install the inference stack, serve the target models and benchmark the result.",
    detail: "We avoid assuming one GPU vendor or one inference engine before understanding the model family, concurrency, context, latency, reliability and budget requirements. Hardware and software choices are validated as a system rather than optimized independently.",
    flow: ["AI workload", "Sizing + architecture", "Hardware / network deployment", "OS + accelerator runtime", "Inference engine + models", "Benchmark + handover"],
    build: ["GPU / server sizing", "CPU / RAM / storage planning", "Network planning", "Rack deployment", "Linux configuration", "GPU drivers and runtime", "Container environment", "Inference engine", "Model serving", "Internal API endpoint", "Monitoring", "Benchmark harness"],
    deliverables: ["AI infrastructure architecture", "Sizing rationale", "Deployed physical environment", "OS / runtime configuration", "Inference service", "Benchmark results", "Monitoring setup", "Operations runbook"],
    control: "Final performance depends on the selected models, hardware, quantization, context, concurrency and serving engine. We document measured behavior rather than promising a fixed throughput before the target system is benchmarked.",
    outcome: "The customer gets a working AI infrastructure stack from physical hardware through model-serving API, with the design decisions and measured behavior documented together.",
  },
  {
    id: "office-branch",
    icon: "🏢",
    title: "Office & Branch IT Deployment",
    summary: "Reproduce the customer’s central IT standards in a new Japan office or branch with local implementation and verification.",
    problem: "A headquarters IT team may have a clear standard for firewalls, switches, Wi-Fi, endpoints, meeting rooms and device onboarding but no local implementation team when a new Japan office opens.",
    solution: "Zetbros can become the local execution layer: coordinate the approved equipment, install and connect network and endpoint hardware, implement the supplied configuration where scoped, verify connectivity and document the local environment for the central IT team.",
    detail: "We begin with the customer’s architecture, security standards, equipment list and building constraints. Carrier activation, construction and building cabling remain with the relevant providers, while Zetbros can coordinate the technical handoff and verify that the delivered services connect correctly to the customer environment.",
    flow: ["HQ standards", "Site + equipment review", "Network / endpoint deployment", "Carrier / building coordination", "Testing", "Documentation + handover"],
    build: ["Router / firewall deployment", "Switch installation", "Wi-Fi access points", "VLAN implementation", "Cabling coordination", "Workstation / dock / monitor setup", "Printer setup", "Meeting-room equipment", "Device onboarding", "Connectivity testing"],
    deliverables: ["Installed asset list", "Network / port notes", "Wi-Fi and connectivity verification", "Endpoint setup record", "Photo documentation", "Open issues / provider dependencies", "Handover document"],
    control: "ISP service, electrical work, building modifications and structured cabling may require separate providers or landlord approval. We distinguish clearly between work Zetbros performs and work we coordinate or verify.",
    outcome: "A remote central IT team can open a Japan location with local implementation aligned to its existing standards instead of rebuilding the operating model around a new local vendor stack.",
  },
  {
    id: "refresh-migration",
    icon: "🔄",
    title: "Infrastructure Refresh & Migration",
    summary: "Discover the existing environment first, then replace or move it through a controlled and documented cutover plan.",
    problem: "Older racks and networks often accumulate undocumented dependencies, abandoned hardware and cables nobody wants to touch. Replacing equipment becomes risky because the team cannot confidently explain what each connection supports.",
    solution: "Zetbros can start with physical discovery and connection mapping, then work with the customer to create a migration sequence, install replacement equipment, move approved connections, validate services and decommission old equipment within the agreed scope.",
    detail: "The important step is separating observation from assumption. We document what can be physically verified, identify information gaps for the customer’s system owners, and use that baseline to prepare a cutover plan with checkpoints and rollback considerations before moving live connections.",
    flow: ["Existing environment", "Audit + connection mapping", "Migration design", "Install replacements", "Controlled cutover", "Validate + decommission"],
    build: ["Asset inventory", "Connection tracing", "Rack diagrams", "Dependency notes", "Replacement installation", "Cable migration", "Network / power verification", "Cutover checklist", "Decommission support", "Final documentation"],
    deliverables: ["Current-state baseline", "Rack / connection documentation", "Migration plan", "Change checklist", "Validation record", "Decommission list", "Updated final-state documentation"],
    control: "Application and business-service dependencies must be confirmed with the customer’s system owners. Physical mapping helps reduce uncertainty, but it cannot by itself prove every logical application dependency inside the environment.",
    outcome: "Infrastructure changes proceed from a known baseline and an explicit sequence instead of making high-risk changes to an undocumented rack or network blindly.",
  },
  {
    id: "audit-documentation",
    icon: "📋",
    title: "Infrastructure Audit & Documentation",
    summary: "Create a reliable physical baseline of what is installed, where it is located and how the visible connections are arranged.",
    problem: "The organization may no longer have an accurate asset list, rack diagram, cable map or photo record. Equipment may have been installed by several vendors over many years, while the person who understood the environment has moved on.",
    solution: "Zetbros can physically inspect the agreed site and convert the observed environment into a structured asset inventory, rack-position record, cable / port notes, photo documentation and issue list.",
    detail: "We define the audit scope first: which rooms, racks and device classes are included, which labels or serial numbers may be recorded, and whether connections can be traced without service disruption. Findings are separated into verified observations, unresolved questions and recommendations.",
    flow: ["Scope audit", "Physical inspection", "Asset + rack capture", "Cable / port tracing", "Issue review", "Documentation + recommendations"],
    build: ["Asset inventory", "Rack elevations / positions", "Serial and asset references", "Cable / port mapping", "Photo record", "Topology notes", "Visible condition issues", "Unused equipment review", "Refresh recommendations"],
    deliverables: ["Asset register", "Rack diagram", "Connection / port notes", "Photo pack", "Observed issue log", "Unresolved questions", "Recommended next actions"],
    control: "The audit reports what can be safely observed within the agreed scope. Logical dependencies, unsupported hidden cabling or inaccessible systems are recorded as unknowns rather than guessed.",
    outcome: "The customer gets a current infrastructure baseline that can support troubleshooting, refresh planning, vendor coordination, budgeting and future project scoping.",
  },
  {
    id: "incident-support",
    icon: "🚨",
    title: "On-site Incident Support",
    summary: "Provide physical diagnosis and intervention when the remote team has reached the limit of remote management.",
    problem: "A server may stop booting, a network device may lose remote management, a cable may be disconnected or a component may fail. The central team can diagnose remotely only until the next step requires someone physically in front of the equipment.",
    solution: "Zetbros can perform the agreed physical incident actions: inspect indicators, verify power and cabling, connect a console, reseat or replace approved components, assist with remote testing and document what was observed and changed.",
    detail: "The remote team remains responsible for system-level decisions unless the engagement explicitly includes a broader troubleshooting scope. We agree the incident objective, site access, available replacement parts and safe actions before intervention, then coordinate the live verification after each material change.",
    flow: ["Remote incident", "Scope + access confirmation", "On-site physical checks", "Approved intervention", "Remote validation", "Incident notes"],
    build: ["Indicator / visual checks", "Power verification", "Cable verification", "Console access", "Approved component reseat / replacement", "Remote diagnostic assistance", "Connectivity checks", "Photo evidence", "Incident documentation"],
    deliverables: ["Actions performed", "Observed device state", "Component / asset references", "Before / after evidence where useful", "Validation result", "Remaining risks / next steps", "Incident summary"],
    control: "Response timing depends on location, scheduling, site access and the support arrangement in place. This page does not advertise a 24/7, same-day or fixed-response SLA unless one has been separately agreed with the customer.",
    outcome: "The customer gains a local physical path for incidents that cannot be resolved through remote access alone, with the remote engineering team still directing the system-level recovery plan.",
  },
];

export default function InfrastructureInPracticePage() {
  return (
    <PracticePage
      category="Infrastructure"
      title="Your infrastructure team where you need one — without hiring one locally."
      lead="From a single physical task to a complete rack, office or AI infrastructure deployment, Zetbros can act as the local technical extension of a remote engineering team. Physical and on-site services are currently available in Japan only."
      availability="On-site and physical services are available in Japan only for now"
      solutions={solutions}
      related={[
        { href: "/ai-in-practice", title: "AI in practice", text: "Turn GPU infrastructure into a usable AI platform" },
        { href: "/automation-in-practice", title: "Automation in practice", text: "Automate the operations around the environment" },
      ]}
    />
  );
}
