---
phase: 05-field-atlas
plan: "01"
subsystem: css
tags: [css, atlas, field-atlas, layout, typography, responsive]

dependency_graph:
  requires:
    - 04-theme-foundation/04-01 (astro-themes.css token definitions)
    - 04-theme-foundation/04-02 (astro-head.html include setup)
  provides:
    - assets/css/astro-atlas.css (all Field Atlas layout and typography CSS)
    - _includes/astro-head.html (updated with atlas CSS link)
  affects:
    - astrophotography.html listing page (consumes .al-listing classes)
    - _layouts/astro-workflow.html post page (consumes .db-wrap classes)

tech_stack:
  added: []
  patterns:
    - CSS custom property scoping under html.theme-atlas
    - Cartographic grid overlay via pseudo-elements (::before, ::after)
    - CSS Grid for two-column listing and post layouts
    - Responsive column collapsing at 768px breakpoint
    - Paper grain effect via radial-gradient mix-blend-mode multiply

key_files:
  created:
    - assets/css/astro-atlas.css
  modified:
    - _includes/astro-head.html

decisions:
  - Used pseudo-elements (::before, ::after) on .al-listing for grid/grain overlays — avoids requiring extra DOM children
  - Scoped .db-atlas-chart .al-chart-corner rules instead of redefining corner bracket classes — DRY, reuses listing chart pattern
  - Set .db-wrap > * { position: relative; z-index: 1 } to lift content above grid pseudo-element without stacking context leaks

metrics:
  duration: "~15 minutes"
  completed: "2026-05-20T05:12:48Z"
  tasks_completed: 2
  tasks_total: 2
  files_created: 1
  files_modified: 1
---

# Phase 5 Plan 01: Field Atlas CSS Foundation Summary

**One-liner:** Cartographic cream-paper CSS with Italiana display type, atlas-index grid table, two-column chart/prose post layout, all scoped under `html.theme-atlas`.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create assets/css/astro-atlas.css | 2fedde0 | assets/css/astro-atlas.css (created, 861 lines) |
| 2 | Wire astro-atlas.css into _includes/astro-head.html | c3b65cf | _includes/astro-head.html (1 line added) |

## What Was Built

`assets/css/astro-atlas.css` — 861-line CSS file with 14 rule groups (A–N), all scoped under `html.theme-atlas`:

- **A. Listing base:** `background: var(--paper)`, cartographic grid overlay (::before), paper grain (::after), content z-index stack
- **B. Listing ribbon:** top mono ribbon with dot marker, flex layout
- **C. Listing header:** Italiana display title (`clamp(64px,8vw,120px)`), Spectral italic lede, mono kicker
- **D. Atlas index table:** 7-column CSS Grid (`36px 1fr 1.6fr 78px 70px 56px 28px`), burnt-sienna designation, hover row highlight
- **E. Chart plate:** coordinate chart frame, grid lines, star scatter dots, crosshair markers with ring + label, corner brackets, compass
- **F. Listing folio:** bottom mono strip with border-top rule
- **G. Post base + ribbon:** matching cartographic grid, atlas-palette ribbon with back-link
- **H. Post two-column grid:** `1.05fr 1fr` layout with 70px gap, `align-items: start`
- **I. Post chart plate:** 380px frame, coordinate grid, SVG slot, RA/Dec callouts, scale bar
- **J. Acquisition ledger:** mono table with all-caps `--ink-sub` keys, right-aligned values, `--rule` row borders
- **K. Prose column:** Spectral 14px/1.7, sidenote blocks in JetBrains Mono, pipeline flow indicator
- **L. Post folio:** matching bottom strip
- **M. Night-chrome overrides:** hides `.db-bg`/`.db-scene-bg`/`.al-scene-bg`; resets `.db-corner-panel`; sets existing structural elements to `background: transparent`
- **N. Mobile responsive:** column stack at 768px, compressed chart heights, Bortle/Type column hiding, ribbon wrap

`_includes/astro-head.html` — added one `<link>` tag for `astro-atlas.css` after `astro-themes.css` (correct cascade order: tokens before layout rules).

## Verification Results

```
grep -c "html.theme-atlas" assets/css/astro-atlas.css  → 128  (required: > 10) PASS
grep -c ":root" assets/css/astro-atlas.css             → 0    (required: 0)    PASS
wc -l assets/css/astro-atlas.css                       → 861  (required: 200+) PASS
grep "astro-atlas.css" _includes/astro-head.html       → 1 match              PASS
```

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. This plan creates CSS only — no data sources or conditional rendering. Plans 05-02 and 05-03 add the HTML markup that activates these styles.

## Threat Flags

None. Static CSS file, no user input, served via GitHub Pages over HTTPS.

## Self-Check: PASSED

- [x] `assets/css/astro-atlas.css` exists at WT_ROOT
- [x] `_includes/astro-head.html` contains `astro-atlas.css` link
- [x] Commits 2fedde0 and c3b65cf verified in git log
- [x] 128 `html.theme-atlas` scoped rules, 0 `:root` declarations
