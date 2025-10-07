
```markdown
# 🚀 Fusion Starter (Version Française)

Un **modèle d’application full-stack React prêt pour la production**, avec un **serveur Express intégré**, utilisant **React Router 6** en mode **SPA**, **TypeScript**, **Vitest**, **Zod**, et des outils modernes.

Bien que le modèle inclue un serveur Express, **ne crée des endpoints que lorsque c’est strictement nécessaire**, par exemple pour encapsuler une logique qui **doit rester côté serveur**, comme la gestion de **clés privées** ou certaines **opérations sur la base de données**.

---

## ⚙️ Stack Technique

- **PNPM** : Gestionnaire de paquets recommandé  
- **Frontend** : React 18 + React Router 6 (SPA) + TypeScript + Vite + TailwindCSS 3  
- **Backend** : Serveur Express intégré au serveur de développement Vite  
- **Tests** : Vitest  
- **Interface (UI)** : Radix UI + TailwindCSS 3 + Icônes Lucide React  

---

## 🧱 Structure du Projet

```

client/                   # Frontend React (SPA)
├── pages/                # Composants de routes (Index.tsx = page d’accueil)
├── components/ui/        # Bibliothèque de composants UI préconstruits
├── App.tsx               # Point d’entrée de l’application et configuration du routage SPA
└── global.css            # Thèmes et styles globaux (TailwindCSS 3)

server/                   # Backend Express (API)
├── index.ts              # Configuration principale du serveur (Express + routes)
└── routes/               # Gestionnaires d’API

shared/                   # Types partagés entre client et serveur
└── api.ts                # Exemple d’interface API partagée

````

---

## 🌐 Système de Routage SPA

Le routage est géré par **React Router 6** :

- `client/pages/Index.tsx` représente la page d’accueil  
- Les routes sont définies dans `client/App.tsx` via `react-router-dom`  
- Les fichiers de route se trouvent dans `client/pages/`

**Exemple de définition des routes :**

```typescript
import { BrowserRouter, Routes, Route } from "react-router-dom";

<Routes>
  <Route path="/" element={<Index />} />
  {/* Ajouter toutes les routes personnalisées avant la route catch-all "*" */}
  <Route path="*" element={<NotFound />} />
</Routes>;
````

---

## 🎨 Système de Style

* **Principalement** : Classes utilitaires TailwindCSS 3
* **Thèmes et variables de design** : Configurés dans `client/global.css`
* **Composants UI** : Bibliothèque prête à l’emploi dans `client/components/ui/`
* **Utilitaire** : Fonction `cn()` qui combine `clsx` + `tailwind-merge` pour les classes conditionnelles

```typescript
// Exemple d’utilisation de cn()
className={cn(
  "classes-de-base",
  { "classe-conditionnelle": condition },
  props.className  // Priorité à la classe utilisateur
)}
```

---

## 🧩 Intégration du Serveur Express

* **En développement** : Un seul port (8080) pour le frontend et le backend
* **Hot Reload** : Rechargement à chaud du code client et serveur
* **Endpoints API** : Préfixés par `/api/`

### 🔍 Exemples de Routes API :

* `GET /api/ping` → Simple route de test
* `GET /api/demo` → Endpoint de démonstration

---

## 🔗 Types Partagés

Importation des types partagés côté client et serveur :

```typescript
import { DemoResponse } from '@shared/api';
```

**Alias de chemins :**

* `@shared/*` → dossier partagé
* `@/*` → dossier client

---

## 🧰 Commandes de Développement

```bash
pnpm dev        # Lance le serveur de dev (client + serveur)
pnpm build      # Génère le build de production
pnpm start      # Démarre le serveur de production
pnpm typecheck  # Vérifie les types TypeScript
pnpm test       # Lance les tests avec Vitest
```

---

## ✨ Ajouter des Fonctionnalités

### 🎨 Ajouter de nouvelles couleurs au thème

Modifie `client/global.css` et `tailwind.config.ts` pour ajouter de nouvelles couleurs Tailwind.

---

### 🛠️ Créer une nouvelle route API

1. (Optionnel) Crée une interface partagée dans `shared/api.ts` :

```typescript
export interface MyRouteResponse {
  message: string;
  // Autres propriétés de réponse ici
}
```

2. Crée un gestionnaire de route dans `server/routes/my-route.ts` :

```typescript
import { RequestHandler } from "express";
import { MyRouteResponse } from "@shared/api"; // Optionnel : pour la sécurité des types

export const handleMyRoute: RequestHandler = (req, res) => {
  const response: MyRouteResponse = {
    message: 'Hello depuis mon endpoint !'
  };
  res.json(response);
};
```

3. Enregistre la route dans `server/index.ts` :

```typescript
import { handleMyRoute } from "./routes/my-route";

// Dans la fonction createServer :
app.get("/api/my-endpoint", handleMyRoute);
```

4. Utilise-la dans React avec la sécurité des types :

```typescript
import { MyRouteResponse } from '@shared/api'; // Optionnel : pour les types

const response = await fetch('/api/my-endpoint');
const data: MyRouteResponse = await response.json();
```

---

### 🧭 Créer une nouvelle page

1. Crée ton composant dans `client/pages/MyPage.tsx`
2. Ajoute la route dans `client/App.tsx` :

```typescript
<Route path="/my-page" element={<MyPage />} />
```

---

## ☁️ Déploiement en Production

* **Standard** : `pnpm build`
* **Binaire** : Exécutables autonomes (Linux, macOS, Windows)
* **Cloud** : Déploie sur **Netlify** ou **Vercel** grâce à leurs intégrations MCP (très simples à utiliser).
  Ces deux services fonctionnent parfaitement avec ce template.

---

## 🧠 Notes d’Architecture

* Développement sur un seul port (Vite + Express)
* TypeScript utilisé partout (client, serveur, partagé)
* Rechargement à chaud complet
* Prêt pour la production, déploiement flexible
* Bibliothèque de composants UI intégrée
* Communication API sécurisée par des types partagés

 