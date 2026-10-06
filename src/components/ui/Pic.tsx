/* eslint-disable @next/next/no-img-element */
import { getImageProps } from "next/image";
import { preload } from "react-dom";
import type { CSSProperties, SyntheticEvent } from "react";
import { IMAGE_DIMS } from "@/lib/image-dims";

/**
 * A picture from /public/images, served by Next's image optimiser: AVIF or
 * WebP at the width the screen needs (from `sizes`), loaded lazily unless
 * `priority` (then it's also preloaded from the page's <head>, so the
 * browser finds it before any script runs). It renders a plain <img>, so it styles like one (the caller's
 * classes decide its box). Width and height come from lib/image-dims, so
 * the browser knows its shape before it loads.
 */
export default function Pic({
  src,
  alt,
  sizes,
  priority = false,
  className,
  style,
  onLoad,
}: {
  src: string;
  alt: string;
  /** how wide it shows, e.g. "(min-width: 768px) 50vw, 100vw" */
  sizes: string;
  /** above the fold: load straight away, at high priority */
  priority?: boolean;
  className?: string;
  style?: CSSProperties;
  onLoad?: (e: SyntheticEvent<HTMLImageElement>) => void;
}) {
  const dims = IMAGE_DIMS[src];
  if (!dims) {
    // not in the manifest yet (run npm run images:dims): plain and lazy
    return <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} decoding="async" className={className} style={style} onLoad={onLoad} />;
  }
  const { props } = getImageProps({ src, alt, width: dims[0], height: dims[1], sizes, priority, quality: 75 });
  if (priority && props.srcSet) preload(props.src, { as: "image", imageSrcSet: props.srcSet, imageSizes: sizes, fetchPriority: "high" });
  // the caller's classes size it, so drop the inline colour/size hints next/image adds
  const { style: _ignored, ...rest } = props;
  void _ignored;
  return <img {...rest} alt={alt} className={className} style={style} onLoad={onLoad} />;
}

/** Natural width / height of a picture, if known. */
export function ratioOf(src: string): number | undefined {
  const d = IMAGE_DIMS[src];
  return d ? d[0] / d[1] : undefined;
}
