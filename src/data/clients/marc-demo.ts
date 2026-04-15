import type { ClientConfig } from "./types";

/**
 * Demo client — Marc's own site as the portfolio piece.
 * Use this as a template when adding new clients:
 *   cp marc-demo.ts <new-slug>.ts
 *   edit the fields, then register it in index.ts
 */
const marcDemo: ClientConfig = {
  slug: "marc-demo-k7p2q9",
  name: "Marc Cruz",
  contactName: "Marc",
  projectTitle: "Marc Cruz — Portfolio & Services Site",
  startDate: "2026-04-01",
  estimatedLaunch: "2026-05-01",
  currentPhase: "review",
  phaseProgress: 60,
  previewUrl: "/",
  previewReadyDate: "2026-04-12",
  nextUp: "Gather feedback on mid-century theme, iterate on hero + Services copy, then run final /council-qa pass.",
  marcEmail: "marc.cruz.office@gmail.com",
  updates: [
    {
      date: "2026-04-14",
      title: "Mid-century modern theme shipped",
      body: "Rebuilt the full token system (modular type scale, spacing, motion), swapped in Fraunces + Inter variable fonts, and applied the cream + terracotta palette across every section. Showroom is live with 6 preset themes you can click through.",
    },
    {
      date: "2026-04-12",
      title: "First prototype live",
      body: "All sections built — Hero, TrustBar, Services, Work, Process, About, FAQ, Contact. QA Council flagged 10 token-layer issues which are now fixed.",
    },
    {
      date: "2026-04-10",
      title: "Design brief approved",
      body: "Design Council produced the brief: deep indigo → revised to mid-century. Services pricing locked at three tiers. Contact form spec finalized.",
    },
    {
      date: "2026-04-05",
      title: "Kickoff complete",
      body: "Discovery call wrapped. Goals, audience, and success metrics set. Social proof inventory done (no reviews yet — using the site itself as proof of work).",
    },
  ],
};

export default marcDemo;
