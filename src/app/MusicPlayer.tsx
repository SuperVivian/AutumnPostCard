import { useMusic } from "../music/playlist";

export function MusicPlayer() {
  const { state, audioRef, toggle, seek, setVolume, prev, next } = useMusic();
  const track = state.tracks[state.index];

  return (
    <div
      className="music-player"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: "var(--glass)",
        WebkitBackdropFilter: "blur(14px) saturate(1.15)",
        backdropFilter: "blur(14px) saturate(1.15)",
        borderTop: "1px solid var(--shironezu)",
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        gap: 12,
        font: "var(--gw4) 12px/18px var(--gothic)",
        color: "var(--tetsu)",
      }}
    >
      <audio ref={audioRef} style={{ display: "none" }} />
      {state.tracks.length === 0 ? (
        <span style={{ flex: 1, textAlign: "center", color: "var(--ainezu)" }}>
          歌单待添加 — 把 mp3 放进 public/music/ 并在 playlist.json 里填写曲目
        </span>
      ) : (
        <>
          <button type="button" onClick={prev} style={{ background: "none", border: 0, cursor: "pointer", color: "var(--sumi)", fontSize: 16 }}>
            ⏮
          </button>
          <button type="button" onClick={toggle} style={{ background: "none", border: 0, cursor: "pointer", color: "var(--sumi)", fontSize: 18 }}>
            {state.playing ? "⏸" : "▶"}
          </button>
          <button type="button" onClick={next} style={{ background: "none", border: 0, cursor: "pointer", color: "var(--sumi)", fontSize: 16 }}>
            ⏭
          </button>
          <span style={{ minWidth: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            <b style={{ color: "var(--sumi)" }}>{track?.title || "未知曲目"}</b>
            {track?.artist ? <span style={{ color: "var(--ainezu)", marginLeft: 6 }}>{track.artist}</span> : null}
          </span>
          <input
            type="range"
            min={0}
            max={state.duration || 1}
            step={0.1}
            value={state.currentTime}
            onChange={(e) => seek(Number(e.target.value))}
            style={{ flex: 1, accentColor: "var(--ai)" }}
          />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={state.volume}
            onChange={(e) => setVolume(Number(e.target.value))}
            style={{ width: 80, accentColor: "var(--ai)" }}
          />
        </>
      )}
    </div>
  );
}
