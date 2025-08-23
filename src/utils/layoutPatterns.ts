import {projects} from "@/data/projects"

// src/utils/layoutPatterns.ts
export type BP = "lg" | "md" | "sm" | "xs" | "xxs";
export type SizeClass = "S" | "M" | "M_v" | "L";

type SZ = { w: number; h: number; minW?: number; minH?: number };

export const SIZE_CLASSES: Record<SizeClass, Record<BP, SZ>> = {
  L: {
    lg: { w: 2, h: 3, minW: 2, minH: 3 },
    md: { w: 2, h: 3, minW: 2, minH: 3 },
    sm: { w: 2, h: 3, minW: 2, minH: 3 },
    xs: { w: 1, h: 2, minW: 1, minH: 2 },
    xxs:{ w: 1, h: 2, minW: 1, minH: 2 },
  },
  M: {
    lg: { w: 2, h: 3, minW: 2, minH: 2 },
    md: { w: 2, h: 2, minW: 2, minH: 2 },
    sm: { w: 2, h: 2, minW: 2, minH: 2 },
    xs: { w: 1, h: 2, minW: 1, minH: 2 },
    xxs:{ w: 1, h: 2, minW: 1, minH: 2 },
  },
  M_v: { // tall skinny
    lg: { w: 1, h: 6, minW: 1, minH: 3 },  // ✅ minW <= w
    md: { w: 2, h: 3, minW: 2, minH: 2 },
    sm: { w: 2, h: 2, minW: 2, minH: 2 },
    xs: { w: 1, h: 2, minW: 1, minH: 2 },
    xxs:{ w: 1, h: 2, minW: 1, minH: 2 },
  },
  S: {
    lg: { w: 1, h: 3, minW: 1, minH: 3 },
    md: { w: 1, h: 2, minW: 1, minH: 2 },
    sm: { w: 2, h: 2, minW: 2, minH: 2 },
    xs: { w: 1, h: 2, minW: 1, minH: 2 },
    xxs:{ w: 1, h: 2, minW: 1, minH: 2 },
  },
};




// Three repeating patterns (you can tweak these to taste)
export const PATTERN_A: SizeClass[] = ["S","M","M","S","M","L","L","L","L","L"];
// export const PATTERN_A: SizeClass[] = ["S","M","M","S"];
export const PATTERN_B: SizeClass[] = ["M_v","M","M","L","L","M","S","M","L","S"];
// export const PATTERN_B: SizeClass[] = ["M_v","M","M"];
export const PATTERN_C: SizeClass[] =["S","M","M","S","M","M","S","S", "M_v","M","M"];
// export const PATTERN_C: SizeClass[] = ["M","M","S","S","S","S","M","S","M","L"];
// export const PATTERN_C: SizeClass[] = ["M","M","S","S"];

// Helper: map Nth project -> size class from chosen pattern
export function assignSizeClasses(ids: string[], pattern: SizeClass[]): Record<string, SizeClass> {
  const map: Record<string, SizeClass> = {};
  const n = pattern.length;
  ids.forEach((id, i) => { map[id] = pattern[i % n]; });
  return map;
}

const totalProjects = projects.length;

const project_distribution = totalProjects / 3 // Total / amount of patterns

// 4 4 3 11 per cycle. 

// export const PATTERN_A: SizeClass[] = ["S","M","M","S"];
// export const PATTERN_B: SizeClass[] = ["M_v","M","M"];
// export const PATTERN_C: SizeClass[] = ["M","M","S","S"];
