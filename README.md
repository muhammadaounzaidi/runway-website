# Runway

Information website built with Next.js, deployed on Vercel.

## Tech Stack

- [Next.js](https://nextjs.org) (App Router, TypeScript)
- [Tailwind CSS](https://tailwindcss.com)
- [ESLint](https://eslint.org)

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
src/
  app/
    layout.tsx   # Root layout, metadata, fonts
    page.tsx     # Homepage
    globals.css  # Tailwind + global styles
public/          # Static assets
```

## Scripts

- `npm run dev` — start the dev server
- `npm run build` — production build
- `npm run start` — run the production build locally
- `npm run lint` — run ESLint

## Deployment

Deployed on [Vercel](https://vercel.com):

1. Push this repo to GitHub.
2. Import the repo in Vercel ([vercel.com/new](https://vercel.com/new)).
3. Vercel auto-detects Next.js — no config needed. Every push to `main` deploys to production; other branches get preview deployments.
