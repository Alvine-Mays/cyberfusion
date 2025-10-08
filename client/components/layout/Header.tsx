import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Moon, Sun, Menu, X } from "lucide-react";

// En‑tête global avec navigation principale et bascule sombre/clair
export default function Header() {
const location = useLocation();
const [dark, setDark] = useState(false);
const [open, setOpen] = useState(false);

// Mode automatique en fonction du système, avec possibilité de bascule manuelle
useEffect(() => {
const mq = window.matchMedia("(prefers-color-scheme: dark)");
const apply = (isDark: boolean) => {
document.documentElement.classList.toggle("dark", isDark);
setDark(isDark);
};
apply(mq.matches);
const onChange = (e: MediaQueryListEvent) => apply(e.matches);
mq.addEventListener("change", onChange);
return () => mq.removeEventListener("change", onChange);
}, []);

// Empêcher le scroll de la page quand le menu est ouvert + fermer avec ESC
useEffect(() => {
if (open) {
const prev = document.body.style.overflow;
document.body.style.overflow = "hidden";
const onKey = (e: KeyboardEvent) => {
if (e.key === "Escape") setOpen(false);
};
window.addEventListener("keydown", onKey);
return () => {
document.body.style.overflow = prev;
window.removeEventListener("keydown", onKey);
};
}
}, [open]);

const toggleTheme = () => {
const next = !dark;
document.documentElement.classList.toggle("dark", next);
setDark(next);
};

const nav = [
{ to: "/", label: "Accueil" },
{ to: "/about", label: "À propos" },
{ to: "/services", label: "Services" },
{ to: "/devis", label: "Devis" },
{ to: "/formations", label: "Formations" },
{ to: "/portfolio", label: "Portfolio" },
{ to: "/blog", label: "Blog" },
{ to: "/careers", label: "Carrières" },
{ to: "/contact", label: "Contact" },
];

return (
<header className="sticky top-0 z-50 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-[#0D1B2A]/60 border-b border-border">
<div className="container flex items-center justify-between py-3">
<Link to="/" className="flex items-center gap-2">
<span className="rounded-full overflow-hidden ring-1 ring-border bg-background/80 dark:bg-[#0D1B2A]/80 flex items-center justify-center">
<img src="/logo.png" className="h-20 w-20 object-contain mix-blend-multiply dark:mix-blend-screen" />
</span>
<div className="font-heading font-bold text-lg tracking-wide">CyberFusion Group</div>
</Link>

<nav className="hidden md:flex items-center gap-6">
      {nav.map((n) => (
        <Link
          key={n.to}
          to={n.to}
          className={`text-sm font-medium transition-colors hover:text-primary ${
            location.pathname === n.to ? "text-primary" : "text-muted-foreground"
          }`}
        >
          {n.label}
        </Link>
      ))}
    </nav>

    <div className="flex items-center gap-3">
      <Link
        to="/devis"
        className="hidden sm:inline-flex px-4 py-2 rounded-md bg-primary text-primary-foreground font-display font-semibold shadow hover:opacity-90 transition"
      >
        Demander un devis
      </Link>
      <button
        aria-label="Basculer le thème"
        onClick={toggleTheme}
        className="hidden sm:inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent"
      >
        {dark ? <Sun size={18} /> : <Moon size={18} />}
      </button>
      <button
        aria-label="Ouvrir le menu"
        onClick={() => setOpen(true)}
        className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent"
      >
        <Menu size={18} />
      </button>
    </div>
  </div>

  {/* MENU MOBILE — Plein écran, fond opaque, header sticky, cartes, CTA bas */}
{open && (
  <div
    className="fixed inset-0 z-50 bg-background text-foreground"
    role="dialog"
    aria-modal="true"
    onClick={() => setOpen(false)}
  >
    <div
      className="absolute inset-0 h-screen flex flex-col bg-background"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Barre du haut */}
      <div className="sticky top-0 z-10 bg-background border-b px-4 py-4 flex items-center justify-between">
        <div className="font-heading font-bold">Menu</div>
        <button
          aria-label="Fermer"
          onClick={() => setOpen(false)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background"
        >
          <X size={18} />
        </button>
      </div>

      {/* ✅ Contenu scrollable */}
      <div className="flex-1 overflow-y-auto px-4 py-3 space-y-3">
        {nav.map((n) => (
          <Link
            key={n.to}
            to={n.to}
            onClick={() => setOpen(false)}
            className={`block rounded-lg border px-4 py-3 ${
              location.pathname === n.to
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background hover:bg-accent"
            }`}
          >
            {n.label}
          </Link>
        ))}
      </div>

      {/* Barre d'action en bas */}
      <div className="sticky bottom-0 z-10 bg-background border-t px-4 py-3">
        <div className="flex items-center gap-3">
          <button
            aria-label="Basculer le thème"
            onClick={() =>
              setDark((d) => {
                const next = !d;
                document.documentElement.classList.toggle("dark", next);
                return next;
              })
            }
            className="inline-flex h-9 w-9 items-center justify-center rounded-md border bg-background hover:bg-accent"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <Link
            to="/devis"
            onClick={() => setOpen(false)}
            className="inline-flex flex-1 justify-center px-4 py-3 rounded-md bg-primary text-primary-foreground font-display font-semibold"
          >
            Demander un devis
          </Link>
        </div>
      </div>
    </div>
  </div>
)}

</header>
);
}