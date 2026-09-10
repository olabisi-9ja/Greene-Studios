import type { Metadata } from "next";
import { prism } from "@/lib/brands";
import { fontPreloads } from "@/lib/brands/css";

export const metadata: Metadata = {
  title: { absolute: `${prism.name} — ${prism.tagline}`, template: `%s · ${prism.name}` },
  description: prism.direction,
  robots: { index: false, follow: true },
};

export default function PrismLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {fontPreloads(prism).map((href) => (
        <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
      ))}
      {children}
    </>
  );
}
