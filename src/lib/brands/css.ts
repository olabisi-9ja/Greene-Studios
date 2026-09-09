import type { BrandSystem } from "./types";
import { fontFaceCss, facesFor, FONT_DIR } from "./fonts";

/**
 * Turns a brand system into the CSS the demo shell inlines.
 *
 * Everything a demo renders reads from these `--b-*` variables. Nothing under
 * /demo may reference a Greene `--brand-*` token — that separation is what
 * makes six systems sitting in one repo still look like six studios.
 */
export function brandCss(brand: BrandSystem): string {
  const l = brand.palette.light;
  const d = brand.palette.dark;
  const t = brand.type;

  const vars = (p: typeof l) => `
    --b-bg:${p.bg};
    --b-surface:${p.surface};
    --b-surface-alt:${p.surfaceAlt};
    --b-border:${p.border};
    --b-text:${p.text};
    --b-muted:${p.textMuted};
    --b-accent:${p.accent};
    --b-on-accent:${p.onAccent};`;

  return `
${fontFaceCss(brand)}
[data-brand="${brand.slug}"]{
  ${vars(l)}
  --b-display:${t.display};
  --b-body:${t.body};
  --b-mono:${t.mono ?? t.body};
  --b-display-tracking:${t.displayTracking};
  --b-display-weight:${t.displayWeight};
  --b-display-case:${t.displayCase};
  --b-leading:${t.bodyLeading};
  --b-r-sm:${brand.radius.sm}px;
  --b-r-md:${brand.radius.md}px;
  --b-r-lg:${brand.radius.lg}px;
  --b-r-pill:${brand.radius.pill}px;
  --b-grid:${brand.grid}px;
  --b-dur:${brand.motion.duration}ms;
  --b-ease:${brand.motion.ease};
  color-scheme:${d ? "light dark" : "light"};
}
${
  d
    ? `@media (prefers-color-scheme: dark){[data-brand="${brand.slug}"]{${vars(d)}}}`
    : ""
}`.replace(/\s+/g, " ").trim();
}

/** Preload hints for the faces this brand actually uses. */
export function fontPreloads(brand: BrandSystem) {
  return facesFor(brand)
    .filter((f) => f.style === "normal")
    .map((f) => `${FONT_DIR}/${f.file}`);
}
