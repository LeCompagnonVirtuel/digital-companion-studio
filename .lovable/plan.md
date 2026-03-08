

## Plan d'amélioration complète du site CIDAF

Ce projet est très ambitieux. Il sera implémenté en **plusieurs phases successives** via plusieurs messages. Voici le plan complet organisé par priorité.

---

### Phase 1 : Corrections et stabilité (ce message)

**1. Corriger les warnings console (forwardRef)**
- `AboutSection` et `PricingSection` sont utilisés avec `lazy()` qui tente de passer une ref. Ajouter `React.forwardRef` ou ajuster l'export pour supprimer les warnings.

**2. Supprimer App.css inutilisé**
- Le fichier `src/App.css` contient du boilerplate Vite non utilisé (le site utilise `index.css` + Tailwind). Le supprimer proprement.

**3. Améliorer le responsive mobile global**
- Auditer et corriger les `container-wide`, `section-padding` pour garantir aucun débordement horizontal sur mobile.
- Vérifier les tailles de texte hero sur petit écran (< 375px).

---

### Phase 2 : Performance et UX (message suivant)

**4. Optimiser les images externes**
- Les images hero Unsplash chargent en pleine résolution. Ajouter des paramètres `&w=800` pour mobile et utiliser `loading="lazy"` systématiquement.

**5. Améliorer le QueryClient**
- Ajouter `staleTime`, `gcTime` et `retry` pour réduire les appels API redondants.

**6. Améliorer les formulaires**
- Unifier la validation Zod sur tous les formulaires (Contact déjà fait, vérifier Checkout, StartProject, etc.).

---

### Phase 3 : Nouvelles fonctionnalités — E-learning & Formations

**7. Tables Supabase pour E-learning**
Créer les tables :
- `courses` (id, title, slug, description, short_description, featured_image, price, category, level, duration, instructor_name, status, display_order, created_at, updated_at)
- `course_modules` (id, course_id FK, title, description, display_order)
- `course_lessons` (id, module_id FK, title, content, video_url, duration, display_order)
- `course_enrollments` (id, user_id, course_id FK, status, progress, enrolled_at, completed_at)
- `lesson_progress` (id, enrollment_id FK, lesson_id FK, completed, completed_at)

Avec RLS : lecture publique pour cours publiés, gestion admin, inscriptions authentifiées.

**8. Pages E-learning**
- `src/pages/Courses.tsx` — liste des formations avec filtres (catégorie, niveau, prix)
- `src/pages/CourseDetail.tsx` — page de vente d'une formation (structure premium comme ShopProduct)
- `src/pages/CoursePlayer.tsx` — lecteur de cours avec sidebar modules/leçons et suivi de progression

**9. Hooks et API**
- `src/hooks/useCourses.tsx` — CRUD courses, modules, leçons
- `src/hooks/useEnrollments.tsx` — inscriptions et progression

---

### Phase 4 : Séminaires

**10. Table Supabase pour Séminaires**
- `seminars` (id, title, slug, description, date, location, price, max_participants, current_participants, featured_image, status, created_at)
- `seminar_registrations` (id, seminar_id FK, name, email, phone, payment_status, registered_at)

**11. Pages Séminaires**
- `src/pages/Seminars.tsx` — liste des séminaires à venir
- `src/pages/SeminarDetail.tsx` — page détail + inscription + paiement

---

### Phase 5 : Admin étendu

**12. Pages admin pour les nouveaux modules**
- `src/pages/admin/Courses.tsx` — gestion CRUD des formations, modules, leçons
- `src/pages/admin/Seminars.tsx` — gestion des séminaires et inscriptions
- Ajouter les entrées dans `AdminLayout` sidebar

**13. Dashboard unifié**
- Ajouter les KPIs formations (inscriptions, revenus formations) et séminaires au dashboard existant.

---

### Phase 6 : Navigation et cohérence

**14. Mise à jour Navigation**
- Ajouter "Formations" et "Séminaires" dans `navLinks` et le footer
- Mettre à jour `App.tsx` avec les nouvelles routes

**15. Cohérence visuelle**
- Uniformiser les sections hero de toutes les pages (même structure, même espacement)
- Vérifier que toutes les pages utilisent le même pattern Navigation + main + Footer

---

### Contraintes respectées

- **Aucune suppression** de fonctionnalité existante
- **Non destructif** : les nouvelles tables et pages s'ajoutent sans modifier l'existant
- **Responsive** : toutes les nouvelles pages suivront le même design system Tailwind
- **Performance** : lazy loading pour les nouvelles pages
- **Sécurité** : RLS sur toutes les nouvelles tables, validation Zod sur les formulaires

### Estimation

Cela nécessitera **8-12 messages** pour implémenter l'ensemble. Je commence par la **Phase 1** (corrections et stabilité) dès approbation.

