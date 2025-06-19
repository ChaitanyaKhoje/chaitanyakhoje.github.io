---
layout: default
---

<div class="posts-grid">
  {% for item in site.gallery_items limit:12 %}
  <article class="post-card">
    <a href="{{ item.url | relative_url }}">
      <div class="post-image">
        <img src="{{ item.image }}" alt="{{ item.title }}">
      </div>
      <div class="post-content">
        <h3 class="post-title">{{ item.title }}</h3>
        <p class="post-excerpt">{{ item.description }}</p>
        <div class="post-meta">
          <span class="post-date">{{ item.date | date: "%B %d, %Y" }}</span>
        </div>
      </div>
    </a>
  </article>
  {% endfor %}
</div>

<div class="stats-section">
  <div class="container">
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value">47</div>
        <div class="stat-label">Images Captured</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">284</div>
        <div class="stat-label">Hours of Exposure</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">32</div>
        <div class="stat-label">Deep Sky Objects</div>
      </div>
    </div>
  </div>
</div> 