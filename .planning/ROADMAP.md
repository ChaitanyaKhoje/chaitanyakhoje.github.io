# Roadmap: Astrophotography Dual-Theme Redesign

**Milestone:** v1.1
**Goal:** Replace the astrophotography listing and post pages with two distinct themes — "Field Atlas" (light) and "After Dark" (dark) — faithfully translated from the Claude Design prototypes, served from the same Jekyll templates with a theme toggle persisted in localStorage.

## Phases

- [x] **Phase 4: Theme Foundation** — Design tokens, font loading, CSS custom properties, and theme toggle mechanism with prefers-color-scheme + localStorage (completed 2026-05-20)
- [x] **Phase 5: Field Atlas** — Light theme listing and post layouts: cartographic cream aesthetic, Italiana display font, atlas index table, two-column post layout (completed 2026-05-20)
- [x] **Phase 6: After Dark** — Dark theme listing and post layouts: cinematic near-black aesthetic, Newsreader italic display, feed-row listing, full-bleed hero post layout (completed 2026-05-20)

## Phase Details

### Phase 4: Theme Foundation
**Goal**: The theme switching system is in place — both themes can be activated via prefers-color-scheme or manual toggle, the choice persists across page loads, and all required fonts are loaded
**Depends on**: Nothing (first phase of v1.1)
**Requirements**: THEME-01, THEME-02, THEME-03, JEKYLL-03, JEKYLL-04
**Success Criteria** (what must be TRUE):
  1. Visiting an astrophotography page on a device set to dark mode shows After Dark; a device set to light mode shows Field Atlas
  2. Clicking the theme toggle button switches the active theme immediately and persists the choice — a page reload shows the same theme
  3. Navigating to the homepage or a writing post after toggling shows no theme change on those pages
  4. All six Google Fonts (Italiana, Newsreader, Spectral, Manrope, Space Grotesk, JetBrains Mono) load without layout shift or build errors
  5. The implementation uses only CSS custom properties + vanilla JS — no React or JS framework is present in the built output
**Plans**: 2 plans
Plans:
**Wave 1**
- [x] 04-01-PLAN.md — Create astro-themes.css with .theme-atlas and .theme-night CSS custom property token blocks

**Wave 2** *(blocked on Wave 1 completion)*
- [x] 04-02-PLAN.md — Add font loading, astro-themes.css link, FOUC-prevention script, and theme toggle button to astrophotography.html and _layouts/astro-workflow.html
**UI hint**: yes

### Phase 5: Field Atlas
**Goal**: The astrophotography listing and post pages render the complete Field Atlas light theme — cream paper background, cartographic grid, atlas index table on the listing, and two-column chart/prose layout on posts
**Depends on**: Phase 4
**Requirements**: ATLAS-01, ATLAS-02, ATLAS-03, ATLAS-04, ATLAS-05, ATLAS-06, JEKYLL-01, JEKYLL-02
**Success Criteria** (what must be TRUE):
  1. The listing page shows a cream/warm-paper background with a cartographic grid overlay, Italiana display title, JetBrains Mono kicker, and an atlas index table with RA/Dec chart placeholder
  2. Each row in the atlas index table shows session number, designation (burnt-sienna accent), target name, integration, Bortle, and type — clicking the row navigates to the correct post
  3. The post page renders a two-column layout: chart/ledger plate on the left, prose and sidenotes on the right
  4. The post hero shows the styled chart plate (hero_image when provided, SVG fallback otherwise) and acquisition details appear as a mono ledger table below it
  5. The listing correctly enumerates all posts with layout: astro-workflow and all page.* front-matter variables (target, capture.integration, capture.frames, capture.bortle, hero_image) populate both columns of the post layout
**Plans**: 3 plans
Plans:
**Wave 1**
- [x] 05-01-PLAN.md — Create assets/css/astro-atlas.css with all Field Atlas listing + post CSS; wire into _includes/astro-head.html

**Wave 2** *(blocked on Wave 1 completion)*
- [x] 05-02-PLAN.md — Update astrophotography.html with atlas ribbon, atlas-index table, and SVG coordinate chart
- [x] 05-03-PLAN.md — Update _layouts/astro-workflow.html with atlas two-column post layout (chart plate, acquisition ledger, sidenotes)
**UI hint**: yes

### Phase 6: After Dark
**Goal**: The astrophotography listing and post pages render the complete After Dark dark theme — cinematic near-black background, warm-gold accent, feed-row listing with thumbnails, and wide full-bleed hero on posts
**Depends on**: Phase 4
**Requirements**: NIGHT-01, NIGHT-02, NIGHT-03, NIGHT-04, NIGHT-05
**Success Criteria** (what must be TRUE):
  1. The listing page renders on near-black (#07080b) with warm-gold (#d4a76a) accent, shows "Khoje · after dark" italic brand in the mast, a large Newsreader italic display headline, and a mono stats row with sessions, integration, and subs counts
  2. Each feed-row entry shows the target thumbnail on the left and meta columns (name, date, integration, type) on the right — clicking navigates to the post
  3. The post page opens with a wide full-bleed cinematic image plate (hero_image when provided, SVG nebula fallback otherwise)
  4. The post body is a two-column grid: wide prose column on the left, side-notes and mono apparatus/pipeline notes on the right
  5. The mast is minimal — brand on the left, context nav on the right (Back / Index / Session N / Next) — and all navigation links resolve correctly
**Plans**: 3 plans
Plans:
**Wave 1**
- [x] 06-01-PLAN.md — Create assets/css/astro-night.css and wire it into _includes/astro-head.html

**Wave 2**
- [x] 06-02-PLAN.md — Update astrophotography.html with the After Dark listing shell
- [x] 06-03-PLAN.md — Update _layouts/astro-workflow.html with the After Dark post shell
**UI hint**: yes

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 4. Theme Foundation | 2/2 | Complete    | 2026-05-20 |
| 5. Field Atlas | 3/3 | Complete    | 2026-05-20 |
| 6. After Dark | 3/3 | Complete | 2026-05-20 |

---
*Roadmap created: 2026-05-19 — Milestone v1.1*
*Phase 4 plans created: 2026-05-19*
*Phase 5 plans created: 2026-05-20*
