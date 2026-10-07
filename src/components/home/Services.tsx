import { PlateLink } from "@/components/ui/Tag";
import { SERVICE_GROUPS } from "@/lib/offer";
import Pic from "@/components/ui/Pic";

/**
 * What we do: one card per service group, each led by a picture of our own
 * work in that discipline.
 */
const PICTURE: Record<string, { src: string; alt: string }> = {
  brand: { src: "/images/real/strike/04.webp", alt: "Strike wordmark on a tee" },
  web: { src: "/images/real/crypto-with-shola/live-desktop.webp", alt: "Crypto with Shola website" },
  product: { src: "/images/real/aipal/03.webp", alt: "AiPal app screens" },
  ongoing: { src: "/images/real/payvault/01.webp", alt: "PayVault website and brand pieces" },
};

const BLURB: Record<string, string> = {
  brand: "A name, a mark and a system that holds together everywhere it shows up.",
  web: "Sites that explain what you do in one look and turn visitors into enquiries.",
  product: "Web and mobile apps, designed and engineered by the same hands.",
  ongoing: "A design and build team on call, month to month.",
};

export default function Services() {
  return (
    <section className="px-5 py-24 sm:px-8 sm:py-36">
      <div className="mx-auto max-w-[1400px]">
        <h2 className="text-[clamp(2.4rem,6vw,5rem)] font-semibold leading-[0.95] tracking-[-0.045em]">
          What we do
        </h2>

        <ol className="m-0 mt-14 grid list-none gap-4 p-0 md:grid-cols-2">
          {SERVICE_GROUPS.map((g) => (
            <li key={g.id}>
              <article className="flex h-full flex-col overflow-hidden rounded-[12px] bg-[var(--brand-surface)] shadow-[0_1px_0_var(--brand-border)]">
                <Pic
                  src={PICTURE[g.id].src}
                  alt={PICTURE[g.id].alt}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="block h-auto w-full"
                />
                <div className="flex flex-1 flex-col p-7 sm:p-9">
                  <h3 className="text-[clamp(1.8rem,3.4vw,2.6rem)] font-semibold leading-none tracking-[-0.035em]">{g.title}</h3>
                  <p className="mt-4 max-w-[40ch] text-lg text-[var(--brand-text-secondary)]">{BLURB[g.id]}</p>
                  <p className="mt-auto pt-8 text-sm leading-relaxed text-[var(--brand-text-secondary)]">{g.items.join(" · ")}</p>
                </div>
              </article>
            </li>
          ))}
        </ol>

        <div className="mt-12 flex flex-wrap gap-3">
          <PlateLink href="/pricing">See pricing</PlateLink>
          <PlateLink href="/start">Find your starting point</PlateLink>
        </div>
      </div>
    </section>
  );
}
