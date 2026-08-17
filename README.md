# Personal Website

Anson Lin's Astro + TypeScript software-engineering portfolio: a polished,
pixel-inspired site focused on backend, full-stack, testing, and delivery work.

## Prerequisites

- Node.js 22 and pnpm 10

## Development scripts

```bash
pnpm run dev       # Start the local development server
pnpm run check     # Run Astro and TypeScript checks
pnpm run test:unit # Run unit tests
pnpm run build     # Build the static site into dist/
```

Project content lives in `src/data/projects.ts` and `src/data/site.ts`. The
downloadable resume is served from `public/resume/Anson_Lin_Resume.pdf`.

## GitHub Pages

Pushes to `main` (and manual workflow dispatches) run checks, unit tests, and a
production build before deploying `dist/` to GitHub Pages. See
`.github/workflows/deploy.yml` for the deployment workflow.
