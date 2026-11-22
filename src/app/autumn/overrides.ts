export type PostcardOverride = { photoId?: string; textId?: string };
export type OverrideMap = Record<string, PostcardOverride>;

const KEY = "autumn:postcards";

export function readOverrides(): OverrideMap {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return JSON.parse(raw) as OverrideMap;
  } catch {
    /* ignore */
  }
  return {};
}

export function writeOverride(id: string, patch: PostcardOverride): void {
  const ov = readOverrides();
  ov[id] = { ...ov[id], ...patch };
  if (!ov[id]?.photoId && !ov[id]?.textId) delete ov[id];
  try {
    localStorage.setItem(KEY, JSON.stringify(ov));
  } catch {
    /* ignore */
  }
}

export function clearOverrides(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
