import type { ClientConfig } from "./types";

/**
 * Sunrise Bakery — dummy client used to demo the full portal flow.
 * Shareable at: /portal/sunrise-bakery-m3n8k4
 * Their prototype lives at: /demo/sunrise-bakery
 */
const sunriseBakery: ClientConfig = {
  slug: "sunrise-bakery-m3n8k4",
  name: "Sunrise Bakery",
  contactName: "Elena",
  projectTitle: "Sunrise Bakery — New Website",
  startDate: "2026-03-30",
  estimatedLaunch: "2026-05-05",
  currentPhase: "review",
  phaseProgress: 40,
  previewUrl: "/demo/sunrise-bakery",
  previewReadyDate: "2026-04-12",
  nextUp: "Review the prototype and share any feedback on the hero copy, featured item cards, and the visit section. Once approved, I'll wire up online ordering and connect your Square POS.",
  marcEmail: "marc.cruz.office@gmail.com",
  updates: [
    {
      date: "2026-04-14",
      title: "First live prototype ready",
      body: "Full homepage is up — hero, menu cards, story section, visit info, footer. Take a look in the prototype window above and send feedback when you have a minute. No rush.",
    },
    {
      date: "2026-04-10",
      title: "Photography plan drafted",
      body: "We'll use warm gradients as placeholders until your photographer delivers the final hero shot on April 22. Menu card placeholders are caramel / butter / cream tones to match your palette.",
    },
    {
      date: "2026-04-06",
      title: "Brand direction locked",
      body: "Going with warm peach + caramel + cream — feels cozy and fits the family-bakery story. Fraunces display serif paired with Inter for body. Full palette in the shared Figma doc.",
    },
    {
      date: "2026-04-02",
      title: "Discovery call wrapped",
      body: "Got the story, the menu philosophy, and the 'we want it to feel like walking in at 7am' vibe. Target audience: Costa Mesa locals + tourists. Primary goal: drive foot traffic and online orders.",
    },
    {
      date: "2026-03-30",
      title: "Project kicked off",
      body: "Welcome to your project portal, Elena! I'll post updates here after every major milestone. You can send feedback any time using the box on the right.",
    },
  ],
};

export default sunriseBakery;
