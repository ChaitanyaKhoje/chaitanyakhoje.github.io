---
phase: 04-theme-foundation
plan: "02"
subsystem: theme-wiring
tags: [javascript, theming, fonts, astrophotography, fouc-prevention, localStorage]
dependency_graph:
  requires: [astro-theme-tokens]
  provides: [astro-theme-toggle, astro-font-loading, astro-fouc-prevention]
  affects: [05-field-atlas, 06-after-dark]
tech_stack:
  added: []
  patterns: [fouc-prevention-iife, localstorage-persistence, class-based-theming, prefers-color-scheme-fallback]
key_files:
  created: []
  modified:
    - astrophotography.html
    - _layouts/astro-workflow.html
decisions:
  - "localStorage key 'astro-theme' (separate from homepage 'theme' key) — no coupling between astro and portfolio toggle systems"
  - "Whitelist validation of localStorage value before applying: only 'theme-atlas' or 'theme-night' accepted — raw value never used as innerHTML or DOM attribute (T-04-03 mitigation)"
  - "Default theme is 'theme-night' when neither localStorage nor prefers-color-scheme provides a signal — dark is astrophotography context default"
  - "Toggle button label set via innerHTML with HTML entities (&#x25D0; &#x25D1;) not hardcoded text — JS writes initial label from current body class"
  - "initAstroThemeToggle() integrated into existing IIFE in astro-workflow.html, called from DOMContentLoaded alongside buildInlineToc/initTabs/etc. — no new script blocks needed"
  - "_layouts/default.html left completely untouched — homepage theme system unaffected"
metrics:
  duration: "~8 minutes"
  completed: "2026-05-20T04:13:44Z"
  tasks_completed: 2
  tasks_total: 2
---

# Phase 4 Plan 02: Theme Wiring Summary

Font loading, astro-themes.css link, FOUC-prevention IIFE, and theme toggle button wired into both astrophotography pages — localStorage key 'astro-theme' with whitelist validation, prefers-color-scheme fallback, and theme-night default.

## Tasks Completed

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Update astrophotography.html — font link, CSS link, FOUC script, toggle button | 8960756 | astrophotography.html |
| 2 | Update _layouts/astro-workflow.html — font link, CSS link, FOUC script, toggle button | a049389 | _layouts/astro-workflow.html |

## What Was Built

### astrophotography.html

Three targeted changes:

1. **Font link replaced** — Playfair Display + Source Serif 4 removed; six-family Google Fonts URL installed (Italiana, Newsreader with full ital/opsz/wght axes, Spectral, Space Grotesk, Manrope, JetBrains Mono).

2. **astro-themes.css linked** — `<link rel="stylesheet" href="{{ '/assets/css/astro-themes.css' | relative_url }}" />` added immediately after the font link.

3. **FOUC-prevention IIFE** — Inline `<script>` immediately after astro-themes.css link. Logic: read localStorage 'astro-theme' → whitelist validate → if invalid, check `prefers-color-scheme: dark` → default to `theme-night`. Applies class to `document.body`. Does not touch `data-theme`, `localStorage('theme')`, or `document.documentElement`.

4. **Toggle button** — `<button id="astro-theme-toggle" class="al-theme-toggle">` inserted in `.al-status-strip` between `.al-spacer` and `.al-status-live`. Separate toggle JS IIFE at page bottom: reads body class for initial label, toggles between `theme-atlas`/`theme-night` on click, persists to `localStorage.setItem('astro-theme', next)`.

### _layouts/astro-workflow.html

Same four changes mirrored exactly:

1. **Font link replaced** — same six-family URL; preconnect links already present were retained.

2. **astro-themes.css linked** — same Liquid relative_url link pattern.

3. **FOUC-prevention IIFE** — identical logic to astrophotography.html.

4. **Toggle button** — `<button id="astro-theme-toggle" class="al-theme-toggle">` inserted in `.db-inline-toc-inner` between `.db-inline-sep` and `.db-inline-buttons`. Toggle logic implemented as `initAstroThemeToggle()` function inside the existing `(function() { ... })()` IIFE, called from `DOMContentLoaded` handler alongside `buildInlineToc()`, `initTabs()`, `initBA()`, `initToTop()`, `initNoCopy()`, `renderPlaceholder()`. No new script block needed — fits cleanly into existing structure.

## Verification Results

- `grep "astro-themes.css" astrophotography.html` — match found
- `grep "Italiana" astrophotography.html` — match found
- `grep "Newsreader" astrophotography.html` — match found
- `grep "Manrope" astrophotography.html` — match found
- `grep "astro-theme-toggle" astrophotography.html` — 2 matches (button + JS getElementById)
- `grep -c "astro-theme" astrophotography.html` — 5 matches (CSS link, FOUC script, button, JS getElementById, localStorage.setItem)
- `grep "Playfair" astrophotography.html` — no match (old font removed)
- `grep "Source+Serif" astrophotography.html` — no match (old font removed)
- `grep "astro-themes.css" _layouts/astro-workflow.html` — match found
- `grep "Italiana" _layouts/astro-workflow.html` — match found
- `grep "astro-theme-toggle" _layouts/astro-workflow.html` — 2 matches
- `grep "initAstroThemeToggle" _layouts/astro-workflow.html` — 2 matches (definition + call)
- `grep "Playfair" _layouts/astro-workflow.html` — no match (old font removed)
- `git diff _layouts/default.html` — empty (homepage untouched)
- Jekyll build: could not be run in agent environment (managed rbenv environment not available to agent — see MEMORY.md note); file changes are syntactically valid HTML/Liquid with no structural issues

## Deviations from Plan

None — plan executed exactly as written.

## Known Stubs

None. The toggle button's initial label is set by JS on DOMContentLoaded — it will render blank if JS is disabled, but that is an acceptable progressive enhancement tradeoff, not a stub.

## Threat Flags

No new security-relevant surface beyond what is already in the plan's threat model. The localStorage whitelist validation is implemented as specified for T-04-03: localStorage value is checked against `['theme-atlas', 'theme-night']` before any use; rejected values default to `theme-night` without being applied to any DOM attribute.

## Self-Check: PASSED

- astrophotography.html exists and contains required patterns: CONFIRMED
- _layouts/astro-workflow.html exists and contains required patterns: CONFIRMED
- Commit 8960756 exists: CONFIRMED (Task 1)
- Commit a049389 exists: CONFIRMED (Task 2)
- _layouts/default.html unchanged: CONFIRMED (git diff empty)
- localStorage key 'astro-theme' used (not 'theme'): CONFIRMED
- Whitelist validation present in both FOUC scripts: CONFIRMED
- Default to 'theme-night': CONFIRMED
