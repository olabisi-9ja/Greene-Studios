"use client";

import Image from "next/image";
import { useElementScroll } from "@/lib/hooks/useElementScroll";

export type RailImage = { src: string; alt: string };

type Props = {
  images: RailImage[];
  className?: string;
};

/**
 * A wide strip of images that slides horizontally as the block scrolls,
 * driven purely by scroll progress.
 */
export default function ScrollImageRail({ images, className = "" }: Props) {
  const { ref, progress } = useElementScroll<HTMLDivElement>();
  // Track width is n * 50% of the viewport; the usable shift is whatever
  // remains after the visible 100%, minus a small safety margin.
  const maxShift = ((images.length - 2) / images.length) * 100 * 0.92;
  const translateX = -(progress * maxShift);

  return (
    <div ref={ref} className={`overflow-hidden ${className}`}>
      <div
        className="flex h-[240px] gap-3 will-change-transform md:h-[320px]"
        style={{ transform: `translateX(${translateX}%)`, width: `${images.length * 50}%` }}
      >
        {images.map((img) => (
          <div
            key={img.src}
            className="relative h-full flex-1 overflow-hidden rounded-xl border border-[var(--brand-border)] bg-[var(--brand-surface-secondary)]"
          >
            <Image
              src={img.src}
              alt={img.alt}
              fill
              sizes="(max-width: 768px) 80vw, 33vw"
              className="object-cover object-top"
              loading="lazy"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
