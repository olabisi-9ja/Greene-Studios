import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import { dirname } from "node:path";

/**
 * Rasterises HTML to an image with headless Chromium.
 *
 * This is the whole image pipeline: no external model, no API key, no network.
 * Anything describable in HTML/CSS/SVG — an identity board, a texture, a type
 * specimen — becomes a real asset through here. Screenshots of the running
 * demo sites come through `shootUrl`, which is why the case study imagery can
 * never drift from the live site: one is a photograph of the other.
 */
export async function withBrowser(fn) {
  const browser = await chromium.launch();
  try {
    return await fn(browser);
  } finally {
    await browser.close();
  }
}

async function settle(page) {
  await page.evaluate(() => document.fonts?.ready);
  // Let scroll-triggered reveals finish so nothing is caught mid-transition.
  await page.evaluate(() => new Promise((r) => setTimeout(r, 450)));
}

export async function renderHtml(browser, { html, out, width, height, scale = 2, fullPage = false }) {
  await mkdir(dirname(out), { recursive: true });
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  await page.setContent(html, { waitUntil: "load" });
  await settle(page);
  await page.screenshot({ path: out, fullPage });
  await page.close();
  return out;
}

export async function shootUrl(browser, { url, out, width, height, scale = 2, fullPage = false, colorScheme = "light" }) {
  await mkdir(dirname(out), { recursive: true });
  const page = await browser.newPage({
    viewport: { width, height },
    deviceScaleFactor: scale,
    colorScheme,
  });
  await page.goto(url, { waitUntil: "networkidle", timeout: 45_000 });
  await settle(page);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: out, fullPage });
  await page.close();
  return out;
}
