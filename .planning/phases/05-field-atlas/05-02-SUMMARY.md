---
phase: 05-field-atlas
plan: "02"
subsystem: ui
tags: [jekyll, liquid, field-atlas, listing, astrophotography]

requires:
  - phase: 04-theme-foundation
    provides: "html.theme-atlas/html.theme-night classes, theme toggle behavior, and shared astro theme tokens"
  - phase: 05-field-atlas/05-01
    provides: "Field Atlas listing CSS classes consumed by this markup"
provides:
  - "Field Atlas listing ribbon inside astrophotography.html"
  - "Atlas index table iterating astro-workflow posts with linked rows"
  - "RA/Dec coordinate chart plate with session markers"
  - "Atlas folio strip for the listing page"
affects: [field-atlas, after-dark, astrophotography-listing]

tech-stack:
  added: []
  patterns:
    - "Theme-specific markup is additive inside existing wrappers and controlled by html.theme-atlas/html.theme-night CSS"
    - "Liquid post iteration populates atlas rows from existing front matter without schema changes"

key-files:
  created: []
  modified:
    - astrophotography.html

key-decisions:
  - "Kept all existing night-theme listing markup intact and inserted atlas sections before it."
  - "Used existing post front matter only; coordinate markers use known-target positions with a center fallback."

patterns-established:
  - "Atlas listing sections live inside .al-listing before the existing .al-head night markup."
  - "Atlas table rows are full-row anchors using post.url | relative_url."

requirements-completed: [ATLAS-02, ATLAS-03, JEKYLL-02]

duration: "~20 min"
completed: 2026-05-20T06:47:50Z
---

# Phase 5 Plan 02: Field Atlas Listing Markup Summary

**Atlas listing markup with ribbon, linked session index, coordinate chart, and folio strip populated from existing Jekyll post data.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-05-20T06:28:00Z
- **Completed:** 2026-05-20T06:47:50Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Added the Field Atlas ribbon and two-column atlas body inside `astrophotography.html`.
- Added an `.atlas-index` table that iterates `astro_posts` and links each `.ai-row` to `post.url | relative_url`.
- Added the chart plate, axis labels, target markers, apparatus block, and folio strip required by the Field Atlas listing design.

## Task Commits

1. **Task 1: Add atlas ribbon and atlas-body section to astrophotography.html** - `51cccbd` (feat)

## Files Created/Modified

- `astrophotography.html` - Added Field Atlas listing markup before the existing dark-theme listing header.

## Decisions Made

- Preserved the existing `.al-head`, `.al-featured`, `.al-session-grid`, `.al-method`, and `.al-footer` night-theme markup unchanged.
- Used known target names to position chart markers where possible, with a center-band fallback for posts without known coordinates.

## Deviations from Plan

None - plan executed as written after the user selected re-execution from scratch. Existing prior Wave 2 commits were reverted non-destructively before this rebuild.

## Issues Encountered

- Initial Jekyll build failed under system Ruby 2.6 because the bundle requires Ruby 3.1+. Re-ran with the documented Homebrew Ruby 3.2 path and the build passed.

## User Setup Required

None - no external service configuration required.

## Next Phase Readiness

The listing-side Field Atlas markup is ready for visual review and pairs with Plan 05-03's post layout. Phase 6 can reuse the same static post data contract.

## Verification Results

```bash
grep -c "al-ribbon\|atlas-index\|al-atlas-body\|al-chart" astrophotography.html
# PASS: 33 matches

grep "post.url.*relative_url" astrophotography.html
# PASS: atlas index rows link to post.url | relative_url

grep "al-atlas-folio" astrophotography.html
# PASS: al-atlas-folio present

PATH=/opt/homebrew/opt/ruby@3.2/bin:$PATH bundle exec jekyll build
# PASS
```

## Self-Check: PASSED

- [x] `.al-ribbon` present with left/right subdivisions
- [x] `.al-atlas-body` present
- [x] `.atlas-index` contains Liquid `for post in astro_posts`
- [x] `.ai-row` entries are anchors using `post.url | relative_url`
- [x] `.al-atlas-folio` present
- [x] Existing night-theme listing markup remains present

---
*Phase: 05-field-atlas*
*Completed: 2026-05-20*
