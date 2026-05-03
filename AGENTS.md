# Repository Guidelines

## Project Structure & Module Organization

This repository is a Jekyll blog, not a general app workspace. Keep production content close to the site root. Posts live in `_posts/` and must use Jekyll’s dated filename format, for example `_posts/2025-04-28-the-1.4ms-mystery.md`. Layouts live in `_layouts/`. Shared styles live in `assets/css/blog.css`. Images and blog artwork belong in `assets/images/`. Site metadata, plugins, and permalinks are defined in `_config.yml`. Reserve `docs/` for blog-related reference material only; do not store planning scratch files or agent output there.

## Build, Test, and Development Commands

- `bundle install`: install Ruby gems from `Gemfile`.
- `bundle exec jekyll serve`: run the site locally at `http://localhost:4000`.
- `bundle exec jekyll build`: generate the production site into `_site/`.
- `bundle exec rake` or `bundle exec rake test`: build the site and run `html-proofer` checks against `_site/`.

Use Ruby `3.2.x` and run `bundle exec` for repo-local tool versions.

## Coding Style & Naming Conventions

Use 2-space indentation in HTML, Liquid, YAML, and CSS to match the existing files. Prefer semantic HTML and keep Liquid logic simple inside layouts. Use lowercase, hyphenated filenames for posts and assets. Keep CSS selectors aligned with the existing `blog.css` naming style such as `post-card`, `hero-title`, and `nav-link`.

## Testing Guidelines

Before opening a PR, run `bundle exec rake`. Treat a clean Jekyll build and passing `html-proofer` output as the minimum bar. For content changes, verify that links, metadata, and post permalinks render correctly in the generated site.

## Commit & Pull Request Guidelines

Recent history uses short conventional commit subjects like `feat:`, `fix:`, and `chore:`. Keep commit titles imperative and scoped to one change. PRs should include a short summary, note any content or layout impact, and attach screenshots when the UI changes. Link the relevant issue when one exists.

## Content & Repo Hygiene

Posts and pages should keep concise front matter with fields the layouts already use, such as `layout`, `title`, `description`, `date`, and `tags`. Do not commit `_site/`; it is generated output from `bundle exec jekyll build`. Also keep local editor settings, planning artifacts, and agent-specific workspace files out of the repository.
