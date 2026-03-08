

# Page d'erreur de paiement dédiée

## Constat

La page `ShopConfirmation.tsx` gère déjà le cas `status === "failed"` avec un petit message, mais c'est minimal — pas de bouton "Réessayer", pas d'explication des causes possibles, pas de redirection depuis Money Fusion en cas d'échec explicite.

## Plan

### 1. Créer `src/pages/ShopPaymentError.tsx`

Page dédiée avec :
- Icône d'erreur animée (framer-motion)
- Message clair : "Votre paiement n'a pas abouti"
- Raisons possibles (solde insuffisant, annulation, timeout)
- Détails de la commande si `order` ID est fourni (récupéré via query param)
- Bouton "Réessayer le paiement" qui relance `moneyfusion-payment` avec le même order ID
- Bouton "Retour à la boutique"
- Bouton "Contacter le support"
- Bandeau de confiance (paiement sécurisé, données protégées)

### 2. Ajouter la route dans `App.tsx`

```
/boutique/paiement-erreur?order={orderId}
```

### 3. Mettre à jour `ShopConfirmation.tsx`

Quand `order.status === "failed"`, rediriger automatiquement vers `/boutique/paiement-erreur?order={orderId}` au lieu d'afficher le mini-message inline.

### 4. Mettre à jour `ShopCheckout.tsx`

Si l'appel à `moneyfusion-payment` échoue côté edge function (pas de `paymentUrl`), rediriger vers la page d'erreur au lieu d'un simple toast.

