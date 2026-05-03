# Light Mode Toggle + Blog Workflow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a warm-paper light mode toggle to the blog nav, and improve `bin/new-post` with interactive prompts and auto-open.

**Architecture:** Light mode uses a `[data-theme="light"]` CSS block overriding `:root` variables; a no-flash inline script in `<head>` applies the theme before paint; a toggle button in the nav switches and persists the preference. The `bin/new-post` script gains an interactive path (triggered when no args) and auto-open logic, leaving the existing CLI flags intact.

**Tech Stack:** Jekyll/Liquid, vanilla CSS custom properties, vanilla JS, Ruby stdlib (`io/console` not needed — plain `gets`)

---

## File Map

| File | Action | Responsibility |
|------|--------|---------------|
| `assets/css/blog.css` | Modify (append) | Add `[data-theme="light"]` variable block + `.theme-toggle` button styles + light scrollbar |
| `_layouts/default.html` | Modify | Add no-flash inline script in `<head>`; add `.theme-toggle` button in nav; add theme JS at end of `<body>` |
| `bin/new-post` | Modify | Add interactive prompt path + auto-open logic + richer body scaffold |

---

## Task 1: Light mode CSS variables

**Files:**
- Modify: `assets/css/blog.css` (append after line 790)

- [ ] **Step 1: Append the light theme block to `assets/css/blog.css`**

Add this at the very end of the file (after the `@media (prefers-reduced-motion)` block):

```css
/* ── Light theme (warm paper) ─────────────────────────── */
[data-theme="light"] {
  --bg:        #faf9f7;
  --surface:   #f5f3ef;
  --elev:      #ffffff;
  --ink:       #1c1917;
  --ink-soft:  #57534e;
  --ink-faint: #a8a29e;
  --rule:      #e7e5e4;
}

[data-theme="light"] .topbar {
  background: rgba(250,249,247,0.88);
}

[data-theme="light"] ::-webkit-scrollbar-thumb {
  background: #c7c4c1;
}
```

- [ ] **Step 2: Verify CSS variable names match `:root`**

Run:
```bash
grep -n "^\s*--" assets/css/blog.css | head -20
```
Expected: variables like `--bg`, `--surface`, `--elev`, `--ink`, `--ink-soft`, `--ink-faint`, `--rule` appear in `:root`. Confirm the names in the new block are identical.

- [ ] **Step 3: Commit**

```bash
git add assets/css/blog.css
git commit -m "feat: add warm-paper light theme CSS variables"
```

---

## Task 2: Theme toggle button styles

**Files:**
- Modify: `assets/css/blog.css` (insert in Nav section, after `.nav-link.active` line ~109)

- [ ] **Step 1: Add `.theme-toggle` styles after `.nav-link.active` (around line 109)**

Insert this block after the `.nav-link.active` rule:

```css
.theme-toggle {
  background: transparent;
  border: none;
  cursor: pointer;
  color: var(--ink-soft);
  padding: 6px 8px;
  border-radius: 6px;
  display: inline-flex;
  align-items: center;
  transition: background 0.12s, color 0.12s;
}

.theme-toggle:hover { background: var(--surface); color: var(--ink); }
.theme-toggle svg { display: block; }
```

- [ ] **Step 2: Commit**

```bash
git add assets/css/blog.css
git commit -m "feat: add theme toggle button styles"
```

---

## Task 3: No-flash script + toggle button + theme JS in default layout

**Files:**
- Modify: `_layouts/default.html`

- [ ] **Step 1: Add no-flash inline script in `<head>` before the CSS link**

In `_layouts/default.html`, insert this `<script>` block immediately before the `<link rel="stylesheet" ...>` line:

```html
  <script>
    (function() {
      var saved = localStorage.getItem('theme');
      var preferred = saved || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      document.documentElement.setAttribute('data-theme', preferred);
    })();
  </script>
```

This must run before the stylesheet so the browser paints with the correct variables immediately.

- [ ] **Step 2: Add the toggle button in the nav**

In `_layouts/default.html`, find the `.nav-links` div:

```html
      <div class="nav-links">
        <a class="nav-link {% if page.url == '/' %}active{% endif %}" href="{{ '/' | relative_url }}">Posts</a>
        <a class="nav-link" href="https://github.com/chaitanyakhoje" target="_blank" rel="noopener">GitHub</a>
      </div>
```

Replace it with:

```html
      <div class="nav-links">
        <a class="nav-link {% if page.url == '/' %}active{% endif %}" href="{{ '/' | relative_url }}">Posts</a>
        <a class="nav-link" href="https://github.com/chaitanyakhoje" target="_blank" rel="noopener">GitHub</a>
        <button class="theme-toggle" id="theme-toggle" aria-label="Toggle light/dark mode" title="Toggle theme">
          <svg id="icon-sun" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:none"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg id="icon-moon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
        </button>
      </div>
```

The sun icon has `style="display:none"` initially (site defaults to dark, so moon is shown). JS will flip them.

- [ ] **Step 3: Add theme toggle JS before `</body>`**

In `_layouts/default.html`, insert this block immediately before `</body>`:

```html
  <script>
    (function() {
      var btn = document.getElementById('theme-toggle');
      var sun = document.getElementById('icon-sun');
      var moon = document.getElementById('icon-moon');

      function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (theme === 'light') {
          sun.style.display = 'block';
          moon.style.display = 'none';
        } else {
          sun.style.display = 'none';
          moon.style.display = 'block';
        }
      }

      // Sync icon with current theme on load
      var current = document.documentElement.getAttribute('data-theme') || 'dark';
      applyTheme(current);

      btn.addEventListener('click', function() {
        var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    })();
  </script>
```

- [ ] **Step 4: Verify the full `default.html` reads correctly**

Run:
```bash
cat _layouts/default.html
```

Expected output contains (in order):
1. `<script>` no-flash block before `<link rel="stylesheet"`
2. `.theme-toggle` button with both SVG icons in `.nav-links`
3. Theme toggle JS block before `</body>`

- [ ] **Step 5: Commit**

```bash
git add _layouts/default.html
git commit -m "feat: add light mode toggle to nav with no-flash script"
```

---

## Task 4: Interactive mode + auto-open for `bin/new-post`

**Files:**
- Modify: `bin/new-post`

- [ ] **Step 1: Rewrite `bin/new-post` with interactive path and auto-open**

Replace the entire contents of `bin/new-post` with:

```ruby
#!/usr/bin/env ruby
# frozen_string_literal: true

require "date"
require "optparse"

options = {
  date: Date.today.iso8601,
  description: "",
  tags: []
}

parser = OptionParser.new do |opts|
  opts.banner = "Usage: bin/new-post \"Post Title\" [options]"

  opts.on("--date DATE", "Post date in YYYY-MM-DD format") do |date|
    options[:date] = Date.iso8601(date).iso8601
  rescue Date::Error
    warn "error: --date must use YYYY-MM-DD"
    exit 1
  end

  opts.on("--description TEXT", "Short post summary for cards and SEO") do |description|
    options[:description] = description.strip
  end

  opts.on("--tags TAGS", "Comma-separated tags, e.g. ruby,jekyll") do |tags|
    options[:tags] = tags.split(",").map { |tag| tag.strip.downcase }.reject(&:empty?)
  end
end

parser.parse!

def slugify(value)
  value
    .downcase
    .gsub(/[^a-z0-9]+/, "-")
    .gsub(/\A-|-+\z/, "")
end

def yaml_quote(value)
  %("#{value.gsub("\\", "\\\\\\").gsub('"', '\"')}")
end

def prompt(label, required: false)
  loop do
    $stdout.print "#{label}: "
    $stdout.flush
    value = $stdin.gets&.strip || ""
    return value unless required && value.empty?
    warn "  (required)"
  end
end

def open_in_editor(path)
  editor = ENV["EDITOR"]
  editor ||= %w[code cursor vim].find { |e| system("which #{e} > /dev/null 2>&1") }
  return unless editor
  system("#{editor} #{path}")
end

title = ARGV.join(" ").strip

if title.empty?
  # Interactive mode
  puts ""
  title = prompt("Title", required: true)
  options[:description] = prompt("Description (optional)")
  raw_tags = prompt("Tags, comma-separated (optional)")
  options[:tags] = raw_tags.split(",").map { |t| t.strip.downcase }.reject(&:empty?)
  puts ""
end

slug = slugify(title)
if slug.empty?
  warn "error: title must contain at least one letter or number"
  exit 1
end

posts_dir = File.join(Dir.pwd, "_posts")
unless Dir.exist?(posts_dir)
  warn "error: _posts directory not found; run from the repository root"
  exit 1
end

path = File.join(posts_dir, "#{options[:date]}-#{slug}.md")
if File.exist?(path)
  warn "error: #{path} already exists"
  exit 1
end

front_matter = [
  "---",
  "layout: post",
  "title: #{yaml_quote(title)}",
  "description: #{yaml_quote(options[:description])}",
  "tags: [#{options[:tags].join(", ")}]",
  "date: #{options[:date]}",
  "---"
]

body = <<~MARKDOWN

  Write the opening paragraph here — the hook that makes someone keep reading.

  ## Background

  ## The Problem

  ## Solution

  ## Takeaways

  - 
MARKDOWN

File.write(path, "#{front_matter.join("\n")}#{body}")
puts "created #{path}"
open_in_editor(path)
```

- [ ] **Step 2: Make the script executable (if not already)**

```bash
chmod +x bin/new-post
```

- [ ] **Step 3: Test flag-based path still works**

```bash
bin/new-post "Test Post Flag Mode" --description "A test" --tags "test,ruby"
```

Expected:
```
created _posts/2026-05-03-test-post-flag-mode.md
```

Verify the file exists and has the correct frontmatter:
```bash
head -8 _posts/2026-05-03-test-post-flag-mode.md
```

Expected:
```yaml
---
layout: post
title: "Test Post Flag Mode"
description: "A test"
tags: [test, ruby]
date: 2026-05-03
---
```

- [ ] **Step 4: Clean up test file**

```bash
rm _posts/2026-05-03-test-post-flag-mode.md
```

- [ ] **Step 5: Commit**

```bash
git add bin/new-post
git commit -m "feat: add interactive mode and auto-open to bin/new-post"
```

---

## Task 5: Create branch and PR

- [ ] **Step 1: Create and push the feature branch**

```bash
git checkout -b light-mode-blog-workflow
git push -u origin light-mode-blog-workflow
```

- [ ] **Step 2: Open PR**

```bash
gh pr create \
  --title "Add light mode toggle and improve new-post workflow" \
  --body "$(cat <<'EOF'
## Summary

- Adds warm-paper light mode toggle to nav with sun/moon icon
- No-flash script in `<head>` applies theme before paint; persists via `localStorage`; respects `prefers-color-scheme` on first visit
- Improves `bin/new-post` with interactive prompts (no args = guided flow) and auto-open in `$EDITOR`

## Test plan

- [ ] Visit site — loads in dark mode by default
- [ ] Click moon icon → switches to warm-paper light mode; icon flips to sun
- [ ] Reload page → light mode persists
- [ ] Click sun icon → back to dark; persists on reload
- [ ] Open a new private window → OS dark preference loads dark; OS light preference loads light
- [ ] Run `bin/new-post` with no args → interactive prompts appear; file created; editor opens
- [ ] Run `bin/new-post "Title" --tags foo,bar` → works as before (no regression)

🤖 Generated with [Claude Code](https://claude.com/claude-code)
EOF
)"
```
