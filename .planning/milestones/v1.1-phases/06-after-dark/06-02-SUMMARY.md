---
phase: 06-after-dark
plan: "02"
subsystem: ui
tags: [jekyll, liquid, after-dark, listing, astrophotography]

requires:
  - phase: 04-theme-foundation
    provides: "html.theme-atlas/html.theme-night classes, theme toggle behavior, and shared astro theme tokens"
  - phase: 06-after-dark/06-01
    provides: "After Dark listing CSS classes consumed by this markup"
provides:
  - "After Dark listing shell inside astrophotography.html"
  - "Feed-row archive iterating astro-workflow posts with linked rows"
  - "Thumbnail plate and meta columns per session"
  - "After Dark footer anchored beneath the feed"
affects: [after-dark, astrophotography-listing]

tech-stack:
  added: []
  patterns:
    - "Theme-specific markup is additive and controlled by html.theme-atlas/html.theme-night CSS"
    - "Liquid post iteration populates feed rows from existing front matter without schema changes"

key-files:
  created: []
  modified:
    - astrophotography.html

key-decisions:
  - "Inserted the After Dark listing shell before the existing Field Atlas wrapper so the night theme can hide the atlas path cleanly."
  - "Used existing astro-workflow post data only, including hero_image fallback thumbnails and capture metadata."

patterns-established:
  - "After Dark listing sections live in a dedicated .night-shell wrapper."
  - "Feed rows are full-row anchors using post.url | relative_url."

requirements-completed: [NIGHT-01, NIGHT-02, JEKYLL-02]

duration: "~20 min"
completed: 2026-05-20T06:47:50Z
---

# Phase 6 Plan 02: After Dark Listing Markup Summary

**After Dark listing markup with mast, italic headline, mono stats row, and feed-row archive populated from existing Jekyll post data.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-05-20T06:47:50Z
- **Completed:** 2026-05-20T06:47:50Z
- **Tasks:** 1
- **Files modified:** 1

## Accomplishments

- Added the After Dark mast and intro shell inside `astrophotography.html`.
- Added a feed-row archive that iterates `astro_posts` and links each row to `post.url | relative_url`.
- Added thumbnail plates, metadata columns, a no-data fallback row, and a sparse footer.

## Files Created/Modified

- `astrophotography.html` - Added the After Dark listing markup before the existing Field Atlas listing block.

## Decisions Made

- Kept the Field Atlas markup intact and isolated the new night shell above it.
- Used the existing `astro-theme-toggle` button contract so the theme switch continues to work with localStorage.

## Verification Results

```bash
grep -c "night-mast\|feed-row\|night-h1\|night-lede" astrophotography.html
# PASS

grep "post.url | relative_url" astrophotography.html
# PASS

PATH=/opt/homebrew/opt/ruby@3.2/bin:$PATH bundle exec jekyll build
# PASS
```

## Self-Check: PASSED

- [x] `astrophotography.html` contains the After Dark mast and feed rows
- [x] Each feed row links to the correct post URL
- [x] The listing shell is additive and theme-scoped
- [x] The page builds cleanly under Jekyll

