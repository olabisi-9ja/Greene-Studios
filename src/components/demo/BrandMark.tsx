/**
 * The brand marks, inlined as JSX rather than <img src="/demo/…/mark.svg">.
 *
 * They need `currentColor` and `--b-accent` to resolve against the page, which
 * an <img> cannot do — and inlining saves a request on a page whose whole
 * pitch is that it loads fast. The SVG files on disk remain the source of
 * truth for handoff and for the identity boards.
 */
const PATHS: Record<string, React.ReactNode> = {
  luminary: (
    <>
      <g fill="currentColor">
        <rect x="1" y="25" width="6" height="6" rx="1" />
        <rect x="9" y="25" width="6" height="6" rx="1" />
        <rect x="9" y="17" width="6" height="6" rx="1" />
        <rect x="17" y="25" width="6" height="6" rx="1" />
        <rect x="17" y="17" width="6" height="6" rx="1" />
        <rect x="17" y="9" width="6" height="6" rx="1" />
      </g>
      <g fill="var(--b-accent, currentColor)">
        <rect x="25" y="25" width="6" height="6" rx="1" />
        <rect x="25" y="17" width="6" height="6" rx="1" />
        <rect x="25" y="9" width="6" height="6" rx="1" />
        <rect x="25" y="1" width="6" height="6" rx="1" />
      </g>
    </>
  ),
  vera: (
    <>
      <path
        d="M16 2C16 2 27 9.5 27 18C27 24.6 22.1 30 16 30C9.9 30 5 24.6 5 18C5 9.5 16 2 16 2Z"
        fill="var(--b-accent, currentColor)"
        fillOpacity="0.16"
      />
      <path
        d="M16 2C16 2 27 9.5 27 18C27 24.6 22.1 30 16 30C9.9 30 5 24.6 5 18C5 9.5 16 2 16 2Z"
        stroke="currentColor"
        strokeWidth="1.6"
      />
      <path d="M16 30V13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 20C16 20 13 18.4 11.6 15.6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M16 24.5C16 24.5 19 22.9 20.4 20.1" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </>
  ),
  arc: (
    <>
      <path
        d="M4 26.2C4 13.8 9.4 5.2 16 5.2C22.6 5.2 28 13.8 28 26.2H24.6C24.6 13.8 20.9 6.8 16 6.8C11.1 6.8 7.4 13.8 7.4 26.2H4Z"
        fill="currentColor"
      />
      <rect x="2" y="28.2" width="28" height="1.5" fill="currentColor" />
    </>
  ),
  bloom: (
    <>
      <g fill="currentColor">
        <path d="M16 2.5c3.6 0 6 2.6 6 5.9 0 2.6-1.7 4.6-4.3 5.4l-1.7.5-1.7-.5C11.7 13 10 11 10 8.4c0-3.3 2.4-5.9 6-5.9Z" />
        <path d="M29.5 16c0 3.6-2.6 6-5.9 6-2.6 0-4.6-1.7-5.4-4.3l-.5-1.7.5-1.7c.8-2.6 2.8-4.3 5.4-4.3 3.3 0 5.9 2.4 5.9 6Z" />
        <path d="M16 29.5c-3.6 0-6-2.6-6-5.9 0-2.6 1.7-4.6 4.3-5.4l1.7-.5 1.7.5c2.6.8 4.3 2.8 4.3 5.4 0 3.3-2.4 5.9-6 5.9Z" />
        <path d="M2.5 16c0-3.6 2.6-6 5.9-6 2.6 0 4.6 1.7 5.4 4.3l.5 1.7-.5 1.7C13 20.3 11 22 8.4 22c-3.3 0-5.9-2.4-5.9-6Z" />
      </g>
      <circle cx="16" cy="16" r="2.6" fill="var(--b-accent, currentColor)" />
    </>
  ),
  onyx: (
    <>
      <path d="M16 2 28 9v14l-12 7-12-7V9L16 2Z" fill="var(--b-accent, currentColor)" fillOpacity="0.14" />
      <path d="M16 2 4 9l12 7 12-7-12-7Z" fill="var(--b-accent, currentColor)" fillOpacity="0.42" />
      <path d="M16 2 28 9v14l-12 7-12-7V9L16 2Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M4 9l12 7 12-7M16 16v14" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </>
  ),
  prism: (
    <>
      <path d="M1 18h10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M16 5 26 26H6L16 5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <g strokeWidth="2" strokeLinecap="round">
        <path d="M20.5 13h10.5" stroke="var(--b-accent, currentColor)" />
        <path d="M22.4 17.5H31" stroke="currentColor" strokeOpacity="0.6" />
        <path d="M24.3 22H31" stroke="currentColor" strokeOpacity="0.32" />
      </g>
    </>
  ),
};

export function BrandMark({ slug, size = 26 }: { slug: string; size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} fill="none" aria-hidden="true" focusable="false">
      {PATHS[slug]}
    </svg>
  );
}
