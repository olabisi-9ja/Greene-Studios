'use client';

import { cn } from '@/lib/utils';
import type { CSSProperties, HTMLAttributes, ReactNode } from 'react';
import { Children } from 'react';

export type MarqueeProps = HTMLAttributes<HTMLDivElement>;

export const Marquee = ({ className, ...props }: MarqueeProps) => (
  <div className={cn('relative w-full overflow-hidden', className)} {...props} />
);

export type MarqueeContentProps = HTMLAttributes<HTMLDivElement> & {
  /** Pixels per second. */
  speed?: number;
  direction?: 'left' | 'right';
  pauseOnHover?: boolean;
  children?: ReactNode;
  /** Accepted for API compatibility; the track always duplicates once. */
  autoFill?: boolean;
  loop?: number;
};

/**
 * CSS-only marquee. The track holds two identical copies of the children and
 * translates by exactly -50%, so the seam is never visible. Duration is
 * derived from `speed` against a nominal track width, which keeps rows of
 * different lengths scrolling at a comparable rate.
 */
export const MarqueeContent = ({
  className,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  children,
  // Pulled out so they never reach the DOM.
  autoFill: _autoFill,
  loop: _loop,
  ...props
}: MarqueeContentProps) => {
  const items = Children.toArray(children);
  const durationSeconds = Math.max(8, (items.length * 220) / speed);

  return (
    <div
      className={cn('marquee-track group flex w-max', pauseOnHover && 'marquee-pausable', className)}
      style={
        {
          '--marquee-duration': `${durationSeconds}s`,
          '--marquee-direction': direction === 'right' ? 'reverse' : 'normal',
        } as CSSProperties
      }
      {...props}
    >
      <div className="flex shrink-0 items-center">{items}</div>
      <div className="flex shrink-0 items-center" aria-hidden="true">
        {items}
      </div>
    </div>
  );
};

export type MarqueeFadeProps = HTMLAttributes<HTMLDivElement> & {
  side: 'left' | 'right';
};

export const MarqueeFade = ({ className, side, ...props }: MarqueeFadeProps) => (
  <div
    className={cn(
      'pointer-events-none absolute top-0 bottom-0 z-10 h-full w-24',
      side === 'left' ? 'left-0 bg-gradient-to-r' : 'right-0 bg-gradient-to-l',
      'from-[var(--brand-bg)] to-transparent',
      className
    )}
    {...props}
  />
);

export type MarqueeItemProps = HTMLAttributes<HTMLDivElement>;

export const MarqueeItem = ({ className, ...props }: MarqueeItemProps) => (
  <div className={cn('mx-2 flex-shrink-0 object-contain', className)} {...props} />
);
