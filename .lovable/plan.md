

# Systeme d'Alertes, Erreurs et Monitoring Admin

## Approche

Creer une table `system_alerts` pour stocker les alertes/erreurs detectees, un hook pour les gerer, et une page admin "Monitoring" avec dashboard de sante du systeme. La detection se fait cote client (erreurs API, paiements echoues, temps de reponse) et via une edge function de health-check.

## Modifications

### 1. Migration SQL - Table `system_alerts`

```sql
CREATE TABLE public.system_alerts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  alert_type text NOT NULL, -- 'payment_error', 'api_error', 'db_error', 'page_error', 'performance'
  severity text NOT NULL DEFAULT 'medium', -- 'low', 'medium', 'high', 'critical'
  title text NOT NULL,
  message text,
  source text, -- page ou service concerne
  status text NOT NULL DEFAULT 'open', -- 'open', 'acknowledged', 'resolved'
  metadata jsonb DEFAULT '{}',
  resolved_at timestamptz,
  resolved_by text,
  created_at timestamptz NOT NULL DEFAULT now()
);
-- RLS: admin ALL, anon INSERT (pour que le frontend puisse reporter des erreurs)
```

### 2. Edge Function `health-check`

- Teste la connectivite DB (simple SELECT 1)
- Teste le bucket storage
- Mesure le temps de reponse
- Retourne un JSON avec le statut de chaque service
- Peut etre appele depuis le dashboard admin

### 3. Hook `src/hooks/useSystemAlerts.tsx`

- Fetch les alertes depuis `system_alerts` avec filtres (type, severite, statut, date)
- Fonctions : `createAlert()`, `resolveAlert()`, `acknowledgeAlert()`
- Stats : compteurs par severite et statut

### 4. Hook `src/hooks/useSystemHealth.tsx`

- Appelle l'edge function `health-check`
- Calcule les metriques : temps de reponse, statut services
- Compte les visiteurs temps reel via `analytics_events` (derniere minute)
- Transactions recentes depuis `orders`

### 5. Composant global `src/components/ErrorBoundaryReporter.tsx`

- Intercepte les erreurs React non gerees
- Insere automatiquement une alerte dans `system_alerts`
- Wrapper autour des routes admin et publiques

### 6. Intercepteur d'erreurs API `src/lib/errorReporter.ts`

- Fonction utilitaire `reportSystemError()` qui insere dans `system_alerts`
- A integrer dans les catch des appels critiques (paiements, etc.)

### 7. Page `src/pages/admin/Monitoring.tsx`

**Section haute - Dashboard sante :**
- Cards : Statut DB, Statut Storage, Temps de reponse, Uptime
- Visiteurs temps reel (depuis analytics_events)
- Transactions recentes (depuis orders)
- Bouton "Verifier maintenant" qui appelle health-check

**Section basse - Alertes systeme :**
- Tableau des alertes avec colonnes : severite (badge couleur), titre, type, date, statut
- Filtres : par type, severite, statut, date
- Actions : marquer comme resolue, acknowledger
- Compteurs en haut : critiques ouvertes, total ouvertes, resolues aujourd'hui

### 8. Integration

- Route `/admin/monitoring` dans `App.tsx`
- Menu "Monitoring" avec icone `Activity` dans `AdminLayout.tsx`
- Banniere d'alerte dans AdminLayout si alertes critiques ouvertes

### Fichiers crees/modifies
- Migration SQL (table `system_alerts`)
- `supabase/functions/health-check/index.ts` (nouveau)
- `src/hooks/useSystemAlerts.tsx` (nouveau)
- `src/hooks/useSystemHealth.tsx` (nouveau)
- `src/lib/errorReporter.ts` (nouveau)
- `src/pages/admin/Monitoring.tsx` (nouveau)
- `src/App.tsx` (route)
- `src/components/admin/AdminLayout.tsx` (menu + banniere alertes critiques)
- `supabase/config.toml` (health-check function)

