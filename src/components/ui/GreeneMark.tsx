import brandAssets from "@/lib/brand-assets.json";
import { cn } from "@/lib/utils";

const ASSETS = brandAssets as Record<string, string | null>;

/**
 * The Greene marks.
 *
 * Prefers the real logo exports prepared by `npm run brand`; falls back to the
 * hand-drawn SVGs in public/brand until those exist, so the site never renders
 * a broken image while the assets are being swapped over.
 *
 * The prepared PNGs are alpha masks rather than coloured artwork, painted with
 * `background: currentColor` through `mask-image`. That is what lets a raster
 * export behave like the SVGs it replaces — one file that takes the colour of
 * whatever surface it sits on, in either theme, with no white box on dark.
 */
function Mark({
  src,
  label,
  className,
  style,
}: {
  src: string;
  label: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  // SVGs that already use currentColor can be rendered directly; masks cannot.
  const isMask = src.endsWith(".png");

  if (!isMask) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={label}
        className={cn("object-contain", className)}
        style={style}
      />
    );
  }

  return (
    <span
      role="img"
      aria-label={label}
      className={className}
      style={{
        display: "inline-block",
        backgroundColor: "currentColor",
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: "no-repeat",
        maskRepeat: "no-repeat",
        WebkitMaskPosition: "center",
        maskPosition: "center",
        WebkitMaskSize: "contain",
        maskSize: "contain",
        ...style,
      }}
    />
  );
}

/** The compact GS monogram — nav, footer chip, anywhere square. */
export function GreeneMonogram({
  className,
  size = 36,
  /** Ignore `size` and fill the parent instead. */
  fill = false,
}: {
  className?: string;
  size?: number;
  fill?: boolean;
}) {
  const src = ASSETS["gs-mark"] ?? "/brand/gs-chip.svg";
  return (
    <Mark
      src={src}
      label="Greene Studios"
      className={cn("shrink-0", className)}
      style={fill ? undefined : { width: size, height: size }}
    />
  );
}

/** The stacked "Greene Studios" wordmark — lockups and larger moments. */
export function GreeneWordmark({
  className,
  width = 180,
}: {
  className?: string;
  width?: number;
}) {
  const src = ASSETS["greene-wordmark"] ?? "/brand/greene-stacked.svg";
  return (
    <Mark
      src={src}
      label="Greene Studios"
      className={className}
      style={{ width, aspectRatio: "16 / 9" }}
    />
  );
}

/** Whether the real exports are in place yet. */
export const hasBrandExports = Boolean(ASSETS["gs-mark"]);
