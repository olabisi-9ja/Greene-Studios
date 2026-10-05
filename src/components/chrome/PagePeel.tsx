"use client";

/**
 * Back to top, as a dog-eared corner at the very bottom right of the page.
 * The corner is folded back along its diagonal: the flap is the back of the
 * sheet, and the triangle it uncovers is the accent with an arrow. Hover or
 * focus peels it further; a click takes you to the top.
 */
export default function PagePeel() {
  const toTop = () => {
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.4 });
    else window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button type="button" onClick={toTop} aria-label="Back to top" className="page-peel">
      <span className="page-peel-under" aria-hidden="true">
        <svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8 13V3M3.5 7.5 8 3l4.5 4.5" />
        </svg>
        <span className="page-peel-label">Top</span>
      </span>
      <span className="page-peel-shadow" aria-hidden="true">
        <span className="page-peel-flap" />
      </span>
    </button>
  );
}
