import { arc as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { EditorialFigure } from "@/components/demo/Figure";

export const metadata = { title: "Stories" };

const STORIES = [
  {
    kicker: "Biella, Italy",
    title: "The mill that will not weave under 400 grams",
    body: "Double-faced wool is two cloths joined by hand along the edge, which is why the overcoat has no lining and no seams at the hem. It also takes four times as long, which is most of what you are paying for.",
  },
  {
    kicker: "Repairs",
    title: "Nine hundred garments came back last year",
    body: "Most of them needed a button, a cuff, or a moth hole closed. Eleven were beyond mending and we replaced them. The repair room is two people and a Bernina from 1978.",
  },
  {
    kicker: "Pricing",
    title: "Why nothing here goes on sale",
    body: "A markdown is a message to the person who paid full price that they were wrong to. We would rather make eleven pieces we can sell at one price than twenty we cannot.",
  },
];

export default function ArcStories() {
  return (
    <DemoShell brand={b} current="/demo/arc/stories">
      <section className="d-section-tight">
        <div className="d-wrap">
          <h1 className="d-display d-h1">Stories</h1>
        </div>
      </section>

      {STORIES.map((s, i) => (
        <section key={s.title} className="d-section-tight" style={{ borderTop: "1px solid var(--b-border)" }}>
          <div className="d-wrap d-split" style={{ alignItems: "center" }}>
            <div className="d-stack" style={{ order: i % 2 ? 2 : 1 }}>
              <p className="d-eyebrow">{s.kicker}</p>
              <h2 className="d-display d-h2">{s.title}</h2>
              <p className="d-body">{s.body}</p>
            </div>
            <div style={{ order: i % 2 ? 1 : 2 }}>
              <EditorialFigure seed={i} label={s.title} />
            </div>
          </div>
        </section>
      ))}
    </DemoShell>
  );
}
