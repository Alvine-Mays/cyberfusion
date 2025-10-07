import { Link } from "react-router-dom";

// Composant de page temporaire réutilisable pour éviter les liens morts
export default function Placeholder({ title, description }: { title: string; description?: string }) {
  return (
    <div className="min-h-[60vh] container flex flex-col items-center justify-center text-center py-20">
      <h1 className="font-heading text-3xl md:text-4xl font-bold">{title}</h1>
      {description ? (
        <p className="mt-3 max-w-2xl text-muted-foreground">{description}</p>
      ) : null}
      <Link to="/devis" className="mt-8 inline-flex px-5 py-2.5 rounded-md bg-primary text-primary-foreground font-display font-semibold shadow hover:opacity-90">
        Demander un devis
      </Link>
    </div>
  );
}
