## Supabase Edge Function: keepalive

This repo now includes a Supabase Edge Function named `keepalive`.

Important:
- The function exists on Supabase only after you deploy it.
- An Edge Function does not run automatically on a schedule by itself.
- To reduce the chance of a Free plan pause, you still need an external scheduler to call it regularly.

### Deploy

From the project root:

```bash
supabase login
supabase link --project-ref dpiycebkjwgiylqwdaoi
supabase secrets set KEEPALIVE_SECRET=your-strong-secret
supabase functions deploy keepalive --no-verify-jwt
```

### Invoke URL

```text
https://dpiycebkjwgiylqwdaoi.functions.supabase.co/keepalive
```

### Example request

```bash
curl -X POST \
  "https://dpiycebkjwgiylqwdaoi.functions.supabase.co/keepalive" \
  -H "Authorization: Bearer your-strong-secret"
```

### Suggested schedule

Call it once every 24 hours.

### Notes

- The function performs a tiny read on the `projects` table.
- If you want stricter protection, keep the `KEEPALIVE_SECRET` set.
- This is best-effort only. Free Supabase projects can still be paused for inactivity.
