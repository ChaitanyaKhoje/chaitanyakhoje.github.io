# Design: Light Mode Toggle + Blog Workflow

Date: 2026-05-03

## Feature 1: Light Mode Toggle

### Architecture

- `data-theme` attribute on `<html>` element drives all theming
- CSS variable overrides in `assets/css/blog.css` under `[data-theme="light"]`
- No-flash script in `<head>` of `_layouts/default.html` (before CSS link) reads `localStorage` and applies `data-theme` synchronously
- Toggle button in nav (right side, before GitHub link): sun/moon SVG icon, no label

### Light Palette (warm paper)

```
--bg:        #faf9f7
--surface:   #f5f3ef
--elev:      #ffffff
--ink:       #1c1917
--ink-soft:  #57534e
--ink-faint: #a8a29e
--rule:      #e7e5e4
--accent:    #3b59f7  (unchanged)
```

### Behavior

1. **First visit**: read `prefers-color-scheme`. `dark` → dark mode (current default). `light` → light mode.
2. **Toggle click**: flip theme, save to `localStorage("theme")`.
3. **Return visits**: `localStorage` value wins over OS preference.
4. **No flash**: inline `<script>` in `<head>` before CSS applies `data-theme` synchronously before paint.

### Files Changed

- `assets/css/blog.css` — add `[data-theme="light"]` block with warm palette overrides; update scrollbar thumb for light mode
- `_layouts/default.html` — add no-flash inline script in `<head>`; add toggle button in nav with sun/moon SVG; add toggle JS

---

## Feature 2: `bin/new-post` Interactive Mode

### Architecture

- Existing flag-based CLI (`bin/new-post "Title" --tags foo,bar`) unchanged — no regressions
- When run with no arguments: enter interactive mode, prompt one question at a time
- After file creation: auto-open in editor

### Interactive Flow

```
$ bin/new-post
Title: The hidden cost of N+1 queries
Description (optional): Why ORMs quietly destroy your DB at scale
Tags (comma-separated, optional): postgres, databases, performance
→ created _posts/2026-05-03-the-hidden-cost-of-n-1-queries.md
→ opening in editor...
```

### Auto-Open Logic

Try in order: `$EDITOR` env var → `code` → `cursor` → `vim`. Always print the path regardless.

### Body Scaffold (replaces current placeholder)

```markdown
Write the opening paragraph here — the hook that makes someone keep reading.

## Background

## The Problem

## Solution

## Takeaways

- 
```

### Files Changed

- `bin/new-post` — add interactive prompt path (triggered when `ARGV` is empty after `parse!`); add auto-open logic; update body scaffold
