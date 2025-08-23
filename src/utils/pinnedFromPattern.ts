// src/utils/pinnedFromPattern.ts
import type { PinnedSpec } from "@/utils/layoutEngine";
import { SIZE_CLASSES, type SizeClass, type BP } from "@/utils/layoutPatterns";


export function pinnedFromSizeClasses(
  byId: Record<string, SizeClass>
): Record<string, PinnedSpec> {
  const out: Record<string, PinnedSpec> = {};
  for (const [id, cls] of Object.entries(byId)) {
    const bp: Partial<Record<BP, { w: number; h: number }>> = {
      lg: SIZE_CLASSES[cls].lg,
      md: SIZE_CLASSES[cls].md,
      sm: SIZE_CLASSES[cls].sm,
      xs: SIZE_CLASSES[cls].xs,
      xxs: SIZE_CLASSES[cls].xxs,
    };
    // Only sizes; no x/y → engine will place it, keeping your aesthetics
    out[id] = { bp, w: bp.lg!.w, h: bp.lg!.h };
  }
  return out;
}
