import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const SRC = "pictures";
const DST = "public/photos";
const TARGET_W = 1400;
const TARGET_H = Math.round(TARGET_W * (105 / 148)); // ~992

async function main() {
  const files = fs
    .readdirSync(SRC)
    .filter((f) => /\.(jpg|jpeg|png)$/i.test(f))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  if (files.length === 0) {
    console.error(`No images found in ${SRC}/`);
    process.exit(1);
  }

  fs.mkdirSync(DST, { recursive: true });
  console.log(`Found ${files.length} images → target ${TARGET_W}×${TARGET_H} px (148:105), JPEG q82\n`);

  for (let i = 0; i < files.length; i++) {
    const src = path.join(SRC, files[i]!);
    const name = `autumn-${String(i + 1).padStart(2, "0")}.jpg`;
    const out = path.join(DST, name);

    const pipeline = sharp(src);
    if (files[i]!.toLowerCase().endsWith(".png")) {
      pipeline.trim();
    }

    await pipeline
      .resize({ width: TARGET_W, height: TARGET_H, fit: "cover", position: "center" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out);

    const { size } = fs.statSync(out);
    console.log(`  ${files[i]!.padEnd(40)} → ${name.padEnd(14)} ${String(Math.round(size / 1024)).padStart(5)}KB`);
  }

  console.log("\nDone.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
