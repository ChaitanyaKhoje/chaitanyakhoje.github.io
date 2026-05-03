# Chaitanya Khoje Portfolio

This is Chaitanya Khoje's Jekyll-powered personal portfolio, published via GitHub Pages.

## Local development

Use Ruby `3.2.x` for local work.

Install gems:

```bash
bundle install
```

Run the site locally:

```bash
bundle exec jekyll serve
```

Open `http://localhost:4000`.

## Post scaffolding

The repository still includes a post scaffold utility for future writing, but the current public homepage is a resume-based portfolio. Create a post scaffold:

```bash
bin/new-post "My Post Title" \
  --description "Short summary for cards and SEO." \
  --tags "ruby,jekyll,writing"
```

The command creates `_posts/YYYY-MM-DD-my-post-title.md` with front matter that matches the current layouts. Use `--date YYYY-MM-DD` to backdate or schedule a post.

## Verification

Build the site:

```bash
bundle exec jekyll build
```

Run the full local check suite:

```bash
bundle exec rake
```

The Rake task builds `_site/` and runs `html-proofer` against the generated output.

## Repository layout

- `_posts/` contains published posts in Jekyll post format when writing is enabled.
- `_layouts/` contains the site layouts for the home page and post pages.
- `bin/new-post` creates correctly named post drafts.
- `assets/css/portfolio.css` contains the shared site styles.
- `_config.yml` contains site metadata, plugins, and permalink settings.

## Deployment

GitHub Actions runs `bundle exec rake test` on pushes and pull requests targeting `main`.
