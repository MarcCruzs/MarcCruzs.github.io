import type { ClientConfig } from "./types";
import marcDemo from "./marc-demo";
import sunriseBakery from "./sunrise-bakery";

/**
 * Registry of all client portals.
 * To add a new client:
 *   1. Copy `marc-demo.ts` → `<new-slug>.ts`
 *   2. Edit the fields (slug MUST be unguessable — include a random suffix)
 *   3. Import and add it to the `clients` object below
 *   4. Commit + push → Cloudflare Pages rebuilds → share the URL
 */
const clients: Record<string, ClientConfig> = {
  [marcDemo.slug]: marcDemo,
  [sunriseBakery.slug]: sunriseBakery,
};

export function getClient(slug: string): ClientConfig | null {
  return clients[slug] ?? null;
}

export function allClientSlugs(): string[] {
  return Object.keys(clients);
}
