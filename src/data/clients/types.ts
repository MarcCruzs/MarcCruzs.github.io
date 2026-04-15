/**
 * Shared types for the client portal.
 * Each client in the portal has one file at `src/data/clients/<slug>.ts`
 * that default-exports a ClientConfig.
 */

export type Phase = "discovery" | "design" | "build" | "review" | "launch";

export type ClientUpdate = {
  /** ISO date string — the day you posted this update */
  date: string;
  /** Short headline, one line */
  title: string;
  /** Optional longer body in plain text or single-line markdown */
  body?: string;
};

export type ClientConfig = {
  /** URL slug — must be unguessable, e.g. "acme-bakery-x7k2q9" */
  slug: string;
  /** Business display name */
  name: string;
  /** Main contact's first name — used in greetings */
  contactName?: string;
  /** Title shown at the top of the portal */
  projectTitle: string;
  /** ISO date when the project kicked off */
  startDate: string;
  /** ISO date estimated for launch — can be omitted */
  estimatedLaunch?: string;
  /** Current phase — drives the progress bar */
  currentPhase: Phase;
  /** 0-100 progress within the current phase */
  phaseProgress?: number;
  /** Reverse-chronological update feed (newest first) */
  updates: ClientUpdate[];
  /** Live prototype URL — leave undefined until it's ready */
  previewUrl?: string;
  /** When the prototype is expected (shown as placeholder until previewUrl is set) */
  previewReadyDate?: string;
  /** One-liner describing what's coming next */
  nextUp: string;
  /** Contact email for Marc — defaults to marc.cruz.office@gmail.com */
  marcEmail?: string;
  /** Optional 4-digit PIN gate — not enforced in MVP, reserved for future */
  pin?: string;
};

export const PHASES: { id: Phase; label: string }[] = [
  { id: "discovery", label: "Discovery" },
  { id: "design",    label: "Design" },
  { id: "build",     label: "Build" },
  { id: "review",    label: "Review" },
  { id: "launch",    label: "Launch" },
];

export const phaseIndex = (p: Phase): number => PHASES.findIndex((x) => x.id === p);
