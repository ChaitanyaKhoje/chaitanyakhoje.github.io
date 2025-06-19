---
layout: default
---

<div class="hero">
  <h1>Chaitanya Khoje</h1>
  <p>Capturing the Cosmos Through My Lens</p>
</div>

<div class="featured-work">
  <h2>Featured Images</h2>
  <div class="image-grid">
    {% for item in site.gallery_items limit:6 %}
    <div class="image-item">
      <a href="{{ item.url }}">
        <img src="{{ item.image }}" alt="{{ item.title }}">
        <div class="overlay">
          <h3>{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </div>
      </a>
    </div>
    {% endfor %}
  </div>
  <div class="view-more">
    <a href="/gallery" class="button">View Full Gallery</a>
  </div>
</div>

<div class="stats">
  <div class="stat-item">
    <h3>47</h3>
    <p>Images Captured</p>
  </div>
  <div class="stat-item">
    <h3>284</h3>
    <p>Hours of Exposure</p>
  </div>
  <div class="stat-item">
    <h3>32</h3>
    <p>Deep Sky Objects</p>
  </div>
</div> 