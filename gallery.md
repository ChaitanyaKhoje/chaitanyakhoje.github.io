---
layout: default
title: Gallery
permalink: /gallery/
---

<div class="gallery">
  <h1>Astrophotography Gallery</h1>
  
  <div class="gallery-grid">
    {% for item in site.gallery_items %}
    <div class="gallery-item">
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
</div>

<style>
.gallery-header {
    text-align: center;
    padding: 4rem 0 2rem;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 3rem;
}

.gallery-header h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 1rem;
    font-family: var(--font-mono);
}

.gallery-header p {
    font-size: 1.2rem;
    color: var(--accent-color);
    opacity: 0.9;
}

.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
}

.gallery-item {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: var(--card-bg);
    transition: all 0.3s ease;
    cursor: pointer;
}

.gallery-item:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.image-container {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.gallery-item:hover .image-container img {
    transform: scale(1.05);
}

.image-overlay {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
    padding: 2rem 1.5rem 1.5rem;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.gallery-item:hover .image-overlay {
    transform: translateY(0);
}

.image-content h3 {
    color: var(--text-color);
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-weight: 600;
}

.image-content p {
    color: #b0b0b0;
    font-size: 0.9rem;
    margin-bottom: 0.75rem;
    line-height: 1.4;
}

.image-meta {
    font-size: 0.8rem;
    color: var(--accent-color);
    font-family: var(--font-mono);
    margin-bottom: 1rem;
    opacity: 0.8;
}

.view-details {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--accent-color);
    color: var(--bg-color);
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.85rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.view-details:hover {
    background: #4cd4b0;
    transform: translateY(-1px);
}

@media (max-width: 768px) {
    .gallery-header {
        padding: 3rem 0 1.5rem;
        margin-bottom: 2rem;
    }

    .gallery-grid {
        gap: 1.5rem;
    }
}

@media (max-width: 480px) {
    .gallery-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }

    .image-overlay {
        padding: 1.5rem 1rem 1rem;
    }

    .image-content h3 {
        font-size: 1.1rem;
    }

    .image-content p {
        font-size: 0.85rem;
    }
}
</style> 