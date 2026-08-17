# Astro Portfolio Rebuild Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build and publish a recruiter-ready Astro portfolio that truthfully demonstrates Anson Lin's software-engineering experience.

**Architecture:** Astro statically renders a homepage and project routes from one typed content module. Small framework-free client scripts provide navigation, filtering, command-palette, copy, reveal, and canvas enhancements while preserving a complete no-JavaScript experience.

**Tech Stack:** Astro, TypeScript, Tailwind CSS, Vitest, Playwright, axe-core, Lighthouse CI, GitHub Actions, npm

## Global Constraints

- Target graduate software-engineering recruiters first.
- Preserve the polished pixel/modern hybrid visual direction.
- Use only resume-approved or publicly verified facts; invent no claims or metrics.
- Configure every internal URL for GitHub Pages base path `/Personal-Website/`.
- Include no backend, CMS, analytics, cookies, or reconstructed live demo.
- Publish a one-page resume with the mobile number removed.
- Content must remain visible and navigable without client JavaScript.
- Meet Lighthouse thresholds of 95 for performance, accessibility, SEO, and best practices.

---

### Task 1: Astro foundation and typed project content

**Files:**
- Replace: `index.html`
- Create: `package.json`, `package-lock.json`, `astro.config.mjs`, `tsconfig.json`, `src/content.config.ts`, `src/data/projects.ts`, `src/data/site.ts`
- Test: `src/data/projects.test.ts`

**Interfaces:**
- Produce `Project` and `ProjectLink` types plus `projects`, `featuredProjects`, and `projectCategories` exports.
- Each project supplies the slug, title, short/long summaries, role, team context, technologies, categories, featured flag, verified links, highlights, architecture steps, testing, deployment, and lessons used by all routes.

- [ ] Write tests that require unique slugs, three featured case studies, valid internal/external link shapes, evidence categories, and no Road Sign source/demo link.
- [ ] Run the focused tests and confirm they fail because the project model does not exist.
- [ ] Scaffold Astro with strict TypeScript, Tailwind, npm scripts, GitHub Pages `site`/`base`, and the typed project/site data.
- [ ] Run the focused tests, `astro check`, and the production build until they pass.
- [ ] Commit the independently working foundation.

### Task 2: Recruiter homepage and case-study routes

**Files:**
- Create: `src/layouts/BaseLayout.astro`, `src/pages/index.astro`, `src/pages/projects/[slug].astro`, `src/pages/404.astro`, `src/components/*`, `src/styles/global.css`, `public/*`
- Test: `tests/site.spec.ts`, `tests/accessibility.spec.ts`

**Interfaces:**
- Render all cards and project routes from `projects` without duplicating project facts.
- Expose accessible controls identified by stable labels: `Open navigation`, `Open command palette`, `Filter projects by <category>`, `Copy email`, and `Download resume`.

- [ ] Write browser tests for the hero copy, all routes, filters, mobile menu, command palette, email copy fallback, keyboard navigation, and no horizontal overflow.
- [ ] Run the browser tests against the foundation and confirm they fail for missing UI.
- [ ] Build the polished pixel shell, responsive navigation, hero, capability evidence, project cards, timeline, contact section, case-study template, conceptual diagrams, and 404 page.
- [ ] Add progressive enhancement, safe external-link attributes, reduced-motion behavior, and mobile/touch support.
- [ ] Run browser and axe tests until all functional assertions pass with no serious or critical violations.
- [ ] Commit the complete content experience.

### Task 3: Resume, metadata, social preview, and quality gates

**Files:**
- Create: `public/resume/Anson_Lin_Resume.pdf`, `public/og.png`, `src/components/Seo.astro`, `lighthouserc.json`
- Modify: page/layout metadata and automated tests

**Interfaces:**
- The resume URL is stable at `/Personal-Website/resume/Anson_Lin_Resume.pdf` and contains no phone number.
- Each case study emits its own title, description, Open Graph fields, X fields, and project structured data from the same project record used on-screen.

- [ ] Create the phone-redacted PDF from the approved LaTeX source without modifying the source resume; verify one page, expected content, absent phone number, and a clean rendered page.
- [ ] Generate exactly one site-wide social card matching the finished pixel/modern brand and reject it if its text is incorrect.
- [ ] Write metadata tests, then implement canonical URLs, sitemap, robots policy, Person/project JSON-LD, root social metadata, and case-study metadata without inherited generic images.
- [ ] Run the full test suite, static checks, production build, internal link audit, and representative Lighthouse checks.
- [ ] Commit the verified release candidate.

### Task 4: GitHub Pages delivery

**Files:**
- Create: `.github/workflows/deploy.yml`
- Modify: `README.md`

**Interfaces:**
- A push to `main` installs from `package-lock.json`, runs all non-browser blocking checks and the production build, uploads `dist`, and deploys through GitHub Pages.

- [ ] Add the least-privilege GitHub Actions workflow and document local scripts, content editing, testing, and deployment.
- [ ] Validate the workflow syntax and run the complete local acceptance suite from a clean install.
- [ ] Review the whole branch against the approved design and fix all load-bearing findings.
- [ ] Push the feature branch, fast-forward `main` only after validation, monitor the Pages workflow, and smoke-test the production URL.
- [ ] Record the production result and final commit.
