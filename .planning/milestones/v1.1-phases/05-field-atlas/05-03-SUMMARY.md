---
phase: 05-field-atlas
plan: "03"
subsystem: ui
tags: [jekyll, liquid, field-atlas, post-layout, astrophotography]

requires:
  - phase: 04-theme-foundation
    provides: "html.theme-atlas/html.theme-night classes, theme toggle behavior, and shared astro theme tokens"
  - phase: 05-field-atlas/05-01
    provides: "Field Atlas post CSS classes consumed by this markup"
provides:
  - "Field Atlas post ribbon inside _layouts/astro-workflow.html"
  - "Two-column atlas post layout with chart plate, acquisition ledger, prose, sidenotes, and pipeline strip"
  - "Hero image or abstract SVG chart fallback inside the atlas chart frame"
  - "Atlas folio strip for post pages"
affects: [field-atlas, after-dark, astrophotography-posts]

tech-stack:
  added: []
  patterns:
    - "Theme-specific post markup is additive inside .db-wrap and controlled by theme-scoped CSS"
    - "Atlas and night layouts share the same markdown content through duplicated theme-specific containers"

key-files:
  created: []
  modified:
    - _layouts/astro-workflow.html

key-decisions:
  - "Kept all existing night-theme post sections intact and appended atlas sections inside .db-wrap."
  - "Rendered the full markdown body inside .db-atlas-prose so both themes use the same source content."

patterns-established:
  - "Atlas post layout sections live immediately before the .db-wrap closing tag."
  - "Capture ledger rows are conditional Liquid rows over page.capture.* fields."

requirements-completed: [ATLAS-04, ATLAS-05, ATLAS-06, JEKYLL-01]

duration: "~20 min"
completed: 2026-05-20T06:47:50Z
---

# Phase 5 Plan 03: Field Atlas Post Layout Summary

**Atlas post markup with chart plate, acquisition ledger, prose column, gear sidenotes, pipeline strip, and folio using existing page front matter.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-05-20T06:28:00Z
- **Completed:** 2026-05-20T06:47:50Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Added the Field Atlas post ribbon and two-column `.db-atlas-cols` section inside `_layouts/astro-workflow.html`.
- Added a chart plate that renders `page.hero_image` when present and falls back to an abstract SVG field otherwise.
- Added a conditional acquisition ledger from `page.capture.*`, the atlas prose column from `{{ content }}`, gear sidenotes, pipeline strip, and post folio.

## Task Commits

1. **Task 1: Add atlas ribbon and two-column post layout to _layouts/astro-workflow.html** - `30ea4b3` (feat)

## Files Created/Modified

- `_layouts/astro-workflow.html` - Added Field Atlas post markup before the closing `.db-wrap` tag.

## Decisions Made

- Preserved `.db-hero`, `.db-inline-toc`, `.db-body`, and `.db-sidebar` night-theme markup unchanged.
- Reused the existing no-copy image convention on the atlas chart image.

## Deviations from Plan

None - plan executed as written after the user selected re-execution from scratch. Existing prior Wave 2 commits were reverted non-destructively before this rebuild.

## Issues Encountered

- Initial Jekyll build failed under system Ruby 2.6 because the bundle requires Ruby 3.1+. Re-ran with the documented Homebrew Ruby 3.2 path and the build passed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

The post-side Field Atlas layout is ready for visual review. After verification, Phase 6 can implement the independent After Dark theme against the same front-matter contract.

## Verification Results

```bash
grep -c "db-atlas-cols\|db-atlas-ledger\|db-atlas-ribbon\|db-atlas-h1" _layouts/astro-workflow.html
# PASS: 7 matches

grep "page.capture" _layouts/astro-workflow.html
# PASS: page.capture fields populate the atlas ledger and existing night sidebar

grep "db-atlas-folio" _layouts/astro-workflow.html
# PASS: db-atlas-folio present

PATH=/opt/homebrew/opt/ruby@3.2/bin:$PATH bundle exec jekyll build
# PASS
```

## Self-Check: PASSED

- [x] `.db-atlas-ribbon` present with back link and plate label
- [x] `.db-atlas-cols` present
- [x] `.db-atlas-chart` handles `page.hero_image` and SVG fallback
- [x] `.db-atlas-ledger` contains conditional `page.capture.*` rows
- [x] `.db-atlas-prose` renders `{{ content }}`
- [x] `.db-atlas-folio` present
- [x] Existing night-theme post markup remains present

---
*Phase: 05-field-atlas*
*Completed: 2026-05-20*
