import Image from "next/image";
import manifest from "@/lib/image-manifest.json";

const SIZES = manifest as Record<string, { w: number; h: number }>;

/**
 * An <Image> that reserves exactly the right space.
 *
 * Full-page screenshots vary from ~1800 to ~8000px tall, so any hardcoded
 * width/height guarantees layout shift. Dimensions come from
 * src/lib/image-manifest.json, written by `npm run images` from the real
 * files. An image missing from the manifest renders nothing rather than
 * collapsing the layout — that only happens before the pipeline has run.
 */
export function ShotImage({
  src,
  alt,
  sizes,
  priority = false,
  className = "h-auto w-full",
}: {
  src: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const dims = SIZES[src];
  if (!dims) return null;

  return (
    <Image
      src={src}
      alt={alt}
      width={dims.w}
      height={dims.h}
      sizes={sizes}
      priority={priority}
      className={className}
    />
  );
}

/** Whether the pipeline has produced this asset yet. */
export function hasShot(src: string): boolean {
  return Boolean(SIZES[src]);
}
