

## Problème

Le bouton "Voir les offres" dans `PromoBanner.tsx` renvoie vers `/boutique#produits`, mais aucun élément avec `id="produits"` n'existe sur la page Shop. Le lien ne scrolle donc vers rien après navigation.

Le bouton "Voir les offres" sur la page Careers fonctionne correctement (`#positions` existe bien).

## Solution

Ajouter `id="produits"` sur la section de la grille de produits dans `src/pages/Shop.tsx`, afin que le hash `#produits` dans l'URL scrolle correctement vers les produits.

### Changement dans `src/pages/Shop.tsx`

Localiser le conteneur principal de la grille de produits et y ajouter l'attribut `id="produits"`.

