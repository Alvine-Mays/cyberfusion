import { useEffect, useMemo, useRef, useState } from "react";
import { Star } from "lucide-react";

// Portfolio — grille filtrable + témoignages + partenaires
export default function Portfolio() {
  const items = useMemo(() => [
    { id: 1, title: "Portail Entreprise", cat: "Web", img: "/seo.webp" },
    { id: 2, title: "Marketplace Mobile", cat: "Mobile", img: "/mobile.webp" },
    { id: 3, title: "Certification SEO", cat: "Conseil", img: "/web.webp" },
    { id: 4, title: "LMS Formation", cat: "Formation", img: "/formation.jpg" },
    { id: 5, title: "Dashboard Analytics", cat: "Web", img: "/analytic.jpg" },
    { id: 6, title: "App Logistique", cat: "Mobile", img: "/logistic.jpg" },
  ], []);

  const cats = ["Tous", "Web", "Mobile", "Formation", "Conseil"] as const;
  const [active, setActive] = useState<(typeof cats)[number]>("Tous");
  const filtered = items.filter((i) => active === "Tous" || i.cat === active);

  const testimonials = [
    { name: "Fulbert MALONGA", text: "Livraison rapide et qualité remarquable.", rating: 5 },
    { name: "Jeanette OKEMBA", text: "Accompagnement sérieux du conseil à la mise en production.", rating: 4 },
    { name: "Susane PERERA", text: "Équipe réactive et accompagnement de qualité, du début à la mise en ligne.", rating: 5 },
    { name: "Marc KABONGO", text: "Service efficace et à l'écoute, ma solution a été déployée sans stress.", rating: 5 }
  ];

  const partners = [
    {
      id: "alpha",
      title: "dream-house",
      logo: "/partners/dream-house.jpg",
      url: "https://www.tiktok.com/@dream_housebzv?_t=ZM-90ME7IY8Ubz&_r=1"
    },
    {
      id: "beta",
      title: "EasyLodge",
      logo: "/partners/EsayLodge.jpg",
      url: "https://www.facebook.com/share/171LfkCk7N/"
    },
  ];

  // 🧠 Ticker dynamique
  const [displayedPartners, setDisplayedPartners] = useState([...partners, ...partners]);
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frameId: number;

    const checkPosition = () => {
      if (!marqueeRef.current) return;

      const rect = marqueeRef.current.getBoundingClientRect();
      const middleX = window.innerWidth / 2;
      const children = marqueeRef.current.children;

      for (let i = 0; i < children.length; i += 4) {
        const group = Array.from(children).slice(i, i + 4);
        const lastLogo = group[group.length - 1] as HTMLElement;
        const groupRect = lastLogo?.getBoundingClientRect();

        if (groupRect && groupRect.left < middleX && groupRect.right > middleX) {
          setDisplayedPartners((prev) =>
            prev.length > 100 ? [...partners, ...partners] : [...prev, ...partners]
          );
          break;
        }
      }

      frameId = requestAnimationFrame(checkPosition);
    };

    frameId = requestAnimationFrame(checkPosition);
    return () => cancelAnimationFrame(frameId);
  }, [partners]);

  return (
    <div className="container py-14">
      <header className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Portfolio / Réalisations</h1>
        <p className="mt-3 text-muted-foreground">Sélection de projets livrés en Web, Mobile, Conseil et Formation.</p>
      </header>

      {/* ✅ Filtres de catégorie */}
      <div className="mt-8 flex flex-wrap gap-2">
        {cats.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-1.5 text-sm ${active === c ? "bg-primary text-primary-foreground" : "bg-background"}`}
          >
            {c}
          </button>
        ))}
      </div>

      {/* ✅ Projets */}
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

      {/* ✅ Témoignages */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">Témoignages</h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {testimonials.map((t) => (
            <div key={t.name} className="rounded-xl border bg-background p-6 shadow-sm">
              <div className="flex items-center gap-2 text-amber-500">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={16} fill="currentColor" />
                ))}
              </div>
              <p className="mt-3 text-sm text-muted-foreground">{t.text}</p>
              <div className="mt-2 text-sm font-medium">{t.name}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ✅ Partenaires - Ticker animé */}
      <section className="mt-12">
        <h2 className="font-heading text-2xl font-bold">Partenaires</h2>

        <div className="mt-6 overflow-hidden relative w-full">
          <div className="marquee">
            <div className="marquee-content" ref={marqueeRef}>
              {displayedPartners.map((p, idx) => (
                <a
                  key={`${p.id}-${idx}`}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 opacity-80 hover:opacity-100 transition"
                  aria-label={`Aller sur ${p.title}`}
                  title={p.title}
                >
                  <img
                    src={p.logo}
                    alt={p.title}
                    className="h-10 md:h-12 w-auto rounded-md"
                  />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* ✅ Styles pour le ticker */}
        <style>{`
          .marquee {
            overflow: hidden;
            position: relative;
            width: 100%;
          }

          .marquee-content {
            display: flex;
            animation: scroll-marquee 30s linear infinite;
          }

          @keyframes scroll-marquee {
            0% {
              transform: translateX(0%);
            }
            100% {
              transform: translateX(-50%);
            }
          }
        `}</style>
      </section>
    </div>
  );
}
