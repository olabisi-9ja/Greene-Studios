import Link from "next/link";
import { chopbox as b } from "@/lib/brands";
import { DemoShell } from "@/components/demo/DemoShell";
import { DishFigure } from "@/components/demo/Figure";

export const metadata = { title: "Restaurants" };

const CATS = ["All", "Rice", "Swallow", "Grills", "Breakfast", "Drinks"];

const SPOTS = [
  { name: "Mama Put Corner", dish: "Jollof, plantain, chicken", eta: "20 to 30 min", fee: "$2 delivery", rating: "4.8" },
  { name: "Suya Republic", dish: "Beef suya, onions, yaji", eta: "25 to 35 min", fee: "$2 delivery", rating: "4.7" },
  { name: "Amala Joint", dish: "Amala, ewedu, gbegiri", eta: "30 to 40 min", fee: "$2 delivery", rating: "4.6" },
  { name: "The Akara Shop", dish: "Akara, pap, bread", eta: "15 to 25 min", fee: "$1 delivery", rating: "4.9" },
  { name: "Ofada Kitchen", dish: "Ofada rice, ayamase", eta: "30 to 45 min", fee: "$2 delivery", rating: "4.7" },
  { name: "Zobo & Co", dish: "Zobo, chapman, kunu", eta: "15 to 20 min", fee: "$1 delivery", rating: "4.8" },
];

export default function ChopboxRestaurants() {
  return (
    <DemoShell brand={b} current="/demo/chopbox/restaurants">
      <section className="d-section-tight">
        <div className="d-wrap d-stack">
          <p className="d-eyebrow">Delivering near you</p>
          <h1 className="d-display d-h1 d-m-xs">What are you craving?</h1>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 8 }}>
            {CATS.map((c, i) => (
              <button key={c} type="button" className={i === 0 ? "d-btn" : "d-btn d-btn-ghost"} style={{ minHeight: 44 }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap d-wrap-wide">
          <div className="d-grid d-cols-3">
            {SPOTS.map((s, i) => (
              <article key={s.name} className="d-card" style={{ padding: 0, overflow: "hidden" }}>
                <DishFigure seed={i} label={s.dish} />
                <div style={{ padding: "16px 18px 20px", display: "grid", gap: 4 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
                    <h2 className="d-display d-h3" style={{ margin: 0 }}>{s.name}</h2>
                    <span aria-label={`Rated ${s.rating} out of 5`} style={{ fontWeight: 700 }}>{s.rating}</span>
                  </div>
                  <p className="d-muted" style={{ margin: 0 }}>{s.dish}</p>
                  <p style={{ margin: "6px 0 0", fontSize: "0.875rem" }}>
                    {s.eta} · {s.fee}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="d-section-tight">
        <div className="d-wrap d-center">
          <p className="d-muted" style={{ fontSize: "0.875rem" }}>
            Chopbox is a concept brand by Greene Studios. Restaurants and ratings are illustrative.{" "}
            <Link href="/work/chopbox" style={{ textDecoration: "underline" }}>Read the case study</Link>.
          </p>
        </div>
      </section>
    </DemoShell>
  );
}
