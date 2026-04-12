

## Plan: Fix Money Fusion Payment Integration

### Problem
The Money Fusion API call fails with `{"statut": false, "message": "Une erreur est survenue."}` because the request payload format doesn't match the API specification.

### Root Causes (from official docs at docs.moneyfusion.net)

1. **Wrong article format**: Code sends `articles: [{name, price, quantity}]` but API expects `article: [{"itemName": price}]` (key=item name, value=price as number)
2. **`totalPrice` sent as string**: API expects a Number
3. **Missing required field `numeroSend`**: The phone number field is required by Money Fusion
4. **Unnecessary `moneyfusion-private-key` header**: The API key is already in the URL; docs show only `Content-Type: application/json`
5. **Field name `articles` vs `article`**: API uses singular `article`

### Changes

#### 1. Update `supabase/functions/moneyfusion-payment/index.ts`
- Fix `article` format: `[{ [productTitle]: priceInFCFA }]` instead of array of objects with name/price/quantity
- Send `totalPrice` as Number (not String)
- Add `numeroSend` field (use a default like "0000000000" since we collect email, not phone)
- Remove `moneyfusion-private-key` header — only send `Content-Type: application/json`
- Rename `articles` to `article`
- Keep `personal_Info`, `nomclient`, `return_url`, `webhook_url` as-is (these match docs)

#### 2. Update `supabase/functions/create-checkout-order/index.ts`
- Pass `moneyfusion-private-key` header with the authorization token when calling the payment function internally (since it's an internal call, we need to pass proper auth or call Money Fusion directly from this function to simplify)
- Actually, simpler approach: call Money Fusion API directly from `create-checkout-order` instead of going through a separate edge function, reducing complexity and potential auth issues

#### Recommended approach (simplify)
Merge the Money Fusion API call directly into `create-checkout-order` to avoid the internal edge function call that lacks proper authorization headers. This eliminates one network hop and the authorization complexity.

### Technical Details

Correct payload per Money Fusion docs:
```json
{
  "totalPrice": 15000,
  "article": [{"Checklist Stratégique": 15000}],
  "personal_Info": [{"orderId": "uuid"}, {"customerEmail": "email"}],
  "numeroSend": "0000000000",
  "nomclient": "John Doe",
  "return_url": "https://...",
  "webhook_url": "https://..."
}
```

No special headers beyond `Content-Type: application/json`.

### Files to modify
- `supabase/functions/moneyfusion-payment/index.ts` — fix payload format
- `supabase/functions/create-checkout-order/index.ts` — minor: ensure the internal call passes correctly, or merge the Money Fusion call directly here

