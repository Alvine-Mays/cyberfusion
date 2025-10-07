import { Link } from "react-router-dom";
import { Facebook, Github, Linkedin, Instagram } from "lucide-react";

// Pied de page global avec liens rapides et réseaux sociaux
export default function Footer() {
  return (
    <footer className="border-t border-border bg-background/80">
      <div className="container py-10 grid gap-8 md:grid-cols-3">
        <div>
          <div className="font-heading font-bold text-xl">CyberFusion Group</div>
          <p className="mt-2 text-sm text-muted-foreground max-w-sm">
            Bâtissons ensemble un avenir numérique éthique, durable et humain.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold text-foreground">Navigation</div>
            <ul className="space-y-1">
              <li><Link className="hover:text-primary" to="/">Accueil</Link></li>
              <li><Link className="hover:text-primary" to="/about">À propos</Link></li>
              <li><Link className="hover:text-primary" to="/services">Services</Link></li>
              <li><Link className="hover:text-primary" to="/devis">Devis</Link></li>
              <li><Link className="hover:text-primary" to="/contact">Contact</Link></li>
              <li><Link className="hover:text-primary" to="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-foreground">Ressources</div>
            <ul className="space-y-1">
              <li><Link className="hover:text-primary" to="/formations">Formations</Link></li>
              <li><Link className="hover:text-primary" to="/portfolio">Portfolio</Link></li>
              <li><a className="hover:text-primary" href="https://wa.me/242068457521" target="_blank" rel="noreferrer">WhatsApp</a></li>
            </ul>
          </div>
        </div>
        <div className="flex flex-col items-start gap-3">
          <div className="font-semibold">Rejoignez notre communauté</div>
          <div className="flex items-center gap-3 text-muted-foreground">
            <a aria-label="Facebook" className="hover:text-primary" href="https://www.facebook.com/profile.php?id=61578584564613&notif_id=1759817173664801&notif_t=follow_profile&ref=notif" target="_blank" rel="noreferrer"><Facebook size={18} /></a>
            <a aria-label="LinkedIn" className="hover:text-primary" href="#" rel="noreferrer"><Linkedin size={18} /></a>
            <a aria-label="GitHub" className="hover:text-primary" href="#"  rel="noreferrer"><Github size={18} /></a> 
          </div>
          <p className="text-xs text-muted-foreground mt-auto">© 2025 CyberFusion Group. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
}
