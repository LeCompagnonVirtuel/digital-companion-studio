

## Analyse du flux PDF (upload + download)

### Etat actuel

Le flux fonctionne de bout en bout :
- **Upload** : l'admin uploade un PDF via `PdfUploader` dans le bucket privé `product-files`, le chemin est stocké dans `download_url` du produit
- **Download** : l'edge function `secure-download` verifie la commande payée, joint `digital_products` via FK pour récupérer `download_url`, et génère une URL signée (5 min)
- **Bucket** : `product-files` est privé avec RLS admin-only ; le service role key dans l'edge function bypasse la RLS

Le produit existant ("Checklist Stratégique") a un fichier PDF correctement uploadé et associé.

### Problèmes identifiés

**1. Fichiers orphelins lors de la création d'un nouveau produit**
Quand on crée un **nouveau** produit, `PdfUploader` reçoit `productId="new-product"` car le produit n'a pas encore d'ID. Le fichier est uploadé sous `new-product/timestamp-file.pdf`. Après sauvegarde, le produit est créé avec un vrai UUID mais le `download_url` pointe vers `new-product/...`. Ca fonctionne techniquement mais :
- Les fichiers sont mélangés sous un dossier `new-product/`
- Si l'admin annule, le fichier reste orphelin (comme celui visible dans le storage)

**2. Table `product_files` jamais utilisée**
La table `product_files` existe avec les bons champs (product_id, file_path, file_name, file_size) mais n'est jamais populée. Le `PdfUploader` stocke directement le chemin dans `download_url` du produit.

### Plan de corrections

**A. Corriger le flux upload pour nouveaux produits**
- Dans `ProductFormDialog`, modifier `handleSubmit` pour :
  1. Si c'est un nouveau produit ET qu'un fichier a été uploadé sous `new-product/` :
     - Créer d'abord le produit pour obtenir l'ID
     - Copier (move) le fichier de `new-product/...` vers `{productId}/...` dans le storage
     - Mettre à jour le `download_url` du produit avec le nouveau chemin
  2. Supprimer l'ancien fichier `new-product/...`

**B. Synchroniser avec la table `product_files`**
- Dans `PdfUploader.onFilesChange`, après un upload réussi, insérer un enregistrement dans `product_files` (product_id, file_path, file_name, file_size)
- Lors de la suppression, retirer aussi l'enregistrement de `product_files`
- Pour les nouveaux produits, insérer dans `product_files` après la création du produit

**C. Nettoyer le fichier orphelin existant**
- Supprimer `new-product/1772392583269-PLAQUETTE_LCE__EST-TU_PRET.pdf` du storage

### Détails techniques

Changements dans 2 fichiers :

1. **`src/components/admin/ProductFormDialog.tsx`** : Après `createProduct.mutateAsync`, si `download_url` commence par `new-product/`, copier le fichier vers le bon chemin avec l'ID réel du produit, puis mettre à jour le produit.

2. **`src/components/admin/PdfUploader.tsx`** : Ajouter l'insertion/suppression dans `product_files` table lors des opérations d'upload et de suppression.

