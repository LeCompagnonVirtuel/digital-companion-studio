

## Problem

The "Le problème que vous rencontrez" section renders the problem text as a single `<p>` tag, so any line breaks (`\n`) in the database content are ignored — everything runs together in one block.

## Solution

Replace the single `<p>` tag with logic that splits the text on newline characters and renders each line as a separate paragraph/element. This will also handle emoji bullet points and structured content from the admin.

### Changes in `src/components/shop/ProductProblemSolution.tsx` (lines 78-81)

Replace the single `<p>` rendering with:
- Split `displayProblem` by `\n`
- Render each non-empty line as its own `<p>` element with proper spacing
- Use `whitespace-pre-line` as a fallback to also respect line breaks within segments

This ensures admin-authored content with line breaks, emoji bullets, and structured lists displays cleanly with proper vertical spacing.

