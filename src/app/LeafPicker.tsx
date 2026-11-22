import { useState } from "react";
import { LEAF_SHAPE_LABELS, type LeafShape } from "./autumn/leaves";

export function LeafPicker({ shape, onChange }: { shape: LeafShape; onChange(s: LeafShape): void }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="leaf-picker" style={{ position: "fixed", right: 16, top: 16, zIndex: 60 }}>
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
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        {open ? "关闭" : `树叶: ${LEAF_SHAPE_LABELS[shape]}`}
      </button>
      {open && (
        <div
          style={{
            marginTop: 8,
            padding: 8,
            background: "var(--glass)",
            WebkitBackdropFilter: "blur(14px) saturate(1.15)",
            backdropFilter: "blur(14px) saturate(1.15)",
            borderRadius: 10,
            boxShadow: "var(--shadow-glass)",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {(Object.keys(LEAF_SHAPE_LABELS) as LeafShape[]).map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => { onChange(s); setOpen(false); }}
              style={{
                background: s === shape ? "var(--ai)" : "transparent",
                color: s === shape ? "#fff" : "var(--sumi)",
                border: "1px solid var(--shironezu)",
                borderRadius: 4,
                padding: "6px 12px",
                font: "var(--gw5) 12px/18px var(--gothic)",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              {LEAF_SHAPE_LABELS[s]}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
