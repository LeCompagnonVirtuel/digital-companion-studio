

## Problem

The `short_description` on the product detail page (line 189 of `ShopProduct.tsx`) renders as a single `<p>` tag, so line breaks (`\n`) and emoji bullet points from the admin are ignored and everything runs together.

## Solution

Apply the same fix as the "Problem" section: split the text by `\n` and render each non-empty line as its own `<p>` element with `whitespace-pre-line` and `space-y-2` spacing.

### Change in `src/pages/ShopProduct.tsx` (line 188-190)

Replace the single `<p>` tag:
```tsx
{product.short_description && (
  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">{product.short_description}</p>
)}
```

With:
```tsx
{product.short_description && (
  <div className="text-muted-foreground text-sm sm:text-base leading-relaxed space-y-2">
    {product.short_description.split('\n').filter(line => line.trim()).map((line, index) => (
      <p key={index} className="whitespace-pre-line">{line.trim()}</p>
    ))}
  </div>
)}
```

Also apply the same treatment to the full `description` on line 348, replacing the single `<p>` with the same split-and-map pattern for consistency.

