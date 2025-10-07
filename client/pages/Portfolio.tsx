import { useMemo, useState } from "react";
import { Star } from "lucide-react";

// Portfolio — grille filtrable + témoignages + partenaires
export default function Portfolio() {
  const items = useMemo(() => ([
    { id: 1, title: "Portail Entreprise", cat: "Web", img: "/seo.webp" },
    { id: 2, title: "Marketplace Mobile", cat: "Mobile", img: "/mobile.webp" },
    { id: 3, title: "Certification SEO", cat: "Conseil", img: "/web.webp" },
    { id: 4, title: "LMS Formation", cat: "Formation", img: "/formation.jpg" },
    { id: 5, title: "Dashboard Analytics", cat: "Web", img: "/analytic.jpg" },
    { id: 6, title: "App Logistique", cat: "Mobile", img: "/logistic.jpg" },
  ]), []);
  const cats = ["Tous", "Web", "Mobile", "Formation", "Conseil"] as const;
  const [active, setActive] = useState<(typeof cats)[number]>("Tous");

  const filtered = items.filter((i) => active === "Tous" || i.cat === active);

  const testimonials = [
    { name: "Fulbert MALONGA", text: "Livraison rapide et qualité remarquable.", rating: 5 },
    { name: "Jeanette OKEMBA", text: "Accompagnement sérieux du conseil à la mise en production.", rating: 4 },
    { name: "Susane PERERA", text: "Équipe réactive et accompagnement de qualité, du début à la mise en ligne.", rating: 5 },
    { name: "Marc KABONGO", text: "Service efficace et à l'écoute, ma solution a été déployée sans stress.", rating: 5 } 
  ];

  const partners = Array.from({ length: 5 }, (_, i) => ({ id: i + 1, logo: "/logo.png" }));

  return (
    <div className="container py-14">
      <header className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Portfolio / Réalisations</h1>
        <p className="mt-3 text-muted-foreground">Sélection de projets livrés en Web, Mobile, Conseil et Formation.</p>
      </header>

      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button key={c} onClick={() => setActive(c)} className={`rounded-full border px-4 py-1.5 text-sm ${active === c ? "bg-primary text-primary-foreground" : "bg-background"}`}>{c}</button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p) => (
          <figure key={p.id} className="group relative overflow-hidden rounded-2xl border bg-background shadow-sm">
            <img src={p.img} alt="Projet" className="h-45 w-50 object-cover opacity-90 transition group-hover:scale-105" />
            <figcaption className="p-4">
              <div className="font-heading font-semibold">{p.title}</div>
              <div className="text-xs text-muted-foreground mt-1">{p.cat}</div>
            </figcaption>
          </figure>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">Témoignages</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="flex items-center gap-2 text-amber-500">
                {Array.from({ length: t.rating }).map((_, i) => (<Star key={i} size={16} fill="currentColor" />))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t.text}</p>
              <div className="mt-2 text-sm font-medium">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">Partenaires</h2>
        <div className="mt-4 relative overflow-hidden">
          <div className="flex items-center gap-8 whitespace-nowrap animate-[scroll_30s_linear_infinite]" style={{"--tw": 1} as any}>
            {partners.map((p) => (
              <img key={p.id} src={p.logo} alt="Logo partenaire" className="h-10 w-auto opacity-70" />
            ))}
            {partners.map((p) => (
              <img key={`dup-${p.id}`} src={p.logo} alt="Logo partenaire" className="h-10 w-auto opacity-70" />
            ))}
          </div>
        </div>
        <style>{`@keyframes scroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}`}</style>
      </section>
    </div>
  );
}
