import { useMemo } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

// Page Services — cartes animées + modales détaillées
export default function Services() {
  const services = useMemo(() => ([
    {
      title: "Développement Web",
      desc: "Sites et applications web modernes, performants et sécurisés.",
      details: "Conception sur mesure : sites vitrines, e‑commerce, portails, intranets et dashboards. SEO, performances, accessibilité, hébergement, analytics et maintenance.",
      img: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Développement Mobile",
      desc: "Apps iOS & Android réactives, rapides et robustes.",
      details: "React Native/Flutter, publication stores, CI/CD, crash reporting, analytics, offline‑first et push notifications.",
      img: "https://images.unsplash.com/photo-1542393545-10f5cde2c810?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Conseil & Audit Digital",
      desc: "Diagnostic 360°, stratégie digitale et optimisation.",
      details: "Audit technique et UX, cartographie des risques, feuille de route priorisée, accompagnement à la transformation.",
      img: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Formation & Coaching",
      desc: "Programmes pratiques orientés résultats.",
      details: "Formations en présentiel et à distance : programmation, design, DevOps & Cloud, marketing digital, SEO. Tarifs en XAF avec remises possibles.",
      img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?q=80&w=1200&auto=format&fit=crop",
    },
    {
      title: "Maintenance & Support",
      desc: "Supervision, SLOs, sécurité et évolutions continues.",
      details: "Contrats de service, sécurité applicative, sauvegardes, mises à jour, monitoring et support prioritaire.",
      img: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
    },
  ]), []);

  return (
    <div className="container py-14">
      <header className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Nos Services</h1>
        <p className="mt-3 text-muted-foreground">Des solutions sur mesure pour accélérer votre transformation numérique avec fiabilité, innovation et proximité.</p>
      </header>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <Dialog key={s.title}>
            <DialogTrigger asChild>
              <button className="group relative overflow-hidden rounded-2xl border bg-gradient-to-br from-background to-muted/40 p-6 text-left shadow transition hover:-translate-y-0.5 hover:shadow-xl">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(0,180,216,0.12)_0%,_transparent_60%)]" />
                <img src={s.img} alt="Illustration" className="pointer-events-none mb-4 h-24 w-24 rounded-lg object-cover opacity-80" />
                <div className="font-heading text-xl font-bold">{s.title}</div>
                <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
                <div className="mt-4 inline-flex items-center gap-2 text-primary font-display font-semibold">En savoir plus <span aria-hidden>→</span></div>
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle className="font-heading">{s.title}</DialogTitle>
                <DialogDescription>{s.details}</DialogDescription>
              </DialogHeader>
              <div className="flex gap-3 pt-2">
                <a href="/devis" className="inline-flex px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-semibold">Demander un devis</a>
                <a href="#contact" className="inline-flex px-5 py-2.5 rounded-md border">Nous contacter</a>
              </div>
            </DialogContent>
          </Dialog>
        ))}
      </div>
    </div>
  );
}
