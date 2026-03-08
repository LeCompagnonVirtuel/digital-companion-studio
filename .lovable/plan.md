

# Système de Backup Admin

## Contraintes techniques

Lovable ne peut pas executer `pg_dump` ni lancer de processus serveur planifies. L'approche realiste est :
- Une **edge function** qui exporte les donnees des tables cles en JSON et les stocke dans un bucket Supabase Storage
- Une **table `backups`** pour le suivi (date, taille, statut, type)
- Un **UI admin** pour declencher manuellement un backup, voir l'historique, telecharger et restaurer

Les backups automatiques (quotidiens/hebdomadaires) seront documentes comme necessitant un cron job pg_cron (configuration SQL fournie).

## Modifications

### 1. Migration SQL

- Creer la table `backups` (id, type, status, size_bytes, file_path, created_at, created_by, metadata)
- RLS admin-only
- Creer un bucket storage `backups` (prive)

### 2. Edge Function `create-backup`

- Exporte en JSON les tables : `admin_settings`, `digital_products`, `orders`, `order_items`, `blog_posts`, `portfolio_projects`, `shop_customers`, `promo_codes`, `leads`, `product_files` (metadata seulement)
- Genere un fichier JSON compresse, l'uploade dans le bucket `backups`
- Insere une ligne dans la table `backups`
- Retourne le resultat

### 3. Edge Function `restore-backup`

- Recoit un backup_id
- Telecharge le JSON depuis le storage
- Upsert les donnees table par table (avec gestion des conflits)
- Met a jour le statut du backup

### 4. Nouvelle page `src/pages/admin/Backups.tsx`

- Liste des backups (table avec date, type, taille, statut)
- Bouton "Creer une sauvegarde maintenant"
- Bouton telecharger par backup
- Bouton restaurer avec dialog de confirmation AlertDialog
- Indicateur de chargement pendant les operations

### 5. Integration dans AdminLayout

- Ajouter l'entree de menu "Sauvegardes" avec icone Shield/Database
- Route dans App.tsx

### 6. Cron automatique (SQL via insert tool)

- Configurer `pg_cron` + `pg_net` pour appeler l'edge function quotidiennement

### Fichiers crees/modifies
- Migration SQL (table `backups` + bucket)
- `supabase/functions/create-backup/index.ts`
- `supabase/functions/restore-backup/index.ts`
- `src/pages/admin/Backups.tsx`
- `src/components/admin/AdminLayout.tsx` (ajout menu)
- `src/App.tsx` (ajout route)
- `supabase/config.toml` (fonctions)
- SQL insert pour cron job

