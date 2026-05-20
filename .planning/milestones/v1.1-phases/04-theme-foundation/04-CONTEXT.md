# Phase 4: Theme Foundation - Context

**Gathered:** 2026-05-19
**Status:** Ready for planning

<domain>
## Phase Boundary

Establish the CSS/JS theming infrastructure for the astrophotography pages: a dedicated CSS file (`assets/css/astro-themes.css`) with class-based theme scoping (`.theme-atlas` for light/Field Atlas, `.theme-night` for dark/After Dark), font loading for all required typefaces on astro pages, and a vanilla JS toggle mechanism using a separate `localStorage` key (`astro-theme`) with `prefers-color-scheme` fallback. Homepage and writing posts are completely unaffected.

</domain>

<decisions>
## Implementation Decisions

### Theme Scoping Strategy
- New file `assets/css/astro-themes.css` — keeps `portfolio.css` untouched, imported via `<link>` in astro pages
- Class-based scoping: `.theme-atlas` (light/Field Atlas) and `.theme-night` (dark/After Dark) applied to `<body>` — mirrors existing `data-theme` pattern in structure
- Separate localStorage key `astro-theme` — decoupled from homepage `theme` key, so toggling astro theme never affects the homepage toggle
- Toggle button sits inside the astro-specific mast/header of each page (replaces the sun/moon toggle which is already hidden via `hide_theme_toggle: true` on astrophotography pages)

### Font Loading Strategy
- Fonts loaded per-page in `astrophotography.html` and `_layouts/astro-workflow.html` via `<link>` — not globally in `default.html`
- Full font set: Italiana, Newsreader (ital,opsz,wght), Spectral (ital,wght), Manrope (wght), Space Grotesk (wght), JetBrains Mono (wght) — check existing JetBrains Mono weights first and extend if needed
- `display=swap` on all — matches existing site approach

### Toggle UX on Astro Pages
- Astro-specific toggle replaces the sun/moon toggle on astro pages — `hide_theme_toggle: true` is already set, so astro pages render their own toggle
- Minimal text label style: something like "◐ Atlas" / "◑ Night" — matches editorial tone of both themes
- Homepage and writing posts: completely unaffected — different localStorage key, different toggle, no coupling

### Claude's Discretion
- Exact toggle button markup and placement within astro mast headers (Phase 5/6 will define the visual mast; Phase 4 just ensures the JS and CSS classes work)
- Whether to co-locate the JS inline in each astro page or in a small shared `<script>` block
- The default theme class when neither localStorage nor prefers-color-scheme provides a signal (default to `.theme-night` — dark is the astrophotography context default)

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `_layouts/default.html` already has working `prefers-color-scheme` + `localStorage('theme')` + `data-theme` attribute pattern — the astro toggle should follow the same structural approach with a different key
- `astrophotography.html` already has `hide_theme_toggle: true` and `theme: dark` in front matter — page loads with dark by default already
- `assets/css/portfolio.css` has `.theme-toggle` class and `[data-theme="light"]` / `[data-theme="dark"]` selectors — do not modify these

### Established Patterns
- Theme applied as attribute on `<html>` element via `document.documentElement.setAttribute('data-theme', ...)`
- `localStorage.getItem('theme')` / `localStorage.setItem('theme', ...)` for persistence
- Inline `<script>` in `<head>` to avoid FOUC (flash of unstyled content) — same pattern needed for astro theme
- CSS custom properties (`--var`) for color tokens — already established in portfolio.css

### Integration Points
- `astrophotography.html` — add font `<link>`, astro-themes.css `<link>`, and the inline FOUC-prevention script
- `_layouts/astro-workflow.html` — same additions
- New file: `assets/css/astro-themes.css` — define `.theme-atlas` and `.theme-night` token blocks here

</code_context>

<specifics>
## Specific Ideas

- The design tokens for `.theme-atlas` come from `refresh.css` `.cx-atlas` block: `--paper: #ede6d3`, `--paper-d: #ddd4be`, `--ink: #1a1f2b`, `--ink-mid: #4a4a4a`, `--ink-sub: #786c54`, `--rule: rgba(26,31,43,0.18)`, `--accent: #a04a2e`, `--mono: "JetBrains Mono"`, `--serif: "Spectral"`, `--display: "Italiana"`
- The design tokens for `.theme-night` come from `refresh.css` `.cx-night` block: `--bg: #07080b`, `--bg-2: #0d0f14`, `--ink: #ece5d4`, `--ink-mid: #a89f8a`, `--ink-sub: #6a6357`, `--rule: rgba(236,229,212,0.10)`, `--accent: #d4a76a`, `--display: "Newsreader"`, `--sans: "Space Grotesk"`, `--body: "Manrope"`, `--mono: "JetBrains Mono"`
- Design source files are at `/tmp/astro-blog-post/project/refresh.css`, `concept-atlas.jsx`, `concept-night.jsx`

</specifics>

<deferred>
## Deferred Ideas

- Before/after image slider — out of scope for v1.1
- Vintage/retro third theme — designed but not requested
- Tab strip for image variants (final/starless/B&W) — deferred to later milestone

</deferred>
