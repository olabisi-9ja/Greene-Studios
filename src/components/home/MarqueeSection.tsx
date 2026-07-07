import { Marquee, MarqueeContent, MarqueeFade, MarqueeItem } from "@/components/ui/marquee";

const SKILLS = [
  "Web Design",
  "UI/UX",
  "Branding",
  "Motion",
  "Frontend Dev",
  "Design Systems",
  "Product Design",
  "AI Integration",
  "WebGL",
  "GSAP",
  "Next.js",
  "Figma",
  "Framer",
  "Webflow",
];

export default function MarqueeSection() {
  return (
    <section className="py-6 bg-[#0e0e0e] overflow-hidden border-y border-white/5 relative">
      <Marquee>
        <MarqueeFade side="left" className="from-[#0e0e0e]" />
        <MarqueeFade side="right" className="from-[#0e0e0e]" />
        <MarqueeContent speed={40} className="items-center">
          {SKILLS.map((skill, i) => (
            <MarqueeItem key={i} className="flex items-center gap-6 mx-6">
              <span className="text-[#6B8F71] text-xs">✦</span>
              <span className="text-[#F7F5F2]/70 text-sm font-medium tracking-widest uppercase">
                {skill}
              </span>
            </MarqueeItem>
          ))}
        </MarqueeContent>
      </Marquee>
    </section>
  );
}
