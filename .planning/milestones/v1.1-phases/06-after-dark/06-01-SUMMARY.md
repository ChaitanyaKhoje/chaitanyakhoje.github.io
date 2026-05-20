---
phase: 06-after-dark
plan: "01"
subsystem: css
tags: [css, after-dark, night, layout, typography, responsive]

dependency_graph:
  requires:
    - 04-theme-foundation/04-01 (astro-themes.css token definitions)
    - 04-theme-foundation/04-02 (astro-head.html include setup)
  provides:
    - assets/css/astro-night.css (After Dark layout and typography CSS)
    - _includes/astro-head.html (updated with night CSS link)
  affects:
    - astrophotography.html listing page (consumes .night-* classes)
    - _layouts/astro-workflow.html post page (consumes .night-* classes)

tech_stack:
  added: []
  patterns:
    - html.theme-night scoping for all layout rules
    - Feed-row and hero/post shell layout via CSS Grid and flexbox
    - Responsive stacking at 768px breakpoint
    - Shared theme-toggle behavior via existing astro-theme-toggle button

key_files:
  created:
    - assets/css/astro-night.css
  modified:
    - _includes/astro-head.html

decisions:
  - Scoped all After Dark rules to html.theme-night so the Field Atlas path remains isolated.
  - Hid the legacy atlas/night wrappers under the opposite theme instead of deleting them, allowing both theme shells to coexist in one Jekyll build.
  - Kept the existing astro-theme-toggle button contract and inserted a visible toggle into the new shell so localStorage persistence continues to work.

metrics:
  duration: "~20 minutes"
  completed: "2026-05-20T06:47:50Z"
  tasks_completed: 1
  tasks_total: 1
  files_created: 1
  files_modified: 1
---

# Phase 6 Plan 01: After Dark CSS Foundation Summary

**One-liner:** Near-black After Dark theme CSS with warm-gold accents, feed-row and full-bleed hero layouts, all scoped under `html.theme-night`.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Add `assets/css/astro-night.css` and load it in `_includes/astro-head.html` | pending | `assets/css/astro-night.css`, `_includes/astro-head.html` |

## What Was Built

`assets/css/astro-night.css` provides the Phase 6 layout contract:

- `html.theme-night` wrapper rules for the After Dark shell
- listing shell styles for mast, intro, feed rows, thumbnails, and footer
- post shell styles for mast, cinematic hero, body grid, sidenotes, and footer
- responsive collapse rules for narrow screens
- explicit hiding of the Field Atlas and legacy wrappers when the dark theme is active

`_includes/astro-head.html` now loads the night stylesheet after the atlas stylesheet so the shared tokens cascade first and the theme-specific shell rules override them second.

## Verification Results

```bash
grep -c "theme-night" assets/css/astro-night.css  # PASS
grep "astro-night.css" _includes/astro-head.html  # PASS
PATH=/opt/homebrew/opt/ruby@3.2/bin:$PATH bundle exec jekyll build  # PASS
```

## Self-Check: PASSED

- [x] `assets/css/astro-night.css` exists and is scoped to `html.theme-night`
- [x] `_includes/astro-head.html` loads the new stylesheet
- [x] Night-specific classes are styled for both listing and post layouts
- [x] Jekyll build succeeds with the new stylesheet in place

