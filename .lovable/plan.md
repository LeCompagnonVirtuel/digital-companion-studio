

# Fix: Maintenance mode display correctness

## Issues found

1. **`updateSetting` uses `.update()` instead of `.upsert()`** - If the `maintenance_mode` row doesn't exist yet in `admin_settings`, the toggle silently fails (0 rows updated). Must use upsert to guarantee the row is created/updated.

2. **Admin bypass with no visual indicator** - When you (admin) are logged in and activate maintenance, you never see the maintenance page because `MaintenanceGuard` bypasses it for admins. There's no banner telling you "maintenance is active right now for visitors." This makes it seem broken.

3. **`analytics_events` constraint error** - The `page_exit` event type is not in the `analytics_events_event_type_check` constraint, causing 400 errors on every page navigation. This is a side bug visible in the network requests.

## Fixes

### 1. `src/hooks/useAdminSettings.tsx`
- Change `updateSetting` and `updateSettings` to use `.upsert()` with `onConflict: 'key'` instead of `.update().eq('key', ...)`.

### 2. `src/App.tsx` - MaintenanceGuard
- When admin is logged in AND maintenance is active, show a floating banner at the top: "Mode maintenance actif - les visiteurs voient la page de maintenance" with a link to Settings. This gives visual confirmation that maintenance works.

### 3. `src/pages/Maintenance.tsx`
- Add the site logo from `src/assets/logo.png` instead of just `favicon.png` for better branding.
- Ensure `useDocumentMeta` sets the page title to "Maintenance" for SEO.

### 4. Migration SQL
- Add `page_exit` to the `analytics_events_event_type_check` constraint to fix the 400 error.

### Files modified
- `src/hooks/useAdminSettings.tsx` (upsert fix)
- `src/App.tsx` (admin maintenance banner)
- `src/pages/Maintenance.tsx` (logo + meta)
- Migration SQL (analytics constraint fix)

