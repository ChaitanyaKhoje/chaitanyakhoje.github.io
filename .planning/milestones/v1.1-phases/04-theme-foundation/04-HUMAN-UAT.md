---
status: partial
phase: 04-theme-foundation
source: [04-VERIFICATION.md]
started: 2026-05-20T04:30:00Z
updated: 2026-05-20T04:30:00Z
---

## Current Test

[awaiting human testing]

## Tests

### 1. Dark mode first-visit
expected: OS set to dark mode, clear localStorage, visit `/astrophotography/` — `html.theme-night` applied before first paint with no flash of unstyled content
result: [pending]

### 2. Light mode first-visit
expected: OS set to light mode, clear localStorage, visit `/astrophotography/` — `html.theme-atlas` applied before first paint
result: [pending]

### 3. Toggle persistence across reload
expected: Click toggle on astrophotography page, reload page — theme is restored from localStorage('astro-theme') without FOUC
result: [pending]

### 4. Homepage isolation
expected: After toggling astro theme to Atlas, navigate to homepage `/` — `data-theme` attribute unchanged, no `theme-atlas` or `theme-night` class on `html` element
result: [pending]

### 5. Jekyll build
expected: `bundle exec jekyll build` completes without errors after adding `_includes/astro-head.html` and modifying `_layouts/default.html`
result: [pending]

## Summary

total: 5
passed: 0
issues: 0
pending: 5
skipped: 0
blocked: 0

## Gaps
