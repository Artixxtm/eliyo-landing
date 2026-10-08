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

## Pre-publication legal checks

- Replace the publication-date placeholders.
- Resolve the postal/geographic address placeholder before publication if legal review confirms it is required.
- Replace the transactional-email provider placeholder with the provider configured in hosted Supabase Auth.
- Confirm that the Privacy Policy AI list matches the providers enabled in production secrets and routing.
