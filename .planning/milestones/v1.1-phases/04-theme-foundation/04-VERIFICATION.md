---
phase: 04-theme-foundation
verified: 2026-05-19T00:00:00Z
status: human_needed
score: 5/5 must-haves verified
overrides_applied: 0
re_verification: null
human_verification:
  - test: "Verify prefers-color-scheme dark mode activates After Dark theme on first visit (no localStorage)"
    expected: "html element has class 'theme-night' when OS is set to dark mode and no 'astro-theme' key exists in localStorage"
    why_human: "Requires a real browser environment with system dark mode; cannot simulate prefers-color-scheme in a static grep scan"
  - test: "Verify prefers-color-scheme light mode activates Field Atlas theme on first visit (no localStorage)"
    expected: "html element has class 'theme-atlas' when OS is set to light mode and no 'astro-theme' key exists in localStorage"
    why_human: "Same as above — requires real browser with system light mode"
  - test: "Verify theme toggle persists across page reload"
    expected: "After clicking toggle and reloading the page, the same theme class is on html without FOUC"
    why_human: "localStorage persistence and FOUC-prevention timing cannot be verified by static file inspection; requires browser DevTools observation"
  - test: "Verify homepage data-theme attribute is NOT changed by visiting an astro page and back"
    expected: "Navigating to /astrophotography/ and back to / shows no theme-atlas or theme-night class on html element; data-theme persists normally"
    why_human: "Cross-page navigation side effects require browser testing"
  - test: "Verify Jekyll build succeeds with updated files"
    expected: "bundle exec jekyll build exits 0 with no errors"
    why_human: "Managed rbenv environment; cannot run Jekyll build in agent environment (see MEMORY.md)"
---

# Phase 4: Theme Foundation Verification Report

**Phase Goal:** The theme switching system is in place — both themes can be activated via prefers-color-scheme or manual toggle, the choice persists across page loads, and all required fonts are loaded
**Verified:** 2026-05-19T00:00:00Z
**Status:** human_needed
**Re-verification:** No — initial verification

## Goal Achievement

### Observable Truths

| # | Truth | Status | Evidence |
|---|-------|--------|----------|
| 1 | THEME-01: Astrophotography pages default to prefers-color-scheme — dark maps to After Dark, light maps to Field Atlas | VERIFIED (code path confirmed; runtime needs human) | `_includes/astro-head.html` FOUC IIFE: `if window.matchMedia('(prefers-color-scheme: light)').matches` → `theme-atlas`, else → `theme-night`. Whitelist-validated. Applied to `document.documentElement` before first paint. |
| 2 | THEME-02: Manual toggle persists choice to localStorage and applies correct theme class on page load | VERIFIED (code path confirmed; runtime needs human) | `astrophotography.html` line 333 and `astro-workflow.html` line 375: `localStorage.setItem('astro-theme', next)`. FOUC script in `astro-head.html` line 8 reads `localStorage.getItem('astro-theme')` and applies it before paint. |
| 3 | THEME-03: Homepage, writing posts, and all other pages completely unaffected by new theme system | VERIFIED | `_layouts/default.html` uses `localStorage('theme')` + `data-theme` attribute on `documentElement`. Astro system uses `localStorage('astro-theme')` + class on `documentElement`. No cross-contamination in any file. `portfolio.css` has zero references to `theme-atlas` or `theme-night`. `hide_theme_toggle: true` suppresses the portfolio toggle on astro pages. The existing astro-workflow post has `hide_theme_toggle: true` in front matter. |
| 4 | JEKYLL-03: Both themes delivered as CSS + vanilla JS — no React or other JS framework in production | VERIFIED | `grep` across `assets/`, `_includes/`, `_layouts/` for React/Vue/Angular/Svelte import patterns returns no matches. All JavaScript is vanilla IIFEs with direct DOM manipulation. |
| 5 | JEKYLL-04: Google Fonts loaded for all 6 required families | VERIFIED | `_includes/astro-head.html` line 3 contains the single `<link>` with all 6 families: Italiana, Newsreader (full ital/opsz/wght axes), Spectral, Space+Grotesk, Manrope, JetBrains+Mono. Included via `default.html` for both `layout: astro-workflow` and `body_class: astro-page` pages. |

**Score:** 5/5 truths verified (all code paths confirmed; 5 items require human/browser runtime verification)

### Implementation Deviation: body vs html element targeting

The plans (04-01-PLAN.md and 04-02-PLAN.md) specified `body.theme-atlas` / `body.theme-night` CSS selectors and `document.body.classList.add()`. The actual implementation uses `html.theme-atlas` / `html.theme-night` (the `<html>` element) and `document.documentElement.classList.add()`. This is **internally consistent** — the CSS selectors and all JavaScript agree on targeting the `<html>` element. The functional behavior (theme switching, FOUC prevention, persistence) is fully intact. This deviation does not break the phase goal.

Summary of comment in `astro-themes.css` (line 6): "Usage: `<html class="theme-atlas">`" — consistent with the implementation.

### Required Artifacts

| Artifact | Expected | Status | Details |
|----------|----------|--------|---------|
| `assets/css/astro-themes.css` | CSS token blocks for both themes | VERIFIED | Exists. `html.theme-atlas` block (16 tokens) and `html.theme-night` block (16 tokens). No `:root` selector. No layout/component rules. File header comment present. `body.astro-page` empty placeholder block with comment. |
| `_includes/astro-head.html` | Font loading, CSS link, FOUC script | VERIFIED | Exists. 6-family Google Fonts `<link>`, `astro-themes.css` link, FOUC IIFE with localStorage read + whitelist validation + prefers-color-scheme fallback + default to `theme-night`. |
| `astrophotography.html` | Font loading via astro-head (via default.html), toggle button, toggle JS | VERIFIED | `layout: default` + `body_class: astro-page` triggers `astro-head.html` include. Toggle button present at line 28. Toggle JS IIFE at lines 310–337. `localStorage.setItem('astro-theme', next)` confirmed. Old Playfair/Source Serif 4 links absent. |
| `_layouts/astro-workflow.html` | Font loading via astro-head (via default.html), toggle button, initAstroThemeToggle() | VERIFIED | `layout: default` triggers `astro-head.html` include (via `page.layout == 'astro-workflow'` condition). Toggle button at line 118. `initAstroThemeToggle()` defined at lines 353–378, called from `DOMContentLoaded` handler at line 395. No Playfair/Source Serif 4. |
| `_layouts/default.html` | Unchanged; includes astro-head for astro pages only | VERIFIED | Homepage toggle uses `localStorage('theme')` + `data-theme` attribute only. `astro-head.html` included at line 22 with guard `if page.layout == 'astro-workflow' or page.body_class == 'astro-page'`. No modifications to portfolio theme system. |

### Key Link Verification

| From | To | Via | Status | Details |
|------|-----|-----|--------|---------|
| FOUC IIFE in `<head>` | `html` element class | `document.documentElement.classList.add(theme)` before paint | VERIFIED | `astro-head.html` line 17; runs synchronously in `<head>` |
| FOUC IIFE | localStorage `'astro-theme'` | `localStorage.getItem('astro-theme')` with whitelist validation | VERIFIED | `astro-head.html` lines 8–11; only `'theme-atlas'` and `'theme-night'` accepted |
| FOUC IIFE | `prefers-color-scheme` | `window.matchMedia('(prefers-color-scheme: light)').matches` | VERIFIED | `astro-head.html` line 12; light → `theme-atlas`, else → `theme-night` |
| Toggle button click | localStorage write | `localStorage.setItem('astro-theme', next)` | VERIFIED | `astrophotography.html` line 333; `astro-workflow.html` line 375 |
| Toggle button click | `html` class switch | `document.documentElement.classList.remove(current); .classList.add(next)` | VERIFIED | Both files, in respective toggle JS |
| `default.html` | `astro-head.html` | `{% include astro-head.html %}` with layout/body_class guard | VERIFIED | `default.html` line 22 |
| `astrophotography.html` | astro theme system | `layout: default`, `body_class: astro-page` | VERIFIED | Front matter triggers both the astro-head include and the `body.astro-page` CSS hook |
| `astro-workflow.html` posts | astro theme system | `layout: astro-workflow` | VERIFIED | `default.html` guard matches `page.layout == 'astro-workflow'` |
| Portfolio toggle | `localStorage('theme')` + `data-theme` | entirely separate from `'astro-theme'` key | VERIFIED | Zero cross-contamination; `portfolio.css` has no `theme-atlas`/`theme-night` references |

### Data-Flow Trace (Level 4)

Not applicable. Phase 4 delivers no components that render dynamic data from a backend or store. All data flows are:
- CSS custom properties applied to `<html>` element by the FOUC script
- Toggle JS that reads/writes localStorage and modifies `<html>` class

Both are fully traced above at Level 3.

### Behavioral Spot-Checks

| Behavior | Command | Result | Status |
|----------|---------|--------|--------|
| astro-themes.css exists with correct selectors | `grep "html\.theme-atlas" assets/css/astro-themes.css` | Line 7: `html.theme-atlas {` | PASS |
| No `:root` in astro-themes.css | `grep ":root" assets/css/astro-themes.css` | No output | PASS |
| 6 Google Fonts in astro-head.html | `grep` for each family | All 6 found: Italiana, Newsreader, Spectral, Space+Grotesk, Manrope, JetBrains+Mono | PASS |
| astro-themes.css linked in astro-head.html | `grep "astro-themes.css" _includes/astro-head.html` | Line 4: link tag present | PASS |
| FOUC reads `'astro-theme'` key | `grep "astro-theme" _includes/astro-head.html` | Lines 8, 10 | PASS |
| Whitelist validation in FOUC | `grep "theme-atlas.*theme-night"` | Line 10 with `===` guards | PASS |
| Toggle button present in astrophotography.html | `grep "astro-theme-toggle" astrophotography.html` | Lines 28, 312, 333 | PASS |
| Toggle button present in astro-workflow.html | `grep "astro-theme-toggle" _layouts/astro-workflow.html` | Lines 118, 354 | PASS |
| initAstroThemeToggle called in astro-workflow.html | `grep "initAstroThemeToggle"` | Defined line 353, called line 395 | PASS |
| portfolio.css untouched by astro themes | `grep "theme-atlas\|theme-night" assets/css/portfolio.css` | No output | PASS |
| Old Playfair fonts removed from astrophotography.html | `grep "Playfair" astrophotography.html` | No output | PASS |
| Old Playfair fonts removed from astro-workflow.html | `grep "Playfair" _layouts/astro-workflow.html` | No output | PASS |
| Homepage toggle uses `'theme'` key, not `'astro-theme'` | `grep "localStorage.*'theme'" _layouts/default.html` | Lines 15, 18, 65 | PASS |
| No React/framework JS in production | `grep -rn "import React\|from 'react'"` across assets/layouts/includes | No output | PASS |

### Probe Execution

No probes declared in PLAN frontmatter or SUMMARY. Jekyll build verification is deferred to human verification (managed rbenv environment constraint noted in MEMORY.md and confirmed in 04-02-SUMMARY.md).

### Requirements Coverage

| Requirement | Source Plan | Description | Status | Evidence |
|-------------|------------|-------------|--------|----------|
| THEME-01 | 04-01, 04-02 | Astro pages default to prefers-color-scheme | VERIFIED (runtime: human needed) | FOUC IIFE in `astro-head.html` checks `prefers-color-scheme: light` → `theme-atlas`, else → `theme-night` |
| THEME-02 | 04-02 | Manual toggle persists to localStorage and restores on load | VERIFIED (runtime: human needed) | Toggle JS writes `localStorage.setItem('astro-theme', next)`; FOUC reads it on next load |
| THEME-03 | 04-01, 04-02 | Homepage and writing posts completely unaffected | VERIFIED | Separate localStorage keys (`'theme'` vs `'astro-theme'`), separate DOM attributes (`data-theme` vs class), separate CSS files; `hide_theme_toggle: true` suppresses portfolio button on astro pages |
| JEKYLL-03 | 04-01, 04-02 | CSS + vanilla JS only — no framework | VERIFIED | No React/Vue/Angular imports found across all modified files |
| JEKYLL-04 | 04-02 | 6 Google Fonts loaded | VERIFIED | All 6 families confirmed in `_includes/astro-head.html` line 3 font URL |

All 5 requirements declared in PLAN frontmatter are accounted for. No orphaned requirements (THEME-01, THEME-02, THEME-03, JEKYLL-03, JEKYLL-04 all appear in REQUIREMENTS.md under Phase 4).

### Anti-Patterns Found

| File | Line | Pattern | Severity | Impact |
|------|------|---------|----------|--------|
| `astro-themes.css` | 56–58 | Empty `body.astro-page {}` block | Info | Intentional placeholder — comment explains it is a marker; JS applies theme class. Not a stub. |

No `TBD`, `FIXME`, or `XXX` markers found in any file modified by this phase. No unreferenced debt markers.

### Human Verification Required

#### 1. Dark mode first-visit activation

**Test:** On a device with OS set to dark mode, clear `localStorage` for the site, then navigate to `/astrophotography/`. Open DevTools → Elements and inspect the `<html>` element.
**Expected:** `<html>` has class `theme-night` applied before any content paints. No FOUC visible.
**Why human:** `prefers-color-scheme` media query response cannot be simulated without a real browser and system-level dark mode setting.

#### 2. Light mode first-visit activation

**Test:** Same as above but with OS set to light mode.
**Expected:** `<html>` has class `theme-atlas` applied before first paint.
**Why human:** Same constraint.

#### 3. Toggle persistence across page reload

**Test:** Load `/astrophotography/` in dark mode. Click the "◐ Atlas" toggle button. Verify body switches to `theme-atlas`. Reload the page.
**Expected:** Page reloads with `theme-atlas` applied immediately (no FOUC). Button reads "◑ Night". DevTools → Application → localStorage shows key `astro-theme` with value `theme-atlas`.
**Why human:** localStorage persistence and FOUC-prevention timing are observable only in a browser.

#### 4. Homepage theme isolation

**Test:** Toggle astro theme to `theme-atlas`, navigate to `/` (homepage). Inspect `<html>` element.
**Expected:** `<html>` has `data-theme` attribute (not `theme-atlas` or `theme-night` class). The `'astro-theme'` localStorage key exists but is completely ignored on the homepage. The portfolio dark/light toggle continues to work normally.
**Why human:** Cross-page navigation side effects require browser testing.

#### 5. Jekyll build passes

**Test:** Run `bundle exec jekyll build` from the repository root using the managed rbenv environment.
**Expected:** Exits 0, no CSS or Liquid errors, `_site/` is generated with updated astro pages.
**Why human:** The agent environment does not have access to the managed Ruby/rbenv shims (confirmed in MEMORY.md and 04-02-SUMMARY.md).

### Gaps Summary

No automated-verifiable gaps found. All code-level requirements are satisfied. The 5 items in Human Verification Required are runtime/browser behavioral checks that cannot be verified by static code inspection. They represent the boundary between what automated verification can confirm (code paths, file contents, wiring) and what requires a browser (event timing, media query responses, localStorage behavior).

**One notable implementation deviation** (not a blocker): The plan specified `body.theme-atlas`/`body.theme-night` targeting `document.body`. The actual implementation targets `document.documentElement` (`<html>`) with selectors `html.theme-atlas`/`html.theme-night`. The CSS and JavaScript are mutually consistent on this choice; the functional outcome is correct. This deviation from the plan's stated implementation detail does not affect goal achievement.

---

_Verified: 2026-05-19T00:00:00Z_
_Verifier: Claude (gsd-verifier)_
