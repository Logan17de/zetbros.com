import type { Metadata } from "next";
import PracticePage, { type PracticeSolution } from "../practice-page";

export const metadata: Metadata = {
  title: "AI in Practice — Zetbros",
  description: "Detailed real-world AI problems and the systems Zetbros can design to solve them.",
};

const solutions: PracticeSolution[] = [
  {
    id: "private-company-ai",
    icon: "🔒",
    title: "Private Company AI",
    summary: "A governed AI workspace for company work, with clear control over where requests go and what data each model can access.",
    problem: "Employees want the speed of modern AI, but company documents, source code, contracts, customer information or other sensitive material should not simply be copied into unmanaged consumer tools. At the same time, banning AI completely often pushes usage outside the company’s visibility.",
    solution: "Zetbros can build a company-controlled AI entry point that authenticates users, applies data and model policies, routes requests to local or approved cloud models, and connects only the company systems that have been explicitly approved for the use case.",
    detail: "We begin with the data boundary and the intended workloads. From there we choose where inference should run, how users authenticate, what gets logged, which integrations are available, and when a request is allowed to leave the company environment. The result can be a web workspace, an internal API, or both.",
    flow: ["Employee", "Company AI portal", "Authentication & policy", "AI gateway", "Local / approved cloud model", "Approved company tools & data"],
    build: ["Internal AI web interface", "SSO or application authentication", "AI gateway", "Local model serving", "Approved cloud-model adapters", "Access policy", "Usage logging", "Monitoring", "Internal API connectors"],
    deliverables: ["Target architecture", "Deployed AI environment", "Model and routing configuration", "Access-control configuration", "Logging / monitoring setup", "Admin and operations runbook", "Technical handover"],
    control: "A private AI deployment does not mean every employee should see every company document. Data access still needs to follow the permissions and security boundaries of the source systems. Cloud use is included only when it is approved for the relevant workload and data class.",
    outcome: "Employees get a supported way to use AI for company work while the organization retains control over model access, data handling, integrations and operating policy.",
  },
  {
    id: "knowledge-assistant",
    icon: "📚",
    title: "AI Knowledge Assistant",
    summary: "Turn approved internal knowledge into an assistant that answers questions and shows the material used to produce the answer.",
    problem: "Useful information is often spread across manuals, SOPs, PDFs, internal wikis, shared folders and knowledge systems. Employees may know the answer exists somewhere, but finding the right version or section can take longer than solving the problem itself.",
    solution: "Zetbros can build a retrieval-based assistant that searches approved company knowledge, selects relevant passages, and gives those passages to an AI model before it answers. The answer can include source references so the user can verify the underlying material.",
    detail: "We first identify the authoritative sources, document formats, update frequency and permission model. The ingestion pipeline then normalizes and indexes the content. Retrieval quality is tested against real questions, and the answer layer is tuned to cite sources rather than invent unsupported information when the knowledge base does not contain an answer.",
    flow: ["Employee question", "Identity / access check", "Search approved knowledge", "Retrieve relevant passages", "AI answer", "Sources shown to user"],
    build: ["Document ingestion", "Text extraction and chunking", "Search / vector retrieval", "RAG pipeline", "Source citations", "Permission-aware retrieval where supported", "Scheduled synchronization", "Feedback capture", "Admin visibility"],
    deliverables: ["Connected source inventory", "Ingestion and indexing pipeline", "Search / retrieval service", "Assistant interface or API", "Citation behavior", "Sync schedule", "Evaluation question set", "Operations documentation"],
    control: "The assistant should not silently treat every document as visible to every user. Permission-aware retrieval depends on the capabilities exposed by the source system and must be designed explicitly. Answers should remain traceable to source material for important company use cases.",
    outcome: "People can ask for company knowledge in natural language and reach the relevant source material faster, while the organization keeps the knowledge scope and access rules under control.",
  },
  {
    id: "performance-optimization",
    icon: "⚡",
    title: "AI Performance Optimization",
    summary: "Benchmark the workload first, then tune the model, runtime and hardware configuration around measured bottlenecks.",
    problem: "A company may already own an AI workstation or GPU server but still see poor throughput, excessive memory use, unstable long-context behavior or low hardware utilization. Buying a larger GPU is not always the first or best answer.",
    solution: "Zetbros can create a reproducible baseline, profile the actual workload and test targeted changes such as model choice, quantization, inference-engine configuration, caching, batching, context limits and CPU/GPU placement.",
    detail: "Optimization is treated as an engineering exercise rather than a collection of universal tricks. We define what matters for the workload—latency, throughput, context size, concurrency, memory use or output quality—then compare changes against that baseline and document the trade-offs.",
    flow: ["Workload definition", "Baseline benchmark", "Profile bottlenecks", "Test targeted changes", "Compare quality / performance", "Deploy chosen configuration"],
    build: ["Benchmark harness", "Inference-engine comparison", "Quantization tests", "KV / cache tuning", "Batching and concurrency tuning", "Context configuration", "CPU / GPU offload review", "Model comparison", "Serving configuration"],
    deliverables: ["Baseline measurements", "Test matrix", "Recommended runtime configuration", "Memory / latency / throughput results", "Quality trade-off notes", "Deployment configuration", "Reproducible benchmark procedure"],
    control: "Optimization can change output quality, memory requirements and operational complexity. We only recommend changes that are measured against the target workload; we do not advertise fixed token-per-second improvements that cannot be guaranteed across hardware and models.",
    outcome: "The customer gets a measured deployment profile and a clearer understanding of what the existing hardware can do before deciding whether more infrastructure is necessary.",
  },
  {
    id: "ai-gateway-routing",
    icon: "🔀",
    title: "AI Gateway & Routing",
    summary: "Give company applications one internal AI interface while the model providers behind it can change according to policy.",
    problem: "When every application integrates directly with a different AI provider, model changes, outages, privacy restrictions, rate limits and cost controls become application-development problems. Switching providers can require touching many systems at once.",
    solution: "Zetbros can place an internal gateway between applications and model backends. Applications call one stable interface while routing policy decides whether a request should use a local model, an approved cloud model or a fallback path.",
    detail: "Routing rules can be based on data classification, task type, required capability, context size, latency, availability and operating constraints. We also add usage visibility, error handling and provider adapters so the internal application contract remains stable even when the model strategy evolves.",
    flow: ["Company application", "Internal AI endpoint", "Policy / routing", "Local or cloud backend", "Response normalization", "Application"],
    build: ["Unified AI endpoint", "Provider / model adapters", "Routing rules", "Fallback logic", "Rate controls", "Usage metering", "Request logging", "Error normalization", "Application migration support"],
    deliverables: ["Gateway service", "Routing policy", "Backend adapter configuration", "Fallback behavior", "Usage dashboard or logs", "Application integration guide", "Operational runbook"],
    control: "A gateway does not automatically make every provider interchangeable. Models differ in capability, context, tool support and output behavior. Routing policies should be tested per workload, and sensitive data must follow the company’s approved data-handling rules.",
    outcome: "Applications depend on a company-controlled interface instead of being tightly coupled to one model provider, making future changes easier to manage.",
  },
  {
    id: "ai-agents-integrations",
    icon: "🤖",
    title: "AI Agents & Integrations",
    summary: "Move from a chatbot that only talks to an assistant that can use a tightly controlled set of company tools.",
    problem: "Many useful business tasks involve more than generating text. Someone may need to read a ticket, look up account information, compare previous communications, prepare an update and ask a manager for approval before anything changes in the source system.",
    solution: "Zetbros can build bounded agent workflows with the minimum tools needed for the task, scoped permissions, deterministic checks, approval points and an audit trail of what the agent attempted and executed.",
    detail: "We define the workflow boundary before connecting tools. Low-risk read operations can be automated first; higher-impact write actions can require human approval. Tool calls, failures and approvals are recorded so the system remains observable instead of acting like an unrestricted autonomous user.",
    flow: ["Trigger / employee request", "Agent reads context", "Approved tool calls", "Proposed action", "Human approval if required", "Execution + audit log"],
    build: ["Agent workflow", "Tool connectors", "Scoped credentials", "Context retrieval", "Human approval UI", "Deterministic validations", "Audit logging", "Error / retry handling", "Operational monitoring"],
    deliverables: ["Defined agent scope", "Tool permission map", "Agent implementation", "Approval workflow", "Audit trail", "Failure / exception handling", "Test scenarios", "Operations documentation"],
    control: "We do not recommend giving an AI agent unrestricted company access. Permissions should be narrow, high-impact actions should be gated appropriately, and the system should fail visibly when it is uncertain or a tool returns an unexpected state.",
    outcome: "AI can participate in real multi-step work while employees and administrators retain control over permissions, approvals and the final execution boundary.",
  },
  {
    id: "hybrid-ai",
    icon: "☁️",
    title: "Hybrid Local + Cloud AI",
    summary: "Use local and approved cloud AI together so each workload can run where its privacy, capability and operating requirements fit best.",
    problem: "Local AI can offer strong data control and predictable ownership, but some tasks may require capabilities or scale that are not practical to host internally. Sending every request to the cloud creates the opposite problem for sensitive workloads.",
    solution: "Zetbros can design an explicit hybrid architecture where request classes are routed to local or approved cloud models according to policy, with fallback behavior and data-handling rules defined centrally.",
    detail: "We classify workloads rather than treating all prompts the same. Sensitive or predictable internal work may stay local; approved cloud models can be used when a task needs different capability or scale. The gateway records which path was selected and makes the routing logic visible to administrators.",
    flow: ["Request", "Data / task classification", "Routing policy", "Local model or approved cloud", "Fallback rules", "Response + observability"],
    build: ["Local inference environment", "Approved cloud adapters", "AI gateway", "Data-classification rules", "Task routing", "Fallback paths", "Logging", "Availability monitoring", "Usage reporting"],
    deliverables: ["Hybrid architecture", "Routing matrix", "Local and cloud backend setup", "Data-handling rules", "Fallback behavior", "Monitoring / logging", "Operations runbook"],
    control: "Hybrid routing should not make sensitive-data decisions through guesswork alone. Data classes and cloud-usage rules need explicit company policy, and applications should have a clear behavior when a requested backend is unavailable or not permitted.",
    outcome: "The company can use local and cloud AI as complementary resources rather than choosing one environment for every workload.",
  },
];

export default function AiInPracticePage() {
  return (
    <PracticePage
      category="AI"
      title="AI systems built around privacy, performance and real company work."
      lead="These are practical project patterns for companies that want AI to fit their security, data, infrastructure and operating model. The exact models and architecture are selected after we understand the workload rather than from a fixed vendor package."
      solutions={solutions}
      related={[
        { href: "/infrastructure-in-practice", title: "Infrastructure in practice", text: "GPU, server and on-site deployment" },
        { href: "/automation-in-practice", title: "Automation in practice", text: "Turn AI into controlled workflows" },
      ]}
    />
  );
}
