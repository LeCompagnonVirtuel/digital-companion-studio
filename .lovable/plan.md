

# Correction du fichier affiché à 0 B après upload

## Problème

Le bug est à la **ligne 862** de `ProductFormDialog.tsx`. Quand le composant `PdfUploader` reçoit ses `currentFiles`, ils sont reconstruits à partir de `formData.download_url` avec une taille **hardcodée à `size: 0`** :

```js
currentFiles={
  formData.download_url
    ? [{
        name: formData.download_url.split("/").pop() || "fichier.pdf",
        path: formData.download_url,
        size: 0,  // ← toujours 0
        url: formData.download_url,
      }]
    : []
}
```

Après un upload réussi, `onFilesChange` met à jour `formData.download_url` avec le path du fichier, mais au re-render suivant, le `currentFiles` est recalculé avec `size: 0` — écrasant la vraie taille reçue de l'upload.

## Solution

### 1. Stocker la taille du fichier dans le state du formulaire (`ProductFormDialog.tsx`)

- Ajouter un champ `_uploadedFileSize` dans le state local (ou réutiliser `file_size`).
- Dans le callback `onFilesChange`, sauvegarder aussi `files[last].size` et `files[last].name`.
- Passer ces valeurs réelles dans le `currentFiles` au lieu de `size: 0`.
- Bonus : pré-remplir automatiquement le champ "Taille du fichier" avec la taille formatée.

### 2. Fichier modifié
- `src/pages/admin/ProductFormDialog.tsx` (lignes ~855-873) : conserver la taille et le nom du fichier uploadé dans le state, et les passer correctement au composant `PdfUploader`.

