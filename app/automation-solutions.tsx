"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const automationSolutions = [
  {
    icon: "⚙️",
    problem: "Employees repeat the same multi-step office process every day — moving information between email, files, spreadsheets and business systems.",
    name: "Workflow Automation",
    short: "Map the current process, automate the repeatable steps and keep people involved where judgement or approval is required.",
    detail: "We start with the workflow as it exists today instead of forcing the team into a new process first. Depending on the systems involved, the automation can use APIs, scripts, scheduled jobs, webhooks, browser automation or AI-assisted extraction, with validation and exception handling built around the real operating rules.",
    build: ["Workflow mapping", "Triggers & schedules", "API / webhook connections", "File handling", "Validation rules", "Human approvals", "Exception queue", "Monitoring & logs"],
    outcome: "Routine steps can run consistently in the background while employees focus on exceptions, decisions and work that actually needs a person.",
  },
  {
    icon: "📄",
    problem: "Invoices, purchase orders, quotations, forms and reports arrive in different layouts, and someone has to read them and enter the data elsewhere.",
    name: "Intelligent Document Processing",
    short: "Turn semi-structured documents into validated data that can move into the systems your team already uses.",
    detail: "We can combine document ingestion, OCR or parsing, AI-assisted extraction, deterministic validation and human review for uncertain cases. The design depends on document quality, source formats, required fields and the systems that receive the data; AI is used where it adds flexibility rather than replacing every rule.",
    build: ["Email / file ingestion", "OCR or parsing", "Document classification", "Structured extraction", "Validation rules", "Duplicate checks", "Human review UI", "API / database output", "Audit trail"],
    outcome: "Document-heavy processes can become faster and more consistent while uncertain or policy-sensitive cases remain visible to a person before they are committed downstream.",
  },
  {
    icon: "🔗",
    problem: "The company already has useful software, but employees still copy information from one system into another because the tools are not connected.",
    name: "System Integration Automation",
    short: "Create an automation layer between existing applications instead of making employees act as the integration layer.",
    detail: "We connect systems through the interfaces they actually provide: REST APIs, webhooks, databases, file exchange, SFTP, queues, identity APIs or custom adapters. Where a supported API exists, we prefer it; where it does not, we evaluate safer fallback methods rather than pretending every system integrates the same way.",
    build: ["REST API integration", "Webhooks", "Database sync", "File / SFTP flows", "Queues", "Identity integrations", "Custom connectors", "Retry & reconciliation logic", "Operational logging"],
    outcome: "Information can move between business systems through a controlled integration layer with fewer manual copy-and-paste handoffs.",
  },
  {
    icon: "🖥️",
    problem: "A critical older application has no modern API, but replacing it immediately would be disruptive, expensive or unrealistic.",
    name: "Legacy Software Automation",
    short: "Automate around the existing system so the workflow can improve before the application itself is replaced.",
    detail: "Depending on what the legacy system safely exposes, we can use browser or desktop automation, database access approved by the customer, file-based exchange, scheduled imports/exports or email-driven triggers. These integrations are designed with failure handling and visibility because UI-based automation is inherently more fragile than a supported API.",
    build: ["Browser automation", "Desktop automation", "Approved database integration", "CSV / Excel / XML flows", "SFTP exchange", "Email triggers", "Scheduled jobs", "Failure alerts", "Run history"],
    outcome: "Teams can modernize a repetitive workflow without requiring an immediate replacement of the system that currently supports the business.",
  },
  {
    icon: "📊",
    problem: "Someone repeatedly gathers data from spreadsheets, databases, CRM, tickets or other tools just to rebuild the same operational report.",
    name: "Reporting Automation",
    short: "Collect, clean, calculate, visualize and distribute recurring reports through a repeatable pipeline.",
    detail: "We connect the approved data sources, standardize the calculations and produce the report in the format the team needs. AI can optionally summarize notable changes or draft commentary, while important business decisions can remain subject to human review rather than treating generated explanations as unquestionable facts.",
    build: ["Source connectors", "Data cleaning", "Business calculations", "Scheduled pipeline", "Charts / dashboards", "Report generation", "Optional AI summary", "Distribution", "Run monitoring"],
    outcome: "Recurring reporting becomes a reproducible process with the same calculations and source flow each cycle, reducing time spent rebuilding the report manually.",
  },
  {
    icon: "🤖",
    problem: "Some processes cannot be expressed as simple IF-this-THEN-that rules because the task requires reading context, choosing information and deciding which approved action comes next.",
    name: "Controlled AI Agents",
    short: "Give AI narrowly scoped tools, clear boundaries and approval points so it can assist with multi-step operational work.",
    detail: "We define the task boundary first, then give the agent only the tools and data it needs. Sensitive actions can require human approval, every tool call can be logged, and deterministic checks can sit around the model. The goal is controlled execution with observable failure modes — not an unrestricted bot with broad company access.",
    build: ["Agent workflow", "Tool connectors", "Scoped permissions", "Context retrieval", "Deterministic guardrails", "Human approvals", "Audit logs", "Error handling", "Operational monitoring"],
    outcome: "AI can assist with work that requires understanding and multi-step coordination while the company keeps control over permissions, approvals and execution boundaries.",
  },
];

const secondaryProjects = [
  {
    icon: "📧",
    name: "Intelligent Mailbox",
    text: "Classify shared-mailbox messages, extract useful information, route work, create tickets or draft replies — with human approval where appropriate.",
  },
  {
    icon: "✅",
    name: "Approval Workflows",
    text: "Replace email chains with structured requests, approval history, reminders, permissions, status tracking and auditable handoffs.",
  },
  {
    icon: "👤",
    name: "Employee Lifecycle Automation",
    text: "Coordinate approved onboarding and offboarding steps across HR, identity, IT tickets, applications and asset processes where those systems expose suitable integrations.",
  },
  {
    icon: "🔍",
    name: "Automation Opportunity Assessment",
    text: "Map repeated work, measure the current manual effort and rank automation opportunities by business value, implementation effort and operational risk.",
  },
];

export default function AutomationSolutions() {
  const [sectionTarget, setSectionTarget] = useState<HTMLElement | null>(null);
  const [buttonTarget, setButtonTarget] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSectionTarget(document.querySelector<HTMLElement>("#automation"));
    setButtonTarget(document.querySelector<HTMLElement>("#automation .capabilityCopy"));
  }, []);

  if (!sectionTarget) return null;

  const jumpButton = buttonTarget
    ? createPortal(
        <a className="automationRealWorldJump" href="#automation-real-world">
          <span>See automation in practice</span>
          <span className="automationRealWorldJumpArrow" aria-hidden="true">↓</span>
        </a>,
        buttonTarget,
      )
    : null;

  const solutions = createPortal(
    <div className="container automationSolutions" id="automation-real-world">
      <div className="automationSolutionsHeader">
        <div>
          <p className="eyebrow">Automation in practice</p>
          <h3>Stop using people as the connection between software.</h3>
        </div>
        <p>If your team repeatedly moves information from one place to another, there is usually a workflow worth examining. We connect the tools you already use and automate repeatable work without requiring you to rebuild every business system first.</p>
      </div>

      <div className="solutionGrid automationSolutionGrid">
        {automationSolutions.map((solution) => (
          <details className="solutionCard automationSolutionCard" key={solution.name}>
            <summary>
              <span className="solutionIcon automationSolutionIcon" aria-hidden="true">{solution.icon}</span>
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
              <span className="solutionBuildLabel">What Zetbros can build</span>
              <ul className="solutionBuildList">
                {solution.build.map((item) => <li key={item}>{item}</li>)}
              </ul>
              <span className="solutionOutcomeLabel">Practical outcome</span>
              <p className="solutionOutcome">{solution.outcome}</p>
              <a className="solutionCta" href="#contact">Discuss this automation <span>→</span></a>
            </div>
          </details>
        ))}
      </div>

      <div className="automationMore">
        <div className="automationMoreIntro">
          <p className="eyebrow">Also common</p>
          <h4>More workflows we can assess and automate.</h4>
        </div>
        <div className="automationMoreGrid">
          {secondaryProjects.map((project) => (
            <article className="automationMiniCard" key={project.name}>
              <span className="automationMiniIcon" aria-hidden="true">{project.icon}</span>
              <div>
                <h5>{project.name}</h5>
                <p>{project.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>,
    sectionTarget,
  );

  return <>{jumpButton}{solutions}</>;
}
