import { lazy, Suspense, useEffect, useRef, useState, type ComponentType } from "react";
import type { StageMap, StageProps } from "../types";

/*
 * 只有一个 3D stage：明信片册。
 * 代码按 booklet 拆分，shell 在首次打开时加载对应 chunk。
 */

function stage(load: () => Promise<{ default: ComponentType<StageProps> }>): ComponentType<StageProps> {
  const Lazy = lazy(load);
  function Stage(props: StageProps) {
    const host = useRef<HTMLDivElement>(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
      const el = host.current;
      if (!el) return;
      const check = () => setReady(!!el.querySelector(".folio-book[data-ready]"));
      check();
      const mo = new MutationObserver(check);
      mo.observe(el, { subtree: true, childList: true, attributes: true, attributeFilter: ["data-ready"] });
      return () => mo.disconnect();
    }, []);
    return (
      <div className="stage-host" ref={host} data-ready={ready || undefined}>
        <Suspense fallback={null}>
          <Lazy {...props} />
        </Suspense>
      </div>
    );
  }
  return Stage;
}

export const STAGES: StageMap = {
  postcards: stage(() => import("./AlbumStage").then((m) => ({ default: m.PostcardsStage }))),
};
