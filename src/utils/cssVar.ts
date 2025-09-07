// utils/cssVar.ts
export function hslFromVar(name: string, alpha?: number): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim(); // e.g. "142.1 70.6% 45.3%"
  return alpha == null ? `hsl(${raw})` : `hsl(${raw} / ${alpha})`;
}
