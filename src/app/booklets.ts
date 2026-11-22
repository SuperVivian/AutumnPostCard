import { COVER_HEX } from "../book/cover-style";
import { COVER_MATERIALS, type CoverColor, type CoverFoil, type CoverMaterial } from "../book/cover";
import type { LayoutPreset } from "../book/layout";
import type { ItemKind, Profile } from "../profile/schema";
import type { Dict } from "./i18n";
import { TAB_IDS, type Tab } from "./types";

/*
 * 这个站点只有明信片册一本册子。
 *   Postcards  clay (陶土红), blind stamp, cloth; 2 × 3 A6 pockets a side
 */

export type Booklet = {
  id: Tab;
  color: CoverColor;
  foil: CoverFoil;
  /** The material when the visitor has not picked one. */
  material: CoverMaterial;
  /** The Japanese local title (the English page's hashira and 題簽 slip); a Chinese page uses i18n's. */
  local: string;
  /** The albums' pocket grid (src/book/layout.ts). */
  layout?: LayoutPreset;
};

export const BOOKLETS: readonly Booklet[] = [
  { id: "postcards", color: "clay", foil: "blind", material: "cloth", local: "絵葉書", layout: "postcard2x3" },
];

/** The local name of each pouch kind (the English page's; a Chinese page uses i18n's `held`). */
export const LOCAL_KIND: Record<ItemKind, string> = { card: "名刺", resume: "履歴書", ticket: "入場券", polaroid: "写真", note: "一筆箋" };

export const booklet = (id: Tab): Booklet => BOOKLETS.find((b) => b.id === id) ?? BOOKLETS[0]!;

/** How many things a booklet holds (the count after its name). */
export function countOf(profile: Profile, id: Tab): number {
  return profile.albums[id].length;
}

/** The local title of a booklet (hashira, 題簽 slip): 絵葉書, or 明信片 for a Chinese page. */
export const localTitle = (t: Dict, id: Tab) => t.booklet[id].local;

export { COVER_MATERIALS as MATERIALS };
/** The swatch colours of a booklet's case: base (cloth, leather) and frost tint. The UI never invents its own. */
export const caseHex = (b: Booklet) => COVER_HEX[b.color];

const KEY = (id: Tab) => `autumn:case:${id}`;

/** The visitor's material for each booklet (localStorage, every access in try/catch; defaults when blocked). */
export function readMaterials(): Record<Tab, CoverMaterial> {
  const out = {} as Record<Tab, CoverMaterial>;
  for (const id of TAB_IDS) {
    let m: CoverMaterial = booklet(id).material;
    try {
      const v = localStorage.getItem(KEY(id));
      if (v && (COVER_MATERIALS as readonly string[]).includes(v)) m = v as CoverMaterial;
    } catch {
      /* private window / blocked storage */
    }
    out[id] = m;
  }
  return out;
}

export function writeMaterial(id: Tab, m: CoverMaterial): void {
  try {
    localStorage.setItem(KEY(id), m);
  } catch {
    /* ignore */
  }
}
