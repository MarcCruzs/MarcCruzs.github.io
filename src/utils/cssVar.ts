
export function hslFromVar(name: string, alpha?: number): string {
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue(name)
    .trim(); 
  return alpha == null ? `hsl(${raw})` : `hsl(${raw} / ${alpha})`;
}
