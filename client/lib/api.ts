/* Utilitaires API pour le frontend
   - Compteur de visiteurs via countapi.xyz
   - Envoi EmailJS (si les identifiants sont fournis via variables d'environnement)
   - Génération d'URL WhatsApp pré-remplie
   Toutes les fonctions sont documentées en français pour faciliter la prise en main. */

export type CountApiResult = { value: number };

// Espace de noms (namespace) et clé (key) uniques pour le projet
const COUNT_API_NAMESPACE = "cyberfusion.group";
const COUNT_API_KEY_HOME = "homepage";

export async function incrementVisitorCount(key: string = COUNT_API_KEY_HOME) {
  // Incrémente de façon optimiste et renvoie immédiatement une valeur locale
  const local = Number(localStorage.getItem(`countapi:${key}`) || "0") + 1;
  localStorage.setItem(`countapi:${key}`, String(local));

  // Tentative réseau silencieuse en arrière-plan (sans abort pour éviter des erreurs visibles)
  fetch(`/api/visits/hit?key=${encodeURIComponent(key)}`)
    .then((r) => (r.ok ? r.json() : null))
    .then((json: CountApiResult | null) => {
      if (json && typeof json.value === "number") {
        localStorage.setItem(`countapi:${key}`, String(json.value));
      }
    })
    .catch(() => {});

  return local;
}

export async function getVisitorCount(key: string = COUNT_API_KEY_HOME) {
  // Récupère le compteur sans l'incrémenter
  const url = `https://api.countapi.xyz/get/${COUNT_API_NAMESPACE}/${key}`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Échec de la récupération du compteur");
  const json = (await res.json()) as CountApiResult;
  return json.value;
}

// Paramètres EmailJS via variables d'environnement (si disponibles). 
// Pour activer EmailJS, définissez ces variables via l'interface d'environnement.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string | undefined;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string | undefined;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string | undefined;

export interface DevisPayload {
  nom: string;
  email: string;
  telephone: string;
  typeProjet: string;
  budget: string;
  description: string;
}

const DEFAULT_INBOX = "mayalachristgottlieb@gmail.com";
const DEFAULT_WHATSAPP = "242068457521";

export function buildMailtoURL(subject: string, lines: string[], to: string = DEFAULT_INBOX) {
  const body = encodeURIComponent(lines.join("\n"));
  const sub = encodeURIComponent(subject);
  return `mailto:${to}?subject=${sub}&body=${body}`;
}

export async function sendDevisViaEmailJS(data: DevisPayload) {
  // Envoi du devis via EmailJS si les identifiants sont définis
  if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
    throw new Error("EmailJS non configuré");
  }

  const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: EMAILJS_SERVICE_ID,
      template_id: EMAILJS_TEMPLATE_ID,
      user_id: EMAILJS_PUBLIC_KEY,
      template_params: data,
    }),
  });
  if (!res.ok) throw new Error("Échec d'envoi EmailJS");
  return await res.text();
}

export function buildWhatsAppURL(data: DevisPayload) {
  // Construit une URL WhatsApp avec message pré‑rempli
  // Utilise VITE_WHATSAPP_BUSINESS si présent, sinon le numéro par défaut fourni par le client
  const businessRaw = (import.meta.env.VITE_WHATSAPP_BUSINESS as string | undefined) || DEFAULT_WHATSAPP;
  const business = businessRaw.replace(/\D/g, "");
  const lines = [
    "Demande de devis — CyberFusion Group",
    `Nom: ${data.nom}`,
    `Email: ${data.email}`,
    `Téléphone: ${data.telephone}`,
    `Type de projet: ${data.typeProjet}`,
    `Budget: ${data.budget}`,
    `Description: ${data.description}`,
  ];
  const message = encodeURIComponent(lines.join("\n"));
  return `https://wa.me/${business}?text=${message}`;
}
