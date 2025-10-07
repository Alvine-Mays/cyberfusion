export type BlogPost = {
  slug: string;
  title: string;
  cat: string;
  excerpt: string;
  content: string;
  date: string; // ISO
};

export const posts: BlogPost[] = [
  {
    slug: "tendances-tech-2025",
    title: "Tendances tech 2025 en Afrique",
    cat: "Innovation",
    excerpt: "Panorama des technologies clés à surveiller cette année.",
    date: "2025-01-20",
    content:
      "Du cloud souverain aux usages IA appliqués aux services publics et PME africaines, voici notre sélection des tendances structurantes en 2025...",
  },
  {
    slug: "app-mobile-performante",
    title: "Concevoir une app mobile performante",
    cat: "Mobile",
    excerpt: "Bonnes pratiques de conception et de performance.",
    date: "2025-01-15",
    content:
      "De l'onboarding à l'optimisation réseau en passant par la gestion hors-ligne, nous partageons un guide de pratiques éprouvées...",
  },
  {
    slug: "seo-local",
    title: "Bien démarrer en SEO local",
    cat: "SEO",
    excerpt: "Stratégies efficaces pour les PME et institutions.",
    date: "2025-01-05",
    content:
      "Le SEO local repose sur la cohérence NAP, les avis, la qualité du contenu et les performances. Notre checklist pour débuter...",
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
