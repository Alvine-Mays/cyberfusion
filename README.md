# CyberFusion Group — Guide de mise en production

Projet React (Vite) + Express + Tailwind, design futuriste conforme à la charte.

## Sommaire
- Prérequis
- Démarrage local
- Variables d’environnement
- Intégrations (Supabase, WhatsApp, Email)
- Déploiement (Vercel ou Netlify)
- SEO/Analytics
- Blog & Actualités (ajouter du contenu)
- Newsletter
- FAQ Ops

## Prérequis
- Node.js 18+
- PNPM (recommandé), mais npm fonctionne

## Démarrage local
```bash
pnpm dev
```
- Front + API sur http://localhost:8080

## Variables d’environnement (Vite)
Créer des variables via l’interface d’environnement (éviter de commiter un .env):
- VITE_WHATSAPP_BUSINESS=242068457521
- (Option) VITE_CRISP_WEBSITE_ID, VITE_TAWK_PROPERTY_ID, VITE_TAWK_WIDGET_KEY (désactivé par défaut)

## Intégrations
### WhatsApp
Tous les messages (devis, contact, formations) sont envoyés au numéro VITE_WHATSAPP_BUSINESS.

### Email (mailto)
Les envois “e‑mail” ouvrent le client mail local vers mayalachristgottlieb@gmail.com.

### Supabase (auth + dashboard + tables)
1. Cliquez “Open MCP popover” et connectez Supabase.
2. Providers d’auth conseillés: email + magic link; ajoutez l’admin.
3. Je créerai via MCP:
   - devis(id, nom, email, telephone, type_projet, budget, description, created_at)
   - newsletter_subscribers(id, nom, email, created_at)
   - candidatures(id, nom, email, role, message, created_at)
   - posts(slug, title, cat, excerpt, content, date)
   - visitors(ts, path, ua)
   - RLS + dashboard protégé

## Déploiement
### Vercel
- Connecter Vercel MCP puis déployer. Build: `pnpm build`, start: `pnpm start`.
### Netlify
- Connecter Netlify MCP. Build: `pnpm build`, publish: `dist/spa` + functions si besoin.

## SEO/Analytics
- Metadonnées dans index.html.
- Ajoutez Plausible/GA4 via script dans index.html.

## Blog & Actualités
- Les articles résident dans `client/lib/blog.ts` (tableau `posts`).
- Pour ajouter un article: ajoutez un objet `{ slug, title, cat, excerpt, content, date }`.
- La liste est sur `/blog`, les détails sur `/blog/:slug`.
- Pour du contenu dynamique, connectez Supabase et je migrerai le blog.

## Newsletter
- Formulaire accessible en page d’accueil.
- Responsive mobile (champs sur une colonne, bouton pleine largeur).
- Stockage local (POC). Pour Brevo, fournissez l’API et je l’intègre.

## FAQ Ops
- Compteur de visites: proxy `/api/visits/*` (pas d’erreurs CORS). Fallback localStorage.
- Thème: variables HSL dans `client/global.css`, Tailwind dans `tailwind.config.ts`.
- Accessibilité: contrastes, focus, navigations clavier considérés.
