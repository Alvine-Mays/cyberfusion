import { useEffect, useMemo, useState } from "react";
import { buildWhatsAppURL, DevisPayload, buildMailtoURL } from "@/lib/api";
import { motion } from "framer-motion";

// Page de demande de devis intelligente avec logique conditionnelle et sauvegarde locale
export default function Devis() {
  const [data, setData] = useState<DevisPayload>(() => {
    // Restauration depuis le stockage local pour éviter la perte de saisie
    const saved = localStorage.getItem("devis-data");
    return (
      saved ? JSON.parse(saved) : { nom: "", email: "", telephone: "", typeProjet: "", budget: "", description: "" }
    );
  });
  const [destination, setDestination] = useState<"whatsapp" | "email">("whatsapp");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("devis-data", JSON.stringify(data));
  }, [data]);

  const projectTypes = useMemo(() => [
    "Développement Web",
    "Développement Mobile",
    "Conseil & Audit Digital",
    "Formation & Coaching",
    "Maintenance & Support",
  ], []);

  const budgets = useMemo(() => [
    "5 000 XAF — 15 000 XAF",
    "15 000 XAF — 50 000 XAF",
    "50 000 XAF — 150 000 XAF",
    "> 150 000 XAF",
  ], []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      if (destination === "email") {
        const url = buildMailtoURL(
          "Demande de devis — CyberFusion Group",
          [
            `Nom: ${data.nom}`,
            `Email: ${data.email}`,
            `Téléphone: ${data.telephone}`,
            `Type de projet: ${data.typeProjet}`,
            `Budget: ${data.budget}`,
            `Description: ${data.description}`,
          ],
        );
        window.location.href = url;
        setStatus("success");
        setMessage("Ouverture de votre client e‑mail… ✨");
      } else {
        const url = buildWhatsAppURL(data);
        window.open(url, "_blank");
        setStatus("success");
        setMessage("Redirection vers WhatsApp… ✨");
      }
    } catch (err) {
      setStatus("error");
      setMessage("Une erreur est survenue. Merci de réessayer.");
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0D1B2A] via-background to-background dark:from-[#0D1B2A]">
      <div className="container py-14">
        <motion.h1 initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="font-heading text-3xl md:text-4xl font-bold">
          Demande de devis <span className="text-primary">intelligente</span>
        </motion.h1>
        <p className="mt-2 text-muted-foreground max-w-2xl">
          Décrivez votre besoin et recevez une réponse personnalisée. Vos informations ne seront jamais partagées.
        </p>

        <form onSubmit={submit} className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Nom</label>
            <input required value={data.nom} onChange={(e) => setData({ ...data, nom: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2" placeholder="Votre nom complet" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">E‑mail</label>
            <input required type="email" value={data.email} onChange={(e) => setData({ ...data, email: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2" placeholder="exemple@mail.com" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Téléphone (WhatsApp)</label>
            <input required value={data.telephone} onChange={(e) => setData({ ...data, telephone: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2" placeholder="Ex: 24206xxxxxx" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Type de projet</label>
            <select required value={data.typeProjet} onChange={(e) => setData({ ...data, typeProjet: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2">
              <option value="" disabled>Choisir…</option>
              {projectTypes.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Budget estimé</label>
            <select required value={data.budget} onChange={(e) => setData({ ...data, budget: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2">
              <option value="" disabled>Choisir…</option>
              {budgets.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium">Description</label>
            <textarea required value={data.description} onChange={(e) => setData({ ...data, description: e.target.value })} className="w-full rounded-md border bg-background px-4 py-2 min-h-[120px]" placeholder="Parlez‑nous de votre projet, vos objectifs, vos délais…" />
          </div>

          <div className="md:col-span-2 flex flex-wrap items-center gap-4">
            <span className="text-sm">Envoyer via :</span>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" name="dest" checked={destination === "whatsapp"} onChange={() => setDestination("whatsapp")} />
              WhatsApp (recommandé)
            </label>
            <label className="inline-flex items-center gap-2 text-sm">
              <input type="radio" name="dest" checked={destination === "email"} onChange={() => setDestination("email")} />
              E‑mail
            </label>
            <button type="submit" className="ml-auto inline-flex px-6 py-2.5 rounded-md bg-gradient-to-r from-[#00B4D8] to-[#FF7F11] text-white font-display font-semibold shadow hover:opacity-95">
              Envoyer le devis
            </button>
          </div>

          {status !== "idle" && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`md:col-span-2 rounded-md border px-4 py-3 ${status === "success" ? "border-emerald-300 bg-emerald-50 dark:bg-emerald-900/20" : status === "error" ? "border-red-300 bg-red-50 dark:bg-red-900/20" : "border-border"}`}>
              <p className="text-sm">{message}</p>
            </motion.div>
          )}
        </form>
      </div>
    </div>
  );
}
