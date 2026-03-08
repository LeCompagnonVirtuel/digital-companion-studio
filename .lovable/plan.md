

# Mise a jour UX des 8 pages principales

## Analyse

Les pages sont deja bien construites avec animations framer-motion, hero sections, et un design premium. Les ameliorations ciblent des lacunes UX specifiques identifiees :

- **Accueil** : Pas de section "Pourquoi nous choisir" ni de social proof numerique visible rapidement
- **Services** : Manque de section comparaison/resume et d'un CTA intermediaire
- **Portfolio** : Pas d'etat vide attractif ni de compteur de projets, hero basique
- **Tarifs** : FAQ non interactive (pas d'accordeon), pas de toggle mensuel/annuel visuel
- **A propos** : Pas de section equipe, pas de chiffres animes comme sur l'accueil
- **Contact** : Pas de carte/map, manque un indicateur de temps de reponse live
- **Boutique** : Deja tres complete, mais manque section "Recemment consultes"
- **Blog** : Pas de filtre par categorie, pas de barre de recherche

## Modifications par page

### 1. Accueil (`src/pages/Index.tsx`)
- Ajouter un composant `WhyChooseUsSection` entre StatsSection et ShopSection : 3 cards avec icones (Expertise locale, Support 24/7, ROI garanti)
- Reordonner les sections pour un meilleur flow de conversion : Hero → Trust → Services → WhyChooseUs → Stats → Projects → Testimonials → Pricing → FAQ → CTA

### 2. Services (`src/pages/Services.tsx`)
- Ajouter un mini-CTA banner entre les deux rangees de services ("Pas sur quel service choisir ? → Audit gratuit")
- Ajouter un badge "Populaire" sur les 3 services les plus demandes (Marketing, Web, E-commerce)
- Ameliorer les hover effects : ajouter une fleche animee comme sur la home ServicesSection

### 3. Portfolio (`src/pages/Portfolio.tsx`)
- Ajouter un compteur de projets anime dans le hero ("150+ projets livres")
- Ameliorer l'etat vide avec une illustration et un CTA
- Ajouter une animation de transition entre les filtres plus fluide

### 4. Tarifs (`src/pages/Pricing.tsx`)
- Convertir la FAQ en accordeon interactif (`Accordion` de Radix)
- Ajouter une section "Garantie" avec badges de confiance avant la FAQ
- Ajouter un badge "Economisez X%" sur le pack Scale

### 5. A propos (`src/pages/About.tsx`)
- Ajouter une section "Notre equipe" avec 3-4 membres (avatar + role + description courte)
- Remplacer les chiffres statiques du hero par des compteurs animes (reutiliser `AnimatedCounter` de StatsSection)
- Ajouter une section "Nos partenaires/certifications" avec logos

### 6. Contact (`src/pages/Contact.tsx`)
- Ajouter un indicateur live "Temps de reponse moyen : < 2h" dans la sidebar
- Ajouter des boutons d'action rapide : WhatsApp, Appel direct, Calendly
- Ameliorer le feedback de soumission : animation de succes au lieu du simple toast

### 7. Boutique (`src/pages/Shop.tsx`)
- Ajouter une section "Garantie satisfait ou rembourse" plus visible sous les produits
- Ameliorer le message "Aucun produit" avec des suggestions

### 8. Blog (`src/pages/Blog.tsx`)
- Ajouter une barre de recherche dans le hero
- Ajouter des filtres par categorie (chips) sous le hero
- Ajouter un CTA "Newsletter" entre le featured post et la grille

## Nouveaux fichiers
- `src/components/home/WhyChooseUsSection.tsx`

## Fichiers modifies
- `src/pages/Index.tsx` (reordonnancement sections + import WhyChooseUs)
- `src/pages/Services.tsx` (badges populaire, mini-CTA, hover ameliore)
- `src/pages/Portfolio.tsx` (compteur hero, etat vide, transitions)
- `src/pages/Pricing.tsx` (accordeon FAQ, section garantie, badge economie)
- `src/pages/About.tsx` (section equipe, compteurs animes, partenaires)
- `src/pages/Contact.tsx` (indicateur live, boutons action rapide, feedback)
- `src/pages/Shop.tsx` (garantie visible, suggestions etat vide)
- `src/pages/Blog.tsx` (recherche, filtres categorie, CTA newsletter)

