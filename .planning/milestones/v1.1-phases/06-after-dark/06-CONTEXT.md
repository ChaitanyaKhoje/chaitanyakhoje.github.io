# Phase 6: After Dark - Context

**Gathered:** 2026-05-20  
**Status:** Ready for planning

<domain>
## Phase Boundary

Implement the complete After Dark dark theme for both astrophotography pages. Under `html.theme-night`, the listing becomes a cinematic near-black feed with a large italic mast, mono stats row, and feed-row sessions with thumbnails. The post page becomes a wide cinematic hero plus a two-column prose / sidenotes layout with minimal mast navigation.

</domain>

<decisions>
## Implementation Decisions

### After Dark Listing Layout
- Use a dedicated night-shell inside `astrophotography.html` that mirrors the `concept-night.jsx` listing prototype: brand mast, large italic headline, mono stats row, and feed-row session list
- Each feed row should link to the existing astro post URL and render thumbnail, title, designation, integration, subs, Bortle, and date
- The current Field Atlas markup remains in the file but is hidden under `html.theme-night` so the night shell is the only visible listing

### After Dark Post Layout
- Use a dedicated night-shell inside `_layouts/astro-workflow.html` that mirrors the `concept-night.jsx` post prototype: minimal mast, full-bleed cinematic hero, and two-column content grid
- Render `page.hero_image` first when present, with an SVG fallback only when a hero image is missing
- Keep the markdown body in one prose column and gear / pipeline notes in the side column
- The existing Field Atlas post markup remains in the file but is hidden under `html.theme-night`

### CSS Scoping and Jekyll Integration
- Create `assets/css/astro-night.css` for all `html.theme-night` layout rules and hide the atlas / legacy night markup as needed
- Keep the theme toggle working with the existing `astro-theme-toggle` button and `astro-theme` localStorage key
- Use the existing post front matter as-is: `page.target`, `page.object_type`, `page.capture.*`, `page.hero_image`, `page.gear.*`

### Source Reference
- Prototype source: `/Users/chaitanya/Downloads/astro-blog-post.zip`
- Night design files: `concept-night.jsx`, `listing.jsx`, `post.jsx`, `refresh.css`

</decisions>

<code_context>
## Existing Code Insights

### Reusable Assets
- `html.theme-atlas` / `html.theme-night` theme tokens already exist in `assets/css/astro-themes.css`
- `astrophotography.html` already has the astro theme toggle and shared data loop over `astro_posts`
- `_layouts/astro-workflow.html` already has the astro theme toggle, hero image handling, and `page.*` front matter rendering
- The site currently has one astro post with `hero_image` and the expected capture / gear fields

### Established Patterns
- Theme-scoped CSS should live under `html.theme-night`
- Jekyll Liquid loops should drive the listing feed rows
- Use `relative_url` for all internal asset / post links
- Preserve 2-space indentation

</code_context>

<specifics>
## Specific Ideas

- Listing mast: `Khoje · after dark` italic brand on the left, navigation or toggle on the right
- Listing headline: `Light, given time enough to arrive.`
- Listing stats: sessions, integration, subs
- Post hero: wide full-bleed image plate, RA / Dec floats, scale text, title overlay, and gradient readability band
- Post body: left prose column and right sidenotes / pipeline notes
- Footer: minimal three-part mono strip anchored to the bottom

</specifics>

<deferred>
## Deferred Ideas

- Interactivity on the night listing thumbnails beyond click-to-open
- Secondary night variant / alternate palette
- Animated starfield or parallax background beyond the current prototype treatment

</deferred>
