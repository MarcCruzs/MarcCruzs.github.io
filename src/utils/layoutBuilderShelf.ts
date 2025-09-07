
import type { Layout, Layouts } from "react-grid-layout";
import type { BP, SizeClass } from "@/utils/layoutPatterns";
import { SIZE_CLASSES } from "@/utils/layoutPatterns";

/** size class for each item id */
export type SizeClassById = Record<string, SizeClass>;

type Cols = Record<"lg"|"md"|"sm"|"xs"|"xxs", number>;

export function buildLayoutsShelf(
  idsInOrder: string[],                
  sizeClassById: SizeClassById,        
  cols: Cols                           
): Layouts {
  const bps: BP[] = ["lg","md","sm","xs","xxs"];
  const layouts: Partial<Layouts> = {};

  for (const bp of bps) {
    const totalCols = cols[bp];
    let curX = 0;
    let curY = 0;
    let rowHeight = 0;

    const items: Layout[] = [];

    for (const id of idsInOrder) {
      const sz = SIZE_CLASSES[sizeClassById[id]][bp];
      const w = Math.min(totalCols, sz.w);
      const h = sz.h;
      const minW = Math.min(w, sz.minW ?? w);
      const minH = Math.min(h, sz.minH ?? h);

      
      if (curX + w > totalCols) {
        curX = 0;
        curY += rowHeight;      
        rowHeight = 0;
      }

      items.push({ i: id, x: curX, y: curY, w, h, minW, minH });

      curX += w;
      rowHeight = Math.max(rowHeight, h);
    }

    layouts[bp] = items;
  }

  return layouts as Layouts;
}
