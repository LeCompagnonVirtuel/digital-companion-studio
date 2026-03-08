

# Historique des activations/désactivations du mode maintenance

## Approche

Creer une table `maintenance_history` pour logger chaque activation/desactivation, puis afficher l'historique dans l'onglet Maintenance des Settings admin.

## Modifications

### 1. Migration SQL - Table `maintenance_history`

```sql
CREATE TABLE public.maintenance_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  action text NOT NULL, -- 'activated' ou 'deactivated'
  performed_by uuid REFERENCES auth.users(id),
  performed_by_email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  metadata jsonb DEFAULT '{}'
);

ALTER TABLE public.maintenance_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage maintenance history"
  ON public.maintenance_history FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
```

### 2. Modifier `src/pages/admin/Settings.tsx`

- Dans `handleToggleMaintenance`, apres le `updateSetting`, inserer une ligne dans `maintenance_history` avec l'action (`activated`/`deactivated`), l'email de l'admin courant, et un timestamp.
- Ajouter sous la carte de personnalisation une nouvelle carte "Historique" avec un tableau chronologique (date, action, admin) charge depuis `maintenance_history` ordonne par `created_at DESC`, limite a 20 entrees.
- Badge vert/rouge pour chaque action.

### Fichiers modifies
- Migration SQL (nouvelle table)
- `src/pages/admin/Settings.tsx` (insertion historique + affichage tableau)

