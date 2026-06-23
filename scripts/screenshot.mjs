import { chromium } from "playwright";
import { mkdirSync } from "node:fs";

const URL = process.env.SHOT_URL || "http://localhost:5173";
const OUT = "shots";
mkdirSync(OUT, { recursive: true });

const sections = ["hero", "about", "skills", "quests", "contact"];

const browser = await chromium.launch();

// desktop
const dctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
const page = await dctx.newPage();
await page.goto(URL, { waitUntil: "networkidle" });
await page.waitForTimeout(1500);

// scroll through to trigger whileInView reveals
for (let i = 0; i <= 10; i++) {
  await page.evaluate((y) => window.scrollTo(0, document.body.scrollHeight * (y / 10)), i);
  await page.waitForTimeout(180);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(700);

await page.screenshot({ path: `${OUT}/desktop-full.png`, fullPage: true });
await page.screenshot({ path: `${OUT}/desktop-hero.png` });

for (const id of sections) {
  const el = await page.$(`#${id}`);
  if (el) {
    await el.scrollIntoViewIfNeeded();
    await page.waitForTimeout(500);
    await el.screenshot({ path: `${OUT}/sec-${id}.png` });
  }
}

// mobile
const mctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2 });
const mpage = await mctx.newPage();
await mpage.goto(URL, { waitUntil: "networkidle" });
await mpage.waitForTimeout(1200);
await mpage.screenshot({ path: `${OUT}/mobile-hero.png` });
await mpage.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
await mpage.waitForTimeout(600);
await mpage.screenshot({ path: `${OUT}/mobile-full.png`, fullPage: true });

await browser.close();
console.log("shots written to /" + OUT);
