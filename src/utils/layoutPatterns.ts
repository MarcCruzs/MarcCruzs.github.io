import {projects} from "@/data/projects"


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
    lg: { w: 2, h: 3, minW: 1, minH: 2 },
    md: { w: 2, h: 2, minW: 1, minH: 2 },
    sm: { w: 2, h: 2, minW: 1, minH: 2 },
    xs: { w: 1, h: 2, minW: 1, minH: 2 },
    xxs:{ w: 1, h: 2, minW: 1, minH: 2 },
  },
  M_v: { 
    lg: { w: 1, h: 6, minW: 1, minH: 3 }, 
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





export const PATTERN_A: SizeClass[] = ["S","M","M","S","M","L","L","L","L","L"];
export const PATTERN_B: SizeClass[] = ["M_v","M","M","L","L","M","S","M","L","S"];
export const PATTERN_C: SizeClass[] =["S","M","M","S","M","M","S","S", "M_v","M","M"];



export function assignSizeClasses(ids: string[], pattern: SizeClass[]): Record<string, SizeClass> {
  const map: Record<string, SizeClass> = {};
  const n = pattern.length;
  ids.forEach((id, i) => { map[id] = pattern[i % n]; });
  return map;
}

const totalProjects = projects.length;

const project_distribution = totalProjects / 3 






