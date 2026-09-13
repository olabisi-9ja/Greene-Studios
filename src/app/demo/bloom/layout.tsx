import type { Metadata } from "next";
import { bloom } from "@/lib/brands";
import { fontPreloads } from "@/lib/brands/css";

export const metadata: Metadata = {
  title: { absolute: `${bloom.name} - ${bloom.tagline}`, template: `%s · ${bloom.name}` },
  description: bloom.direction,
  robots: { index: false, follow: true },
};

export default function BloomLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {fontPreloads(bloom).map((href) => (
        <link key={href} rel="preload" as="font" type="font/woff2" href={href} crossOrigin="anonymous" />
      ))}
      {children}
    </>
  );
}
