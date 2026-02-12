/**
 * 將 app/icon-fallback.svg（首頁 LOGO 同款）轉成 public/logo.png
 * 尺寸 192x192，符合 Google 48px 倍數與 Apple 180px 建議
 */
const path = require("path");
const fs = require("fs");

async function main() {
  let sharp;
  try {
    sharp = require("sharp");
  } catch {
    console.error("請先安裝 sharp: npm install sharp");
    process.exit(1);
  }

  const root = path.join(__dirname, "..");
  const svgPath = path.join(root, "app", "icon-fallback.svg");
  const outPath = path.join(root, "public", "logo.png");

  if (!fs.existsSync(svgPath)) {
    console.error("找不到", svgPath);
    process.exit(1);
  }

  await sharp(svgPath)
    .resize(192, 192)
    .png()
    .toFile(outPath);

  console.log("已產生 public/logo.png (192x192)");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
