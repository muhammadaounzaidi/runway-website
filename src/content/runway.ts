// Copy follows docs/client-docs/new-doc/"Website code_updated" exactly (citation markers removed).

export const brand = {
  name: "Runway",
  legal: "Runway Clinical Intelligence Inc.",
  mark: "RUNWAY // CI",
};

export const nav = [
  { href: "#engine", label: "The Engine" },
  { href: "#triage", label: "14-Day Triage" },
  { href: "#sav-model", label: "The SAV Model" },
  { href: "#post-sav", label: "Post-SAV Execution" },
  { href: "#governance", label: "Governance" },
  // { href: "#leadership", label: "Leadership" }, — shelved until leadership profiles are provided
];

export const primaryAction = { href: "#contact", label: "Inquire on Pipeline" };

// Section 1: Hero
export const hero = {
  badge: "Institutional Clinical Intelligence & Asset Acquisition",
  headlineLead: "Programmatic Triage & Acquisition for",
  headlineAccent: "Distressed Clinical Therapeutics",
  sub: "Runway correlates real-time clinical trial velocity with SEC financial burn to identify mispriced, stalled biopharma assets. Through automated PK/PD mathematical reconstruction, we confirm viable drug biology, acquire programs into liability-isolated Single-Asset Vehicles (SAVs), and execute capital-efficient clinical turnarounds.",
  primaryCta: { href: "#sav-model", label: "Explore The SAV Model" },
  secondaryCta: { href: "#triage", label: "Review 14-Day Diligence" },
  credentials: [
    { title: "21 CFR Part 11", detail: "Audit Trail Integrity" },
    { title: "Delaware C-Corp", detail: "Ring-Fenced SAVs" },
    { title: "Continuous SEC", detail: "CIK Burn Surveillance" },
  ],
};

// Hero visual card: Regimen vs Biological Failure
export const workbench = {
  title: "14-Day SAB Workbench Preview",
  status: "High Salvage Potential",
  metricLabel: "Pharmacometric Target Metric",
  metricValue: "Steady-State Occupancy >= 85%",
  occupancy: 88,
  exposureLabel: "Observed Trough Exposure (Ctrough)",
  exposureValue: "Target Saturation Maintained",
  verdictLabel: "Algorithmic Triage Verdict",
  verdict: "REGIMEN_FAILURE (Salvageable)",
  verdictBody:
    "Primary endpoint missed due to sub-optimal dosing intervals rather than target invalidation. Candidate for SAV acquisition and revised clinical schedule.",
  facts: [
    { label: "Corporate Recourse", value: "$0 Parent Liability" },
    { label: "Tranche Financing", value: "Milestone-Gated" },
  ],
};

// Section 2: The macro problem & value arbitrage
export const thesis = {
  label: "The Macro Disconnect",
  heading: "Clinical Programs are Frequently Abandoned for Operational, Not Biological, Reasons",
  items: [
    {
      key: "capital",
      title: "Capital Exhaustion",
      body: "Biotech downturns and strategic reprioritizations force sponsors to mothball viable Phase 1/2 assets as balance sheets deplete ahead of pivotal trial readouts.",
    },
    {
      key: "regimen",
      title: "Regimen vs. Biology Failure",
      body: "A notable proportion of early trial failures result from faulty dosing intervals, narrow exposure windows, or inadequate PK/PD modeling rather than defective target biology.",
    },
    {
      key: "arbitrage",
      title: "Valuation Arbitrage",
      body: "Runway acquires historical R&D at conservative initial entry valuations, structuring payouts via contingent clinical milestones and protecting syndicate downside.",
    },
  ],
};

// Section 3: The 4-stage lifecycle
export const operatingModel = {
  label: "The Complete Operating Model",
  heading: "From Algorithmic Triage to Acquisition and Commercial Exit",
  stages: [
    {
      id: undefined,
      stage: "STAGE 01",
      title: "Continuous Surveillance",
      body: "Ingests global trial registries and SEC filings (10-K, 10-Q, 8-K) to flag trial velocity deceleration and corporate burn rate divergences before public announcements.",
      points: ["Registry Velocity Tracking", "Cash-Zero Date Modeling", "Corporate Debt Stack Audit"],
    },
    {
      id: "triage",
      stage: "STAGE 02",
      title: "14-Day SAB Diligence",
      body: "Evaluates raw CSR tables through our strict pharmacometric engine. Confirms target saturation and determines whether failure was biological or schedule-driven.",
      points: ["PK/PD Mathematical Model", "CMC Stability Review", "FTO Exclusivity Audit"],
    },
    {
      id: undefined,
      stage: "STAGE 03",
      title: "The SAV Acquisition",
      body: "Assets are acquired into isolated Delaware Single-Asset Vehicles (SAVs). Acquired via 90-day option windows and structured via 50% Cash / 50% SAV Equity to align sellers.",
      points: ["Complete Parent Liability Ring-Fence", "Milestone-Gated Earn-Outs", "Anti-Stacking Covenants"],
    },
    {
      id: undefined,
      stage: "STAGE 04",
      title: "Execution & Out-Licensing",
      body: "The SAV conducts targeted formulation work or Phase 1b/2 bridging studies. Once de-risked, the asset is out-licensed or acquired by commercial pharmaceutical partners.",
      points: ["Phase 1b/2 Proof-of-Concept", "Global Pharma Out-Licensing", "80%-90% Net Syndicate Payout"],
    },
  ],
};

// Section 4: Interactive SAV waterfall & capital model
export const simulator = {
  label: "Capital Architecture",
  heading: "The Single-Asset Vehicle (SAV) Waterfall Simulator",
  intro:
    "Model how Runway aligns capital, isolates corporate operational liability, and distributes downstream out-licensing proceeds.",
  parametersTitle: "Model Parameters",
  waterfallTitle: "Capital & Proceeds Waterfall",
  controls: {
    cash: {
      label: "Upfront Consideration Mix",
      help: "Conserves initial vehicle liquidity by issuing preferred equity in the SAV to the original sponsor.",
      min: 20,
      max: 80,
      step: 5,
      initial: 50,
    },
    passThrough: {
      label: "Seller Out-Licensing Pass-Through",
      help: "Defines the seller’s agreed cut of downstream licensing proceeds, superseding prior milestone claims.",
      min: 10,
      max: 25,
      step: 1,
      initial: 15,
    },
    clinical: {
      label: "Direct Clinical Execution Proportion",
      help: "Target share of syndicate capital dedicated directly to bridging trial and CMC operations.",
      min: 60,
      max: 90,
      step: 5,
      initial: 80,
    },
  },
  outputs: {
    syndicate: {
      label: "SAV Syndicate & Platform Distribution",
      help: "Net cash returned to outside investors, co-syndicates, and the platform upon execution of a major out-license or acquisition.",
    },
    seller: {
      label: "Original Seller Sublicense Allocation",
      help: "Contractual pass-through percentage extinguishing all unaccrued historical milestone claims.",
    },
    recourse: { label: "PARENT COMPANY RECOURSE", value: "Quarantined to Asset Vehicle", badge: "$0 Parent Liability" },
  },
};

// Section 5: Post-SAV clinical execution playbook
export const playbook = {
  label: "Operational Playbook",
  heading: "Post-Acquisition De-Risking & Clinical Execution",
  milestones: [
    {
      tag: "MILESTONE 01",
      title: "Regulatory Protocol Realignment",
      body: "Filing amended IND protocols and safety updates with the FDA/EMA, establishing optimized dosing schedules (e.g., Q2W to weekly QW).",
    },
    {
      tag: "MILESTONE 02",
      title: "Targeted CMC & Stability",
      body: "Executing drug substance (DS) and drug product (DP) inventory audits, qualification batches, and real-time release assays with partner CDMOs.",
    },
    {
      tag: "MILESTONE 03",
      title: "Phase 1b/2 Proof-of-Concept",
      body: "Running lean clinical bridging cohorts to demonstrate therapeutic coverage and clear primary efficacy biomarker endpoints.",
    },
    {
      tag: "MILESTONE 04",
      title: "Global Pharma Out-Licensing",
      body: "Partnering de-risked assets with commercial-stage biopharma organizations, generating upfront fees, milestones, and running net sales royalties.",
    },
  ],
};

// Section 6: Institutional governance & compliance
export const governance = {
  label: "Institutional Rigor",
  heading: "Governed for High-Stakes Clinical Diligence",
  intro:
    "Every triage recommendation and diligence decision generated on the Runway platform operates under strict regulatory controls, formal electronic signature verifications, and complete legal separation between software and asset operations.",
  items: [
    { key: "cfr", title: "21 CFR Part 11", body: "Cryptographic audit trails and formal review sign-off ceremonies." },
    {
      key: "ringfence",
      title: "Delaware SAV Ring-Fence",
      body: "Clinical risks and operational vendor payables isolated by entity.",
    },
    {
      key: "gcp",
      title: "GCP / ICH Compliance",
      body: "Institutional data handling protocols for clinical trial evaluation.",
    },
    {
      key: "ip",
      title: "Anti-Stacking IP Covenants",
      body: "Standardized contractual protection against third-party royalty claims.",
    },
  ],
};

// Compliance badges (client request, Oct 2026; wording from the Engineering Specification §5.5)
export const complianceBadges = [
  { key: "cfr", title: "21 CFR Part 11", detail: "Electronic Records & Signatures" },
  { key: "hipaa", title: "HIPAA / HITECH", detail: "Security Standards" },
  { key: "soc2", title: "SOC 2 Type II", detail: "Alignment" },
];

// Leadership section: SHELVED (Oct 6, 2026) until the client provides profiles; not rendered.
// Heading from the Engineering Specification §4.
// Only the founder's details are known (from her email signature); other seats await client profiles.
export const leadership = {
  label: "Leadership",
  heading: "Executive Leadership & Scientific Advisory Board",
  groups: [
    {
      key: "exec",
      title: "Executive Leadership",
      people: [
        { name: "Oshevire (Oshe) Uvwo, MD, MPH", role: "Founder & Chief Development Officer", initials: "OU" },
        { name: null, role: "Executive profile", initials: null },
        { name: null, role: "Executive profile", initials: null },
      ],
    },
    {
      key: "sab",
      title: "Scientific Advisory Board",
      people: [
        { name: null, role: "Scientific advisor", initials: null },
        { name: null, role: "Scientific advisor", initials: null },
        { name: null, role: "Scientific advisor", initials: null },
      ],
    },
  ],
  pending: "Profile to be provided",
};

// Section 7: Conversion & contact form
export const contact = {
  heading: "Partner with Runway Clinical Intelligence",
  sub: "Whether evaluating co-investment into active Single-Asset Vehicles, exploring strategic advisory alignment, or submitting a shelved biopharma asset for triage, reach out directly to our executive team.",
  fields: {
    name: { label: "Full Name", placeholder: "e.g. Dr. Jane Smith" },
    email: { label: "Professional Email", placeholder: "name@institution.com" },
    org: { label: "Organization / Entity", placeholder: "Biopharma Company, Venture Studio, or Family Office" },
    interest: "Strategic Interest",
  },
  interests: [
    "Co-Invest in an Active SAV Vehicle",
    "Submit a Stalled / Distressed Asset for Triage",
    "Incubator / Venture Studio Strategic Partnership",
    "Pharma Licensing & BD Acquisition",
  ],
  submit: "Initiate Strategic Discussion",
  success: "Inquiry received. The Runway executive team will be in touch shortly.",
};

export const footer = {
  company: "Runway Clinical Intelligence Inc. | Delaware C-Corporation",
  notes: ["21 CFR Part 11 Compliant Architecture", "Liability-Isolated SAV Governance"],
  copyright: "© 2026 All Rights Reserved",
};
