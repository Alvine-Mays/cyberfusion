import { useEffect, useMemo, useState } from "react";
import Particles from "@/components/Particles";
import TypedText from "@/components/TypedText";
import { incrementVisitorCount } from "@/lib/api";
import { motion } from "framer-motion";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { CheckCircle2 } from "lucide-react";

// Page d'accueil principale — CyberFusion Group
export default function Index() {
  const [visitors, setVisitors] = useState<number | null>(null);

  // Incrémente le compteur de visiteurs à l'arrivée sur la page
  useEffect(() => {
    incrementVisitorCount().then(setVisitors).catch(() => setVisitors(null));
  }, []);

  const stats = useMemo(() => ([
    { label: "projets livrés", value: +10 },
    { label: "partenaires", value: 2 },
    { label: "personnes formées", value: 20 },
  ]), []);

  const services = useMemo(() => ([
    { title: "Développement Web", desc: "Sites et applications web modernes, performants et sécurisés.", details: "Nous concevons des expériences web sur mesure : vitrines, e‑commerce, portails et dashboards." },
    { title: "Développement Mobile", desc: "Apps iOS & Android réactives, rapides et robustes.", details: "Du prototype au store, nous couvrons UX, dev et publication." },
    { title: "Conseil & Audit Digital", desc: "Diagnostic 360°, stratégie digitale et optimisation.", details: "Nous auditons votre écosystème et recommandons les leviers d'impact." },
    { title: "Formation & Coaching", desc: "Programmes pratiques orientés résultats.", details: "Montez en compétences avec nos modules modulaires et certifiants." },
    { title: "Maintenance & Support", desc: "Supervision, SLOs, sécurité et évolutions continues.", details: "Nous assurons la pérennité et la performance de vos solutions." },
  ]), []);

  const courses = useMemo(() => ([
    { title: "Développement Web - Mobile", duration: "8 semaines", price: 12000, discount: 9900 }, 
    { title: "Marketing Digital & SEO", duration: "4 semaines", price: 7000, discount: 5000 },
    { title: "DevOps & Cloud Basic", duration: "6 semaines", price: 12000, discount: 9900 },
    { title: "UX/UI Design Essentials", duration: "5 semaines", price: 8000, discount: 6500 },
    { title: "Programmation — Initiation", duration: "2 semaines", price: 5000, discount: 4000 },
  ]), []);

  return (
    <div className="relative bg-background text-foreground">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(900px_500px_at_-10%_0%,rgba(0,180,216,0.08),transparent),radial-gradient(900px_500px_at_110%_100%,rgba(255,127,17,0.08),transparent),linear-gradient(to_bottom,transparent,rgba(13,27,42,0.06))] dark:bg-[radial-gradient(900px_500px_at_-10%_0%,rgba(0,180,216,0.12),transparent),radial-gradient(900px_500px_at_110%_100%,rgba(255,127,17,0.12),transparent)]" aria-hidden />
      {/* HERO */}
      <section className="relative overflow-hidden bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/bg.jpeg)' }}>
        {/* Dégradé futuriste + particules */}
        <div className="absolute inset-0 -z-10 blur-sm"/>
        <Particles />
        <div className="container relative py-24 md:py-32">
          {/* Fond techno en bas du héro */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 -z-10"
               aria-hidden>
            <svg className="w-full h-full opacity-30 dark:opacity-40" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
              <defs>
                <linearGradient id="g" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#00B4D8" />
                  <stop offset="100%" stopColor="#FF7F11" />
                </linearGradient>
              </defs>
              <g stroke="url(#g)" strokeWidth="1" fill="none">
                {Array.from({length:16}).map((_,i)=> (
                  <path key={i} d={`M0 ${i*10} H 1000`} />
                ))}
                {Array.from({length:10}).map((_,i)=> (
                  <path key={`v-${i}`} d={`M${i*100} 0 V 400`} />
                ))}
              </g>
            </svg>
          </div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="text-xs tracking-widest uppercase text-primary mb-3 font-semibold">
            CyberFusion — Le futur technologique d’Afrique
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: .05 }}
            className="font-heading text-4xl md:text-6xl font-extrabold leading-tight text-white"> 
            Quand la technologie <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#00B4D8] to-[#FF7F11]">fusionne</span>avec vos ambitions.
          </motion.h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: .15 }} className="mt-5 max-w-2xl text-lg text-white/85">
            <TypedText text="Chez CyberFusion Group, nous unissons innovation, proximité et éthique pour propulser vos projets." />
          </motion.p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a href="#services" className="inline-flex px-6 py-3 rounded-md bg-primary text-primary-foreground font-display font-semibold shadow hover:opacity-95">Découvrir nos services</a>
            <a href="/devis" className="inline-flex px-6 py-3 rounded-md bg-[#FF7F11] text-white font-display font-semibold shadow hover:opacity-95">Demander un devis</a>
            {/* {typeof visitors === "number" && (
              <span className="text-sm text-muted-foreground ml-2">Visiteurs en direct: <span className="font-semibold text-foreground">{visitors.toLocaleString()}</span></span>
            )} */}
          </div>
        </div>
      </section>

      {/* INTRO + CHIFFRES CLÉS */}
      <section className="border-t border-b border-border bg-card/50">
        <div className="container py-12 grid gap-8 md:grid-cols-2">
          <div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold">Technologie + Ambition</h2>
            <p className="mt-3 text-muted-foreground max-w-prose">
              Nous croyons que l'Afrique mérite un numérique à son image : audacieux, accessible et porteur d'avenir. Nous fusionnons technologie, créativité et humanité pour offrir des solutions digitales performantes, éthiques et durables.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border bg-background p-4 text-center shadow-sm">
                <div className="font-heading text-3xl font-extrabold text-foreground">+{s.value}</div>
                <div className="text-xs uppercase tracking-wide text-muted-foreground mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="container py-16">
        <div className="flex items-end justify-between gap-4">
          <h2 className="font-heading text-3xl font-bold">Nos Services</h2>
          <a href="/services" className="text-sm text-primary hover:underline">Tout voir</a>
        </div>
        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((srv) => (
            <Dialog key={srv.title}>
              <DialogTrigger asChild>
                <button className="group relative rounded-xl border bg-gradient-to-br from-background to-muted/40 p-6 text-left shadow hover:shadow-lg transition overflow-hidden">
                  <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[radial-gradient(circle,_rgba(0,180,216,0.12)_0%,_transparent_60%)]" />
                  <div className="font-heading text-xl font-bold">{srv.title}</div>
                  <p className="mt-2 text-sm text-muted-foreground">{srv.desc}</p>
                  <div className="mt-4 inline-flex items-center gap-2 text-primary font-display font-semibold">
                    En savoir plus
                    <span aria-hidden>&gt;</span>
                  </div>
                </button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle className="font-heading">{srv.title}</DialogTitle>
                  <DialogDescription>{srv.details}</DialogDescription>
                </DialogHeader>
                <a href="/devis" className="inline-flex px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-semibold">Demander un devis</a>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </section>

      {/* FORMATIONS — TEASER */}
      <section className="border-t border-border bg-card/30">
        <div className="container py-16">
          <div className="flex items-end justify-between gap-4">
            <h3 className="font-heading text-2xl md:text-3xl font-bold">Formations & Coaching</h3>
            <a href="/formations" className="text-sm text-primary hover:underline">Voir toutes les formations</a>
          </div>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((c) => (
              <div key={c.title} className="relative rounded-xl border bg-background p-6 shadow-sm overflow-hidden">
                <div className="absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[radial-gradient(circle,_rgba(255,127,17,0.12)_0%,_transparent_60%)]" />
                <div className="font-heading text-lg font-bold">{c.title}</div>
                <p className="mt-1 text-xs text-muted-foreground">Durée: {c.duration}</p>
                <div className="mt-4 flex items-baseline gap-2">
                  <div className="text-2xl font-heading font-extrabold text-foreground">{c.discount.toLocaleString("fr-FR")} XAF</div>
                  <div className="text-sm text-muted-foreground line-through">{c.price.toLocaleString("fr-FR")} XAF</div>
                  <span className="ml-auto inline-flex items-center rounded-md bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300 px-2 py-0.5 text-xs">Promo</span>
                </div>
                <a href="/formations" className="mt-5 inline-flex px-4 py-2 rounded-md bg-primary text-primary-foreground font-display font-semibold">S’inscrire maintenant</a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* À PROPOS RAPIDE */}
      <section className="border-t border-border bg-card/40">
        <div className="container py-16 grid gap-8 md:grid-cols-2">
          <div>
            <h3 className="font-heading text-2xl font-bold">À propos / Vision</h3>
            <p className="mt-3 text-muted-foreground">
              Fondé par <strong>Christ MAYALA</strong> alias <strong>Alvine May's</strong>, CyberFusion Group place l'innovation, l'accessibilité, la collaboration, l'éthique et le respect au cœur de son action.
            </p>
            <blockquote className="mt-4 border-l-4 border-primary pl-4 italic text-muted-foreground">
              « Bâtissons des solutions qui allient excellence technologique et impact humain. »
            </blockquote>
            <a href="/about" className="mt-6 inline-flex px-5 py-2.5 rounded-md bg-[#FF7F11] text-white font-display font-semibold">Découvrir notre vision</a>
          </div>
          <ul className="grid gap-3">
            {["Innovation", "Accessibilité", "Collaboration", "Éthique", "Respect"].map((v) => (
              <li key={v} className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3"><CheckCircle2 className="text-primary" size={18} /><span className="text-sm">{v}</span></li>
            ))}
          </ul>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="container py-16">
        <div className="rounded-2xl border bg-gradient-to-r from-[#0D1B2A] to-[#0D1B2A] text-white p-8 md:p-10 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-[radial-gradient(circle,_rgba(0,180,216,0.4)_0%,_transparent_60%)]" />
          <h3 className="font-heading text-2xl font-bold">Rejoindre la newsletter</h3>
          <p className="mt-2 text-sm text-white/80 max-w-xl">Recevez nos conseils, actualités et opportunités de formation..</p>
          <form className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={(e) => { e.preventDefault(); const f = e.currentTarget as HTMLFormElement; const el = f.querySelector<HTMLInputElement>("input[name=nom]"); const em = f.querySelector<HTMLInputElement>("input[name=email]"); if (el && em) { localStorage.setItem("newsletter", JSON.stringify({ nom: el.value, email: em.value, date: Date.now() })); alert("Merci pour votre inscription ✨"); el.value = ""; em.value = ""; } }}>
            <input name="nom" required placeholder="Votre nom" className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/60" />
            <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
              <input name="email" required type="email" placeholder="Votre e‑mail" className="w-full rounded-md border border-white/20 bg-white/10 px-4 py-2 text-white placeholder:text-white/60" />
              <button className="w-full sm:w-auto inline-flex justify-center px-5 py-2.5 rounded-md bg-[#00B4D8] text-white font-display font-semibold shadow hover:opacity-95">S'abonner</button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
