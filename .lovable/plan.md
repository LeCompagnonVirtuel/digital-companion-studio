

# Amélioration SEO globale

## Problèmes identifiés

1. **Aucune balise meta par page** — Seul `ShopProduct` utilise `useDocumentMeta`. Toutes les autres pages (About, Contact, Services, Blog, Portfolio, etc.) gardent le titre et la description par défaut de `index.html`.
2. **Pas de sitemap.xml** — Aucun fichier sitemap pour aider les moteurs de recherche à indexer les pages.
3. **Pas de balise canonical** — Risque de contenu dupliqué.
4. **`robots.txt` incomplet** — Pas de lien vers le sitemap, pas de Disallow pour `/admin`.
5. **`lang="en"` dans `index.html`** — Le site est en français.
6. **Pas de données structurées (JSON-LD)** — Pas de schema.org pour l'organisation, les services, les articles de blog ou les produits.
7. **OG image en chemin relatif** — `/favicon.png` n'est pas une URL absolue, les crawlers sociaux ne la résoudront pas.

## Plan d'implémentation

### 1. Corriger `index.html`
- Changer `lang="en"` → `lang="fr"`
- Ajouter une balise canonical par défaut
- Rendre les OG images absolues (`https://www.lecompagnonlabs.cloud/favicon.png`)
- Ajouter un script JSON-LD pour l'Organisation

### 2. Étendre `useDocumentMeta` 
- Ajouter le support de `canonical` (crée/met à jour une balise `<link rel="canonical">`)
- Définir automatiquement `og:url` à partir de `window.location.href` si non fourni

### 3. Ajouter `useDocumentMeta` sur toutes les pages principales
Chaque page recevra un titre et une description uniques et pertinents :
- Index, About, Contact, Services (+ chaque sous-service), Pricing, Portfolio, Blog, Shop, Careers, etc.
- Les pages admin et utilitaires (Auth, Legal, Privacy, Terms) recevront un titre mais pas d'indexation (noindex via meta robots).

### 4. Créer `public/sitemap.xml`
Sitemap statique listant toutes les routes publiques avec `lastmod`, `changefreq` et `priority`. Domaine : `https://www.lecompagnonlabs.cloud`.

### 5. Mettre à jour `public/robots.txt`
- Ajouter `Sitemap: https://www.lecompagnonlabs.cloud/sitemap.xml`
- Ajouter `Disallow: /admin` et `Disallow: /auth`

### 6. Ajouter des données structurées JSON-LD
- **Organisation** (dans `index.html`) : nom, logo, URL, réseaux sociaux
- **BlogPosting** (dans `BlogPost.tsx`) : titre, auteur, date, image
- **Product** (dans `ShopProduct.tsx`) : nom, prix, image, disponibilité

### Fichiers modifiés
- `index.html`
- `src/hooks/useDocumentMeta.tsx`
- `public/robots.txt`
- `public/sitemap.xml` (nouveau)
- ~20 pages dans `src/pages/` (ajout de `useDocumentMeta`)
- `src/pages/BlogPost.tsx` (JSON-LD article)
- `src/pages/ShopProduct.tsx` (JSON-LD produit)

