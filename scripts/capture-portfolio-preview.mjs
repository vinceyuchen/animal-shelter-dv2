/**
 * Capture the published project's real homepage for its GitHub portfolio.
 *
 * This is a browser screenshot, not a mock-up or generated illustration.
 * Run from the repository root: node scripts/capture-portfolio-preview.mjs
 */
import fs from "node:fs/promises";
import { chromium } from "playwright";
import sharp from "sharp";

const SITE = "https://vinceyuchen.github.io/animal-shelter-dv2/";
const OUTPUT = "assets/real-site-preview.png";
const browser = await chromium.launch({headless: true});
try {
  const context = await browser.newContext({
    viewport: {width: 1440, height: 1280},
    deviceScaleFactor: 1,
    reducedMotion: "reduce",
    colorScheme: "light",
  });
  const page = await context.newPage();
  await page.goto(SITE, {waitUntil: "domcontentloaded", timeout: 90000});
  await page.locator("#map-live-release").waitFor({state: "visible", timeout: 90000});
  await page.waitForFunction(
    () => {
      const chart = document.querySelector("#map-live-release");
      if (!chart) return false;
      const painted = chart.querySelector("canvas, svg");
      return painted !== null && painted.getBoundingClientRect().height >= 100;
    },
    null,
    {timeout: 90000},
  );
  await page.evaluate(async () => {
    await document.fonts.ready;
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(800);
  const buffer = await page.screenshot({animations: "disabled", type: "png"});
  await fs.mkdir("assets", {recursive: true});
  await sharp(buffer)
    .resize({width: 1200})
    .png({palette: true, quality: 95, effort: 8})
    .toFile(OUTPUT);
  console.log("Saved authentic published-site screenshot:", OUTPUT);
} finally {
  await browser.close();
}
