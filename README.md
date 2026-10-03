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

## Microsoft Clarity

Copy `.env.example` to `.env.local` and add the Clarity project ID:

```env
NEXT_PUBLIC_CLARITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SITE_URL=https://eliyo.app
```

The Clarity script is loaded only after the visitor accepts cookies.
