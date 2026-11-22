import type { Profile } from "../../profile/schema";
import type { PhotoEntry, TextEntry } from "../../../profile/autumn";
import type { OverrideMap } from "./overrides";

export function applyOverrides(
  base: Profile,
  ov: OverrideMap,
  photos: readonly PhotoEntry[],
  texts: readonly TextEntry[],
): Profile {
  if (Object.keys(ov).length === 0) return base;
  const postcards = base.albums.postcards.map((pc) => {
    const o = ov[pc.id];
    if (!o) return pc;
    const photo = o.photoId ? photos.find((p) => p.id === o.photoId) : undefined;
    const text = o.textId ? texts.find((t) => t.id === o.textId) : undefined;
    return {
      ...pc,
      ...(photo ? { src: photo.file, label: photo.label } : {}),
      ...(text ? { message: text.body.replace(/\n/g, " "), placeLocal: text.title } : {}),
    };
  });
  return { ...base, albums: { ...base.albums, postcards } };
}
