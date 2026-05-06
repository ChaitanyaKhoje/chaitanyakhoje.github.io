# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rewrite `_layouts/home.html` and `assets/css/portfolio.css` to implement the new editorial portfolio design with Playfair Display serif hero, plain-text tech strip, compact right sidebar for experience, and a token-based light/dark theme.

**Architecture:** Full rewrite of the two home-page files; `default.html` gets a one-line font swap; `post.html` and all prose CSS are untouched. CSS uses custom properties (`--bg`, `--ink`, `--accent`, etc.) on `[data-theme]` attributes, matching the existing theme-persistence pattern already in `default.html`.

**Tech Stack:** Jekyll 4, Liquid templating, plain CSS (no preprocessor), Google Fonts (Playfair Display, Space Grotesk, DM Mono).

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `_layouts/default.html` | Modify line 10 | Swap Google Fonts URL to load Playfair Display + Space Grotesk + DM Mono; update nav markup |
| `assets/css/portfolio.css` | Full rewrite | All tokens, reset, nav, home layout, hero, tech strip, writing, sidebar, mobile, post/prose styles |
| `_layouts/home.html` | Full rewrite | Home page markup only — no styles inline |

---

## Task 1: Update Google Fonts and nav markup in `default.html`

**Files:**
- Modify: `_layouts/default.html`

The existing font link loads Inter + JetBrains Mono. Replace it with Playfair Display + Space Grotesk + DM Mono. Also rewrite the `<nav>` to the new three-zone structure (blank left, centered name, right links + toggle). The theme-persistence `<script>` in `<head>` and the toggle JS in `<body>` stay exactly as-is — they already use `data-theme` on `<html>` and `localStorage`.

- [ ] **Replace the Google Fonts `<link>` on line 10**

Open `_layouts/default.html` and replace:
```html
  <link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,300;0,14..32,400;0,14..32,500;0,14..32,600;0,14..32,700;1,14..32,400&family=JetBrains+Mono:wght@400;500;600&display=swap" rel="stylesheet" />
```
with:
```html
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&family=Space+Grotesk:wght@300;400;500;600&family=DM+Mono:wght@400;500&display=swap" rel="stylesheet" />
```

- [ ] **Rewrite the `<nav>` block (lines 23–40)**

Replace the entire `<nav class="topbar">…</nav>` with:
```html
  <nav class="topbar">
    <div class="nav-inner">
      <div class="nav-left"></div>
      <a class="nav-name" href="{{ '/' | relative_url }}">Chaitanya Khoje</a>
      <div class="nav-right">
        <a class="nav-link" href="{{ '/' | relative_url }}#work">Work</a>
        <a class="nav-link" href="{{ '/' | relative_url }}#writing">Writing</a>
        <a class="nav-link" href="https://github.com/ChaitanyaKhoje" target="_blank" rel="noopener">GitHub</a>
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle light/dark mode" title="Toggle theme">
          <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
      </div>
    </div>
  </nav>
```

- [ ] **Verify Jekyll builds without error**

```bash
bundle exec jekyll build 2>&1 | tail -5
```
Expected: `...done in X seconds.` with no error lines.

- [ ] **Commit**

```bash
git add _layouts/default.html
git commit -m "feat: swap fonts and nav markup for redesign"
```

---

## Task 2: Write the full `portfolio.css`

**Files:**
- Modify: `assets/css/portfolio.css` (full rewrite)

This is the largest task. Write the complete stylesheet in one pass. It covers: reset, CSS tokens (light + dark), nav, home two-column layout, hero, tech strip, writing section, sidebar, mobile breakpoint, and all existing post/prose styles (copied verbatim from the old file so blog posts keep working).

- [ ] **Rewrite `assets/css/portfolio.css` in full**

Replace the entire file with:

```css
/* ── Reset ─────────────────────────────────────────────── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── Theme tokens ───────────────────────────────────────── */
:root,
[data-theme="light"] {
  --bg:        #ffffff;
  --bg-sub:    #fafafa;
  --rule:      #eeeeee;
  --ink:       #111111;
  --ink-soft:  #777777;
  --ink-faint: #bbbbbb;
  --accent:    #e8632a;
  --sans:      'Space Grotesk', system-ui, sans-serif;
  --serif:     'Playfair Display', Georgia, serif;
  --mono:      'DM Mono', ui-monospace, monospace;
  --nav-h:     52px;
}

[data-theme="dark"] {
  --bg:        #0d0d0d;
  --bg-sub:    #111111;
  --rule:      #1e1e1e;
  --ink:       #f0ece4;
  --ink-soft:  #6a6a6a;
  --ink-faint: #333333;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--sans);
  font-size: 14px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  transition: background 0.2s, color 0.2s;
  min-height: 100vh;
}

::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-thumb { background: var(--rule); border-radius: 999px; }
::-webkit-scrollbar-track { background: transparent; }

/* ── Nav ────────────────────────────────────────────────── */
.topbar {
  position: sticky;
  top: 0;
  z-index: 50;
  background: color-mix(in srgb, var(--bg) 85%, transparent);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid var(--rule);
}

.nav-inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: var(--nav-h);
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
}

.nav-left { /* intentionally blank */ }

.nav-name {
  font-family: var(--serif);
  font-size: 17px;
  color: var(--ink);
  text-decoration: none;
  justify-self: center;
  white-space: nowrap;
}

.nav-right {
  display: flex;
  align-items: center;
  gap: 4px;
  justify-self: end;
}

.nav-link {
  font-family: var(--mono);
  font-size: 11px;
  color: var(--ink-faint);
  text-decoration: none;
  padding: 5px 9px;
  border-radius: 5px;
  letter-spacing: 0.8px;
  text-transform: uppercase;
  transition: color 0.12s, background 0.12s;
}
.nav-link:hover { color: var(--ink); background: var(--bg-sub); }

.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--ink-faint);
  padding: 5px 7px;
  border-radius: 5px;
  display: inline-flex;
  align-items: center;
  margin-left: 4px;
  transition: background 0.12s, color 0.12s;
}
.theme-toggle:hover { background: var(--bg-sub); color: var(--ink); }
.theme-toggle svg { display: block; }

/* ── Home page wrapper ──────────────────────────────────── */
.home-wrap {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px 80px;
}

/* Two-column grid: main content + sidebar */
.home-layout {
  display: grid;
  grid-template-columns: 1fr 230px;
  align-items: start;
}

.home-main {
  border-right: 1px solid var(--rule);
  min-width: 0;
}

/* ── Hero ───────────────────────────────────────────────── */
.hero {
  padding: 52px 40px 36px 0;
  border-bottom: 1px solid var(--rule);
}

.hero-kicker {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--accent);
  letter-spacing: 3px;
  text-transform: uppercase;
  margin-bottom: 18px;
}

.hero-title {
  font-family: var(--serif);
  font-size: clamp(36px, 5.5vw, 58px);
  line-height: 0.94;
  letter-spacing: -1.5px;
  color: var(--ink);
  margin-bottom: 20px;
  text-wrap: balance;
}

.hero-title em {
  font-style: italic;
  color: var(--accent);
}

.hero-bio {
  font-size: 14px;
  font-weight: 300;
  color: var(--ink-soft);
  line-height: 1.65;
  max-width: 440px;
  margin-bottom: 24px;
  text-wrap: pretty;
}

.hero-ctas {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.btn-primary {
  font-family: var(--mono);
  font-size: 11px;
  padding: 9px 20px;
  background: var(--ink);
  color: var(--bg);
  border: 1px solid var(--ink);
  border-radius: 0;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: opacity 0.12s;
}
.btn-primary:hover { opacity: 0.82; }

.btn-ghost {
  font-family: var(--mono);
  font-size: 11px;
  padding: 9px 18px;
  background: transparent;
  color: var(--ink-soft);
  border: 1px solid var(--rule);
  border-radius: 0;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  transition: border-color 0.12s, color 0.12s;
}
.btn-ghost:hover { border-color: var(--ink-soft); color: var(--ink); }

/* ── Tech strip ─────────────────────────────────────────── */
.tech-strip {
  padding: 16px 40px 16px 0;
  border-bottom: 1px solid var(--rule);
  display: flex;
  align-items: baseline;
  gap: 0;
}

.tech-strip-label {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--ink-faint);
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-right: 16px;
  white-space: nowrap;
  flex-shrink: 0;
  padding-top: 1px;
}

.tech-strip-items {
  font-family: var(--mono);
  font-size: 12px;
  color: var(--ink-soft);
  line-height: 1.9;
}

/* ── Writing section ────────────────────────────────────── */
.writing-section {
  padding: 24px 40px 24px 0;
}

.section-label {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--ink-faint);
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.post-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 14px 0;
  border-bottom: 1px solid var(--rule);
}
.post-row:first-of-type { padding-top: 0; }
.post-row:last-of-type { border-bottom: none; }

.post-row-body { min-width: 0; }

.post-title {
  font-family: var(--serif);
  font-size: 17px;
  color: var(--ink);
  line-height: 1.25;
  letter-spacing: -0.3px;
  text-decoration: none;
  display: block;
  margin-bottom: 5px;
  transition: color 0.12s;
}
.post-title:hover { color: var(--accent); }

.post-desc {
  font-size: 12px;
  color: var(--ink-soft);
  line-height: 1.5;
}

.post-date {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-faint);
  white-space: nowrap;
  padding-top: 3px;
  flex-shrink: 0;
}

/* ── Sidebar ────────────────────────────────────────────── */
.home-sidebar {
  padding: 28px 0 28px 24px;
  background: var(--bg-sub);
  position: sticky;
  top: var(--nav-h);
  align-self: start;
}

.sidebar-label {
  font-family: var(--mono);
  font-size: 9px;
  color: var(--ink-faint);
  letter-spacing: 2.5px;
  text-transform: uppercase;
  margin-bottom: 16px;
}

.exp-item {
  margin-bottom: 18px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--rule);
}
.exp-item:last-of-type { border-bottom: none; margin-bottom: 0; }

.exp-co {
  font-size: 12px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 2px;
}

.exp-role {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--accent);
  margin-bottom: 2px;
}

.exp-date {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-faint);
  margin-bottom: 5px;
}

.exp-desc {
  font-size: 11px;
  color: var(--ink-soft);
  line-height: 1.5;
}

.edu {
  margin-top: 20px;
  padding-top: 16px;
  border-top: 1px solid var(--rule);
}

.edu-degree {
  font-size: 11px;
  font-weight: 600;
  color: var(--ink);
  margin-bottom: 2px;
}

.edu-school {
  font-family: var(--mono);
  font-size: 10px;
  color: var(--ink-faint);
}

/* ── Mobile ─────────────────────────────────────────────── */
@media (max-width: 768px) {
  .home-layout {
    grid-template-columns: 1fr;
  }

  .home-main {
    border-right: none;
  }

  .hero,
  .tech-strip,
  .writing-section {
    padding-right: 0;
  }

  .tech-strip {
    flex-direction: column;
    gap: 8px;
  }

  .tech-strip-label {
    margin-right: 0;
  }

  .home-sidebar {
    padding: 28px 0 0;
    background: transparent;
    position: static;
    border-top: 1px solid var(--rule);
  }
}

@media (max-width: 480px) {
  .nav-link { display: none; }
  .nav-right .theme-toggle { display: inline-flex; }
}

/* ── Reduced motion ─────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  body { transition: none; }
}

/* ═══════════════════════════════════════════════════════════
   POST / PROSE STYLES
   These are unchanged from the previous design — all blog
   post pages depend on these classes via post.html.
   ═══════════════════════════════════════════════════════════ */

/* Single post wrapper */
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
  font-family: var(--serif);
  font-weight: 700;
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
  background: var(--bg-sub);
  border: 1px solid var(--rule);
  border-radius: 6px;
  text-decoration: none;
  transition: border-color 0.12s, color 0.12s;
}
.post-header-tag:hover { border-color: var(--ink-soft); color: var(--ink); }

/* Prose */
.prose { font-size: 16px; line-height: 1.75; }
.prose p { margin-bottom: 1.4em; }

.prose h2 {
  font-family: var(--serif);
  font-size: 22px;
  font-weight: 700;
  letter-spacing: -0.5px;
  margin: 2.2em 0 0.7em;
}

.prose h3 {
  font-size: 17px;
  font-weight: 600;
  margin: 1.8em 0 0.5em;
}

.prose ul, .prose ol { padding-left: 1.4em; margin-bottom: 1.4em; }
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
  background: var(--bg-sub);
  border: 1px solid var(--rule);
  padding: 1px 6px;
  border-radius: 4px;
}

.prose pre {
  background: var(--bg-sub);
  border: 1px solid var(--rule);
  border-radius: 8px;
  padding: 20px 22px;
  margin: 1.8em 0;
  overflow-x: auto;
  font-family: var(--mono);
  font-size: 13px;
  line-height: 1.65;
}

.prose pre code {
  background: none;
  border: none;
  padding: 0;
  font-size: 13px;
}

.prose blockquote {
  border-left: 3px solid var(--accent);
  padding: 12px 18px;
  margin: 1.8em 0;
  background: color-mix(in srgb, var(--accent) 8%, transparent);
  border-radius: 0 8px 8px 0;
  color: var(--ink-soft);
  font-style: italic;
}

/* Reading progress bar */
.progress-bar {
  position: fixed;
  top: var(--nav-h);
  left: 0;
  height: 2px;
  background: var(--accent);
  width: 0%;
  z-index: 49;
  transition: width 0.1s linear;
}

/* Rouge syntax highlighting */
.highlight .c, .highlight .c1, .highlight .cm { color: #6c727d; font-style: italic; }
.highlight .s, .highlight .s1, .highlight .s2 { color: #f9b87f; }
.highlight .k, .highlight .kd, .highlight .kn { color: #a5b4fc; font-weight: 600; }
.highlight .m, .highlight .mi, .highlight .mf { color: #f0a875; }
.highlight .nf { color: #86efac; }
.highlight .n  { color: var(--ink); }
.highlight .o  { color: var(--ink-soft); }
.highlight .p  { color: var(--ink-soft); }
```

- [ ] **Build and check for CSS parse errors**

```bash
bundle exec jekyll build 2>&1 | grep -i "error\|warn" | head -20
```
Expected: no output (no errors or warnings).

- [ ] **Commit**

```bash
git add assets/css/portfolio.css
git commit -m "feat: rewrite portfolio.css with new design tokens and layout"
```

---

## Task 3: Rewrite `_layouts/home.html`

**Files:**
- Modify: `_layouts/home.html` (full rewrite)

The home layout uses Liquid to iterate `site.posts` for the writing section. The two-column grid wraps `.home-main` and `.home-sidebar`. All class names match exactly what was defined in Task 2.

- [ ] **Rewrite `_layouts/home.html` in full**

Replace the entire file with:

```html
---
layout: default
---

<div class="home-wrap">
  <div class="home-layout">

    <!-- ── Main column ── -->
    <main class="home-main">

      <!-- Hero -->
      <section class="hero" id="work">
        <p class="hero-kicker">Senior Software Engineer · Sunnyvale CA</p>
        <h1 class="hero-title">Data platforms,<br><em>AI systems,</em><br>production scale.</h1>
        <p class="hero-bio">6+ years building large-scale measurement pipelines, batch inference systems, and multi-platform integrations across video, social, and short-form ad platforms.</p>
        <div class="hero-ctas">
          <a class="btn-primary" href="mailto:chaitanyakhoje9@gmail.com">Email me</a>
          <a class="btn-ghost" href="https://www.linkedin.com/in/chaitanyakhoje/" target="_blank" rel="noopener">LinkedIn</a>
          <a class="btn-ghost" href="https://github.com/ChaitanyaKhoje" target="_blank" rel="noopener">GitHub</a>
        </div>
      </section>

      <!-- Tech strip -->
      <div class="tech-strip">
        <span class="tech-strip-label">Stack</span>
        <span class="tech-strip-items">Python · SQL · Java · TypeScript · Bash · Apache Airflow · dbt · Snowflake · BigQuery · Kafka · Looker · Debezium · GCP · GKE · AWS · S3 · Lambda · Docker · Kubernetes · OpenSearch · Vertex AI · LLM integration · Seldon Core · Ollama · LiteLLM · GitHub Actions · ArgoCD · Datadog · Sentry · PagerDuty</span>
      </div>

      <!-- Writing -->
      <section class="writing-section" id="writing">
        <p class="section-label">Latest Writing</p>
        {% for post in site.posts %}
        <div class="post-row">
          <div class="post-row-body">
            <a class="post-title" href="{{ post.url | relative_url }}">{{ post.title }}</a>
            {% if post.description %}<p class="post-desc">{{ post.description }}</p>{% endif %}
          </div>
          <span class="post-date">{{ post.date | date: "%b %Y" }}</span>
        </div>
        {% endfor %}
      </section>

    </main>

    <!-- ── Sidebar ── -->
    <aside class="home-sidebar">
      <p class="sidebar-label">Experience</p>

      <div class="exp-item">
        <div class="exp-co">Zefr</div>
        <div class="exp-role">Senior Software Engineer</div>
        <div class="exp-date">2021 – Present</div>
        <div class="exp-desc">Ad measurement pipelines across video, social, and short-form. Batch LLM inference on Vertex AI. Sev0 data-integrity recovery.</div>
      </div>

      <div class="exp-item">
        <div class="exp-co">realtor.com</div>
        <div class="exp-role">Data Engineer</div>
        <div class="exp-date">2020 – 2021</div>
        <div class="exp-desc">AWS data pipelines, CloudFormation, CI/CD automation. EMR rightsizing.</div>
      </div>

      <div class="edu">
        <div class="edu-degree">M.S. Computer Science</div>
        <div class="edu-school">SUNY Binghamton · 2019</div>
      </div>
    </aside>

  </div>
</div>
```

- [ ] **Build and verify no Liquid errors**

```bash
bundle exec jekyll build 2>&1 | tail -5
```
Expected: `...done in X seconds.` with no error lines.

- [ ] **Serve locally and visually verify**

```bash
bundle exec jekyll serve
```
Open `http://localhost:4000` and check:
- Nav: blank left, centered name, links + toggle right
- Hero: Playfair title with italic orange word, bio, three CTA buttons
- Tech strip: `STACK` label + plain `·`-separated text wrapping naturally
- Writing: post title(s) in Playfair left, date right
- Sidebar: two experience entries + education, `--bg-sub` background
- Toggle: clicking switches between light/dark and persists on refresh
- Mobile (resize to < 768px): sidebar drops below main, tech strip label stacks above items

- [ ] **Commit**

```bash
git add _layouts/home.html
git commit -m "feat: rewrite home layout with new editorial design"
```

---

## Task 4: Run the full test suite and verify blog post pages

**Files:** No changes — this task is verification only.

The Rakefile runs `bundle exec rake test` which builds `_site/` and runs html-proofer. This catches broken links, missing images, and malformed HTML across both the home page and all post pages.

- [ ] **Run the full test suite**

```bash
bundle exec rake
```
Expected: html-proofer passes with 0 failures. If it reports missing internal links (e.g. `#work`, `#writing` anchors), verify those `id` attributes are present in `home.html`.

- [ ] **Spot-check the blog post page**

```bash
bundle exec jekyll serve
```
Open `http://localhost:4000/posts/building-terminair-a-read-only-k9s-style-terminal-ui-for-apache-airflow/` and verify:
- Post title renders in Playfair (`post-h1` class)
- Reading progress bar appears at top
- Back link points to `/`
- Prose body, code blocks, and syntax highlighting render correctly
- Light/dark toggle works on the post page

- [ ] **Commit if any minor fixes were needed; otherwise final commit**

```bash
git add -p   # stage only intentional changes
git commit -m "fix: post-redesign smoke test corrections"
```
Skip this commit if the suite passed clean with no changes needed.
