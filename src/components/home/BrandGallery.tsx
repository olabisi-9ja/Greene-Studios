/* eslint-disable @next/next/no-img-element */
import Link from "next/link";

/**
 * The identity work beside the builds it became: one even two-column grid,
 * every frame the same shape, a caption under each. All images are the
 * studio's own boards and screenshots of the live concept sites.
 */
const TILES = [
  { src: "/images/work/luminary/identity.webp", slug: "luminary", name: "Luminary", what: "Identity" },
  { src: "/images/work/luminary/home-desktop.webp", slug: "luminary", name: "Luminary", what: "Website" },
  { src: "/images/work/arc/identity.webp", slug: "arc", name: "Arc", what: "Identity" },
  { src: "/images/work/onyx/home-desktop-dark.webp", slug: "onyx", name: "Onyx", what: "Website" },
  { src: "/images/work/bloom/identity.webp", slug: "bloom", name: "Bloom", what: "Identity" },
  { src: "/images/work/vera/home-desktop.webp", slug: "vera", name: "Vera", what: "Website" },
];

export default function BrandGallery() {
  return (
    <section className="px-5 pb-24 sm:px-8 lg:pb-32">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="mb-10 text-[clamp(1.8rem,3.6vw,3rem)] font-semibold leading-none tracking-[-0.04em]">
          Identity, then the build.
        </h2>
        <ul className="m-0 grid list-none grid-cols-1 gap-x-5 gap-y-10 p-0 md:grid-cols-2">
          {TILES.map((t) => (
            <li key={t.src}>
              <Link href={`/work/${t.slug}`} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden rounded-[4px] bg-[var(--brand-surface-secondary)]">
                  <img
                    src={t.src}
                    alt={`${t.name} ${t.what.toLowerCase()}`}
                    loading="lazy"
                    decoding="async"
                    className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.19,1,0.22,1)] group-hover:scale-[1.03]"
                  />
                </div>
                <p className="mt-3 flex justify-between text-sm">
                  <span className="font-medium">{t.name}</span>
                  <span className="text-[var(--brand-text-secondary)]">{t.what}</span>
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
