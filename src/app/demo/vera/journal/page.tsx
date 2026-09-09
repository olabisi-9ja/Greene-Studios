import { vera as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { OrganicFigure } from "@/components/demo/Figure";

export const metadata = { title: "Journal" };

const POSTS = [
  {
    title: "Why oils go rancid, and why we let them",
    date: "March",
    excerpt:
      "A shelf life of three years is not a sign of quality. It is a sign of something added to buy the time. Here is what we do instead, and what it costs.",
  },
  {
    title: "The case against a ten-step routine",
    date: "February",
    excerpt:
      "Every extra layer is another chance for something to sit on top of the last thing rather than sink into it. Four minutes is not a compromise.",
  },
  {
    title: "What 'unrefined' actually means on a label",
    date: "January",
    excerpt:
      "Refining shea makes it white, odourless and easier to sell. It also removes most of what makes shea worth using.",
  },
];

export default function VeraJournal() {
  return (
    <DemoShell brand={b} current="/demo/vera/journal">
      <section className="d-section">
        <div className="d-wrap d-stack-lg">
          <div className="d-stack d-center" style={{ alignItems: "center" }}>
            <p className="d-eyebrow">Journal</p>
            <h1 className="d-display d-h1 d-m-xs">Notes from the bench.</h1>
          </div>

          <div className="d-stack-lg">
            {POSTS.map((p, i) => (
              <article key={p.title} className="d-split" style={{ alignItems: "center" }}>
                <div className="d-media" style={{ order: i % 2 ? 2 : 1 }}>
                  <OrganicFigure seed={i + 1} label={p.title} />
                </div>
                <div className="d-stack" style={{ order: i % 2 ? 1 : 2 }}>
                  <p className="d-eyebrow">{p.date}</p>
                  <h2 className="d-display d-h2">{p.title}</h2>
                  <p className="d-body">{p.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </DemoShell>
  );
}
