# Eliyo website

Minimal marketing hero for the Eliyo mobile app, built with Next.js.

## Development

```bash
npm install
npm run dev
```

The local site runs at `http://localhost:5173`.

## Production

```bash
npm run build
npm run start
```

## Locales

- `/` English
- `/ua` Ukrainian
- `/pl` Polish
- `/ru` Russian

Each locale also exposes `/privacy`, `/terms`, `/support`, and `/delete-account` below its locale prefix. English uses the unprefixed routes.

## Microsoft Clarity

Copy `.env.example` to `.env.local` and add the Clarity project ID:

```env
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SITE_URL=https://eliyo.app
```

The Clarity script is loaded only after the visitor accepts analytics cookies. The choice is stored in `localStorage`. Every page footer exposes Cookie settings so consent can be changed or withdrawn. Withdrawing consent sends denied consent to Clarity, clears its first-party cookies where possible, and reloads the page without initializing Clarity again.

## Eliyo Lab

The public feature board is loaded through `/api/lab`. The browser never receives Supabase credentials. Public feature data is cached briefly, while personal vote state is read separately only when an anonymous Lab session already exists.

The anonymous session is created lazily on the first vote or idea submission. Its random token is stored in a protected `HttpOnly` cookie and only its SHA-256 hash is stored in Supabase. A keyed network fingerprint is used as an abuse signal for rate limits, not as a voter identity. Votes are unique by feature and session.

Set these server-only variables locally and in Vercel:

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
ELIYO_LAB_HASH_SECRET=at_least_32_random_bytes
```

Do not expose the service-role key or hash secret through a `NEXT_PUBLIC_` variable.

## Pre-publication legal checks

- Confirm that the Privacy Policy AI list matches the providers enabled in production secrets and routing.
- Confirm Clarity Consent Mode remains enabled and that production masking and recording settings match the Privacy Policy.
- Keep App Store privacy disclosures and Google Play Data Safety answers aligned with the production app and provider flows.
- Verify in-app account deletion and Sign in with Apple token revocation before App Store submission.
- Keep legal pages, support details and store metadata aligned if contact aliases change later.
