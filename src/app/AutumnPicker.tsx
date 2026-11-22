import { useState } from "react";
import type { PhotoEntry, TextEntry } from "../../profile/autumn";
import type { PostcardOverride } from "./autumn/overrides";

export type AutumnPickerProps = {
  postcardId: string;
  current: PostcardOverride;
  photos: readonly PhotoEntry[];
  texts: readonly TextEntry[];
  onChange(patch: PostcardOverride): void;
  onReset(): void;
};

export function AutumnPicker({ postcardId, current, photos, texts, onChange, onReset }: AutumnPickerProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="autumn-picker" style={{ position: "absolute", right: 12, top: 12, zIndex: 10 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "var(--glass)",
          border: "1px solid var(--shironezu)",
          borderRadius: 6,
          padding: "6px 12px",
          font: "var(--gw5) 12px/18px var(--gothic)",
          color: "var(--sumi)",
          cursor: "pointer",
        }}
      >
        {open ? "关闭" : "自定义"}
      </button>
      {open && (
        <div
          style={{
            marginTop: 8,
            padding: 12,
            background: "var(--glass)",
            WebkitBackdropFilter: "blur(14px) saturate(1.15)",
            backdropFilter: "blur(14px) saturate(1.15)",
            borderRadius: 10,
            boxShadow: "var(--shadow-glass)",
            minWidth: 220,
            maxWidth: 320,
          }}
        >
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", font: "var(--gw5) 11px/18px var(--gothic)", color: "var(--ainezu)", marginBottom: 4 }}>图片</label>
            <select
              value={current.photoId || ""}
              onChange={(e) => onChange({ ...current, photoId: e.target.value || undefined })}
              style={{
                width: "100%",
                font: "var(--gw4) 13px/20px var(--gothic)",
                color: "var(--sumi)",
                background: "var(--gofun)",
                border: "1px solid var(--shironezu)",
                borderRadius: 4,
                padding: "4px 6px",
              }}
            >
              <option value="">默认</option>
              {photos.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.label}
                </option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 10 }}>
            <label style={{ display: "block", font: "var(--gw5) 11px/18px var(--gothic)", color: "var(--ainezu)", marginBottom: 4 }}>文案</label>
            <select
              value={current.textId || ""}
              onChange={(e) => onChange({ ...current, textId: e.target.value || undefined })}
              style={{
                width: "100%",
                font: "var(--gw4) 13px/20px var(--gothic)",
                color: "var(--sumi)",
                background: "var(--gofun)",
                border: "1px solid var(--shironezu)",
                borderRadius: 4,
                padding: "4px 6px",
              }}
            >
              <option value="">默认</option>
              <optgroup label="古诗">
                {texts
                  .filter((t) => t.kind === "poem")
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} · {t.author}
                    </option>
                  ))}
              </optgroup>
              <optgroup label="散文">
                {texts
                  .filter((t) => t.kind === "prose")
                  .map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} · {t.author}
                    </option>
                  ))}
              </optgroup>
            </select>
          </div>
          <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
            <button
              type="button"
              onClick={onReset}
              style={{ font: "var(--gw5) 11px/18px var(--gothic)", color: "var(--ainezu)", background: "none", border: 0, cursor: "pointer" }}
            >
              恢复默认
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
