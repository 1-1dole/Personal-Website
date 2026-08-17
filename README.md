# Personal Website

Anson Lin's Astro + TypeScript software-engineering portfolio. Its Systems
Atlas interface introduces Anson through a profile map, then keeps detailed
engineering evidence on focused case-study routes.

**Live website:** [https://1-1dole.github.io/Personal-Website/](https://1-1dole.github.io/Personal-Website/)

## Prerequisites

- Node.js 22 and pnpm 10

## Development scripts

```bash
pnpm run dev       # Start the local development server
pnpm run check     # Run Astro and TypeScript checks
pnpm run test:unit # Run unit tests
pnpm run build     # Build the static site into dist/
```

Homepage facts live in `src/data/profile.ts`; case-study facts live in
`src/data/projects.ts`; shared site metadata lives in `src/data/site.ts`. Keep
the homepage focused on Skills, Background, Learnings, Target, and Contact.
Projects remain discoverable through the global Case studies menu and appear
only on their generated case-study routes.

The visual system and reusable interface rules are documented in `DESIGN.md`.
The downloadable resume is served from
`public/resume/Anson_Lin_Resume.pdf`.

## GitHub Pages

Pushes to `main` (and manual workflow dispatches) run checks, unit tests, and a
production build before deploying `dist/` to GitHub Pages. See
`.github/workflows/deploy.yml` for the deployment workflow.
