import Image from "next/image";

type Props = {
  src: string;
  alt: string;
  kicker?: string;
  caption?: string;
  className?: string;
};

/**
 * Framed image with a slow cinematic pan & zoom (CSS keyframes in
 * globals.css, disabled under prefers-reduced-motion).
 */
export default function KenBurns({ src, alt, kicker, caption, className = "" }: Props) {
  return (
    <div className={`w-full ${className}`}>
      <div className="relative aspect-video overflow-hidden rounded-xl border border-[var(--brand-border)]">
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 672px"
          className="ken-burns-img object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
        {kicker || caption ? (
          <div className="absolute bottom-4 left-4">
            {kicker ? (
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/75">{kicker}</p>
            ) : null}
            {caption ? <p className="text-sm font-semibold text-white">{caption}</p> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}
