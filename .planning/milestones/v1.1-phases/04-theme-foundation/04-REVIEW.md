---
phase: 04-theme-foundation
reviewed: 2026-05-19T00:00:00Z
depth: quick
files_reviewed: 5
files_reviewed_list:
  - assets/css/astro-themes.css
  - _layouts/astro-workflow.html
  - astrophotography.html
  - _includes/astro-head.html
  - _layouts/default.html
findings:
  critical: 0
  warning: 1
  info: 2
  total: 3
status: issues_found
---

# Phase 04: Code Review Report (Iteration 3 — Final)

**Reviewed:** 2026-05-19
**Depth:** quick + targeted standard verification of all previously reported issues
**Files Reviewed:** 5
**Status:** issues_found (0 critical, 1 warning, 2 info)

---

## Previous Issues — Final Status

| ID    | Description                                                    | Status           |
|-------|----------------------------------------------------------------|------------------|
| CR-01 | localStorage try/catch missing in astro-head.html              | FIXED            |
| CR-02 | Astro CSS/fonts injected in body, not head                     | FIXED            |
| CR-03 | innerHTML used for TOC button text (XSS vector)                | FIXED            |
| CR-04 | FOUC script moved to astro-head.html, targets documentElement  | FIXED            |
| WR-01 | Dead matchMedia branch (both paths returned same theme)        | FIXED            |
| WR-02 | --serif token missing from theme-night                         | FIXED            |
| WR-03 | Tab strip rendered without hero_image guard; JS guard weak     | FIXED            |
| WR-04 | currentTheme() read body classList instead of documentElement  | FIXED            |
| WR-05 | default.html portfolio localStorage not in try/catch           | FIXED            |

All nine previously reported issues are correctly resolved. No regressions introduced.

---

## Summary

The third fix iteration is sound. Every previously reported issue has been addressed:

- `astro-head.html` now contains the FOUC script targeting `document.documentElement`, the Google Fonts preconnects, and the `astro-themes.css` stylesheet link — all placed in `<head>` via `default.html` line 22 conditional.
- CSS selectors migrated to `html.theme-atlas` / `html.theme-night`. This is internally consistent: the FOUC script in `astro-head.html` adds the class to `document.documentElement`; both toggle scripts (in `astro-workflow.html` and `astrophotography.html`) also manipulate `document.documentElement.classList`; `currentTheme()` in both files reads `document.documentElement.classList.contains(...)`. The migration is complete and coherent with no broken references.
- `--serif` token is now defined in `html.theme-night` (line 48 of `astro-themes.css`).
- Tab strip is correctly gated by `{% if page.hero_image %}` in `astro-workflow.html` lines 81-94.
- All localStorage calls are wrapped in try/catch.
- `textContent` is used for user-visible text; the remaining `innerHTML` usage is for a static compile-time SVG string with no user data.

Three minor residual items remain (1 warning, 2 info). None are blockers.

---

## Warnings

### WR-01: Empty `body.astro-page` ruleset is dead CSS

**File:** `assets/css/astro-themes.css:56-58`
**Issue:** The `body.astro-page {}` ruleset is empty — it contains only a comment and no property declarations. After theme tokens were migrated to `html.theme-atlas` / `html.theme-night` selectors, this block serves no purpose. Keeping it implies to future maintainers that `body.astro-page` is an intended extension point, which could lead to incorrectly-placed rules. Any properties added to this selector would also conflict with the `html`-level custom property cascade if developers conflate it with the theme token selectors.

**Fix:** Remove the empty ruleset:
```css
/* Delete lines 56-58 entirely: */
/* body.astro-page {
  /* default: .theme-night applied by JS on page load */
} */
```
If a `body.astro-page` override is needed in future (e.g. for layout or overflow), it can be re-added with actual declarations at that point.

---

## Info

### IN-01: `astrophotography.html` inline scripts depend on source-order DOM, not DOMContentLoaded

**File:** `astrophotography.html:297-337`
**Issue:** Both `<script>` IIFEs at the bottom of the file call `document.getElementById(...)` synchronously without a `DOMContentLoaded` listener. This works correctly in the current file because the referenced elements (`to-top-button`, `astro-theme-toggle`) are defined earlier in the same source. However, `astro-workflow.html` wraps all its init code in a single `DOMContentLoaded` callback (line 388). The inconsistent pattern means these scripts would fail silently if moved to an external file or reordered. No current bug exists, but the pattern is fragile relative to the sibling layout's approach.

**Fix:** Wrap both IIFEs in a single `DOMContentLoaded` listener:
```js
document.addEventListener('DOMContentLoaded', function() {
  var btn = document.getElementById('to-top-button');
  if (btn) {
    window.addEventListener('scroll', function() {
      btn.classList.toggle('is-visible', window.scrollY > 400);
    }, { passive: true });
    btn.addEventListener('click', function() {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  var toggle = document.getElementById('astro-theme-toggle');
  if (!toggle) return;
  // ... rest of theme toggle init
});
```

### IN-02: Two separate `<script>` blocks at the bottom of `astrophotography.html`

**File:** `astrophotography.html:297-337`
**Issue:** Two sequential IIFE `<script>` tags exist where one block would suffice. This is a code organisation issue — not a functional bug — but it creates two parse boundaries and makes the page harder to audit at a glance. The `astro-workflow.html` layout uses a single consolidated `<script>` for all page-level JS.

**Fix:** Merge both IIFEs into a single `<script>` block (naturally accomplished if IN-01's `DOMContentLoaded` consolidation is applied).

---

_Reviewed: 2026-05-19_
_Reviewer: Claude (gsd-code-reviewer)_
_Depth: quick + targeted standard verification_
_Iteration: 3 of 3_
