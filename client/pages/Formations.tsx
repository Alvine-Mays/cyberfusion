import { useMemo } from "react";
import { buildMailtoURL, buildWhatsAppURL } from "@/lib/api";

// Formations & Coaching — mini‑fiches avec tarifs en XAF et sessions
export default function Formations() {
  const courses = useMemo(() => ([
    { title: "Développement Web - Mobile", duration: "8 semaines", price: 12000, discount: 9900 }, 
    { title: "Marketing Digital & SEO", duration: "4 semaines", price: 7000, discount: 5000 },
    { title: "DevOps & Cloud Basic", duration: "6 semaines", price: 12000, discount: 9900 },
    { title: "UX/UI Design Essentials", duration: "5 semaines", price: 8000, discount: 6500 },
    { title: "Programmation — Initiation", duration: "2 semaines", price: 5000, discount: 4000 },
  ]), []);

  const sessions = [
    { date: "2025-10-25", course: "Développement Web - Mobile" },
    { date: "2025-10-22", course: "DevOps & Cloud Basic" },
  ];

  return (
    <div className="container py-14">
      <header className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Formations & Coaching</h1>
        <p className="mt-3 text-muted-foreground">Des parcours pratiques orientés résultats. Tarifs en XAF avec réductions possibles.</p>
      </header>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <div key={c.title} className="relative rounded-2xl border bg-background p-6 shadow-sm overflow-hidden">
            <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(0,180,216,0.12)_0%,_transparent_60%)]" />
            <div className="font-heading text-lg font-bold">{c.title}</div>
            <p className="mt-1 text-xs text-muted-foreground">Durée: {c.duration}</p>
            <div className="mt-4 flex items-baseline gap-2">
              <div className="text-2xl font-heading font-extrabold text-foreground">{c.discount.toLocaleString("fr-FR")} XAF</div>
              <div className="text-sm text-muted-foreground line-through">{c.price.toLocaleString("fr-FR")} XAF</div>
              <span className="ml-auto inline-flex items-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 text-xs">Promo</span>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <a
                href={buildWhatsAppURL({ nom: "", email: "", telephone: "", typeProjet: `Formation: ${c.title}`, budget: "", description: `Je souhaite m'abonner à la formation ${c.title}.` })}
                target="_blank" rel="noreferrer"
                className="inline-flex px-4 py-2 rounded-md bg-primary text-primary-foreground font-display font-semibold"
              >WhatsApp</a>
              <a
                href={buildMailtoURL("Inscription formation — CyberFusion Group", [
                  `Formation: ${c.title}`,
                  `Message: Je souhaite m'abonner à cette formation.`,
                ])}
                className="inline-flex px-4 py-2 rounded-md border"
              >E‑mail</a>
            </div>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">Prochaines sessions</h2>
        <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {sessions.map((s) => (
            <li key={s.date} className="rounded-lg border bg-muted/30 px-4 py-3">
              <div className="text-sm text-muted-foreground">{new Date(s.date).toLocaleDateString("fr-FR", { day: "2-digit", month: "long", year: "numeric" })}</div>
              <div className="font-medium">{s.course}</div>
              <a href="/contact" className="text-sm text-primary hover:underline">Me prévenir / m’inscrire</a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
