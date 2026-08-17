---
name: Systems Atlas Portfolio
description: A civic-wayfinding portfolio that maps Anson Lin's direction and engineering practice.
colors:
  route-cobalt: "#124fd4"
  route-green: "#078846"
  route-orange: "#e94f08"
  carbon: "#11120f"
  enamel-paper: "#f4f1e8"
  raised-paper: "#fffdf6"
  muted-ink: "#555c55"
  rule-line: "#c7cbc3"
typography:
  display:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(3.2rem, 6.4vw, 6rem)"
    fontWeight: 700
    lineHeight: 0.84
    letterSpacing: "-0.025em"
  headline:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "clamp(2.8rem, 6vw, 4.8rem)"
    fontWeight: 700
    lineHeight: 0.88
  body:
    fontFamily: "Source Sans 3, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Barlow Condensed, sans-serif"
    fontSize: "1rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.025em"
spacing:
  compact: "0.65rem"
  standard: "1rem"
  roomy: "1.5rem"
  section-min: "5.5rem"
components:
  action-primary:
    backgroundColor: "{colors.carbon}"
    textColor: "{colors.enamel-paper}"
    typography: "{typography.label}"
    padding: "0.65rem 1rem"
    height: "46px"
  station:
    backgroundColor: "{colors.raised-paper}"
    textColor: "{colors.carbon}"
    typography: "{typography.label}"
    padding: "0.7rem 0.9rem 0.75rem 1.15rem"
    height: "78px"
---

# Design System: Systems Atlas Portfolio

## Overview

**Creative North Star: "The Systems Atlas"**

The portfolio borrows the clarity and confidence of contemporary civic wayfinding. A warm enamel-paper field, compressed destination type, functional route colors, and connected station geometry turn personal positioning into a navigable system rather than a conventional marketing hero.

The system is direct, technical, and readable. Large headings establish destinations while Source Sans 3 carries evidence at comfortable line lengths. Project routes reduce the map into a calmer reading mode so the visual identity supports, rather than competes with, engineering detail.

**Key Characteristics:**

- Functional route colors with stable semantic roles.
- Condensed destination typography paired with humanist body copy.
- Square, bordered surfaces and authored wayfinding geometry.
- One expressive map surface; content pages remain quiet and linear.
- Progressive enhancement, visible focus, and reduced-motion support.

## Colors

The palette combines a warm public-information ground with high-contrast route colors that communicate structure, never decoration alone.

### Primary

- **Route Cobalt:** Skills, interactive emphasis, selected states, and visible focus.

### Secondary

- **Route Green:** Background and timeline markers.
- **International Orange:** Learnings, sequence markers, and directional arrows.

### Neutral

- **Carbon:** Primary text, black route, strong borders, and primary actions.
- **Enamel Paper:** Page ground and reversed text.
- **Raised Paper:** Cards, menus, media frames, and overlays.
- **Muted Ink:** Supporting copy and metadata.
- **Rule Line:** Quiet separators inside structured content.

**The Functional Color Rule.** Every route color names a destination or state; do not scatter accents decoratively.

**The Paper Ground Rule.** Enamel Paper is the default field. Raised Paper distinguishes bounded surfaces without changing the visual temperature.

## Typography

**Display Font:** Barlow Condensed (with sans-serif fallback)  
**Body Font:** Source Sans 3 (with sans-serif fallback)

**Character:** Barlow Condensed has the compressed authority of destination signage; Source Sans 3 keeps explanations open, contemporary, and easy to scan.

### Hierarchy

- **Display** (700, fluid to 6rem, 0.84 line-height): first-view destinations and case-study titles.
- **Headline** (700, fluid to 4.8rem, 0.88 line-height): major case sections and terminal states.
- **Title** (700, fluid from 1.65rem): stations, skill groups, and supporting destinations.
- **Body** (400, 1rem, 1.55 line-height): explanations, evidence, and supporting copy; keep long passages near 70 characters.
- **Label** (600, 1rem, slight positive tracking): navigation, actions, and compact wayfinding controls.

**The Destination Type Rule.** Condensed display type names places and actions; it does not replace body copy.

## Layout

The shared content width is capped at 1180px with at least 1rem of viewport breathing room. Major sections use generous fluid vertical padding, a numbered station sign, and a colored route stem. Case studies use a 13rem sticky progress spine beside a reading column no wider than 760px.

The homepage's two-axis 32px grid belongs only to the actual profile-map canvas. At widths below 900px, the SVG map gives way to a semantic vertical route and all desktop station offsets reset. Content grids progressively collapse at 899px and 560px; every surface must remain free of horizontal overflow from 320px upward.

**The Map Then Reading Rule.** Spatial composition introduces the profile; detailed content and case studies return to normal document flow.

## Elevation & Depth

The system is flat by default. Raised map cards, menus, media frames, and the command palette use diffuse carbon shadows to clarify overlap; content sections and mobile stations use borders and tonal separation instead.

### Shadow Vocabulary

- **Station lift** (`6px 8px 20px rgb(17 18 15 / 10%)`): desktop profile stations only.
- **Surface lift** (`12px 16px 34px rgb(17 18 15 / 12%)`): focal map card and verified case-study media.
- **Overlay lift** (`12px 18px 45px rgb(17 18 15 / 20%)`): command palette only.

**The Flat-by-Default Rule.** Use shadow only when a surface genuinely overlaps the map or document.

## Shapes

The form language is square and infrastructural: one-pixel rules, hard station rectangles, thick square-ended SVG routes, circular interchange markers, and clipped directional arrows. The circular monogram is the deliberate exception that identifies the person at the center of the system.

## Components

### Buttons

- **Shape:** Square with a one-pixel Carbon border and a minimum 46px target.
- **Primary:** Carbon field with Enamel Paper text and compact horizontal padding.
- **Hover / Focus:** Route Cobalt replaces Carbon on hover; a 4px Cobalt outline with 4px offset marks keyboard focus.
- **Secondary:** Paper field with Carbon text and border; it adopts the primary hover treatment.

### Cards / Containers

- **Corner Style:** Square.
- **Background:** Raised Paper over Enamel Paper.
- **Shadow Strategy:** Only overlapping desktop map, media, and overlay surfaces lift.
- **Border:** One-pixel Carbon for strong bounds; Rule Line for internal divisions.
- **Internal Padding:** Usually 1rem to 1.5rem, increasing only for the focal interchange.

### Inputs / Fields

- **Style:** Enamel Paper fill, one-pixel Carbon stroke, square corners, and a 48px minimum height.
- **Focus:** The shared 4px Cobalt focus outline.

### Navigation

Navigation uses Barlow Condensed at 600 weight with touch-sized targets. The Projects disclosure is a native `details` element so routes remain reachable without JavaScript. Below 900px, navigation stacks into a full-width Raised Paper panel; the command palette remains an optional enhancement.

### Profile Stations

Desktop stations are bounded Raised Paper destinations connected by authored SVG routes. On mobile they become full-width links along one vertical Cobalt route, preserving the reading order Skills, Background, Learnings, Target without shrinking the map.

### Case Progress Spine

The case-study spine links Context, Delivery, Architecture, Confidence, and Reflection. It stays sticky beside the article on desktop and becomes a horizontally scrollable strip on mobile.

## Do's and Don'ts

### Do:

- **Do** use route colors consistently: Cobalt for Skills and interaction, Green for Background, Orange for Learnings, and Carbon for Target.
- **Do** keep homepage profile facts in `profile.ts` and project evidence in `projects.ts`.
- **Do** preserve semantic links, native disclosures, visible focus, and readable content without client JavaScript.
- **Do** disable route drawing and reveal transitions under reduced-motion preferences.
- **Do** reserve the two-axis grid and connected route geometry for a genuine map surface.

### Don't:

- **Don't** place project showcases, project evidence, or case-study cards in the homepage body.
- **Don't** shrink the desktop map onto mobile; translate it into the ordered vertical route.
- **Don't** use gradients, rounded app-shell cards, or decorative accent colors that have no route meaning.
- **Don't** invent screenshots, metrics, employers, testimonials, or other credibility signals.
