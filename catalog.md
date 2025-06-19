---
layout: default
title: "Deep Sky Objects Catalog"
permalink: /catalog/dso/
---

This catalog showcases my collection of deep sky object photographs, captured through various telescopes and cameras under dark sky conditions.

<div class="gallery-container">
    <div class="gallery-grid">
        {% for item in site.data.gallery %}
        {% assign image = item[1] %}
        <div class="gallery-item">
            <div class="image-container">
                {% if image.path %}
                <img src="{{ image.path }}" 
                     alt="{{ image.title }}"
                     class="gallery-image"
                     loading="lazy"
                     onclick="openLightbox(this)">
                {% else %}
                <div class="placeholder-image">
                    <span>Image not available</span>
                </div>
                {% endif %}
                <div class="image-info">
                    <h3>{{ image.title }}</h3>
                    <p>{{ image.description }}</p>
                    <div class="image-metadata">
                        <p><strong>Equipment:</strong> {{ image.equipment }}</p>
                        <p><strong>Date:</strong> {{ image.date }}</p>
                    </div>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>

<!-- Lightbox -->
<div id="lightbox" class="lightbox" onclick="closeLightbox()">
    <span class="close-button">&times;</span>
    <img id="lightbox-image" class="lightbox-content">
</div>

<style>
.gallery-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
    padding: 2rem 0;
}

.gallery-item {
    position: relative;
    overflow: hidden;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease;
}

.gallery-item:hover {
    transform: translateY(-5px);
}

.image-container {
    position: relative;
}

.gallery-image {
    width: 100%;
    height: 300px;
    object-fit: cover;
    cursor: pointer;
    transition: opacity 0.3s ease;
}

.placeholder-image {
    width: 100%;
    height: 300px;
    background: #f0f0f0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #666;
    font-size: 1.1rem;
    border: 2px dashed #ccc;
}

.image-info {
    padding: 1rem;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    transform: translateY(100%);
    transition: transform 0.3s ease;
}

.gallery-item:hover .image-info {
    transform: translateY(0);
}

.image-metadata {
    font-size: 0.9rem;
    margin-top: 0.5rem;
}

/* Lightbox styles */
.lightbox {
    display: none;
    position: fixed;
    z-index: 1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    padding: 2rem;
}

.lightbox-content {
    max-width: 90%;
    max-height: 90vh;
    margin: auto;
    display: block;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

.close-button {
    position: absolute;
    top: 1rem;
    right: 2rem;
    color: white;
    font-size: 2rem;
    cursor: pointer;
}
</style>

<script>
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    lightboxImg.src = img.src;
    lightbox.style.display = 'block';
}

function closeLightbox() {
    document.getElementById('lightbox').style.display = 'none';
}
</script> 