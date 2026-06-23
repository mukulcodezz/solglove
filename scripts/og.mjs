import { chromium } from "playwright";

const ORIGIN = process.env.SHOT_URL || "http://localhost:5173";

const html = `<!doctype html><html><head>
<link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=VT323&display=swap" rel="stylesheet">
<style>
  *{margin:0;box-sizing:border-box}
  body{width:1200px;height:630px;background:
    radial-gradient(120% 90% at 50% -10%, #16224d 0%, transparent 55%), #090d1f;
    font-family:'Press Start 2P';color:#eef2ff;overflow:hidden;position:relative}
  .grid{position:absolute;inset:0;
    background-image:linear-gradient(#2a3a72 1px,transparent 1px),linear-gradient(90deg,#2a3a72 1px,transparent 1px);
    background-size:40px 40px;opacity:.22}
  .wrap{position:absolute;inset:0;display:flex;align-items:center;justify-content:space-between;padding:0 80px}
  .spectrum{background:linear-gradient(90deg,#5fc8ee,#8be04a,#ffcf3f,#ff5a5a,#ff9d3c,#2ff0a0);
    -webkit-background-clip:text;background-clip:text;color:transparent}
  h1{font-size:64px;line-height:1.2;text-shadow:4px 4px 0 #04060f}
  .tag{font-family:'VT323';font-size:38px;color:#9fe3b8;margin-top:26px}
  .eyebrow{font-size:15px;letter-spacing:.2em;color:#2ff0a0;margin-bottom:28px}
  .frame{border:4px solid #2ff0a0;box-shadow:0 0 0 4px #04060f,12px 12px 0 #04060f;padding:14px;background:#0e1733}
  img{width:300px;height:300px;display:block;image-rendering:pixelated}
  .bar{position:absolute;left:0;right:0;bottom:0;height:14px;
    background:linear-gradient(90deg,#5fc8ee,#8be04a,#ffcf3f,#ff5a5a,#ff9d3c,#2ff0a0)}
</style></head><body>
  <div class="grid"></div>
  <div class="wrap">
    <div>
      <div class="eyebrow">● SOLANA DEVELOPER · PORTFOLIO</div>
      <h1>SOL<span class="spectrum">GLOVE</span></h1>
      <div class="tag">On-chain programs that survive mainnet.</div>
    </div>
    <div class="frame"><img src="${ORIGIN}/avatar.png"></div>
  </div>
  <div class="bar"></div>
</body></html>`;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.setContent(html, { waitUntil: "networkidle" });
await page.waitForTimeout(800);
await page.screenshot({ path: "public/og.png" });
await browser.close();
console.log("og.png written");
