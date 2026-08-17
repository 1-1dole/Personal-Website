# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Astro, TypeScript, Tailwind CSS, static GitHub Pages deployment.

## Users

The primary visitors are New Zealand graduate and junior software-engineering recruiters and hiring managers. They need to understand Anson's direction, capabilities, background, and fit quickly, then inspect individual case studies when they want project evidence.

## Product Purpose

The portfolio introduces Anson Lin as a recent Computer Science graduate, communicates the engineering capabilities and working principles he is developing, and gives interested visitors clear routes to his resume, contact details, and detailed project case studies.

## Positioning

The site separates concise personal positioning from evidence-rich case studies: the homepage explains who Anson is and where he is heading, while each project route shows the verified architecture, testing, delivery, and lessons behind the work.

## Operating Context

Visitors commonly scan the site quickly on desktop or mobile before choosing whether to read a case study, download the resume, or make contact. The site is maintained as a typed static Astro project and deployed under the GitHub Pages base path `/Personal-Website/`.

## Capabilities and Constraints

- The homepage covers Skills, Background, Learnings, Target, and Contact without a project showcase.
- Project details appear only on the generated case-study routes; a compact global navigation entry keeps those routes discoverable.
- The site remains fully readable and navigable without client JavaScript.
- Internal links and assets must respect the GitHub Pages base path.
- No backend, CMS, analytics, cookies, or invented project claims are added.
- Existing keyboard navigation, reduced-motion handling, responsive behavior, metadata, sitemap, resume download, email copy fallback, and branded 404 behavior remain supported.

## Brand Commitments

Use the name Anson Lin and a clear, direct, technically literate voice. The previous pixel-game identity is intentionally retired rather than preserved.

## Evidence on Hand

- `public/resume/Anson_Lin_Resume.pdf` is the factual resume source.
- `src/data/projects.ts` contains the typed project facts used by every case-study route.
- `public/images/hnu-homepage.png` is verified Human Nutrition Unit project media.
- Public GitHub, LinkedIn, and Human Nutrition Unit links already present in the repository may be retained.
- Do not fabricate project screenshots, repositories, deployments, employers, clients, testimonials, awards, or metrics.

## Product Principles

- Explain Anson before asking visitors to inspect projects.
- Keep homepage claims concise and route detailed evidence to case studies.
- Reframe only verified facts; never invent credibility.
- Make the primary reading path obvious without requiring animation or JavaScript.
- Treat accessibility, responsive behavior, and performance as part of the portfolio's engineering proof.

## Accessibility & Inclusion

Maintain semantic navigation, visible keyboard focus, reduced-motion behavior, readable contrast, touch-friendly controls, no horizontal overflow from 320px upward, and no serious or critical automated accessibility violations.
