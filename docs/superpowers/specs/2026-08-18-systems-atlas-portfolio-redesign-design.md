# Systems Atlas Portfolio Redesign

## Status

Approved direction with the user's final homepage boundary: the homepage maps Anson's profile and contains no project showcase. Project content remains on the individual case-study routes.

North-star comp: `.impeccable/mocks/homepage-systems-atlas.png`.

## Goal and Visitor Journey

The site should help a New Zealand graduate or junior software-engineering recruiter understand Anson within one scan, then choose whether to download the resume, make contact, or open a case study from global navigation.

The homepage is an Experience surface. Its route is:

1. Identify Anson, his role, location, and target.
2. Explore Skills, Background, Learnings, and Target through a connected profile map.
3. Reach Contact or download the resume.
4. Open a project case study only from the global Case studies navigation or from another case study.

No project title, screenshot, technology list, metric, card, filter, or showcase appears in the homepage body.

## Visual Direction

Systems Atlas uses contemporary civic wayfinding rather than the retired pixel identity. The page has an enamel off-white ground, carbon-black typography, and four functional route colors: cobalt for Skills, green for Background, international orange for Learnings, and black for Target. Condensed wayfinding display type handles destinations; a readable humanist sans handles body copy.

The first viewport is one map, not a conventional hero. Anson is the central interchange, with his name, role, Auckland location, one-line positioning, `Explore my profile`, and `Download resume`. Four routes terminate at the profile stations. The dominant motion is a single route draw from the interchange; all content is visible before animation and motion is disabled under reduced-motion preferences.

The comp is a spatial contract, not a bitmap implementation. The malformed generated Target label must be corrected. Text, controls, icons, stations, and routes are semantic HTML, CSS, and authored SVG.

## Homepage Information Architecture

- **Header:** Home; Skills; Background; Learnings; Target; an accessible Case studies disclosure listing all generated project routes; Contact. The disclosure works without JavaScript and becomes part of the mobile navigation.
- **Profile map:** Four station links scroll to the matching sections. A semantic station list remains understandable if SVG or JavaScript is unavailable.
- **Skills:** Resume-grounded groups for Backend, Frontend, Testing and quality, Deployment and tools, and Data and ML. Use concise capability statements without project cards or project titles.
- **Background:** University of Auckland BSc Computer Science and Woolworths Stock Assistant experience, presented as a short route timeline.
- **Learnings:** Three evidence-grounded working principles: clear boundaries improve maintainability, testing belongs in delivery, and collaboration requires explicit ownership and communication. These are reframed from the existing verified project and work facts, not new claims.
- **Target:** Graduate and junior software-engineering opportunities in Aotearoa New Zealand, with backend/full-stack as the lead and data/ML as supporting breadth.
- **Contact:** Email, copy-email status, GitHub, LinkedIn, and resume action. This is the terminal station and page close.

## Case Studies and Other Routes

The generated `/projects/[slug]/` routes remain the only place for project narratives, architecture, testing, deployment, lessons, links, and project media. They inherit the Systems Atlas identity but switch to a calmer reading layout: a route progress spine connects Context, Delivery, Architecture, Confidence, and Reflection. The verified Human Nutrition Unit image remains; no generated screenshot is presented as real evidence.

Related-project links remain at the end of each case study. The 404 page becomes a missing-station state. The command palette remains available and is updated to the new homepage sections plus case-study routes.

## Implementation Boundaries

- Add typed profile/navigation data separate from `projects.ts`; project facts continue to have one source of truth.
- Replace the homepage project filter/cards, capability grid, timeline shell, pixel avatar, and particle canvas with focused profile sections and an authored responsive route-map component.
- Keep the existing Astro static architecture, base-path helpers, metadata utilities, sitemap, resume asset, and GitHub Pages delivery.
- Keep content visible without JavaScript. Client code may enhance route drawing, active-station state, disclosures, command palette behavior, and clipboard status only.
- Preserve stable external-link safety, focus restoration, and error/fallback copy. Clipboard failure leaves the email selectable; unsupported animation APIs leave the final route state visible.

## Responsive and Accessibility Contract

- Desktop uses the approved map composition. Mobile converts it to a vertical route ordered Skills, Background, Learnings, Target; it must not shrink the desktop map into an unreadable canvas.
- All interactive stations are real links with visible focus, at least touch-sized targets, and descriptive accessible names.
- Decorative route geometry is hidden from assistive technology; headings and document order carry the same meaning independently.
- Support 320, 375, 390, 768, and 1440px without horizontal overflow.
- Maintain readable contrast, keyboard-only navigation, Escape/focus restoration for menus and palette, and no serious or critical axe violations.

## Verification

- Homepage tests assert all four profile stations and sections are present and no project card, project title, project screenshot, or filter appears in `main`.
- Navigation tests assert every case-study route remains reachable from the Case studies disclosure and command palette, including without JavaScript.
- Case-study tests preserve generated routes, verified media, metadata, base-path URLs, safe external links, related projects, and normal document flow.
- Interaction tests cover station scrolling, mobile navigation, disclosure keyboard behavior, command palette, email copy success/failure, and reduced-motion final states.
- Responsive tests cover 320, 375, 390, 768, and 1440px; automated accessibility checks reject serious or critical violations.
- Run Astro/TypeScript checks, unit tests, Playwright, production build, stable stylesheet/base-path assertions, and Lighthouse thresholds before delivery.

## Assumptions

- Existing resume and typed repository content remain the factual authority.
- The homepage may summarize skills and learnings but may not reference project names as supporting examples.
- Case studies remain globally discoverable even though they are absent from the homepage body.
- No new backend, CMS, analytics, tracking, or fabricated portfolio media is introduced.
