/**
 * A label whose characters roll over on hover.
 *
 * Two stacked copies per character inside a 1.25em clip; the CSS in
 * globals.css moves both up by one line when an ancestor `.group` is
 * hovered. The delay is staggered per character, which is what turns a
 * flip into the ripple that runs left-to-right across the label.
 *
 * The visible characters are hidden from assistive tech and the whole
 * label is announced once, so a screen reader hears "Book a call" rather
 * than eleven separate letters read twice each.
 */
export default function RollLabel({
  text,
  /** Milliseconds added per character. 0 makes the whole label flip at once. */
  stagger = 16,
  className,
}: {
  text: string;
  stagger?: number;
  className?: string;
}) {
  return (
    <span className={["roll", className].filter(Boolean).join(" ")} aria-label={text}>
      {Array.from(text).map((char, i) => {
        const glyph = char === " " ? " " : char;
        return (
          <span
            key={`${char}-${i}`}
            className="roll-char"
            style={{ transitionDelay: `${i * stagger}ms` }}
            aria-hidden="true"
          >
            <span>{glyph}</span>
            <span>{glyph}</span>
          </span>
        );
      })}
    </span>
  );
}
