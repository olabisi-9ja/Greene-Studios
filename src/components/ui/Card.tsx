import type { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * The card. One implementation, used everywhere.
 *
 * Before this, sixteen files each wrote their own
 * `rounded-2xl border border-[var(--brand-border)] bg-[var(--brand-surface)] p-8`
 * with slightly different radii, padding and hover behaviour, which is how a
 * design system quietly stops being one.
 *
 * Styling lives in globals.css (`.card` and friends) so a card is one class,
 * and so the hover rule can be written once and honour prefers-reduced-motion.
 */
type CardOwnProps = {
  /** Renders as <a>, <li>, <article>… Defaults to <div>. */
  as?: ElementType;
  /** Lifts and brightens its border on hover. Use for anything clickable. */
  interactive?: boolean;
  /** Quieter background, for a card sitting on --brand-surface. */
  alt?: boolean;
  /** Larger radius, for hero-scale cards. */
  large?: boolean;
  /** Removes padding, for a card whose first child is a full-bleed image. */
  flush?: boolean;
  /** Accent border. At most one per group. */
  featured?: boolean;
  className?: string;
  children?: ReactNode;
};

export function Card<T extends ElementType = "div">({
  as,
  interactive,
  alt,
  large,
  flush,
  featured,
  className,
  children,
  ...rest
}: CardOwnProps & Omit<ComponentPropsWithoutRef<T>, keyof CardOwnProps>) {
  const Component = (as ?? "div") as ElementType;
  return (
    <Component
      className={cn(
        "card",
        interactive && "card-interactive",
        alt && "card-alt",
        large && "card-lg",
        flush && "card-flush",
        featured && "card-featured",
        className
      )}
      {...rest}
    >
      {children}
    </Component>
  );
}

/** Padded body for a `flush` card whose first child is an image. */
export function CardBody({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("flex flex-1 flex-col gap-3 p-6 md:p-7", className)}>{children}</div>;
}
