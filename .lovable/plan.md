

## Plan: Ajouter la vidéo de démonstration Full-Stack

### Objectif
Intégrer la vidéo uploadée de manière professionnelle pour illustrer l'expertise en développement Full-Stack, à deux endroits stratégiques.

### Changements

#### 1. Copier la vidéo dans le projet
- Copier `user-uploads://20260412_141801658.mp4` vers `public/videos/fullstack-demo.mp4` pour un accès direct via `<video>`.

#### 2. Remplacer le mockup statique sur la page Développement Web
**Fichier : `src/pages/services/DeveloppementWeb.tsx`** (lignes 203-262)

Remplacer le bloc "browser mockup" statique (le carré avec l'icône Globe qui tourne) par un lecteur vidéo intégré dans un cadre style navigateur avec :
- Les 3 dots (rouge, jaune, vert) conservés en haut
- La vidéo en autoplay, muted, loop dans un conteneur arrondi avec ombre premium
- Un badge "Full-Stack Demo" animé flottant
- Conserve les badges flottants existants ("100% Responsive", "Ultra rapide")

#### 3. Créer une section vidéo showcase sur la page d'accueil
**Nouveau fichier : `src/components/home/VideoShowcaseSection.tsx`**

Une section dédiée entre "WhyChooseUsSection" et "StatsSection" avec :
- Titre accrocheur ("Notre expertise en action")
- La vidéo dans un cadre avec bordure gradient et coins arrondis
- Overlay subtil au démarrage avec bouton play (la vidéo démarre au clic)
- Animation d'entrée Framer Motion au scroll
- Responsive : pleine largeur sur mobile, max-width sur desktop

#### 4. Ajouter la section à la page d'accueil
**Fichier : `src/pages/Index.tsx`**

Ajouter `VideoShowcaseSection` en lazy-load entre WhyChooseUsSection et StatsSection.

### Détails techniques
- Utilisation de `<video>` HTML5 natif avec `playsInline`, `muted`, `loop` pour autoplay sur mobile
- `preload="metadata"` pour ne pas bloquer le chargement de la page
- Fallback avec poster frame si la vidéo ne charge pas
- Pas de librairie externe nécessaire

