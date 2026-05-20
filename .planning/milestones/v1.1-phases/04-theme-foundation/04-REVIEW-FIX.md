---
phase: 04-theme-foundation
fixed_at: 2026-05-19T00:00:00Z
review_path: .planning/phases/04-theme-foundation/04-REVIEW.md
iteration: 1
findings_in_scope: 8
fixed: 7
skipped: 1
status: partial
---

# Phase 04: Code Review Fix Report

**Fixed at:** 2026-05-19
**Source review:** .planning/phases/04-theme-foundation/04-REVIEW.md
**Iteration:** 1

**Summary:**
- Findings in scope: 8 (CR-01, CR-02, CR-03, WR-01, WR-02, WR-03, WR-04, WR-05)
- Fixed: 7
- Skipped: 1 (WR-05 — deferred per instructions)

## Fixed Issues

### CR-01: localStorage access crashes in private-browsing / restricted contexts

**Files modified:** `_layouts/astro-workflow.html`, `astrophotography.html`
**Commit:** (see git log — "fix(04): CR-01 WR-01 guard localStorage with try/catch; fix dead matchMedia branch")
**Applied fix:** Wrapped `localStorage.getItem('astro-theme')` in try/catch in both FOUC scripts (saved = null on error). Wrapped `localStorage.setItem('astro-theme', next)` in try/catch in both toggle handlers. WR-01 fix was applied in the same commit (see below).

### WR-01: Redundant matchMedia branch in FOUC script

**Files modified:** `_layouts/astro-workflow.html`, `astrophotography.html`
**Commit:** (combined with CR-01 — "fix(04): CR-01 WR-01 guard localStorage with try/catch; fix dead matchMedia branch")
**Applied fix:** Removed the redundant `prefers-color-scheme: dark` first branch. Simplified FOUC logic to: saved → prefers-color-scheme: light → theme-night (default/dark/no-preference). This eliminates the dead else branch and correctly defaults to night for dark preference and no-preference users.

### CR-02: FOUC script and CSS stylesheet load inside body via content slot

**Files modified:** `_layouts/default.html`, `_layouts/astro-workflow.html`, `astrophotography.html`, `_includes/astro-head.html` (new)
**Commit:** (see git log — "fix(04): CR-02 move astro font and theme CSS links into head")
**Applied fix:** Created `_includes/astro-head.html` containing the astro font preconnects and `astro-themes.css` link. Added a conditional include in `default.html` that loads this include when `page.layout == 'astro-workflow'` or `page.body_class == 'astro-page'`. Removed the duplicate `<link>` tags from `astro-workflow.html` and `astrophotography.html`. The FOUC detection script remains just after `<body>` opens (where `document.body` is available); only the stylesheet and font preconnects moved to `<head>`.

### CR-03: innerHTML assignment with unvalidated input in theme toggle

**Files modified:** `_layouts/astro-workflow.html`, `astrophotography.html`
**Commit:** (see git log — "fix(04): CR-03 replace innerHTML with textContent in theme toggle label")
**Applied fix:** Changed `labelFor()` to return plain Unicode characters (`◑` and `◐`) instead of HTML entity strings. Changed `toggle.innerHTML = ...` to `toggle.textContent = ...` in both files and both call sites (initial render and click handler).

### WR-02: Cross-theme token aliases missing

**Files modified:** `assets/css/astro-themes.css`
**Commit:** (see git log — "fix(04): WR-02 add cross-theme token aliases so all tokens resolve in both themes")
**Applied fix:**
- `body.theme-atlas`: added `--bg` (#ede6d3, alias for --paper), `--bg-2` (#ddd4be, alias for --paper-d), `--cyan` (#2c3a5a, aliases --indigo), `--sans` (system-ui fallback), `--body` (Spectral serif)
- `body.theme-night`: added `--paper` (#07080b, alias for --bg), `--paper-d` (#0d0f14, alias for --bg-2), `--rule-soft` (rgba(236,229,212,0.05)), `--indigo` (#6fc7d4, aliases --cyan)

### WR-03: Tab strip renders all three tabs unconditionally

**Files modified:** `_layouts/astro-workflow.html`
**Commit:** (see git log — "fix(04): WR-03 guard Starless and B&W tabs with Liquid conditionals")
**Applied fix:** Wrapped the Starless button in `{% if page.starless_image %}...{% endif %}` and the B&W button in `{% if page.bw_image %}...{% endif %}`. Tabs are now only rendered when the corresponding front-matter variable is set.

### WR-04: currentTheme() has no fallback when neither class is on body

**Files modified:** `_layouts/astro-workflow.html`, `astrophotography.html`
**Commit:** (see git log — "fix(04): WR-04 update currentTheme() to check presence of both classes")
**Applied fix:** Replaced the single ternary (only checked for theme-atlas) with explicit `classList.contains` checks for both classes. When neither is present (degraded state), `theme-night` is applied as a hard fallback via `document.body.classList.add('theme-night')` so the toggle is not a no-op on first click.

## Skipped Issues

### WR-05: Duplicate theme-toggle implementation across two files

**File:** `_layouts/astro-workflow.html`, `astrophotography.html`
**Reason:** deferred per instructions — this is a structural refactor (extract shared JS to `assets/js/astro-theme.js`), marked as a follow-up task. No immediate bug; the per-finding fixes above were applied to both files independently.
**Original issue:** `initAstroThemeToggle` in astro-workflow.html and the inline IIFE in astrophotography.html are identical in logic. Any future bug fix must be applied in two places.

---

_Fixed: 2026-05-19_
_Fixer: Claude (gsd-code-fixer)_
_Iteration: 1_
