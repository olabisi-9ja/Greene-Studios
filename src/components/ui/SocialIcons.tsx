import type { IconType } from "react-icons";
import { SiInstagram, SiX } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa";
import { BRAND } from "@/lib/data";

/**
 * The studio's social accounts, as each platform's official icon on a solid
 * circle in the theme's logo colour (like the dock). One list, used by the
 * footer and the contact page; add or change accounts here.
 */
export const SOCIAL: { label: string; href: string; Icon: IconType }[] = [
  { label: "Instagram", href: BRAND.instagram, Icon: SiInstagram },
  { label: "X", href: BRAND.twitter, Icon: SiX },
  { label: "LinkedIn", href: BRAND.linkedin, Icon: FaLinkedin },
];

export default function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <ul className={`m-0 flex list-none flex-wrap gap-3 p-0 ${className}`} aria-label="Greene Studios elsewhere">
      {SOCIAL.map(({ label, href, Icon }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${label} (opens in a new tab)`}
            className="grid size-11 place-items-center rounded-full bg-[var(--logo)] text-[var(--brand-paper)] transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] hover:-translate-y-0.5 active:scale-90"
          >
            <Icon className="size-5" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>
  );
}
