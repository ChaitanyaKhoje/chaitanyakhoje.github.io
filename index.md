---
layout: default
title: Home
---

<div class="hero-section">
    <h1>Astrophotography Portfolio</h1>
    <p class="subtitle">Exploring the cosmos through the lens</p>
</div>

<div class="featured-gallery">
    <h2>Featured Images</h2>
    <div class="gallery-grid">
        {% for image in site.data.gallery limit:3 %}
        <div class="gallery-item featured">
            <a href="/gallery#{{ image[0] }}" class="gallery-link">
                <img src="/assets/gallery/{{ image[0] }}-thumb.jpg" alt="{{ image[1].title }}" loading="lazy">
                <div class="gallery-item-overlay">
                    <h3>{{ image[1].title }}</h3>
                    <p>{{ image[1].description }}</p>
                </div>
            </a>
        </div>
        {% endfor %}
    </div>
    <div class="view-more">
        <a href="/gallery" class="button">View Full Gallery</a>
    </div>
</div>

<style>
.hero-section {
    text-align: center;
    padding: 100px 20px;
    background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('/assets/gallery/milky-way.jpg');
    background-size: cover;
    background-position: center;
    margin: -80px -20px 40px -20px;
}

.hero-section h1 {
    font-size: 3.5rem;
    margin-bottom: 20px;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.5);
}

.subtitle {
    font-size: 1.5rem;
    color: #ccc;
    max-width: 600px;
    margin: 0 auto;
}

.featured-gallery {
    padding: 40px 20px;
}

.featured-gallery h2 {
    text-align: center;
    margin-bottom: 40px;
    font-size: 2rem;
}

.gallery-item.featured {
    aspect-ratio: 16/9;
}

.view-more {
    text-align: center;
    margin-top: 40px;
}

.button {
    display: inline-block;
    padding: 12px 30px;
    background-color: var(--accent-color);
    color: white;
    text-decoration: none;
    border-radius: 5px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #357abd;
}

@media (max-width: 768px) {
    .hero-section h1 {
        font-size: 2.5rem;
    }
    
    .subtitle {
        font-size: 1.2rem;
    }
}
</style> 