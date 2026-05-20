# Phase 5: Field Atlas - Context

**Gathered:** 2026-05-20
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the complete Field Atlas light theme for both astrophotography pages (`astrophotography.html` listing and `_layouts/astro-workflow.html` post). Under `html.theme-atlas`, both pages adopt the cartographic cream aesthetic from the design prototype: cream paper background with grid overlay, Italiana display font, atlas-index table listing with RA/Dec SVG chart, and two-column chart/ledger + prose/sidenotes post layout. All existing `page.*` front-matter variables continue to work unchanged.

</domain>

<decisions>
## Implementation Decisions

### Field Atlas Listing Layout
- Full cartographic rewrite under `html.theme-atlas .al-listing`: cream background (`var(--paper)`), cartographic grid overlay, Italiana display title, atlas-index table with №/Designation/Target/Integration/Bortle/Type columns
- Include simplified SVG RA/Dec coordinate chart on listing page right side, using Jekyll session data for target markers
- Session rows use `atlas-index .row` pattern: designation in `var(--accent)` burnt sienna, target name in `var(--serif)`
- Top ribbon pattern: small mono ribbon with `← Portfolio` link and `PLATE I · CONTENTS` label — replaces current `.al-mission-bar`

### Field Atlas Post Layout
- Two-column layout: left column = SVG chart plate + acquisition ledger table; right column = prose + sidenotes
- SVG chart plate: styled region map for the target with coordinate callouts (RA/Dec from `page.target`), falls back to abstract SVG when no hero_image
- If `page.hero_image` is set, display it inside the chart frame (replacing the SVG placeholder)
- Image variant tabs (final/starless/B&W) remain — already conditional from Phase 4
- Acquisition data: mono ledger table with `--ink-sub` all-caps keys, right-aligned values (matching `atlas-kicker` table pattern)
- Prose: `var(--serif)` Spectral at 14px/1.7, sidenotes for gear/pipeline in `var(--mono)` JetBrains Mono

### CSS Scoping and Jekyll Integration
- New file `assets/css/astro-atlas.css` — loaded via `_includes/astro-head.html` alongside `astro-themes.css`
- All atlas rules scoped under `html.theme-atlas .al-listing` (listing) and `html.theme-atlas .db-wrap` (post) — uses existing structural class names
- Existing `page.*` variables used as-is: `page.target`, `page.capture.*`, `page.hero_image`, `page.starless_image`, `page.bw_image`, `page.constellation`, `page.object_type`
- Mobile responsive: both columns stack at 768px with atlas ribbon remaining at top

### Claude's Discretion
- Exact SVG design for the coordinate chart markers and grid lines (follow `concept-atlas.jsx` from `/tmp/astro-blog-post/project/concept-atlas.jsx` as the template)
- Bottom folio strip content (e.g., `Khoje · field atlas · vol. 1`, page number, CC license)
- Exact atlas-index column widths and spacing
- Specific paper grain CSS effect implementation

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `html.theme-atlas` / `html.theme-night` CSS custom properties already defined in `assets/css/astro-themes.css` (Phase 4)
- `_includes/astro-head.html` already loads `astro-themes.css` and all 6 Google Fonts — just add `astro-atlas.css` link here
- Existing `.al-listing` class on listing page wrapper — scope atlas rules under it
- Existing `.db-wrap` class on post layout wrapper — scope atlas rules under it
- `page.target`, `page.capture.*`, `page.hero_image`, `page.constellation`, `page.object_type` — all available in front matter

### Established Patterns
- CSS scoped under theme class on `<html>` element: `html.theme-atlas .class-name { ... }`
- Liquid iteration: `{% assign astro_posts = site.posts | where: "layout", "astro-workflow" | sort: "date" | reverse %}`
- Jekyll relative_url filter for image paths: `{{ page.hero_image | relative_url }}`
- 2-space indentation in HTML, Liquid, YAML, CSS (per CLAUDE.md)
- `kebab-case` CSS class names

### Integration Points
- `_includes/astro-head.html` — add `<link rel="stylesheet" href="{{ '/assets/css/astro-atlas.css' | relative_url }}" />`
- `astrophotography.html` — add atlas-specific HTML markup inside the existing `.al-listing` wrapper, conditioned on nothing (always rendered, styled by theme class)
- `_layouts/astro-workflow.html` — add atlas-specific two-column HTML inside `.db-wrap`, styled by theme class
- Design reference: `/tmp/astro-blog-post/project/concept-atlas.jsx` and `refresh.css`

</code_context>

<specifics>
## Specific Ideas

- Listing atlas-index table structure from `concept-atlas.jsx`: 7-column grid (`36px 1fr 1.6fr 78px 70px 56px 28px`), session number in `--ink-sub`, designation in `--accent` font-weight 500, target name in `--serif` 16px, meta columns in `--mono` 11px
- Listing RA/Dec chart: SVG coordinate grid with crosshair markers and labeled data-src text (matching `chart-marker .cross` + `.ring` + `.lbl` pattern from refresh.css)
- Listing ribbon: `<div class="al-ribbon">` with left side showing `● CK · STATION SUNNYVALE`, `37.37° N · 122.04° W`, `BORTLE 7–8` and right showing `PLATE I · CONTENTS`
- Post chart plate: SVG with `radialGradient id="atlas-ha"` for the nebula impression, Alnitak star crosshair, horsehead silhouette in dark fill — matching `AtlasPost` left column from concept-atlas.jsx
- Post acquisition ledger: `<table>` with `<tbody>`, rows for dates/sub-exposures/registered/rejected/filter/sensor etc., `--mono` 11.5px, `border-bottom: 1px solid var(--rule)`
- Post prose sidenotes: `<div>` blocks with `var(--mono)` 10.5px `↳ Apparatus`, `↳ Pipeline` headings in `var(--accent)`
- Bottom folio strip: `position: absolute; bottom: 16px` with `border-top: 1px solid var(--ink)`, three columns of mono text

</specifics>

<deferred>
## Deferred Ideas

- Before/after image slider — out of scope for v1.1
- Vintage/retro third theme — not requested for this milestone
- JavaScript interactivity on the coordinate chart (hover to highlight, click to navigate) — deferred

</deferred>
