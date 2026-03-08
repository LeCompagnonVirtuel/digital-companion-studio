

# Amélioration du formulaire produit admin - 4 onglets

## Analyse actuelle

Le formulaire fonctionne mais manque de polish professionnel : pas d'icones de section, pas de descriptions d'aide, layout parfois incohérent, pas de validation visuelle, et quelques bugs (ex: "€" au lieu de "F CFA" dans la promo).

## Plan par onglet

### 1. Onglet Général
- Ajouter des icones de section et des descriptions d'aide sous chaque champ
- Ajouter un compteur de caracteres sur les champs texte (description courte max ~160 chars pour SEO)
- Ajouter un apercu live du slug sous forme de lien (`/boutique/mon-produit`)
- Regrouper "Image principale" et "Galerie" dans une Card visuellement distincte avec titre de section
- Ajouter un indicateur visuel de champs requis plus visible (asterisque rouge)
- Supporter le drag-and-drop pour reordonner les images de la galerie (indication visuelle)

### 2. Onglet Contenu
- Ajouter des icones (CheckCircle pour benefices, Package pour contenu inclus, FileText pour PDF)
- Ajouter un compteur d'elements pour benefices et contenu inclus
- Ajouter un hint Markdown sous les champs texte ("Supporte **gras**, *italique*, [liens](url)")
- Deplacer les infos fichier (format, taille) a cote de la zone d'upload PDF dans une meme Card
- Permettre le reordonnement des benefices/contenu par drag (ou au minimum boutons haut/bas)
- Ajouter une Card "Apercu" avec lien de previsualisation integre

### 3. Onglet Tarification
- Corriger le bug "€" → "F CFA" dans le calcul de la promotion (ligne 754)
- Ajouter un apercu visuel du prix tel qu'il sera affiche (prix barre + nouveau prix)
- Ajouter un champ "Devise" (select) deja present dans le state mais pas dans l'UI
- Deplacer "Ordre d'affichage" vers l'onglet Parametres (plus logique)
- Ajouter une Card recapitulative de la tarification avec indicateurs visuels (marge, remise %)

### 4. Onglet Parametres
- Recevoir "Ordre d'affichage" depuis l'onglet Tarification
- Ajouter un champ "Badge personnalise" (formData.badge existe mais pas dans l'UI)
- Ajouter une section "Meta SEO" avec un apercu Google (titre + description + slug)
- Ameliorer le layout des toggles avec des Cards groupees par categorie (Visibilite, Marketing)
- Ajouter un resume/apercu du statut du produit en haut de l'onglet (draft/publie avec indicateur couleur)

### Ameliorations transversales
- Ajouter des animations framer-motion sur les transitions entre onglets
- Footer fixe avec indication du nombre de modifications non sauvegardees
- Validation visuelle (champs requis en rouge si vides au submit)

### Fichiers modifies
- `src/components/admin/ProductFormDialog.tsx` — restructuration complete des 4 onglets

