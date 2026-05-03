# Module IA Growth Intelligence — Plan d'intégration

Couche additionnelle au site LCV existant, accessible depuis l'admin (`/admin/growth`), sans toucher au front public. Tout passe par Lovable Cloud (Supabase) + Lovable AI Gateway (Gemini) déjà configurés.

## Architecture

```
Admin UI (React)  ──►  Edge Functions  ──►  Lovable AI (Gemini)
       │                     │           ──►  Firecrawl (scraping/search)
       └──────────────►  Supabase (DB + RLS + Realtime)
```

- Aucune modification du site public.
- RLS stricte : seuls les `admin` (table `user_roles` existante) accèdent aux données.
- Connecteur **Firecrawl** requis (scrape + search + map) — à activer via `standard_connectors--connect`.

## 1. Base de données (nouvelles tables)

- `gi_competitors` — concurrents identifiés (nom, url, secteur, résumé, forces, faiblesses, positionnement, score, raw_data jsonb).
- `gi_prospects` — prospects (nom, secteur, localisation, url, signaux jsonb, score 0-100, temperature `chaud|moyen|froid`, statut `nouveau|contacte|suivi|gagne|perdu`, analysis jsonb).
- `gi_messages` — brouillons générés (prospect_id, canal `email|linkedin|whatsapp`, contenu, statut `draft|approved|sent`, created_by).
- `gi_searches` — historique des veilles lancées (query, secteur, localisation, results jsonb, created_by).
- `gi_actions_log` — audit (qui a fait quoi quand).

RLS : `has_role(auth.uid(), 'admin')` pour SELECT/INSERT/UPDATE/DELETE.

## 2. Edge Functions

Toutes protégées (vérification JWT + rôle admin côté fonction).

- `gi-competitor-scan` — entrée : `{ secteur, localisation, keywords }`. Utilise Firecrawl `/search` puis `/scrape` sur top résultats, envoie à Gemini pour structurer (positionnement, forces, faiblesses, opportunités). Stocke dans `gi_competitors`.
- `gi-prospect-discover` — entrée : `{ secteur, localisation, criteres }`. Firecrawl search + map → Gemini analyse maturité digitale (site, SEO, social) → score /100 + temperature + signaux. Stocke dans `gi_prospects`.
- `gi-analyze-target` — entrée : `{ url ou prospect_id }`. Scrape ciblé + analyse commerciale (problème, besoin, opportunité, angle de vente).
- `gi-generate-message` — entrée : `{ prospect_id, canal, ton, objectif }`. Gemini génère message court, humain, orienté valeur. Stocke en `draft` (jamais envoyé automatiquement).
- `gi-enrich-prospect` — réanalyse à la demande.

Toutes utilisent `tool calling` Gemini pour sortie JSON structurée (pas de parsing fragile).

## 3. Interface admin

Nouvelle entrée dans `AdminLayout` : **Growth IA**, avec 4 onglets/pages sous `/admin/growth/*` :

- `/admin/growth` — Dashboard : KPIs (prospects chauds, concurrents suivis, messages en attente), top opportunités.
- `/admin/growth/prospects` — Table filtrable (secteur, score, température, statut), actions : Analyser, Générer message, Marquer prioritaire, Changer statut, Exporter CSV.
- `/admin/growth/competitors` — Cartes comparatives : positionnement, forces/faiblesses, axes de différenciation.
- `/admin/growth/messages` — File de brouillons, prévisualisation, édition, copie vers email/LinkedIn/WhatsApp (lien `wa.me`, `mailto:`, copy-to-clipboard). **Aucun envoi automatique.**

Lancement de scans via formulaires (secteur + localisation + mots-clés). Suivi en Realtime grâce à Supabase Realtime sur `gi_prospects` / `gi_competitors`.

## 4. Conformité & éthique

- Bandeau visible : "Données issues de sources publiques uniquement".
- Pas d'envoi automatique : tous les messages restent en `draft` jusqu'à action humaine explicite (clic copier ou ouvrir mailto).
- Aucune collecte de données privées (emails personnels scrapés filtrés).
- Log d'audit dans `gi_actions_log`.
- Rate limit côté edge function (5 scans/min/admin).

## 5. Étapes d'implémentation

1. Connecter Firecrawl via `standard_connectors--connect`.
2. Migration SQL : 5 tables + RLS + index + triggers `updated_at`.
3. Déployer 5 edge functions avec validation Zod et tool-calling Gemini.
4. Ajouter routes admin + entrée sidebar `AdminLayout`.
5. Construire pages : Dashboard, Prospects, Competitors, Messages.
6. Hooks React Query + abonnements Realtime.
7. QA : un cycle complet (scan secteur → prospect détecté → analyse → message draft).

## Hors scope (proposable plus tard)

- Connecteur HubSpot/Airtable pour push CRM externe (peut être ajouté en V2).
- Envoi automatisé (volontairement exclu pour conformité).
- Widget public sur le site — non demandé, et exposerait la logique business.

Approuve ce plan et je lance l'implémentation (connecteur Firecrawl en premier).
