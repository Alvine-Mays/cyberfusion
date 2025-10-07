import { useState } from "react";

// Carrières — offres + candidature directe (front‑end)
export default function Careers() {
  const [form, setForm] = useState({ nom: "", email: "", role: "Développeur Web (Stage)", message: "" });
  const offers = [
    { title: "Développeur Web (Stage)", type: "Stage", location: "Brazzaville / Remote" },
    { title: "Designer UX/UI Junior", type: "Stage", location: "Remote" },
    { title: "Développeur Mobile React Native", type: "Stage", location: "Remote" },
    { title: "Consultant.e Digital & SEO", type: "Stage", location: "Remote" },
    { title: "Secrétaire / Assistant(e)", type: "Stage", location: "Brazzaville" },
  ];

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("candidature", JSON.stringify({ ...form, date: Date.now() }));
    alert("Candidature envoyée (stockée localement). Connectez Supabase pour recevoir les candidatures en base.");
    setForm({ nom: "", email: "", role: offers[0].title, message: "" });
  };

  return (
    <div className="container py-14">
      <header className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold">Carrières</h1>
        <p className="mt-3 text-muted-foreground">Rejoignez une équipe passionnée. Candidature directe ci‑dessous.</p>
      </header>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-bold">Offres ouvertes</h2>
          <ul className="mt-4 space-y-3">
            {offers.map((o) => (
              <li key={o.title} className="rounded-lg border bg-background px-4 py-3">
                <div className="font-medium">{o.title}</div>
                <div className="text-xs text-muted-foreground">{o.type} • {o.location}</div>
              </li>
            ))}
          </ul>
        </div>

        <form onSubmit={onSubmit} className="space-y-3">
          <h2 className="font-heading text-2xl font-bold">Postuler</h2>
          <input required value={form.nom} onChange={(e) => setForm({ ...form, nom: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2" placeholder="Nom" />
          <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2" placeholder="Email" />
          <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2">
            {offers.map((o) => (<option key={o.title} value={o.title}>{o.title}</option>))}
          </select>
          <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2 min-h-[120px]" placeholder="Message / lien CV" />
          <button className="inline-flex px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-semibold">Envoyer la candidature</button>
          <p className="text-xs text-muted-foreground">Pour activer la collecte en base (Supabase), connectez l'intégration puis je créerai la table <code>candidatures</code> avec RLS.</p>
        </form>
      </section>
    </div>
  );
}
