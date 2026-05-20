---
phase: 06-after-dark
plan: "03"
subsystem: ui
tags: [jekyll, liquid, after-dark, post-layout, astrophotography]

requires:
  - phase: 04-theme-foundation
    provides: "html.theme-atlas/html.theme-night classes, theme toggle behavior, and shared astro theme tokens"
  - phase: 06-after-dark/06-01
    provides: "After Dark post CSS classes consumed by this markup"
provides:
  - "After Dark post shell inside _layouts/astro-workflow.html"
  - "Cinematic full-bleed hero with hero_image / SVG fallback"
  - "Two-column prose + sidenotes post body"
  - "Minimal post footer with prev/current/next context"
affects: [after-dark, astrophotography-posts]

tech-stack:
  added: []
  patterns:
    - "Theme-specific post markup is additive and controlled by html.theme-atlas/html.theme-night CSS"
    - "Liquid post iteration supplies current/next navigation from existing astro posts"

key-files:
  created: []
  modified:
    - _layouts/astro-workflow.html

key-decisions:
  - "Inserted the After Dark post shell before the existing Field Atlas wrapper so the night theme can hide the atlas path cleanly."
  - "Rendered `page.hero_image` first and used an SVG nebula fallback only when the image is missing."

patterns-established:
  - "After Dark post sections live in a dedicated .night-post wrapper."
  - "Sidenote content lives in a mono-styled aside beside the prose column."

requirements-completed: [NIGHT-03, NIGHT-04, NIGHT-05, JEKYLL-01]

duration: "~20 min"
completed: 2026-05-20T06:47:50Z
---

# Phase 6 Plan 03: After Dark Post Layout Summary

**After Dark post markup with cinematic hero, side-notes, and sparse footer using existing page front matter.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-05-20T06:47:50Z
- **Completed:** 2026-05-20T06:47:50Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Added the After Dark mast and context navigation to `_layouts/astro-workflow.html`.
- Added a full-bleed hero using `page.hero_image` with an SVG fallback.
- Added a two-column body with `{{ content }}` on the left and session / apparatus / pipeline notes on the right.
- Added a sparse footer that reflects the current session context.

## Files Created/Modified

- `_layouts/astro-workflow.html` - Added the After Dark post shell before the existing Field Atlas post block.

## Decisions Made

- Preserved the Field Atlas markup and kept it hidden under `html.theme-night`.
- Reused the current front matter contract, including `page.margin_note`, `page.gear.*`, and `page.capture.*`.

## Verification Results

```bash
grep -c "night-mast\|night-hero\|night-body\|night-note" _layouts/astro-workflow.html
# PASS

grep "page.hero_image" _layouts/astro-workflow.html
# PASS

PATH=/opt/homebrew/opt/ruby@3.2/bin:$PATH bundle exec jekyll build
# PASS
```

## Self-Check: PASSED

- [x] `_layouts/astro-workflow.html` contains the After Dark mast and hero shell
- [x] The post body renders in a two-column structure
- [x] The existing Field Atlas post layout remains intact for `html.theme-atlas`
- [x] The page builds cleanly under Jekyll

