# Portfolio Redesign — Design Spec

**Date:** 2026-05-05
**Scope:** Full rewrite of `_layouts/home.html` and `assets/css/portfolio.css`. Blog post layout (`_layouts/post.html`) and prose styles are untouched.

---

## Approach

Option A — clean rewrite. The new design diverges enough from the current structure that patching the old CSS would create more confusion than starting fresh. `home.html` and `portfolio.css` are replaced entirely.

---

## Layout

Two-column CSS grid: `1fr 230px`. The sidebar spans the full height of page content alongside the main column. On mobile (< 768px) the sidebar collapses to a stacked block below the main content.

### Zones (top to bottom)

1. **Nav** — sticky
2. **Hero** — full-width within main column
3. **Tech strip** — below hero, within main column
4. **Writing** — below tech strip, within main column
5. **Sidebar** — right column, spans hero through writing

---

## Nav

- **Left**: blank
- **Center**: `Chaitanya Khoje` — Playfair Display 17px, `--ink`
- **Right**: `Work · Writing · GitHub` links (11px DM Mono uppercase, `--ink-faint`) + theme toggle icon button
- **Sticky**: `position: sticky; top: 0`
- **Background**: `--bg` at 85% opacity + `backdrop-filter: blur(14px)`
- **Bottom border**: `1px solid var(--rule)`

---

## Hero

| Element | Spec |
|---|---|
| Kicker | `SENIOR SOFTWARE ENGINEER · SUNNYVALE CA` · 10px DM Mono · `--accent` · 3px letter-spacing · uppercase |
| Title | Playfair Display · ~58px · line-height 0.94 · letter-spacing -1.5px · 3 lines · one italic word in `--accent` |
| Bio | Space Grotesk 300 · 14px · `--ink-soft` · max-width 440px · line-height 1.65 |
| CTAs | `Email me` (filled: `--ink` bg, `--bg` text) · `LinkedIn` · `GitHub` (ghost: `1px --rule` border, `--ink-soft` text) · no border-radius · DM Mono 11px |

---

## Tech Strip

- **Label**: `STACK` — 9px DM Mono, `--ink-faint`, 2.5px letter-spacing, uppercase, right-margin 16px, non-wrapping
- **Content**: all technologies as plain `·`-separated text — DM Mono 12px, `--ink-soft`, wraps naturally
- No bold, no pills, no category grouping, no visual hierarchy within the strip
- Full tool list: Python · SQL · Java · TypeScript · Bash · Apache Airflow · dbt · Snowflake · BigQuery · Kafka · Looker · Debezium · GCP · GKE · AWS · S3 · Lambda · Docker · Kubernetes · OpenSearch · Vertex AI · LLM integration · Seldon Core · Ollama · LiteLLM · GitHub Actions · ArgoCD · Datadog · Sentry · PagerDuty
- Bordered top and bottom with `1px solid var(--rule)`

---

## Writing Section

- **Section label**: `LATEST WRITING` — 9px DM Mono, `--ink-faint`, 2.5px letter-spacing, uppercase
- **Post row**: flex, space-between
  - Left: post title (Playfair Display 17px, `--ink`, line-height 1.25, letter-spacing -0.3px) + description below (12px Space Grotesk, `--ink-soft`)
  - Right: date (10px DM Mono, `--ink-faint`, non-wrapping)
- Multiple posts separated by `1px solid var(--rule)` lines
- Padding: 24px 40px

---

## Experience Sidebar

- **Width**: 230px
- **Background**: `--bg-sub`
- **No colored border** — separated from main column by `1px solid var(--rule)` only
- **Section label**: `EXPERIENCE` — same label treatment as other sections

### Each experience entry
| Element | Spec |
|---|---|
| Company | 12px Space Grotesk 600, `--ink` |
| Role | 10px DM Mono, `--accent` |
| Date | 10px DM Mono, `--ink-faint` |
| Description | 11px Space Grotesk, `--ink-soft`, line-height 1.5, 2-line max |
| Separator | `1px solid var(--rule)` between entries |

### Education
Appended below a top rule after the last experience entry:
- Degree: 11px Space Grotesk 600, `--ink`
- School + year: 10px DM Mono, `--ink-faint`

---

## Theme System

### Light mode (default)
```
--bg:       #ffffff
--bg-sub:   #fafafa
--rule:     #eeeeee
--ink:      #111111
--ink-soft: #777777
--ink-faint:#bbbbbb
--accent:   #e8632a
```

### Dark mode
```
--bg:       #0d0d0d
--bg-sub:   #111111
--rule:     #1e1e1e
--ink:      #f0ece4
--ink-soft: #6a6a6a
--ink-faint:#333333
--accent:   #e8632a
```

- Default: system `prefers-color-scheme`
- Persisted via `localStorage` key `theme`
- Toggle: icon button in nav right — sun icon in dark mode, moon icon in light mode
- Transition: `background 0.2s, color 0.2s` on `body`

---

## Typography

| Role | Font | Size | Weight |
|---|---|---|---|
| Hero title, post titles, nav name | Playfair Display | 58px / 17px | 700 |
| Body, bio, descriptions, CTAs | Space Grotesk | 14px / 12px / 11px | 300–600 |
| Kickers, labels, dates, tech strip | DM Mono | 12px / 10px / 9px | 400 |

Google Fonts load: `Playfair+Display:ital,wght@0,700;1,700` + `Space+Grotesk:wght@300;400;500;600` + `DM+Mono:wght@400;500`

---

## Mobile (< 768px)

- Two-column grid collapses to single column
- Sidebar renders below main content as a full-width block
- Hero title scales down: `clamp(36px, 8vw, 58px)`
- Tech strip wraps freely, `STACK` label moves above the text
- Nav links hidden or collapsed; name and toggle remain

---

## Files Changed

| File | Action |
|---|---|
| `_layouts/home.html` | Full rewrite |
| `assets/css/portfolio.css` | Full rewrite |
| `_layouts/default.html` | Minor: update Google Fonts link |
| `_layouts/post.html` | No change |
