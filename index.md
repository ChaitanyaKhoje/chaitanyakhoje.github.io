---
layout: default
---

<div class="hero-section">
  <div class="container">
    <h1>Chaitanya Khoje</h1>
    <p class="subtitle">Capturing the Cosmos Through My Lens</p>
  </div>
</div>

<div class="featured-gallery">
  <div class="container">
    <h2>Featured Images</h2>
    <div class="gallery-grid">
      {% for item in site.gallery_items limit:6 %}
      <div class="gallery-item">
        <div class="gallery-item-image">
          <img src="{{ item.image }}" alt="{{ item.title }}">
          <div class="gallery-item-overlay">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
          </div>
        </div>
        <div class="gallery-item-content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
          <div class="gallery-meta">
            <span>{{ item.exposure_time }}</span>
            <span>{{ item.date | date: "%B %Y" }}</span>
          </div>
        </div>
      </div>
      {% endfor %}
    </div>
  </div>
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