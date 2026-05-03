# Field Notes Blog Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing photography portfolio site with a clean Jekyll-based technical blog ("Field Notes") using the Modern (B) design — dark, Vercel/Linear aesthetic, Inter + JetBrains Mono, accent-blue `#3b59f7`.

**Architecture:** Jekyll powers content and routing (posts as Markdown files in `_posts/`, individual post pages via a layout). A single shared CSS file provides the design system. All JS is vanilla, inlined per-layout where needed. No React, no build tool beyond Jekyll. The blog is the entire site — no gallery, no contact page, no old content.

**Tech Stack:** Jekyll 4.3, Kramdown, GitHub Pages, html-proofer for CI, Inter + JetBrains Mono via Google Fonts.

---

## File Map

| Action | File | Responsibility |
|--------|------|---------------|
| **Delete** | `index.md`, `about.md`, `gallery.md`, `catalog.md`, `contact.md` | Old photography pages — gone |
| **Delete** | `_layouts/gallery.html`, `_layouts/gallery_item.html` | Old layouts |
| **Delete** | `_includes/gallery-item.html` | Old include |
| **Delete** | `_gallery_items/andromeda.md` | Old content |
| **Delete** | `_data/gallery.yml` | Old data |
| **Delete** | `assets/css/main.css`, `css/main.css`, `js/main.js`, `js/protection.js` | Old styles/JS |
| **Delete** | `theme-preview.html` | Old preview |
| **Keep/rewrite** | `_config.yml` | Site config — update title, description, permalink |
| **Keep/rewrite** | `Gemfile` | Same gems, keep jekyll-feed/seo/sitemap |
| **Keep/rewrite** | `Rakefile` | Keep html-proofer task |
| **Keep** | `.github/workflows/test.yml` | CI — unchanged |
| **Create** | `_layouts/default.html` | Nav + footer shell used by all layouts |
| **Create** | `_layouts/home.html` | Home: hero + tag filter + post grid |
| **Create** | `_layouts/post.html` | Single post reader view |
| **Create** | `assets/css/blog.css` | Full design system (vars, nav, prose, cards, modal, editor) |
| **Create** | `assets/js/blog.js` | Tag filter, syntax highlight, publish modal UX |
| **Create** | `index.html` | Home page (uses `home` layout, front matter only) |
| **Create** | `_posts/2025-04-28-the-1.4ms-mystery.md` | Seed post 1 — latency spike |
| **Create** | `_posts/2025-04-14-on-deleting-code.md` | Seed post 2 — essay |
| **Create** | `_posts/2025-03-30-postgres-locks.md` | Seed post 3 — Postgres |
| **Create** | `_posts/2025-03-11-rust-async-state-machines.md` | Seed post 4 — Rust |
| **Create** | `_posts/2025-02-22-why-i-still-write-tests-first.md` | Seed post 5 — TDD |

---

## Task 1: Nuke old site content

**Files:**
- Delete: `index.md`, `about.md`, `gallery.md`, `catalog.md`, `contact.md`
- Delete: `_layouts/gallery.html`, `_layouts/gallery_item.html`
- Delete: `_includes/gallery-item.html`
- Delete: `_gallery_items/andromeda.md`
- Delete: `_data/gallery.yml`
- Delete: `assets/css/main.css`, `css/` (whole dir), `js/main.js`, `js/protection.js`
- Delete: `theme-preview.html`, `blog.html`

- [ ] **Step 1: Remove all old content and asset files**

```bash
cd /Users/chaitanya/Documents/github/chaitanyakhoje.github.io

# Content pages
rm index.md about.md gallery.md catalog.md contact.md

# Old layouts & includes
rm _layouts/gallery.html _layouts/gallery_item.html
rm _includes/gallery-item.html

# Old gallery data/content
rm -rf _gallery_items _data

# Old CSS/JS
rm -rf css/
rm assets/css/main.css
rm js/main.js js/protection.js

# Old preview files
rm theme-preview.html blog.html
```

- [ ] **Step 2: Verify deletions**

```bash
find . -not -path './.git/*' -not -path './docs/*' -not -path './.claude/*' -not -path './.github/*' -not -path './assets/images/*' | sort
```

Expected — only these paths remain:
```
./_config.yml
./Gemfile
./Gemfile.lock
./Rakefile
./_layouts/default.html   ← still exists, will be rewritten
./assets/images/...       ← placeholder images, harmless
```

- [ ] **Step 3: Commit**

```bash
git add -A
git commit -m "chore: remove old photography site content"
```

---

## Task 2: Update `_config.yml`

**Files:**
- Modify: `_config.yml`

- [ ] **Step 1: Rewrite config**

Replace the entire file with:

```yaml
title: "Field Notes"
tagline: "Engineering, written down."
author:
  name: "Chaitanya Khoje"
  email: "chaitanyakhoje9@gmail.com"
  github: "chaitanyakhoje"
description: >-
  Field Notes by Chaitanya Khoje. Software engineering observations —
  performance, databases, Rust, Go, craft.
baseurl: ""
url: "https://chaitanyakhoje.github.io"

# Permalinks
permalink: /posts/:slug/

# Build
markdown: kramdown
highlighter: rouge

kramdown:
  input: GFM
  syntax_highlighter: rouge

plugins:
  - jekyll-feed
  - jekyll-seo-tag
  - jekyll-sitemap

# Exclude
exclude:
  - Gemfile
  - Gemfile.lock
  - node_modules
  - vendor
  - .sass-cache
  - .jekyll-cache
  - README.md
  - Rakefile
  - .github
  - docs/
```

- [ ] **Step 2: Verify Jekyll parses it**

```bash
bundle exec jekyll build --dry-run 2>&1 | tail -5
```

Expected: no config errors, site generates.

- [ ] **Step 3: Commit**

```bash
git add _config.yml
git commit -m "chore: reconfigure Jekyll for blog"
```

---

## Task 3: Create the CSS design system

**Files:**
- Create: `assets/css/blog.css`

This is the single stylesheet for the entire site. It encodes the Modern (B) design: dark zinc palette, Inter, JetBrains Mono, accent blue `#3b59f7`.

- [ ] **Step 1: Create `assets/css/blog.css`**

```css
/* ── Reset & base ─────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:          #0a0a0a;
  --surface:     #111113;
  --elev:        #18181b;
  --ink:         #fafafa;
  --ink-soft:    #a1a1aa;
  --ink-faint:   #71717a;
  --rule:        #27272a;
  --accent:      #3b59f7;
  --accent-dim:  rgba(59,89,247,0.13);
  --sans:        'Inter', system-ui, sans-serif;
  --mono:        'JetBrains Mono', ui-monospace, monospace;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 15px;
  line-height: 1.6;
  letter-spacing: -0.01em;
  -webkit-font-smoothing: antialiased;
  min-height: 100vh;
}

::-webkit-scrollbar { width: 8px; }
::-webkit-scrollbar-thumb { background: #333; border-radius: 999px; }
::-webkit-scrollbar-track { background: transparent; }

/* ── Nav ──────────────────────────────────────────────── */
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: rgba(10,10,10,0.85);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--rule);
}

.nav-inner {
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 24px;
  height: 53px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
}

.nav-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  text-decoration: none;
  color: var(--ink);
}

.nav-logo-mark {
  width: 26px;
  height: 26px;
  border-radius: 7px;
  background: var(--accent);
  display: grid;
  place-items: center;
  color: #fff;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: -0.5px;
  flex-shrink: 0;
}

.nav-logo-text {
  font-weight: 600;
  font-size: 14px;
  letter-spacing: -0.2px;
}

.nav-links {
  display: flex;
  gap: 4px;
  align-items: center;
}

.nav-link {
  background: transparent;
  border: none;
  cursor: pointer;
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
  color: var(--ink-soft);
  padding: 6px 10px;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.12s, color 0.12s;
  display: inline-flex;
  align-items: center;
}

.nav-link:hover { background: var(--surface); color: var(--ink); }
.nav-link.active { background: var(--surface); color: var(--ink); }

/* ── Home hero ────────────────────────────────────────── */
.home-wrap {
  max-width: 1100px;
  margin: 0 auto;
  padding: 60px 24px 120px;
}

.home-hero {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 60px;
  align-items: end;
  margin-bottom: 56px;
}

@media (max-width: 720px) {
  .home-hero { grid-template-columns: 1fr; gap: 32px; }
}

.hero-status {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 18px;
}

.status-dot {
  width: 6px; height: 6px;
  border-radius: 50%;
  background: #22c55e;
  box-shadow: 0 0 0 4px rgba(34,197,94,0.2);
  animation: pulse 2.5s infinite;
}

@keyframes pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(34,197,94,0.4); }
  50%       { box-shadow: 0 0 0 6px transparent; }
}

.hero-status-text {
  font-size: 12px;
  color: var(--ink-soft);
  font-family: var(--mono);
}

.hero-title {
  font-weight: 600;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.02;
  letter-spacing: -1.6px;
  margin-bottom: 18px;
  text-wrap: balance;
}

.hero-bio {
  font-size: 18px;
  color: var(--ink-soft);
  max-width: 520px;
  text-wrap: pretty;
}

.hero-card {
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 12px;
  padding: 18px;
}

.hero-card-label {
  font-size: 12px;
  color: var(--ink-soft);
  margin-bottom: 12px;
  font-family: var(--mono);
}

.platform-list { list-style: none; display: flex; flex-direction: column; gap: 8px; }

.platform-item {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  text-decoration: none;
  color: inherit;
}

.platform-dot { width: 6px; height: 6px; border-radius: 50%; flex-shrink: 0; }
.platform-name { color: var(--ink-soft); font-family: var(--mono); font-size: 12px; }
.platform-arrow { margin-left: auto; font-size: 11px; color: var(--ink-faint); }

/* ── Tag filter ───────────────────────────────────────── */
.tag-filters {
  display: flex;
  gap: 6px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}

.tag-pill {
  font-family: var(--sans);
  font-size: 12px;
  font-weight: 500;
  padding: 5px 10px;
  border-radius: 999px;
  cursor: pointer;
  border: 1px solid var(--rule);
  background: transparent;
  color: var(--ink-soft);
  text-decoration: none;
  transition: all 0.12s;
}

.tag-pill:hover { border-color: var(--ink-soft); color: var(--ink); }
.tag-pill.active { border-color: var(--ink); background: var(--ink); color: var(--bg); }

/* ── Post grid ────────────────────────────────────────── */
.post-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 14px;
}

@media (max-width: 640px) { .post-grid { grid-template-columns: 1fr; } }

.post-card {
  border: 1px solid var(--rule);
  border-radius: 12px;
  padding: 22px;
  background: var(--elev);
  display: flex;
  flex-direction: column;
  gap: 10px;
  position: relative;
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: border-color 0.15s;
}

.post-card:hover { border-color: #3f3f46; }
.post-card.featured { grid-column: 1 / -1; }

.post-card-glow {
  position: absolute;
  top: 0; right: 0;
  width: 200px; height: 200px;
  background: radial-gradient(circle at top right, var(--accent-dim), transparent 70%);
  pointer-events: none;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-faint);
}

.latest-badge { margin-left: auto; color: var(--accent); font-weight: 600; }

.post-title {
  font-weight: 600;
  letter-spacing: -0.6px;
  line-height: 1.15;
  text-wrap: balance;
}

.post-dek { color: var(--ink-soft); font-size: 14px; text-wrap: pretty; }

.post-tags {
  display: flex;
  gap: 6px;
  margin-top: auto;
  padding-top: 8px;
  flex-wrap: wrap;
}

.post-tag {
  font-size: 11px;
  color: var(--ink-soft);
  padding: 2px 7px;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 4px;
}

/* ── Single post ──────────────────────────────────────── */
.post-wrap {
  max-width: 700px;
  margin: 0 auto;
  padding: 40px 24px 120px;
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  color: var(--ink-soft);
  text-decoration: none;
  margin-bottom: 28px;
  transition: color 0.12s;
}

.back-link:hover { color: var(--ink); }

.post-header { margin-bottom: 36px; }

.post-header-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 12px;
  font-family: var(--mono);
  color: var(--ink-faint);
  margin-bottom: 16px;
  flex-wrap: wrap;
}

.post-h1 {
  font-weight: 600;
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.05;
  letter-spacing: -1.4px;
  margin-bottom: 16px;
  text-wrap: balance;
}

.post-subtitle {
  font-size: 19px;
  color: var(--ink-soft);
  line-height: 1.5;
  text-wrap: pretty;
}

.post-header-tags {
  display: flex;
  gap: 6px;
  margin-top: 22px;
  flex-wrap: wrap;
}

.post-header-tag {
  font-size: 12px;
  color: var(--ink-soft);
  padding: 3px 10px;
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 0.12s, color 0.12s;
}

.post-header-tag:hover { border-color: var(--ink-soft); color: var(--ink); }

/* ── Prose ────────────────────────────────────────────── */
.prose { font-size: 16px; line-height: 1.75; }
.prose p { margin-bottom: 1.4em; }

.prose h2 {
  font-size: 22px;
  font-weight: 600;
  letter-spacing: -0.5px;
  margin: 2.2em 0 0.7em;
}

.prose h3 {
  font-size: 17px;
  font-weight: 600;
  margin: 1.8em 0 0.5em;
}

.prose ul, .prose ol {
  padding-left: 1.4em;
  margin-bottom: 1.4em;
}

.prose li { margin-bottom: 0.35em; }

.prose strong { font-weight: 600; }
.prose em { font-style: italic; }

.prose a {
  color: var(--ink);
  text-decoration: underline;
  text-underline-offset: 3px;
  text-decoration-thickness: 1px;
}

.prose code {
  font-family: var(--mono);
  font-size: 0.88em;
  background: rgba(255,255,255,0.07);
  padding: 1px 6px;
  border-radius: 4px;
}

.prose pre {
  background: var(--surface);
  border: 1px solid var(--rule);
  border-radius: 10px;
  padding: 20px 22px;
  margin: 1.8em 0;
  overflow-x: auto;
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.65;
}

.prose pre code {
  background: none;
  padding: 0;
  font-size: 13px;
}

.prose blockquote {
  border-left: 3px solid var(--accent);
  padding: 12px 18px;
  margin: 1.8em 0;
  background: var(--accent-dim);
  border-radius: 0 8px 8px 0;
  color: var(--ink-soft);
  font-style: italic;
}

/* Rouge syntax highlighting — dark theme tokens */
.highlight .c, .highlight .c1, .highlight .cm { color: #6c727d; font-style: italic; } /* comments */
.highlight .s, .highlight .s1, .highlight .s2 { color: #f9b87f; }                     /* strings */
.highlight .k, .highlight .kd, .highlight .kn { color: #a5b4fc; font-weight: 600; }   /* keywords */
.highlight .m, .highlight .mi, .highlight .mf { color: #f0a875; }                     /* numbers */
.highlight .nf { color: #86efac; }                                                      /* function names */
.highlight .n  { color: var(--ink); }                                                   /* names */
.highlight .o  { color: var(--ink-soft); }                                              /* operators */
.highlight .p  { color: var(--ink-soft); }                                              /* punctuation */

/* ── Post footer ──────────────────────────────────────── */
.post-footer {
  margin-top: 56px;
  padding: 20px;
  border: 1px solid var(--rule);
  border-radius: 12px;
  background: var(--surface);
  display: flex;
  align-items: center;
  gap: 16px;
  justify-content: space-between;
  flex-wrap: wrap;
}

.post-footer-title { font-weight: 600; font-size: 14px; margin-bottom: 4px; }
.post-footer-sub   { font-size: 13px; color: var(--ink-soft); }
.post-footer-actions { display: flex; gap: 8px; }

/* ── Buttons ──────────────────────────────────────────── */
.btn {
  font-family: var(--sans);
  font-size: 13px;
  font-weight: 500;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  border: 1px solid var(--rule);
  background: transparent;
  color: var(--ink);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: all 0.12s;
}

.btn:hover { background: var(--elev); }

.btn-primary {
  border-color: var(--ink);
  background: var(--ink);
  color: var(--bg);
}

.btn-primary:hover { opacity: 0.87; }

/* ── Publish modal ────────────────────────────────────── */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.7);
  backdrop-filter: blur(4px);
  z-index: 100;
  display: none;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal-overlay.open { display: flex; }

.modal-box {
  background: var(--elev);
  border: 1px solid var(--rule);
  border-radius: 16px;
  width: 100%;
  max-width: 520px;
  overflow: hidden;
  animation: modalIn 0.18s ease both;
}

@keyframes modalIn {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.modal-header {
  padding: 20px 24px 16px;
  border-bottom: 1px solid var(--rule);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
}

.modal-title { font-weight: 600; font-size: 16px; letter-spacing: -0.3px; margin-bottom: 4px; }
.modal-sub   { font-size: 13px; color: var(--ink-soft); }

.modal-close {
  background: none; border: none; cursor: pointer;
  color: var(--ink-faint); font-size: 18px;
  padding: 4px; border-radius: 6px; line-height: 1;
  flex-shrink: 0; transition: color 0.12s;
}

.modal-close:hover { color: var(--ink); }

.modal-body { padding: 20px 24px; display: flex; flex-direction: column; gap: 10px; }

.platform-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 16px;
  border: 1px solid var(--rule);
  border-radius: 10px;
  background: var(--surface);
}

.platform-icon {
  width: 32px; height: 32px;
  border-radius: 8px;
  display: grid; place-items: center;
  font-size: 14px; font-weight: 700;
  font-family: var(--mono);
  flex-shrink: 0;
}

.platform-info { flex: 1; min-width: 0; }
.platform-info-name { font-weight: 500; font-size: 14px; margin-bottom: 2px; }
.platform-info-url  { font-size: 11px; color: var(--ink-faint); font-family: var(--mono); }

.platform-btn {
  font-family: var(--sans);
  font-size: 12px; font-weight: 500;
  padding: 6px 12px; border-radius: 6px;
  cursor: pointer;
  border: 1px solid var(--rule);
  background: transparent; color: var(--ink-soft);
  white-space: nowrap; transition: all 0.12s;
}

.platform-btn:hover { border-color: var(--ink-soft); color: var(--ink); }
.platform-btn.publishing { color: var(--accent); border-color: rgba(59,89,247,0.4); }
.platform-btn.done       { color: #22c55e; border-color: rgba(34,197,94,0.4); }

.canonical-row {
  padding: 12px 16px;
  border: 1px solid var(--rule);
  border-radius: 10px;
  background: var(--surface);
}

.canonical-label {
  font-size: 11px; color: var(--ink-faint);
  font-family: var(--mono);
  letter-spacing: 0.5px; text-transform: uppercase;
  margin-bottom: 6px;
}

.canonical-input {
  width: 100%; background: transparent; border: none; outline: none;
  color: var(--ink-soft); font-family: var(--mono); font-size: 13px;
}

.modal-footer {
  padding: 16px 24px;
  border-top: 1px solid var(--rule);
  display: flex;
  justify-content: flex-end;
}

/* ── Fade-in entrance ─────────────────────────────────── */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-in   { animation: fadeUp 0.4s ease both; }
.fade-in-1 { animation-delay: 0.05s; }
.fade-in-2 { animation-delay: 0.12s; }
.fade-in-3 { animation-delay: 0.19s; }
.fade-in-4 { animation-delay: 0.26s; }

/* ── Reading progress bar ─────────────────────────────── */
.progress-bar {
  position: fixed;
  top: 53px; left: 0;
  height: 2px;
  background: var(--accent);
  width: 0%;
  z-index: 49;
  transition: width 0.1s linear;
}
```

- [ ] **Step 2: Verify file exists**

```bash
ls -lh assets/css/blog.css
```

Expected: file exists, ~6KB.

- [ ] **Step 3: Commit**

```bash
git add assets/css/blog.css
git commit -m "feat: add blog CSS design system"
```

---

## Task 4: Create the default layout

**Files:**
- Modify: `_layouts/default.html`

This is the outer shell used by every page: `<html>`, fonts, nav, footer. Home and post layouts extend this.

- [ ] **Step 1: Rewrite `_layouts/default.html`**

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>{% if page.title %}{{ page.title }} — {% endif %}{{ site.title }}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="{% if page.description %}{{ page.description }}{% else %}{{ site.description }}{% endif %}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="{{ '/assets/css/blog.css' | relative_url }}" />
  {% seo %}
</head>
<body>

  <nav class="topbar">
    <div class="nav-inner">
      <a class="nav-logo" href="{{ '/' | relative_url }}">
        <div class="nav-logo-mark">C</div>
        <span class="nav-logo-text">chaitanya / field notes</span>
      </a>
      <div class="nav-links">
        <a class="nav-link {% if page.url == '/' %}active{% endif %}" href="{{ '/' | relative_url }}">Posts</a>
        <a class="nav-link" href="https://github.com/chaitanyakhoje" target="_blank" rel="noopener">GitHub</a>
      </div>
    </div>
  </nav>

  {{ content }}

</body>
</html>
```

- [ ] **Step 2: Verify Jekyll builds**

```bash
bundle exec jekyll build 2>&1 | tail -10
```

Expected: build succeeds (may warn about missing index — that's OK until Task 6).

- [ ] **Step 3: Commit**

```bash
git add _layouts/default.html
git commit -m "feat: add default layout shell"
```

---

## Task 5: Create the home layout

**Files:**
- Create: `_layouts/home.html`

Renders the hero, tag filter pills, and 2-column post grid. Tag filtering is done with vanilla JS by toggling `data-tags` on article elements.

- [ ] **Step 1: Create `_layouts/home.html`**

```html
---
layout: default
---

<div class="home-wrap">

  <!-- Hero -->
  <section class="home-hero">
    <div>
      <div class="hero-status fade-in">
        <span class="status-dot"></span>
        <span class="hero-status-text">Writing regularly · since 2024</span>
      </div>
      <h1 class="hero-title fade-in fade-in-1">Engineering,<br>written down.</h1>
      <p class="hero-bio fade-in fade-in-2">
        Software engineer. I write about the parts of building software that nobody puts in the changelog.
      </p>
    </div>
    <div class="hero-card fade-in fade-in-2">
      <p class="hero-card-label">↳ Cross-posted to</p>
      <ul class="platform-list">
        <li class="platform-item">
          <span class="platform-dot" style="background:#0a0a0a;border:1px solid #555"></span>
          <span class="platform-name">dev.to/chaitanyakhoje</span>
          <span class="platform-arrow">↗</span>
        </li>
        <li class="platform-item">
          <span class="platform-dot" style="background:#1a8917"></span>
          <span class="platform-name">medium.com/@chaitanyakhoje</span>
          <span class="platform-arrow">↗</span>
        </li>
        <li class="platform-item">
          <span class="platform-dot" style="background:#ff6719"></span>
          <span class="platform-name">chaitanyakhoje.substack.com</span>
          <span class="platform-arrow">↗</span>
        </li>
      </ul>
    </div>
  </section>

  <!-- Tag filter -->
  <div class="tag-filters fade-in fade-in-3" id="tag-filters">
    <button class="tag-pill active" data-filter="all" onclick="filterTag('all', this)">All posts</button>
    {% assign all_tags = site.posts | map: 'tags' | join: ',' | split: ',' | uniq | sort %}
    {% for tag in all_tags %}
    <button class="tag-pill" data-filter="{{ tag }}" onclick="filterTag('{{ tag }}', this)">#{{ tag }}</button>
    {% endfor %}
  </div>

  <!-- Post grid -->
  <div class="post-grid fade-in fade-in-4" id="post-grid">
    {% for post in site.posts %}
    {% assign reading_time = post.content | number_of_words | divided_by: 230 | plus: 1 %}
    <article
      class="post-card{% if forloop.first %} featured{% endif %}"
      data-tags="{{ post.tags | join: ',' }}"
    >
      {% if forloop.first %}<div class="post-card-glow"></div>{% endif %}
      <div class="post-meta">
        <span>{{ post.date | date: "%b %-d, %Y" }}</span>
        <span>·</span>
        <span>{{ reading_time }} min</span>
        {% if forloop.first %}<span class="latest-badge">● Latest</span>{% endif %}
      </div>
      <a class="post-title" style="font-size:{% if forloop.first %}30px{% else %}19px{% endif %};text-decoration:none;color:inherit;display:block;" href="{{ post.url | relative_url }}">
        {{ post.title }}
      </a>
      <p class="post-dek">{{ post.description | default: post.excerpt | strip_html | truncate: 160 }}</p>
      <div class="post-tags">
        {% for tag in post.tags limit:3 %}
        <span class="post-tag">{{ tag }}</span>
        {% endfor %}
      </div>
    </article>
    {% endfor %}
  </div>

</div>

<script>
function filterTag(tag, el) {
  document.querySelectorAll('.tag-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  document.querySelectorAll('.post-card').forEach((card, i) => {
    const tags = card.dataset.tags ? card.dataset.tags.split(',') : [];
    const show = tag === 'all' || tags.includes(tag);
    card.style.display = show ? '' : 'none';
    // Re-feature the first visible card
    card.classList.remove('featured');
  });
  const visible = Array.from(document.querySelectorAll('.post-card')).filter(c => c.style.display !== 'none');
  if (visible.length) visible[0].classList.add('featured');
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add _layouts/home.html
git commit -m "feat: add home layout with hero and post grid"
```

---

## Task 6: Create the post layout

**Files:**
- Create: `_layouts/post.html`

Single post reader: header with meta, prose body (Jekyll/Kramdown renders Markdown), publish-elsewhere footer + modal, reading progress bar.

- [ ] **Step 1: Create `_layouts/post.html`**

```html
---
layout: default
---

<div class="progress-bar" id="progress-bar"></div>

<div class="post-wrap">
  <a class="back-link" href="{{ '/' | relative_url }}">← All posts</a>

  <header class="post-header">
    {% assign reading_time = content | number_of_words | divided_by: 230 | plus: 1 %}
    {% assign word_count = content | number_of_words %}
    <div class="post-header-meta">
      <span>{{ page.date | date: "%b %-d, %Y" }}</span>
      <span>·</span>
      <span>{{ reading_time }} min read</span>
      <span>·</span>
      <span>{{ word_count }} words</span>
    </div>
    <h1 class="post-h1">{{ page.title }}</h1>
    {% if page.description %}
    <p class="post-subtitle">{{ page.description }}</p>
    {% endif %}
    {% if page.tags %}
    <div class="post-header-tags">
      {% for tag in page.tags %}
      <a class="post-header-tag" href="{{ '/?tag=' | append: tag | relative_url }}">#{{ tag }}</a>
      {% endfor %}
    </div>
    {% endif %}
  </header>

  <div class="prose">
    {{ content }}
  </div>

  <footer class="post-footer">
    <div>
      <p class="post-footer-title">Liked this?</p>
      <p class="post-footer-sub">Cross-post it everywhere — same words, three audiences.</p>
    </div>
    <div class="post-footer-actions">
      <button class="btn btn-primary" onclick="openPublish()">Publish elsewhere →</button>
    </div>
  </footer>
</div>

<!-- Publish modal -->
<div class="modal-overlay" id="publish-modal">
  <div class="modal-box">
    <div class="modal-header">
      <div>
        <p class="modal-title">{{ page.title | truncate: 60 }}</p>
        <p class="modal-sub">Set a canonical URL, then publish to each platform.</p>
      </div>
      <button class="modal-close" onclick="closePublish()">✕</button>
    </div>
    <div class="modal-body">
      <div class="canonical-row">
        <p class="canonical-label">Canonical URL</p>
        <input class="canonical-input" id="canonical-url" type="url"
               value="https://chaitanyakhoje.github.io{{ page.url }}" />
      </div>
      <div class="platform-row">
        <div class="platform-icon" style="background:#111;color:#fff;border:1px solid #333">D</div>
        <div class="platform-info">
          <p class="platform-info-name">dev.to</p>
          <p class="platform-info-url">dev.to/chaitanyakhoje</p>
        </div>
        <button class="platform-btn" onclick="simulatePublish(this)">Publish</button>
      </div>
      <div class="platform-row">
        <div class="platform-icon" style="background:#1a8917;color:#fff">M</div>
        <div class="platform-info">
          <p class="platform-info-name">Medium</p>
          <p class="platform-info-url">medium.com/@chaitanyakhoje</p>
        </div>
        <button class="platform-btn" onclick="simulatePublish(this)">Publish</button>
      </div>
      <div class="platform-row">
        <div class="platform-icon" style="background:#ff6719;color:#fff">S</div>
        <div class="platform-info">
          <p class="platform-info-name">Substack</p>
          <p class="platform-info-url">chaitanyakhoje.substack.com</p>
        </div>
        <button class="platform-btn" onclick="simulatePublish(this)">Publish</button>
      </div>
    </div>
    <div class="modal-footer">
      <button class="btn" onclick="closePublish()">Done</button>
    </div>
  </div>
</div>

<script>
// Reading progress
(function() {
  const bar = document.getElementById('progress-bar');
  const prose = document.querySelector('.prose');
  if (!bar || !prose) return;
  window.addEventListener('scroll', function() {
    const rect = prose.getBoundingClientRect();
    const total = prose.offsetHeight;
    const scrolled = Math.min(Math.max(-rect.top, 0), total);
    bar.style.width = (scrolled / total * 100) + '%';
  }, { passive: true });
})();

// Publish modal
function openPublish() {
  document.getElementById('publish-modal').classList.add('open');
}

function closePublish() {
  document.getElementById('publish-modal').classList.remove('open');
}

document.getElementById('publish-modal').addEventListener('click', function(e) {
  if (e.target === this) closePublish();
});

function simulatePublish(btn) {
  btn.textContent = 'Publishing…';
  btn.className = 'platform-btn publishing';
  setTimeout(function() {
    btn.textContent = '✓ Published';
    btn.className = 'platform-btn done';
  }, 1400 + Math.random() * 600);
}
</script>
```

- [ ] **Step 2: Commit**

```bash
git add _layouts/post.html
git commit -m "feat: add post layout with reading progress and publish modal"
```

---

## Task 7: Create the home index page

**Files:**
- Create: `index.html`

One-file home page — nothing but front matter. All rendering is done by the `home` layout.

- [ ] **Step 1: Create `index.html`**

```html
---
layout: home
title: ""
---
```

- [ ] **Step 2: Build and check**

```bash
bundle exec jekyll serve --watch &
sleep 4
curl -s http://localhost:4000/ | grep -c "post-card"
kill %1 2>/dev/null
```

Expected: number >= 1 (post cards are in the HTML).

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: add home index page"
```

---

## Task 8: Add seed posts

**Files:**
- Create: `_posts/2025-04-28-the-1.4ms-mystery.md`
- Create: `_posts/2025-04-14-on-deleting-code.md`
- Create: `_posts/2025-03-30-postgres-locks.md`
- Create: `_posts/2025-03-11-rust-async-state-machines.md`
- Create: `_posts/2025-02-22-why-i-still-write-tests-first.md`

Each post uses Jekyll front matter with `layout: post`, `title`, `description`, `tags`. Bodies are full prose Markdown.

- [ ] **Step 1: Create `_posts/2025-04-28-the-1.4ms-mystery.md`**

```markdown
---
layout: post
title: "The 1.4ms mystery: tracing a phantom latency spike"
description: "A flat p99 graph hid a story. Here's how I found a 1.4ms regression that only showed up under a specific kind of load."
tags: [performance, observability, go]
date: 2025-04-28
---

The graph was flat. p50 flat, p99 flat, even p999 looked clean. But our SLO burn rate alarm kept firing on Tuesday afternoons. Not every Tuesday — most. Not all afternoons — sometimes. Just enough to feel personal.

I want to walk through what it took to find it, because the answer was satisfying but the path was the lesson.

## The shape of the problem

Our service is a thin Go gateway in front of a fan-out to four downstreams. The gateway adds maybe 200µs on a good day. SLO is 50ms p99 end-to-end. We were burning budget at 1.6× expected.

First instinct: a downstream is misbehaving. So I pulled the per-downstream histograms and stared at them for an embarrassing amount of time. Nothing.

```go
span := tracer.StartSpan("gateway.fanout",
  ot.Tag{Key: "downstream", Value: name},
  ot.Tag{Key: "shard", Value: shardID},
)
defer span.Finish()

resp, err := client.Do(ctx, req)
if err != nil {
  span.SetTag("error", true)
  return nil, err
}
```

## What the percentiles weren't telling me

Percentiles are a summary. Summaries hide things. The thing they were hiding here was a bimodal distribution that looked unimodal at the bucket boundaries our histograms used.

> If your histogram buckets are coarser than your interesting effect, your dashboards will lie to you with a straight face.

I dumped raw spans for a 90-second window and plotted them as a scatter. There it was — a faint second band, 1.4ms above the main one, pulsing on and off.

## Finding the trigger

Correlation hunt. I joined the slow-band requests against every dimension I had: route, region, tenant, build SHA, kernel version. Tenant lit up. Specifically, three tenants. All on the same shard.

Pulled the shard's host. Looked at flamegraphs. A goroutine was holding a mutex across an unbuffered channel send during cache warmup. Under enough concurrent traffic from those tenants, contention serialized requests behind it for exactly as long as the warmup took.

## The fix and the lesson

The fix was four lines: move the channel send out of the lock, buffer the channel, add a metric for warmup duration, alert on it. Total review time: 12 minutes. Total time to find: nine days.

The lesson I keep relearning: dashboards are a starting point, not an answer. When the dashboard says everything is fine and your alarms say otherwise, trust the alarms and go look at the raw data.
```

- [ ] **Step 2: Create `_posts/2025-04-14-on-deleting-code.md`**

```markdown
---
layout: post
title: "On deleting code"
description: "The most underrated skill on a senior engineering team is removing things. A short essay on why."
tags: [craft, essay]
date: 2025-04-14
---

I've been doing this for a while now, and the engineers I respect most all share a habit: they delete more code than they write. Not in any given week — over a career.

It looks unproductive from the outside. A pull request titled "remove unused flag" doesn't ship features. But it ships understanding. The next person who reads that file will not have to wonder what the flag does, why it exists, whether it's safe to touch.

## Why it's hard

Deleting code requires you to be sure. To be sure, you have to trace callers, understand history, talk to whoever wrote it. That's expensive. Adding code is cheap — you just pile it on top.

> Software is the only engineering discipline where the building gets heavier the longer you maintain it. The only way out is to take pieces off.

Every line of code is a liability dressed up as an asset. It has to be read, tested, secured, deployed, paged on. Most of it earns its keep. Some of it doesn't, and the only way to know which is which is to keep looking.

## How to build the habit

Start small. When you open a file to make a change, spend two minutes looking for something to remove. Not something to refactor — something to delete entirely. An unused import. A flag that's always true. A comment that restates the code.

You won't always find something. When you do, the PR will be tiny and the review will be fast. Over time, the codebase gets lighter. The next person who has to debug it at 2am will thank you, even if they never know your name.
```

- [ ] **Step 3: Create `_posts/2025-03-30-postgres-locks.md`**

```markdown
---
layout: post
title: "Five Postgres locks I used to misunderstand"
description: "ACCESS EXCLUSIVE isn't the only one that hurts. A field guide to the locks that bit me in production."
tags: [postgres, databases]
date: 2025-03-30
---

I have shipped, by my count, four migrations that took down a database. Each one taught me something I should have known. Here are five locks, in order of how badly they got me.

## 1. ACCESS EXCLUSIVE on `ADD COLUMN` with a volatile default

On Postgres 10 this would rewrite the table. On 11+, a constant default is a metadata-only change. A volatile default (like `now()`) still rewrites. I learned this at 2am.

```sql
-- Safe on PG 11+:
ALTER TABLE users ADD COLUMN tier int DEFAULT 0;

-- Still rewrites the table:
ALTER TABLE users ADD COLUMN created_at timestamptz DEFAULT now();
```

## 2. ROW EXCLUSIVE and concurrent index builds

`CREATE INDEX CONCURRENTLY` does not block reads. But it does two table scans and needs to wait for concurrent transactions to finish. If you have long-running transactions, your index build will stall behind them — and hold a lock that blocks other DDL.

## 3. SHARE UPDATE EXCLUSIVE on `VACUUM`

Manual `VACUUM` takes SHARE UPDATE EXCLUSIVE. So does `CREATE INDEX CONCURRENTLY`. If both are running simultaneously on the same table, one blocks the other. This surprised me the first time a long vacuum blocked my "non-blocking" index build.

## 4. ACCESS SHARE and DDL

The weakest lock — `SELECT` takes it. But it still conflicts with `ACCESS EXCLUSIVE`, which `ALTER TABLE` takes. This is why a long-running OLAP query can block a migration that seems instant in your test environment.

## 5. EXCLUSIVE on `REFRESH MATERIALIZED VIEW`

`REFRESH MATERIALIZED VIEW` without `CONCURRENTLY` takes `EXCLUSIVE`, blocking all reads on the view for the duration of the refresh. Switch to `CONCURRENTLY` as soon as you can. It needs a unique index but is worth it.

The theme across all five: locks interact in ways that don't show up in a dev database with one user and no concurrent traffic. Test migrations under load.
```

- [ ] **Step 4: Create `_posts/2025-03-11-rust-async-state-machines.md`**

```markdown
---
layout: post
title: "What I finally understood about Rust's async state machines"
description: "The .await keyword is sugar for something specific and beautiful. Here is the model that finally clicked."
tags: [rust, concurrency]
date: 2025-03-11
---

For two years I wrote async Rust by pattern matching on examples. It worked, mostly. Then I had to debug a `Send` bound error and realized I had no mental model at all.

## Futures are state machines

When you write an async function, the compiler transforms it into a struct that implements `Future`. Each `.await` point becomes a state in that struct. Polling the future drives the state machine forward.

```rust
async fn fetch_user(id: u64) -> Result<User, Error> {
    let row = db.query_one(id).await?;
    let user = User::from_row(row)?;
    Ok(user)
}
```

The compiler sees two suspension points: the `.await` on `query_one`, and the implicit end. It generates something like:

```rust
enum FetchUserFuture {
    State0 { id: u64 },
    State1 { row_future: QueryOneFuture },
    Done,
}
```

## Why `Send` bounds are about state, not calls

A `Future` is `Send` if all the state it holds across `.await` points is `Send`. Not the types you *use* — the types that are *alive* when the future yields.

This is why holding a `Rc<T>` across an `.await` breaks `Send`: the `Rc` lives in the state machine struct, which then can't be sent across threads.

```rust
// This won't compile if you need Send:
async fn bad() {
    let rc = Rc::new(42);
    some_async_fn().await;  // rc is alive here, across the await
    println!("{}", rc);
}
```

The fix is to drop the non-`Send` value before the `.await`, or use `Arc` instead.

## The executor is just a loop

An executor calls `poll()` on your future. If it returns `Pending`, the executor parks it and moves on. When the waker fires (because IO completed, a timer expired, etc.), the executor queues the future to be polled again.

That's it. There's no magic. Understanding this made async Rust feel like a system I control rather than a system that controls me.
```

- [ ] **Step 5: Create `_posts/2025-02-22-why-i-still-write-tests-first.md`**

```markdown
---
layout: post
title: "Why I still write tests first in 2025"
description: "TDD isn't fashionable anymore. I'm still doing it, and here's the honest reason."
tags: [testing, craft]
date: 2025-02-22
---

Nobody on my team writes tests first. Many of them are better engineers than I am. I still do. Here's why.

## Tests are a design tool

When I write the test first, I have to decide what the interface looks like before I implement it. This forces me to think about the API from the caller's perspective. The result is almost always cleaner than if I'd designed it implementation-first.

> The test is not a description of the implementation. It is a description of the contract. These are different things.

If writing the test is awkward — too many arguments to construct, too much setup, too many mocks — that's the interface telling me it's wrong. That signal is worth more than any code review.

## The fast feedback loop compounds

A test suite I can run in under two seconds changes how I work. I stop context-switching to a browser or a Postman tab. I stop writing "let me just run it and see." The tightness of the loop compounds: each decision is informed by the previous one before the memory of it fades.

## What TDD is not

TDD is not a guarantee of good tests. You can write slow, coupled, brittle tests first just as easily as last. The discipline is about the loop — red, green, refactor — not the form of the test.

It's also not a religion. I don't write a test before fixing a one-line typo. I write a test before any change where I could be wrong about what "correct" means.

That covers most of my work.
```

- [ ] **Step 6: Build and count posts**

```bash
bundle exec jekyll build 2>&1 | tail -5
grep -r "post-card" _site/index.html | wc -l
```

Expected: build succeeds; grep finds 5 occurrences (one per post).

- [ ] **Step 7: Commit**

```bash
git add _posts/
git commit -m "feat: add five seed blog posts"
```

---

## Task 9: Update CI and validate

**Files:**
- Modify: `Rakefile`
- Modify: `.github/workflows/test.yml`

Update html-proofer options for the new site (no gallery images to check, external links disabled).

- [ ] **Step 1: Rewrite `Rakefile`**

```ruby
require 'html-proofer'

task :test do
  sh "bundle exec jekyll build"
  HTMLProofer.check_directory("./_site", {
    assume_extension:    true,
    check_html:          true,
    disable_external:    true,
    allow_missing_href:  true,
    allow_hash_href:     true,
    ignore_urls:         [/fonts\.googleapis\.com/, /fonts\.gstatic\.com/],
    report_invalid_tags: false,
    report_script_embeds: false,
  }).run
end

task default: :test
```

- [ ] **Step 2: Run full test suite locally**

```bash
bundle exec rake test 2>&1 | tail -20
```

Expected: `HTML-Proofer finished successfully.` — no errors. If html-proofer flags missing alt text on images, that's OK to ignore for now (seed posts have no images).

- [ ] **Step 3: Commit**

```bash
git add Rakefile
git commit -m "chore: update html-proofer config for blog"
```

---

## Self-Review

### Spec coverage

| Requirement | Covered by |
|---|---|
| Nuke old site | Task 1 |
| Dark Modern (B) design (zinc palette, Inter, accent `#3b59f7`) | Task 3 CSS |
| Sticky nav with logo + GitHub link | Task 4 |
| Home hero (title, bio, cross-posting card) | Task 5 layout |
| Tag filter pills | Task 5 layout + JS |
| 2-column post grid, featured first card | Task 5 layout |
| Single post reader (title, meta, prose, tags) | Task 6 layout |
| Reading progress bar | Task 6 layout JS |
| Publish elsewhere modal (dev.to, Medium, Substack) | Task 6 layout |
| Syntax highlighting (Go, SQL, Rust) | Task 3 CSS (Rouge tokens) |
| Blockquotes / callouts styled | Task 3 CSS |
| 5 real seed posts | Task 8 |
| CI / html-proofer passes | Task 9 |

### No placeholders found

All steps contain complete file content and exact commands.

### Type consistency

- `layout: home` in `index.html` matches `_layouts/home.html` ✓
- `layout: post` in all `_posts/*.md` matches `_layouts/post.html` ✓
- CSS class names used in layouts exactly match class names defined in `blog.css` ✓
- `site.posts`, `post.tags`, `post.description`, `page.title` are standard Jekyll variables ✓
