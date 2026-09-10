import { GreeneMonogram } from "@/components/ui/GreeneMark";

interface LogoProps {
  className?: string;
}

/**
 * Thin wrapper kept for existing call sites. The mark itself now comes from
 * GreeneMark, which prefers the real logo export and falls back to the
 * hand-drawn SVG until `npm run brand` has been run.
 */
export function Logo({ className = "w-12 h-12" }: LogoProps) {
  return (
    <span className={`relative inline-flex items-center justify-center ${className}`}>
      <GreeneMonogram className="h-full w-full" fill />
    </span>
  );
}
