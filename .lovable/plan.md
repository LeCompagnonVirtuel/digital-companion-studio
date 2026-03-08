

# Mode Maintenance - Plan d'implémentation

## Architecture

Le mode maintenance sera géré via la table `admin_settings` existante (clé `maintenance_mode`) et intercepté au niveau de `App.tsx` avant le rendu des routes publiques.

## Modifications

### 1. Migration DB : ajouter les settings maintenance

Insérer dans `admin_settings` les clés :
- `maintenance_mode` → `false`
- `maintenance_message` → message par défaut
- `maintenance_title` → titre par défaut
- `maintenance_estimated_return` → `null`

Mettre à jour la policy RLS `Anyone can view public settings` pour inclure les clés `maintenance_mode`, `maintenance_title`, `maintenance_message`, `maintenance_estimated_return`.

### 2. Créer `src/pages/Maintenance.tsx`

Page plein écran moderne avec :
- Logo du site
- Titre et message personnalisés (récupérés depuis DB)
- Animation framer-motion (icône construction)
- Compteur de retour estimé si défini
- Bouton "Revenir plus tard" (recharge la page)
- Design responsive, fond sombre

### 3. Créer `src/hooks/useMaintenanceMode.tsx`

Hook qui :
- Requête `admin_settings` pour les clés `maintenance_mode`, `maintenance_title`, `maintenance_message`, `maintenance_estimated_return`
- Souscrit en realtime aux changements
- Retourne `{ isMaintenanceActive, title, message, estimatedReturn, isLoading }`

### 4. Modifier `App.tsx`

Ajouter un wrapper `MaintenanceGuard` autour des routes :
- Utilise `useMaintenanceMode()` et `useAdminAuth()`
- Si maintenance active ET utilisateur non admin → affiche `<Maintenance />`
- Si admin → rendu normal (toutes les routes)
- Les routes `/admin` et `/auth` restent toujours accessibles

### 5. Ajouter un onglet "Maintenance" dans `src/pages/admin/Settings.tsx`

Nouvel onglet dans les Tabs existants avec :
- Switch ON/OFF pour `maintenance_mode`
- Champ titre personnalisé
- Textarea message personnalisé
- Input datetime pour durée estimée de retour
- Sauvegarde via `updateSettings`

### 6. Bannière d'alerte dans `AdminLayout.tsx`

Quand maintenance active, afficher en haut du layout admin :
- Bandeau jaune/orange : "Mode maintenance actif"
- Bouton rapide "Désactiver"

### Fichiers modifiés/créés
- Migration SQL (insert settings + update RLS policy)
- `src/pages/Maintenance.tsx` (nouveau)
- `src/hooks/useMaintenanceMode.tsx` (nouveau)
- `src/App.tsx`
- `src/pages/admin/Settings.tsx`
- `src/components/admin/AdminLayout.tsx`
- `src/hooks/useAdminSettings.tsx` (ajouter les nouvelles clés au type)

