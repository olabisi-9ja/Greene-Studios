/**
 * Generated artwork for the concept sites.
 *
 * These are drawn from each brand's own tokens rather than sourced as photos:
 * the demos ship no stock imagery, nothing loads from a CDN, and every figure
 * stays a couple of hundred bytes. Deterministic — `seed` picks a variant, so
 * a given product tile looks the same on every build.
 */

/** Soft organic vessel — Vera. */
export function OrganicFigure({ seed = 0, label }: { seed?: number; label?: string }) {
  const shapes = [
    "M50 12c22 0 34 18 34 38s-14 38-34 38-34-18-34-38S28 12 50 12Z",
    "M50 10c26 0 32 22 32 42s-10 36-32 36-32-16-32-36S24 10 50 10Z",
    "M50 14c20 0 36 14 36 36s-16 40-36 40-36-18-36-40S30 14 50 14Z",
  ];
  const rot = [0, -8, 6][seed % 3];
  return (
    <svg viewBox="0 0 100 100" className="d-figure" role="img" aria-label={label ?? "Product"}>
      <rect width="100" height="100" fill="var(--b-surface-alt)" />
      <g transform={`rotate(${rot} 50 50)`}>
        <path d={shapes[seed % shapes.length]} fill="var(--b-accent)" opacity="0.16" />
        <path d={shapes[(seed + 1) % shapes.length]} fill="var(--b-accent)" opacity="0.28" />
        <path d={shapes[seed % shapes.length]} fill="none" stroke="var(--b-accent)" strokeWidth="0.7" />
      </g>
      <circle cx="50" cy={38 + (seed % 3) * 4} r="1.6" fill="var(--b-text)" opacity="0.35" />
    </svg>
  );
}

/** Full-bleed editorial block with a figure silhouette — Arc. */
export function EditorialFigure({ seed = 0, label }: { seed?: number; label?: string }) {
  const y = [30, 24, 34][seed % 3];
  return (
    <svg viewBox="0 0 100 130" className="d-figure" role="img" aria-label={label ?? "Look"}>
      <rect width="100" height="130" fill="var(--b-surface-alt)" />
      <rect x="0" y={y} width="100" height={130 - y} fill="var(--b-text)" opacity="0.06" />
      <path d={`M50 ${y - 12}c6 0 9 4 9 9s-3 8-3 8l10 5c4 2 6 5 6 10v${86 - y}H28V${y + 20}c0-5 2-8 6-10l10-5s-3-3-3-8 3-9 9-9Z`}
            fill="var(--b-text)" opacity="0.82" />
      <line x1="0" y1={y} x2="100" y2={y} stroke="var(--b-text)" strokeWidth="0.4" />
    </svg>
  );
}

/** Calm rounded card with a progress arc — Bloom. */
export function CareFigure({ seed = 0, label }: { seed?: number; label?: string }) {
  const pct = [0.62, 0.84, 0.41][seed % 3];
  const r = 30;
  const c = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 100 100" className="d-figure" role="img" aria-label={label ?? "Progress"}>
      <rect width="100" height="100" rx="6" fill="var(--b-surface-alt)" />
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--b-border)" strokeWidth="8" />
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--b-accent)" strokeWidth="8"
              strokeLinecap="round" strokeDasharray={`${c * pct} ${c}`} transform="rotate(-90 50 50)" />
      <text x="50" y="55" textAnchor="middle" fontSize="15" fontWeight="700" fill="var(--b-text)"
            fontFamily="var(--b-display)">{Math.round(pct * 100)}%</text>
    </svg>
  );
}

/** Ledger rows — Onyx. */
export function LedgerFigure({ seed = 0, label }: { seed?: number; label?: string }) {
  const rows = [
    ["Salary", "+4,820.00"],
    ["Rent", "−1,650.00"],
    ["Transfer", "−240.00"],
    ["Interest", "+18.44"],
    ["Card", "−96.20"],
  ];
  return (
    <svg viewBox="0 0 200 130" className="d-figure" role="img" aria-label={label ?? "Ledger"}>
      <rect width="200" height="130" rx="4" fill="var(--b-surface-alt)" />
      {rows.map(([name, amt], i) => (
        <g key={name} opacity={i === seed % rows.length ? 1 : 0.55}>
          <line x1="12" x2="188" y1={26 + i * 21} y2={26 + i * 21} stroke="var(--b-border)" strokeWidth="0.6" />
          <text x="12" y={38 + i * 21} fontSize="8" fill="var(--b-text)" fontFamily="var(--b-body)">{name}</text>
          <text x="188" y={38 + i * 21} fontSize="8" textAnchor="end" fontFamily="var(--b-mono)"
                fill={amt.startsWith("+") ? "var(--b-accent)" : "var(--b-text)"}>{amt}</text>
        </g>
      ))}
    </svg>
  );
}

/** Flat colour-block composition on the 8px grid — Prism. */
export function BlockFigure({ seed = 0, label }: { seed?: number; label?: string }) {
  const layouts = [
    [[0, 0, 60, 60], [64, 0, 36, 28], [64, 32, 36, 28], [0, 64, 100, 36]],
    [[0, 0, 100, 36], [0, 40, 46, 60], [50, 40, 50, 26], [50, 70, 50, 30]],
    [[0, 0, 44, 100], [48, 0, 52, 44], [48, 48, 24, 52], [76, 48, 24, 52]],
  ];
  const fills = ["var(--b-accent)", "var(--b-text)", "var(--b-border)", "var(--b-muted)"];
  const ops = [1, 0.85, 1, 0.4];
  return (
    <svg viewBox="0 0 100 100" className="d-figure" role="img" aria-label={label ?? "Module"}>
      <rect width="100" height="100" fill="var(--b-surface-alt)" />
      {layouts[seed % layouts.length].map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill={fills[i]} opacity={ops[i]} />
      ))}
    </svg>
  );
}
