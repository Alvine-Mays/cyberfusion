import { useMemo } from "react";
import { CheckCircle2 } from "lucide-react";

// À propos / Vision — fondateur, valeurs et frise chronologique
export default function About() {
  const values = ["Innovation", "Accessibilité", "Collaboration", "Éthique", "Respect"];
  const timeline = useMemo(() => ([
    { year: 2021, title: "Genèse", text: "Idée fondatrice : rapprocher technologie et ambitions locales en Afrique (Congo)." },
    { year: 2023, title: "Premier studio", text: "+10 projets livrés, premiers partenaires et programmes de formation." },
    { year: 2024, title: "Croissance", text: "Structuration, méthodologie produit, renforcement sécurité et qualité." },
    { year: 2025, title: "CyberFusion Group", text: "Vision continentale et offres modulaires web, mobile, conseil et formation." },
  ]), []);

  return (
    <div className="container py-14">
      <header className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">À propos / Vision</h1>
        <p className="mt-3 text-muted-foreground">Fondé par <strong>Christ MAYALA</strong> alias <strong>Alvine May's</strong>. Notre mission : bâtir des solutions digitales performantes, éthiques et durables au service des organisations africaines.</p>
      </header>

      <blockquote className="mt-8 border-l-4 border-primary pl-4 italic text-muted-foreground max-w-3xl">« Bâtissons des solutions qui allient excellence technologique et impact humain. »</blockquote>

      <section className="mt-10 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold">Nos valeurs</h2>
          <ul className="mt-4 space-y-3">
            {values.map((v) => (
              <li key={v} className="flex items-center gap-3 rounded-lg border bg-background px-4 py-3"><CheckCircle2 className="text-primary" size={18} /><span className="text-sm">{v}</span></li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-heading text-2xl font-bold">Fondateur</h2>
          <div className="mt-4 rounded-2xl border p-6 bg-card/50 flex flex-col items-center text-center gap-4">
            <img src="/fondateur.png" alt="Fondateur" className="h-24 w-29 rounded-lg object-cover" />
            <div>
              <div className="font-heading text-xl font-bold">Christ MAYALA — Alvine May's</div>
              <p className="mt-2 text-sm text-muted-foreground">Entrepreneur, formateur et architecte de solutions digitales. Porte la vision d'un numérique audacieux, accessible et porteur d'avenir pour l'Afrique.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">Vision futuriste</h2>
        <p className="mt-3 text-muted-foreground max-w-3xl">Nous construisons une plateforme intégrée reliant conception produit, développement, formation et accompagnement continu. Priorités : IA appliquée, accessibilité, empreinte carbone réduite, souveraineté des données et montée en compétence locale.</p>
      </section>

      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">Ligne du temps</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2">
          {timeline.map((t) => (
            <li key={t.year} className="rounded-xl border bg-background p-5">
              <div className="text-sm text-primary font-semibold">{t.year}</div>
              <div className="font-heading font-bold mt-1">{t.title}</div>
              <p className="text-sm text-muted-foreground mt-1">{t.text}</p>
            </li>
          ))}
        </ol>
        <a href="/devis" className="mt-6 inline-flex px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-semibold">Découvrir notre vision en action</a>
      </section>
    </div>
  );
}
