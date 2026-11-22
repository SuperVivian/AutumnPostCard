export type LeafShape = "original" | "maple" | "sakura";

export const DEFAULT_LEAF_SHAPE: LeafShape = "original";
export const LEAF_SHAPE_KEY = "autumn:leaf-shape";

export const LEAF_PATHS: Record<Exclude<LeafShape, "sakura">, string> = {
  original: "M0 0 C 22 -17, 64 -19, 92 0 C 64 17, 22 15, 0 0 Z",
  maple: "M0 0 C-4 -6 -10 -10 -14 -8 C-20 -14 -26 -22 -22 -30 C-16 -36 -8 -42 0 -50 C8 -42 16 -36 22 -30 C26 -22 20 -14 14 -8 C10 -10 4 -6 0 0 Z",
};

export function readLeafShape(): LeafShape {
  try {
    const v = localStorage.getItem(LEAF_SHAPE_KEY);
    if (v === "original" || v === "maple" || v === "sakura") return v;
  } catch {
    /* ignore */
  }
  return DEFAULT_LEAF_SHAPE;
}

export function writeLeafShape(shape: LeafShape): void {
  try {
    localStorage.setItem(LEAF_SHAPE_KEY, shape);
  } catch {
    /* ignore */
  }
}

/** Draw a single leaf on a 2D canvas at the current origin (no transform applied here) */
export function drawLeaf(ctx: CanvasRenderingContext2D, shape: LeafShape) {
  switch (shape) {
    case "original":
    case "maple": {
      const path = new Path2D(LEAF_PATHS[shape]);
      ctx.fill(path);
      break;
    }
    case "sakura": {
      ctx.beginPath();
      ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
      ctx.fill();
      for (let a = 0; a < 360; a += 72) {
        ctx.save();
        ctx.rotate((a * Math.PI) / 180);
        ctx.beginPath();
        ctx.ellipse(0, -13, 4.5, 11, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      break;
    }
  }
}

/** SVG path for a single leaf at the current origin (for <use> or <path>) */
export function getLeafPath(shape: LeafShape): string | null {
  return shape === "sakura" ? null : LEAF_PATHS[shape];
}

export const LEAF_SHAPE_LABELS: Record<LeafShape, string> = {
  original: "原叶",
  maple: "枫叶",
  sakura: "樱花",
};
