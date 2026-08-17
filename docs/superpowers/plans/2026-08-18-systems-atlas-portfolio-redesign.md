# Systems Atlas Portfolio Redesign Implementation Plan

> **For implementation:** REQUIRED SUB-SKILL: Use `superpowers:executing-plans` to implement this plan task-by-task in the current task. Use `superpowers:subagent-driven-development` only if the user explicitly authorizes subagents. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild Anson Lin's Astro portfolio in the approved Systems Atlas visual world, with a profile-only homepage and project content confined to individual case-study routes.

**Architecture:** Astro continues to statically render all routes. A new typed profile module drives the homepage map and sections, while the existing typed project module remains the sole source for case studies and their navigation. Semantic HTML provides the complete experience; CSS/SVG route drawing, disclosure behavior, the command palette, clipboard feedback, and active-station state are progressive enhancements.

**Tech Stack:** Astro 5, TypeScript, Tailwind CSS 3, Vitest, Playwright, axe-core, Lighthouse CI, GitHub Pages

## Global Constraints

- The homepage body contains no project title, project screenshot, technology list, project metric, project card, filter, or showcase.
- Homepage sections are Skills, Background, Learnings, Target, and Contact.
- Project narratives, architecture, testing, deployment, lessons, links, and media remain on `/projects/[slug]/` routes only.
- Use only resume-approved or repository-verified facts; invent no claims, screenshots, employers, clients, links, awards, testimonials, or metrics.
- Preserve the GitHub Pages base path `/Personal-Website/` for every internal link and asset.
- Content remains visible and navigable without client JavaScript.
- Preserve keyboard access, focus restoration, reduced-motion support, responsive behavior from 320px upward, metadata, sitemap, resume download, email fallback, and the branded 404 route.
- Core interface text, controls, icons, station geometry, and route lines are semantic HTML/CSS/SVG; the approved raster comp is reference evidence only.
- The previous pixel avatar, particle canvas, dark palette, and project-filter interface are retired rather than blended into the new identity.
- Maintain Lighthouse thresholds of 95 for performance, accessibility, SEO, and best practices.

---

### Task 1: Typed profile content and navigation model

**Files:**
- Create: `src/data/profile.ts`
- Create: `src/data/profile.test.ts`
- Reference: `src/data/projects.ts`

**Interfaces:**
- Produces: `RouteRole = 'cobalt' | 'green' | 'orange' | 'black'`
- Produces: `ProfileStation`, `SkillGroup`, `BackgroundItem`, `LearningItem`, and `TargetProfile`
- Produces: `profileStations`, `skillGroups`, `backgroundItems`, `learningItems`, and `targetProfile`
- Constraint: no value in this module contains a project title

- [ ] **Step 1: Write failing profile-model tests**

```ts
import { describe, expect, it } from 'vitest';
import {
  backgroundItems,
  learningItems,
  profileStations,
  skillGroups,
  targetProfile,
} from './profile';

describe('profile content', () => {
  it('defines the four homepage stations in route order', () => {
    expect(profileStations.map(({ id }) => id)).toEqual([
      'skills',
      'background',
      'learnings',
      'target',
    ]);
    expect(new Set(profileStations.map(({ route }) => route)).size).toBe(4);
  });

  it('contains the approved profile sections without project showcase copy', () => {
    expect(skillGroups.map(({ title }) => title)).toEqual([
      'Backend',
      'Frontend',
      'Testing & quality',
      'Deployment & tools',
      'Data & ML',
    ]);
    expect(backgroundItems).toHaveLength(2);
    expect(learningItems).toHaveLength(3);
    expect(targetProfile.heading).toMatch(/graduate|junior/i);

    const serialized = JSON.stringify({
      profileStations,
      skillGroups,
      backgroundItems,
      learningItems,
      targetProfile,
    });
    for (const projectTitle of [
      'Human Nutrition Unit',
      'Recipe Application',
      'Road Sign Detection',
      'Memory Map',
    ]) {
      expect(serialized).not.toContain(projectTitle);
    }
  });
});
```

- [ ] **Step 2: Run the focused test and verify the missing-module failure**

Run: `pnpm exec vitest run src/data/profile.test.ts`

Expected: FAIL because `src/data/profile.ts` does not exist.

- [ ] **Step 3: Implement the typed profile module from verified facts**

```ts
export type RouteRole = 'cobalt' | 'green' | 'orange' | 'black';

export interface ProfileStation {
  id: 'skills' | 'background' | 'learnings' | 'target';
  label: string;
  route: RouteRole;
  summary: string;
}

export interface SkillGroup {
  title: string;
  items: readonly string[];
}

export interface BackgroundItem {
  title: string;
  meta: string;
  summary: string;
}

export interface LearningItem {
  title: string;
  summary: string;
}

export interface TargetProfile {
  heading: string;
  summary: string;
  location: string;
}

export const profileStations: readonly ProfileStation[] = [
  { id: 'skills', label: 'Skills', route: 'cobalt', summary: 'The tools and practices I can apply.' },
  { id: 'background', label: 'Background', route: 'green', summary: 'The education and work habits I bring.' },
  { id: 'learnings', label: 'Learnings', route: 'orange', summary: 'The principles I am carrying forward.' },
  { id: 'target', label: 'Target', route: 'black', summary: 'The engineering roles I am pursuing.' },
];

export const skillGroups: readonly SkillGroup[] = [
  { title: 'Backend', items: ['Python', 'Flask', 'SQLAlchemy', 'SQLite', 'REST APIs', 'Repository pattern'] },
  { title: 'Frontend', items: ['Astro', 'TypeScript', 'JavaScript', 'HTML', 'CSS', 'Tailwind CSS', 'AJAX'] },
  { title: 'Testing & quality', items: ['pytest', 'Unit testing', 'End-to-end testing', 'System testing', 'Model evaluation'] },
  { title: 'Deployment & tools', items: ['Git', 'GitHub', 'Docker', 'Render', 'Sanity CMS'] },
  { title: 'Data & ML', items: ['Image processing', 'Classification', 'Feature quality', 'Error analysis'] },
];

export const backgroundItems: readonly BackgroundItem[] = [
  {
    title: 'University of Auckland',
    meta: 'BSc Computer Science · 2023—2026',
    summary: 'Built foundations across software engineering, web development, data, and machine-learning coursework.',
  },
  {
    title: 'Woolworths Stock Assistant',
    meta: 'May 2023—June 2024',
    summary: 'Developed dependable routines, clear communication, and attention to detail in a fast-moving team environment.',
  },
];

export const learningItems: readonly LearningItem[] = [
  { title: 'Design clear boundaries', summary: 'Separating responsibilities makes systems easier to test, change, and explain.' },
  { title: 'Treat testing as delivery', summary: 'Quality work belongs throughout implementation, not only at the end.' },
  { title: 'Make ownership explicit', summary: 'Clear communication and responsibility help teams move together.' },
];

export const targetProfile: TargetProfile = {
  heading: 'Graduate and junior software engineering',
  summary: 'Seeking backend and full-stack opportunities, with data and machine learning as supporting breadth.',
  location: 'Aotearoa New Zealand',
};
```

- [ ] **Step 4: Run model tests and static checks**

Run: `pnpm exec vitest run src/data/profile.test.ts && pnpm run check`

Expected: PASS with four unique route roles and no project titles in profile data.

- [ ] **Step 5: Commit the profile model**

```bash
git add src/data/profile.ts src/data/profile.test.ts
git commit -m "feat: add typed profile atlas content"
```

---

### Task 2: Profile-only Systems Atlas homepage

**Files:**
- Create: `src/components/ProfileMap.astro`
- Create: `src/components/SkillsSection.astro`
- Create: `src/components/BackgroundSection.astro`
- Create: `src/components/LearningsSection.astro`
- Create: `src/components/TargetSection.astro`
- Modify: `src/pages/index.astro`
- Replace: `src/styles/global.css`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Consumes: `profileStations`, `skillGroups`, `backgroundItems`, `learningItems`, and `targetProfile`
- Produces: anchor IDs `skills`, `background`, `learnings`, `target`, and `contact`
- Produces: `[data-profile-map]`, `[data-station]`, and decorative `[data-route]` hooks
- The map remains meaningful through its semantic station-link list when SVG/CSS is unavailable

- [ ] **Step 1: Replace the homepage browser assertion with a failing profile-only contract**

Replace the existing three-entry `projects` fixture with the complete case-study route fixture, then rename its uses in the generated-route loop to `caseStudies`:

```ts
const caseStudies = [
  ['human-nutrition-unit', 'Human Nutrition Unit'],
  ['recipe-application', 'Recipe Application'],
  ['road-sign-detection', 'Road Sign Detection'],
  ['memory-map', 'Memory Map'],
] as const;
```

```ts
test('homepage presents Anson profile without a project showcase', async ({ page }) => {
  await page.goto('./');
  await expect(page.getByRole('heading', { name: 'Graduate Software Engineer' })).toBeVisible();

  const main = page.locator('main');
  for (const section of ['Skills', 'Background', 'Learnings', 'Target']) {
    await expect(main.getByRole('heading', { name: section, exact: true })).toBeVisible();
  }

  for (const [, projectTitle] of caseStudies) {
    await expect(main.getByText(projectTitle, { exact: true })).toHaveCount(0);
  }

  await expect(main.locator('[data-project-card], [data-filter]')).toHaveCount(0);
  await expect(main.locator('img[src*="hnu"], img[alt*="project" i]')).toHaveCount(0);

  await page.getByRole('navigation', { name: 'Profile map' }).getByRole('link', { name: /^Skills/ }).click();
  await expect(page).toHaveURL(/#skills$/);
  await expect(page.locator('#skills')).toBeInViewport();
});
```

- [ ] **Step 2: Run the focused browser test and verify the old homepage fails**

Run: `pnpm exec playwright test tests/portfolio.spec.ts -g "homepage presents"`

Expected: FAIL because the old homepage still renders project cards and lacks the four profile sections.

- [ ] **Step 3: Build `ProfileMap.astro` as semantic links plus authored SVG**

Use this structure; keep all copy outside the decorative SVG:

```astro
---
import { profileStations } from '../data/profile';
import { withBase } from '../utils/paths';
---

<section class="profile-map" aria-labelledby="profile-map-title" data-profile-map>
  <svg class="atlas-map" viewBox="0 0 1200 620" aria-hidden="true" focusable="false">
    <path data-route="cobalt" pathLength="1" d="M420 290 L560 120 L980 120" />
    <path data-route="green" pathLength="1" d="M420 310 L680 310 L1020 310" />
    <path data-route="orange" pathLength="1" d="M410 330 L560 500 L930 500" />
    <path data-route="black" pathLength="1" d="M390 340 L390 540 L720 540" />
  </svg>

  <div class="interchange-card">
    <p class="map-kicker">Auckland, New Zealand</p>
    <h1 id="profile-map-title">Graduate Software Engineer</h1>
    <p>I’m Anson Lin. I build dependable full-stack products and tested systems.</p>
    <div class="map-actions">
      <a class="action action-primary" href="#skills">Explore my profile</a>
      <a class="action" href={withBase('resume/Anson_Lin_Resume.pdf')}>Download resume</a>
    </div>
  </div>

  <nav class="station-list" aria-label="Profile map">
    {profileStations.map((station) => (
      <a class={`station station-${station.route}`} data-station={station.id} href={`#${station.id}`}>
        <span>{station.label}</span>
        <small>{station.summary}</small>
      </a>
    ))}
  </nav>
</section>
```

- [ ] **Step 4: Build the four focused section components**

Each component imports only its own typed data, emits one `<section id="…">`, and uses route-role classes. Example for Skills:

```astro
---
import { skillGroups } from '../data/profile';
---
<section id="skills" class="profile-section route-cobalt" aria-labelledby="skills-title">
  <header class="section-sign">
    <span aria-hidden="true">01</span>
    <div><p>Profile route</p><h2 id="skills-title">Skills</h2></div>
  </header>
  <div class="skills-list">
    {skillGroups.map((group) => (
      <article>
        <h3>{group.title}</h3>
        <ul>{group.items.map((item) => <li>{item}</li>)}</ul>
      </article>
    ))}
  </div>
</section>
```

Implement the other sections with the same sign/header grammar and these exact data mappings:

```astro
<!-- BackgroundSection.astro body -->
<section id="background" class="profile-section route-green" aria-labelledby="background-title">
  <header class="section-sign"><span aria-hidden="true">02</span><div><p>Profile route</p><h2 id="background-title">Background</h2></div></header>
  <ol class="background-list">
    {backgroundItems.map((item) => <li><p>{item.meta}</p><h3>{item.title}</h3><p>{item.summary}</p></li>)}
  </ol>
</section>

<!-- LearningsSection.astro body -->
<section id="learnings" class="profile-section route-orange" aria-labelledby="learnings-title">
  <header class="section-sign"><span aria-hidden="true">03</span><div><p>Profile route</p><h2 id="learnings-title">Learnings</h2></div></header>
  <ol class="learning-list">
    {learningItems.map((item, index) => <li><span>{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.summary}</p></div></li>)}
  </ol>
</section>

<!-- TargetSection.astro body -->
<section id="target" class="profile-section route-black" aria-labelledby="target-title">
  <header class="section-sign"><span aria-hidden="true">04</span><div><p>Profile route</p><h2 id="target-title">Target</h2></div></header>
  <div class="target-copy"><p class="eyebrow">{targetProfile.location}</p><h3>{targetProfile.heading}</h3><p>{targetProfile.summary}</p><div class="map-actions"><a class="action action-primary" href="#contact">Start a conversation</a><a class="action" href={withBase('resume/Anson_Lin_Resume.pdf')}>Resume</a></div></div>
</section>
```

Each file adds the imports matching the identifiers it consumes; `TargetSection.astro` also imports `withBase`.

- [ ] **Step 5: Replace the homepage composition**

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
import Header from '../components/Header.astro';
import ProfileMap from '../components/ProfileMap.astro';
import SkillsSection from '../components/SkillsSection.astro';
import BackgroundSection from '../components/BackgroundSection.astro';
import LearningsSection from '../components/LearningsSection.astro';
import TargetSection from '../components/TargetSection.astro';
import Contact from '../components/Contact.astro';
import { personJsonLd } from '../utils/seo';
---
<BaseLayout structuredData={personJsonLd} bodyClass="home-page">
  <Header />
  <main id="main">
    <ProfileMap />
    <SkillsSection />
    <BackgroundSection />
    <LearningsSection />
    <TargetSection />
    <Contact />
  </main>
  <footer>© 2026 Anson Lin · Built with Astro</footer>
</BaseLayout>
```

- [ ] **Step 6: Replace the dark pixel stylesheet with the Systems Atlas foundation**

Define these durable tokens and selectors in `global.css`:

```css
:root {
  color-scheme: light;
  --paper: #f7f6f1;
  --ink: #11120f;
  --muted: #5d625c;
  --line: #cfd3cd;
  --cobalt: #104fd6;
  --green: #079447;
  --orange: #f35a0a;
  --display: "Arial Narrow", "Roboto Condensed", "Helvetica Neue", sans-serif;
  --body: "Segoe UI", Arial, sans-serif;
}

html { scroll-behavior: smooth; background: var(--paper); }
body { margin: 0; color: var(--ink); background: var(--paper); font-family: var(--body); }
.profile-map { position: relative; min-height: min(760px, calc(100vh - 72px)); overflow: clip; }
.atlas-map { position: absolute; inset: 0; width: 100%; height: 100%; }
.atlas-map path { fill: none; stroke-width: 10; stroke-linecap: round; stroke-linejoin: round; }
[data-route="cobalt"] { stroke: var(--cobalt); }
[data-route="green"] { stroke: var(--green); }
[data-route="orange"] { stroke: var(--orange); }
[data-route="black"] { stroke: var(--ink); }
.interchange-card, .station { position: absolute; z-index: 1; }
.station { min-height: 48px; display: grid; text-decoration: none; border: 2px solid currentColor; background: var(--paper); }
.profile-section { position: relative; padding: clamp(5rem, 10vw, 10rem) max(1rem, calc((100% - 1180px) / 2)); border-top: 1px solid var(--line); }
@media (max-width: 760px) {
  .profile-map { min-height: auto; padding: 4rem 1rem; }
  .atlas-map { display: none; }
  .interchange-card, .station { position: static; }
  .station-list { display: grid; gap: 0; border-left: 8px solid var(--cobalt); padding-left: 1rem; }
  .station { margin-block: .5rem; }
}
@media (prefers-reduced-motion: no-preference) {
  .atlas-map path { stroke-dasharray: 1; stroke-dashoffset: 1; animation: draw-route 900ms ease-out forwards; }
}
@keyframes draw-route { to { stroke-dashoffset: 0; } }
```

Use these desktop anchors so the interchange and four destinations keep the approved diagonal rhythm:

```css
.profile-map {
  background-image:
    linear-gradient(rgb(17 18 15 / 5%) 1px, transparent 1px),
    linear-gradient(90deg, rgb(17 18 15 / 5%) 1px, transparent 1px);
  background-size: 32px 32px;
}
.interchange-card { left: 7%; top: 31%; width: min(34rem, 42vw); }
.station[data-station="skills"] { left: 69%; top: 12%; }
.station[data-station="background"] { left: 75%; top: 43%; }
.station[data-station="learnings"] { left: 64%; top: 73%; }
.station[data-station="target"] { left: 32%; top: 78%; }
.station:focus-visible, .action:focus-visible, .case-menu summary:focus-visible {
  outline: 4px solid var(--cobalt);
  outline-offset: 4px;
}
```

Give `.section-sign::before` an 8px route-colored continuation line, set every interactive target to at least 44×44px, use `clamp(2.75rem, 7vw, 7rem)` for the display heading, and keep paragraph lines below 70 characters. Do not use pixel borders, particle canvases, glass panels, generic card grids, or dark-mode leftovers.

- [ ] **Step 7: Run homepage, unit, and static checks**

Run: `pnpm exec playwright test tests/portfolio.spec.ts -g "homepage presents" && pnpm run test:unit && pnpm run check`

Expected: PASS; `main` contains the four profile sections and zero project showcase elements.

- [ ] **Step 8: Commit the homepage**

```bash
git add src/components/ProfileMap.astro src/components/SkillsSection.astro src/components/BackgroundSection.astro src/components/LearningsSection.astro src/components/TargetSection.astro src/pages/index.astro src/styles/global.css tests/portfolio.spec.ts
git commit -m "feat: rebuild homepage as profile systems atlas"
```

---

### Task 3: Global case-study navigation and progressive enhancement

**Files:**
- Create: `src/components/CaseStudyMenu.astro`
- Modify: `src/components/Header.astro`
- Modify: `src/components/CommandPalette.astro`
- Modify: `src/layouts/BaseLayout.astro`
- Modify: `src/styles/global.css`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- `CaseStudyMenu.astro` consumes `projects` and produces links to every project slug route
- Header exposes `Open navigation`, `Case studies`, and `Open command palette`
- Command palette exposes the five homepage destinations plus every project route
- Client enhancement removes obsolete project filtering and particle-canvas code

- [ ] **Step 1: Write failing navigation tests**

Retain the complete `caseStudies` fixture created in Task 2 and use it in the homepage, generated-route, and navigation assertions.

```ts
test('global navigation exposes case studies without putting them in homepage main', async ({ page }) => {
  await page.goto('./');
  const header = page.getByRole('banner');
  const menu = header.getByText('Case studies', { exact: true });
  await menu.click();
  for (const [slug, title] of caseStudies) {
    await expect(header.getByRole('link', { name: title, exact: true })).toHaveAttribute(
      'href',
      new RegExp(`/Personal-Website/projects/${slug}/$`),
    );
    await expect(page.locator('main').getByText(title, { exact: true })).toHaveCount(0);
  }
});

test('case-study navigation is available without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('http://localhost:4321/Personal-Website/');
  await page.getByText('Case studies', { exact: true }).click();
  await expect(page.getByRole('link', { name: 'Human Nutrition Unit', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Skills', exact: true })).toBeVisible();
  await context.close();
});

test('case-study disclosure and command palette expose every route by keyboard', async ({ page }) => {
  await page.goto('./');
  const summary = page.getByText('Case studies', { exact: true });
  await summary.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('banner').getByRole('link', { name: 'Memory Map', exact: true })).toBeVisible();

  await page.getByRole('button', { name: 'Open command palette' }).click();
  const palette = page.getByRole('dialog', { name: /command palette/i });
  for (const [slug, title] of caseStudies) {
    await expect(palette.getByRole('link', { name: title, exact: true })).toHaveAttribute(
      'href',
      new RegExp(`/Personal-Website/projects/${slug}/$`),
    );
  }
});
```

- [ ] **Step 2: Run the tests and verify navigation is missing**

Run: `pnpm exec playwright test tests/portfolio.spec.ts -g "case studies|case-study navigation"`

Expected: FAIL because the old header has no case-study disclosure and the no-JavaScript homepage still uses the old content.

- [ ] **Step 3: Implement an accessible disclosure menu**

```astro
---
import { projects } from '../data/projects';
import { withBase } from '../utils/paths';
---
<details class="case-menu" data-case-menu>
  <summary>Case studies</summary>
  <div class="case-menu-panel">
    {projects.map((project, index) => (
      <a href={withBase(`projects/${project.slug}/`)}>
        <span>{String(index + 1).padStart(2, '0')}</span>
        {project.title}
      </a>
    ))}
  </div>
</details>
```

Use `<details>` so the links work without JavaScript. In `Header.astro`, replace About/Work/Capabilities/Journey with Home, Skills, Background, Learnings, Target, `CaseStudyMenu`, Contact, and Resume. On case-study routes, the hash links continue to use `withBase('#skills')`-style root URLs.

- [ ] **Step 4: Update the command palette data**

Render links for Skills, Background, Learnings, Target, Contact, then a labelled Case studies group from `projects`. Map each project to `withBase(\`projects/${project.slug}/\`)`; map each homepage destination to `withBase(\`#${item.id}\`)` so those links also work from project routes.

- [ ] **Step 5: Refactor BaseLayout enhancement code**

Remove `[data-filter]` handling and all `[data-background-canvas]` animation. Keep mobile-nav, clipboard, reveal, and palette behavior. Add:

```js
const caseMenus = [...document.querySelectorAll('[data-case-menu]')];
const closeCaseMenus = () => caseMenus.forEach((menu) => menu.removeAttribute('open'));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeCaseMenus();
  }
});

document.addEventListener('click', (event) => {
  caseMenus.forEach((menu) => {
    if (!menu.contains(event.target)) menu.removeAttribute('open');
  });
});
```

Palette filtering must hide nonmatching links as the user types, keep the first visible link active, and treat ArrowUp/ArrowDown/Enter only among visible links. Closing the palette restores focus to `[data-command]`.

Update the existing mobile-navigation selection assertion from `Work` to `Skills`. Update the case-page command-palette assertion from `/Personal-Website/#work` to `/Personal-Website/#skills`. Delete the old project-filter assertion because the no-JavaScript disclosure test above replaces it.

- [ ] **Step 6: Style navigation in the Systems Atlas grammar**

Use a 72px light header with a black circular interchange mark, condensed labels, a yellow-free neutral Case studies disclosure, and route-color focus/active indicators. The mobile menu becomes one vertical decision list; the disclosure panel remains inside it and never exceeds the viewport width.

- [ ] **Step 7: Run navigation and regression checks**

Run: `pnpm exec playwright test tests/portfolio.spec.ts -g "navigation|command palette|without JavaScript" && pnpm run check`

Expected: PASS with project routes discoverable globally and absent from homepage `main`.

- [ ] **Step 8: Commit navigation**

```bash
git add src/components/CaseStudyMenu.astro src/components/Header.astro src/components/CommandPalette.astro src/layouts/BaseLayout.astro src/styles/global.css tests/portfolio.spec.ts
git commit -m "feat: add global case study navigation"
```

---

### Task 4: Systems Atlas case-study and 404 routes

**Files:**
- Modify: `src/pages/projects/[slug].astro`
- Modify: `src/components/ArchitectureFlow.astro`
- Modify: `src/components/Contact.astro`
- Modify: `src/pages/404.astro`
- Modify: `src/styles/global.css`
- Test: `tests/portfolio.spec.ts`

**Interfaces:**
- Case sections expose IDs `context`, `delivery`, `architecture`, `confidence`, and `reflection`
- `case-progress` links to those IDs in reading order
- Verified HNU media remains the only case-study screenshot
- Related-project links remain confined to case-study routes

- [ ] **Step 1: Add failing case-study structure tests**

```ts
test('case studies use the route progress spine and retain verified evidence', async ({ page }) => {
  await page.goto('projects/human-nutrition-unit/');
  const progress = page.getByRole('navigation', { name: 'Case study progress' });
  for (const label of ['Context', 'Delivery', 'Architecture', 'Confidence', 'Reflection']) {
    await expect(progress.getByRole('link', { name: label, exact: true })).toBeVisible();
  }
  await expect(page.locator('img[src="/Personal-Website/images/hnu-homepage.png"]')).toBeVisible();
  await expect(page.getByRole('link', { name: /profile map/i })).toHaveAttribute('href', '/Personal-Website/');
});
```

- [ ] **Step 2: Run the focused case test and verify the progress spine is missing**

Run: `pnpm exec playwright test tests/portfolio.spec.ts -g "route progress spine"`

Expected: FAIL because the current case template has no labelled progress navigation.

- [ ] **Step 3: Recompose the case template without changing project facts**

Add this progress navigation before the content sections:

```astro
<nav class="case-progress" aria-label="Case study progress">
  {[
    ['context', 'Context'],
    ['delivery', 'Delivery'],
    ['architecture', 'Architecture'],
    ['confidence', 'Confidence'],
    ['reflection', 'Reflection'],
  ].map(([id, label], index) => (
    <a href={`#${id}`}><span>{String(index + 1).padStart(2, '0')}</span>{label}</a>
  ))}
</nav>
```

Give the five existing sections matching IDs and keep every value sourced from `project`. Replace `← Back to work` with `← Profile map` linked to `withBase('/')`. Keep the HNU screenshot unchanged, keep Road Sign's `Conceptual pipeline` label, and keep `rel="noopener noreferrer"` on external links.

- [ ] **Step 4: Restyle architecture, related links, contact, and the 404 page**

`ArchitectureFlow.astro` becomes a numbered transfer route with visible ordered-list semantics. Related project links render as destination signs inside the case page only. Contact becomes the terminal station with email, clipboard status, GitHub, LinkedIn, and resume. The 404 route uses the label `404 / Station not found`, a short explanation, and a `Return to profile map` action.

- [ ] **Step 5: Add calm case-reading CSS**

Use an 1180px page container, a 720px primary reading column, a sticky desktop progress spine that becomes a horizontal overflow-safe strip below 900px, large wayfinding section numbers, and route-color accents derived from project order. Preserve normal document flow: `.case-hero { position: static; }`. Do not reuse the homepage's full map density inside prose sections.

- [ ] **Step 6: Run all case-route tests and static checks**

Run: `pnpm exec playwright test tests/portfolio.spec.ts -g "generated|case|HNU|Road Sign|metadata|stylesheet" && pnpm run check`

Expected: PASS for every generated route, verified media, metadata, base paths, normal flow, safe links, and related navigation.

- [ ] **Step 7: Commit case-study routes**

```bash
git add "src/pages/projects/[slug].astro" src/components/ArchitectureFlow.astro src/components/Contact.astro src/pages/404.astro src/styles/global.css tests/portfolio.spec.ts
git commit -m "feat: redesign case studies as atlas routes"
```

---

### Task 5: Responsive, accessibility, and production finish

**Files:**
- Delete: `src/components/PixelAvatar.astro`
- Delete: `src/components/ProjectCard.astro`
- Delete: `src/components/CapabilityGrid.astro`
- Delete: `src/components/Timeline.astro`
- Modify: `tests/portfolio.spec.ts`
- Modify: `README.md`
- Create at finish: `DESIGN.md`
- Create/update via Impeccable: homepage surface brief for `src/pages/index.astro`

**Interfaces:**
- No obsolete homepage component remains imported or shipped
- Route animation is decorative and reaches its final visible state under reduced motion or unsupported APIs
- `DESIGN.md` records the built system after the final correction, not the pre-build intention

- [ ] **Step 1: Replace obsolete interaction assertions with final accessibility tests**

```ts
for (const width of [320, 375, 390, 768, 1440]) {
  test(`homepage and case study have no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ['./', 'projects/recipe-application/']) {
      await page.goto(path);
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth)).toBe(true);
    }
  });
}

test('atlas respects reduced motion and remains complete', async ({ browser }) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('http://localhost:4321/Personal-Website/');
  await expect(page.locator('[data-station]')).toHaveCount(4);
  for (const route of await page.locator('[data-route]').all()) {
    await expect(route).toHaveCSS('animation-name', 'none');
  }
  await context.close();
});

test('homepage and representative case study have no serious axe violations', async ({ page }) => {
  for (const path of ['./', 'projects/human-nutrition-unit/']) {
    await page.goto(path);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter(({ impact }) => impact === 'serious' || impact === 'critical')).toEqual([]);
  }
});
```

- [ ] **Step 2: Delete retired components and confirm no references remain**

Run after deleting the four files:

```bash
rg -n "PixelAvatar|ProjectCard|CapabilityGrid|Timeline|data-project-card|data-filter|background-canvas" src tests
```

Expected: no output.

- [ ] **Step 3: Run the complete automated acceptance suite**

Run:

```bash
pnpm run test:unit
pnpm run check
pnpm run build
pnpm run test:e2e
pnpm run test:lighthouse
```

Expected: all commands pass; Lighthouse reports at least 95 in performance, accessibility, SEO, and best practices.

- [ ] **Step 4: Run one mechanical Impeccable detector pass**

Run exactly once after the UI is complete:

```bash
node C:/Users/anson/.agents/skills/impeccable/scripts/detect.mjs --json src/pages/index.astro "src/pages/projects/[slug].astro" src/components src/styles/global.css
```

Fix mechanical findings in one batch, rerun affected automated tests, and do not run the detector a second time.

- [ ] **Step 5: Capture and inspect the approved viewport set**

Capture valid full-page screenshots from document top after entrance motion settles:

- `.impeccable/review/desktop.png` at 1440×1000
- `.impeccable/review/mobile.png` at 390×844
- `.impeccable/review/case-desktop.png` at 1440×1000
- `.impeccable/review/case-mobile.png` at 390×844

Open every capture once. Compare the homepage first viewport beside `.impeccable/mocks/homepage-systems-atlas.png`, correcting the map's scale, route density, palette, typography silhouette, CTA prominence, and direct transition into Skills. Batch all corrections, then perform at most one confirmation capture round.

- [ ] **Step 6: Run the finish review in-thread**

Because no subagents were requested, load Impeccable's degraded finish-reviewer reference and perform a fresh in-thread review using the original request, approved design, detector findings, comp, and four screenshots. Act on `recapture`, `rebuild`, `fix`, or `ship` exactly as the reference requires; do not self-certify beyond the returned disposition.

- [ ] **Step 7: Record the built design system after final corrections**

Load Impeccable's degraded documenter reference and create `DESIGN.md` from the shipped implementation. Record palette tokens, typography roles, map/station grammar, responsive transformation, interaction/motion rules, case-study reading mode, and accessibility constraints. Create `tmp/homepage-surface-brief.md` with this exact body:

```md
Mode: Experience
Audience: Software-engineering recruiters and hiring teams
Page job: Introduce Anson through Skills, Background, Learnings, Target, and Contact
Homepage boundary: No project showcase content inside main
Primary route: Skills -> Background -> Learnings -> Target
Visual reference: .impeccable/mocks/homepage-systems-atlas.png
Project discovery: Global Case studies disclosure links to individual case-study routes
```

Then write the homepage surface brief through:

```bash
node C:/Users/anson/.agents/skills/impeccable/scripts/surface-brief.mjs write src/pages/index.astro tmp/homepage-surface-brief.md
```

The brief records Experience mode, recruiter audience, the profile-only homepage boundary, the four-station route, approved comp path, and case-study navigation constraint.

- [ ] **Step 8: Update README and rerun final source checks**

Document profile content ownership in `src/data/profile.ts`, project content ownership in `src/data/projects.ts`, the Systems Atlas architecture, and unchanged GitHub Pages deployment commands.

Run: `pnpm run test:unit && pnpm run check && pnpm run build`

Expected: PASS after documentation and final design recording.

- [ ] **Step 9: Commit the verified redesign**

```bash
git add src tests README.md DESIGN.md .impeccable
git commit -m "feat: complete systems atlas portfolio redesign"
```
