import type { Metadata } from "next";
import { luminary } from "@/lib/brands";
import { fontPreloads } from "@/lib/brands/css";

export const metadata: Metadata = {
  title: { absolute: `${luminary.name} — ${luminary.tagline}`, template: `%s · ${luminary.name}` },
  description: luminary.direction,
  robots: { index: false, follow: true },
};

export default function LuminaryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {fontPreloads(luminary).map((href) => (
        <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
      ))}
      {children}
    </>
  );
}
