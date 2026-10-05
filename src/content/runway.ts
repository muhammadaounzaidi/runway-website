// Copy follows docs/client-docs/new-doc/"Engr Spec-Website_update_dev" (§4 architecture, §5 component
// specifications). Where the spec defines no copy (contact form, footer), text comes from
// "Website code_updated". Spec section references are noted inline.

export const brand = {
  name: "Runway",
  legal: "Runway Clinical Intelligence Inc.",
  mark: "RUNWAY // CI",
};

// One link per spec section (§4).
export const nav = [
  { href: "#thesis", label: "Macro Thesis" },
  { href: "#technology", label: "Technology" },
  { href: "#sav", label: "SAV Architecture" },
  { href: "#security", label: "Security & Compliance" },
];

export const primaryAction = { href: "#contact", label: "Submit Asset Dossier" };

// §5 Section 1
export const hero = {
  headline: "Programmatic Triage for Distressed Clinical Therapeutics",
  sub: "Runway combines automated pharmacokinetic reconstruction with institutional underwriting to identify salvageable biopharma assets and feed dedicated Single-Asset Vehicles.",
  primaryCta: { href: "#technology", label: "Explore Platform Pipeline" },
  secondaryCta: { href: "#contact", label: "Submit Asset Dossier" },
};

// §4 Section 1 "Interactive PK/PD Workbench Re-plot & Distress Index"; §5 State A / State B.
// Curves and index values are illustrative.
export const workbench = {
  title: "SAB Workbench · PK/PD Re-plot",
  states: {
    regimen: {
      tab: "REGIMEN_FAILURE",
      label: "State A",
      badge: "Salvageable via altered dosing interval (Q2W → QW)",
      distressIndex: 0.78,
    },
    biological: {
      tab: "BIOLOGICAL_FAILURE",
      label: "State B",
      badge: "Target saturated with zero efficacy; triage verdict: Deprioritize",
      distressIndex: 0.91,
    },
  },
};

// §4 Section 2 + §5 Section 2
export const thesis = {
  heading: "The Macro Thesis & Industry Arbitrage",
  subheading: "The Failure Disconnect: Regimen Under-Dosing vs. Biological Failure",
  argument:
    "Millions of dollars in capital are abandoned each year because clinical trials fail on operational, scheduling, or dosing parameters—not target biology.",
  metrics: [
    {
      figure: "~40%",
      text: "Proportion of Phase 1/2 trial halts driven by regimen miscalculation or sponsor capital depletion rather than unviable biology.",
    },
    { figure: "14 Days", text: "Turnaround window from raw dossier ingestion to formal SAB algorithmic verdict." },
    {
      figure: "$0 Parent Liability",
      text: "Complete quarantine of clinical trial operational liabilities within isolated project SPVs.",
    },
  ],
};

// §4 Section 3 + §5 Section 3 (4-step interactive feature sequence)
export const technology = {
  heading: "The Technology Pipeline",
  intro: "A 4-step sequence detailing Runway’s computational edge.",
  steps: [
    {
      key: "ingestion",
      step: "Step 1",
      title: "Automated Ingestion",
      architecture: "SEC EDGAR & CSR Automated Table Extraction",
      body: "Parsing Non-Compartmental Analysis (NCA) tables, mean concentration coordinates, and clinical endpoints from unstructured PDFs, CSRs, and SEC 8-K filings.",
    },
    {
      key: "pkpd",
      step: "Step 2",
      title: "PK/PD Mathematical Engine",
      architecture: "1-Compartment PK Reconstruction & Hill Equation Solver",
      body: "Solving 1-compartment differential equations and applying the sigmoidal Hill equation to quantify target saturation.",
    },
    {
      key: "audit",
      step: "Step 3",
      title: "Regulatory Audit Engine",
      architecture: "21 CFR Part 11 Electronic Signature & Immutable Audit Logs",
      body: "Generating 21 CFR Part 11 compliant audit dossiers, complete with RFC 6238 TOTP electronic signature verification.",
    },
    {
      key: "classifier",
      step: "Step 4",
      title: "Mechanistic Classifier",
      architecture: "Algorithmic Classification (Regimen Failure vs. Target Invalidation)",
      body: "Categorizing assets into actionable tranches (REGIMEN_FAILURE, BIOLOGICAL_FAILURE, NARROW_WINDOW).",
    },
  ],
};

// §4 Section 4 + §5 Section 4
export const sav = {
  heading: "Single-Asset Vehicle (SAV) Architecture",
  intro: "The commercialization loop, from the parent engine to isolated asset vehicles.",
  pillars: [
    "Hub-and-Spoke Corporate Separation (Parent vs. Asset SPVs)",
    "Back-Loaded Milestone Earn-Out Framework",
    "Syndicate Co-Investment & Out-Licensing Realization",
  ],
  parent: {
    title: "The Parent Engine",
    body: "Runway maintains the technology core, ingestion pipeline, and proprietary deal sourcing.",
  },
  entity: {
    title: "The Project Entity (SAV)",
    body: "Individual Delaware entities formed to acquire or in-license specific compounds, funded via milestone-gated syndicate tranches.",
  },
  riskTitle: "Back-Loaded Risk",
  ladder: [
    { stage: "Upfront option window", detail: "$50k–$150k" },
    { stage: "Closing", detail: "$500k–$1.5M · 50% Cash / 50% SAV Equity" },
    { stage: "Contingent clinical / regulatory milestones", detail: "Milestone-gated" },
    { stage: "Out-licensing pass-through", detail: "10–20% seller share · 80–90% SAV investor equity return" },
  ],
};

// §4 Section 5 + §5 Section 5
export const security = {
  heading: "Trust, Security & Compliance",
  badges: [
    { key: "cfr", title: "21 CFR Part 11", detail: "Electronic Records & Signatures" },
    { key: "hipaa", title: "HIPAA / HITECH", detail: "Security Standards" },
    { key: "soc2", title: "SOC 2 Type II", detail: "Alignment" },
  ],
  enclaveTitle: "Enclave Security",
  enclave: [
    { key: "vpc", title: "AWS 3-tier VPC enclave" },
    { key: "sts", title: "Short-lived STS credential management" },
    { key: "dataroom", title: "Encrypted data room isolation" },
  ],
  leadership: {
    title: "Executive Leadership & Scientific Advisory Board",
    // Profiles not yet supplied by Runway; do not invent names.
    pending: "Leadership and Scientific Advisory Board profiles to be published.",
  },
};

// Contact: not defined in the spec; target of "Submit Asset Dossier". Copy from "Website code_updated".
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
    "Submit a Stalled / Distressed Asset for Triage",
    "Co-Invest in an Active SAV Vehicle",
    "Incubator / Venture Studio Strategic Partnership",
    "Pharma Licensing & BD Acquisition",
  ],
  submit: "Initiate Strategic Discussion",
  success: "Inquiry received. The Runway executive team will be in touch shortly.",
};

export const footer = {
  company: "Runway Clinical Intelligence Inc. | Delaware C-Corporation",
  copyright: "© 2026 All Rights Reserved",
};
