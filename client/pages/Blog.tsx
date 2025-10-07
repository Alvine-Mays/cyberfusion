import { useMemo, useState } from "react";
import { posts as allPosts } from "@/lib/blog";
import { Link } from "react-router-dom";

// Blog & Actualités — liste SEO, recherche, catégories, partage social
export default function Blog() {
  const posts = useMemo(() => allPosts, []);
  const categories = ["Tous", "Innovation", "Web", "Mobile", "SEO"] as const;
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<(typeof categories)[number]>("Tous");

  const list = posts.filter((p) => (cat === "Tous" || p.cat === cat) && (p.title + p.excerpt).toLowerCase().includes(q.toLowerCase()));

  const share = (p: { title: string; slug: string }) => {
    const text = encodeURIComponent(`${p.title} — CyberFusion Group`);
    const url = encodeURIComponent(window.location.origin + "/blog/" + p.slug);
    return {
      twitter: `https://twitter.com/intent/tweet?text=${text}&url=${url}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
      whatsapp: `https://wa.me/?text=${text}%20${url}`,
    };
  };

  return (
    <div className="container py-14">
      <header className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Blog & Actualités</h1>
        <p className="mt-3 text-muted-foreground">Articles tech, innovations et conseils pour réussir votre transformation numérique.</p>
      </header>

      <div className="mt-6 grid gap-3 sm:grid-cols-[1fr_auto]">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Rechercher…" className="rounded-md border bg-background px-4 py-2" />
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={`rounded-full border px-4 py-1.5 text-sm ${cat === c ? "bg-primary text-primary-foreground" : "bg-background"}`}>{c}</button>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {list.map((p) => {
          const s = typeof window !== "undefined" ? share(p) : { twitter: "#", linkedin: "#", facebook: "#", whatsapp: "#" };
          return (
            <article key={p.slug} className="rounded-2xl border bg-background p-6 shadow-sm">
              <Link to={`/blog/${p.slug}`} className="font-heading text-lg font-bold hover:underline">{p.title}</Link>
              <div className="mt-1 text-xs text-muted-foreground">{new Date(p.date).toLocaleDateString("fr-FR")} • {p.cat}</div>
              <p className="mt-3 text-sm text-muted-foreground">{p.excerpt}</p>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <a href={s.linkedin} target="_blank" rel="noreferrer" className="text-primary hover:underline">LinkedIn</a>
                <a href={s.twitter} target="_blank" rel="noreferrer" className="text-primary hover:underline">Twitter</a>
                <a href={s.whatsapp} target="_blank" rel="noreferrer" className="text-primary hover:underline">WhatsApp</a>
                <a href={s.facebook} target="_blank" rel="noreferrer" className="text-primary hover:underline">Facebook</a>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
