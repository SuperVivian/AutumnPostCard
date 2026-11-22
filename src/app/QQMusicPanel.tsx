import { useState } from "react";

export function QQMusicPanel() {
  const [open, setOpen] = useState(false);

  return (
    <div className="qq-music-panel" style={{ position: "fixed", bottom: 48, right: 16, zIndex: 60 }}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        style={{
          background: "var(--ai)",
          color: "#fff",
          border: 0,
          borderRadius: 20,
          padding: "6px 14px",
          font: "var(--gw5) 12px/18px var(--gothic)",
          cursor: "pointer",
          boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
        }}
      >
        {open ? "收起在线歌单" : "QQ音乐在线歌单"}
      </button>
      {open && (
        <div
          style={{
            marginTop: 8,
            width: 340,
            height: 420,
            background: "#fff",
            borderRadius: 10,
            boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
            overflow: "hidden",
          }}
        >
          <iframe
            src="https://y.qq.com/n/ryqq_v2/playlist/9795821409"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            title="QQ音乐秋日歌单"
            allow="autoplay"
          />
        </div>
      )}
    </div>
  );
}
