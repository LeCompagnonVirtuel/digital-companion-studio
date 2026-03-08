

# Suppression des fausses donnees dans l'admin

## Problemes identifies

Apres inspection de toutes les pages admin, voici les elements qui utilisent des donnees fausses ou simulees :

### 1. Dashboard - Tendances hardcodees
- **Ligne 200** : `trend: '+12%'` pour les vues -- valeur inventee, pas calculee
- **Lignes 227-228** : `trend: stats.conversionRate > 10 ? '+2%' : '-1%'` -- logique arbitraire, pas une vraie comparaison
- **Ligne 370** : texte "vs mois dernier" affiche partout alors qu'aucune comparaison reelle n'est effectuee
- Les tendances des revenus et commandes sont correctes (basees sur les donnees reelles)

### 2. Page SEO - Entierement fausse
- `pagesData` (lignes 35-64) : scores SEO, issues, meta descriptions tous hardcodes
- `runAnalysis` (ligne 82-91) : simule une analyse avec un `setTimeout(2000)` sans aucun calcul reel
- `globalSettings` : stocke en local state, jamais persiste en base
- Aucune connexion a Supabase

### Pages qui sont correctes (donnees reelles)
- Shop, Orders, Leads, Customers, Analytics, Content, Settings, Users, Blog, Portfolio, Media -- toutes connectees a Supabase avec temps reel

## Plan de corrections

### A. Dashboard - Remplacer les fausses tendances par des calculs reels
- Comparer les donnees de la periode actuelle (7 jours) vs la periode precedente (7 jours avant)
- Calculer le vrai pourcentage de variation pour : vues, revenus, commandes, taux de conversion
- Supprimer le texte "vs mois dernier" et le remplacer par "vs 7 jours precedents"
- Si pas assez de donnees, afficher "--" au lieu d'un faux pourcentage

### B. Page SEO - Connecter aux vraies donnees
- Charger les meta tags reels depuis `site_content` et `admin_settings` dans Supabase
- Remplacer les scores hardcodes par un calcul reel base sur : longueur du titre (50-60 chars), longueur de la meta description (120-160 chars), presence de mots-cles
- Persister les modifications SEO (titre, meta description) dans `admin_settings` via `useAdminSettings`
- Remplacer le faux `runAnalysis` par un vrai audit cote client qui parcourt les pages definies et evalue les criteres SEO
- Generer les `issues` dynamiquement selon les criteres (titre trop long/court, description manquante, etc.)

### Fichiers modifies
1. `src/pages/admin/Dashboard.tsx` -- calcul reel des tendances sur 7j vs 7j precedents
2. `src/pages/admin/SEO.tsx` -- refonte complete avec donnees persistees et analyse reelle

