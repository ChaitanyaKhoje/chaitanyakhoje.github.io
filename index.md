---
layout: default
title: Home
---

<div class="container">
    <!-- Header with Name and Description -->
    <header class="content-header">
        <h1 class="site-title">Chaitanya Khoje</h1>
        <p class="site-description">Astrophotographer & Space Enthusiast</p>
    </header>

    <!-- Featured Images Grid - Main Content -->
    <section class="featured-images">
        <div class="images-grid">
            <div class="image-card featured-large">
                <div class="image-container">
                    <img src="/assets/images/andromeda-galaxy.jpg" alt="Andromeda Galaxy" loading="lazy">
                    <div class="image-overlay">
                        <div class="image-content">
                            <h3>Andromeda Galaxy</h3>
                            <p>Our closest galactic neighbor, 2.5 million light-years away</p>
                            <div class="image-meta">
                                <span>8" Newtonian • 4 hours • Bortle 4</span>
                            </div>
                            <a href="/gallery/andromeda" class="view-details">View Details</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="image-card">
                <div class="image-container">
                    <img src="/assets/images/orion-nebula.jpg" alt="Orion Nebula" loading="lazy">
                    <div class="image-overlay">
                        <div class="image-content">
                            <h3>Orion Nebula</h3>
                            <p>A stellar nursery in our cosmic backyard</p>
                            <div class="image-meta">
                                <span>6" Refractor • 3 hours</span>
                            </div>
                            <a href="/gallery/orion" class="view-details">View Details</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="image-card">
                <div class="image-container">
                    <img src="/assets/images/milky-way-core.jpg" alt="Milky Way Core" loading="lazy">
                    <div class="image-overlay">
                        <div class="image-content">
                            <h3>Milky Way Core</h3>
                            <p>The heart of our galaxy revealed</p>
                            <div class="image-meta">
                                <span>Canon EOS R • 2 hours</span>
                            </div>
                            <a href="/gallery/milky-way" class="view-details">View Details</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="image-card">
                <div class="image-container">
                    <img src="/assets/images/eagle-nebula.jpg" alt="Eagle Nebula" loading="lazy">
                    <div class="image-overlay">
                        <div class="image-content">
                            <h3>Eagle Nebula</h3>
                            <p>Home to the Pillars of Creation</p>
                            <div class="image-meta">
                                <span>8" Newtonian • 5 hours</span>
                            </div>
                            <a href="/gallery/eagle" class="view-details">View Details</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="image-card">
                <div class="image-container">
                    <img src="/assets/images/whirlpool-galaxy.jpg" alt="Whirlpool Galaxy" loading="lazy">
                    <div class="image-overlay">
                        <div class="image-content">
                            <h3>Whirlpool Galaxy</h3>
                            <p>A stunning interacting galaxy pair</p>
                            <div class="image-meta">
                                <span>6" Refractor • 3.5 hours</span>
                            </div>
                            <a href="/gallery/whirlpool" class="view-details">View Details</a>
                        </div>
                    </div>
                </div>
            </div>

            <div class="image-card">
                <div class="image-container">
                    <img src="/assets/images/ring-nebula.jpg" alt="Ring Nebula" loading="lazy">
                    <div class="image-overlay">
                        <div class="image-content">
                            <h3>Ring Nebula</h3>
                            <p>A planetary nebula in Lyra</p>
                            <div class="image-meta">
                                <span>4" APO • 2.5 hours</span>
                            </div>
                            <a href="/gallery/ring" class="view-details">View Details</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- Image Stats - More Relevant -->
    <section class="image-stats">
        <div class="stats-grid">
            <div class="stat-item">
                <div class="stat-icon">📸</div>
                <div class="stat-content">
                    <div class="stat-number">47</div>
                    <div class="stat-label">Images Captured</div>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">⏱️</div>
                <div class="stat-content">
                    <div class="stat-number">284</div>
                    <div class="stat-label">Hours of Exposure</div>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">🌌</div>
                <div class="stat-content">
                    <div class="stat-number">12</div>
                    <div class="stat-label">Galaxies Imaged</div>
                </div>
            </div>
            <div class="stat-item">
                <div class="stat-icon">⭐</div>
                <div class="stat-content">
                    <div class="stat-number">18</div>
                    <div class="stat-label">Nebulae Captured</div>
                </div>
            </div>
        </div>
    </section>
</div>

<style>
/* Content Header - Integrated with Content */
.content-header {
    text-align: center;
    padding: 3rem 0 2rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    margin-bottom: 2rem;
}

.site-title {
    font-size: clamp(2.5rem, 6vw, 3.5rem);
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 0.5rem;
    letter-spacing: -1px;
    font-family: var(--font-mono);
}

.site-description {
    font-size: clamp(1.1rem, 2.5vw, 1.3rem);
    color: var(--accent-color);
    font-weight: 400;
    opacity: 0.9;
    margin: 0;
}

/* Featured Images - Main Content */
.featured-images {
    padding: 0 0 3rem;
}

.images-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-bottom: 3rem;
}

.image-card {
    position: relative;
    border-radius: 12px;
    overflow: hidden;
    background: var(--card-bg);
    transition: all 0.3s ease;
    cursor: pointer;
}

.image-card:hover {
    transform: translateY(-4px);
    box-shadow: var(--shadow-lg);
}

.image-card.featured-large {
    grid-column: span 2;
    grid-row: span 2;
}

.image-container {
    position: relative;
    aspect-ratio: 4/3;
    overflow: hidden;
}

.image-card.featured-large .image-container {
    aspect-ratio: 16/9;
}

.image-container img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
}

.image-card:hover .image-container img {
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

.image-card:hover .image-overlay {
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

/* Image Stats - More Relevant */
.image-stats {
    padding: 2rem 0;
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    margin-top: 2rem;
}

.stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    text-align: center;
}

.stat-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1.5rem;
    background: var(--card-bg);
    border-radius: 12px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    transition: all 0.3s ease;
}

.stat-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    border-color: var(--accent-color);
}

.stat-icon {
    font-size: 2rem;
    margin-bottom: 1rem;
    opacity: 0.8;
}

.stat-content {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.stat-number {
    font-size: 2rem;
    font-weight: 700;
    color: var(--accent-color);
    font-family: var(--font-mono);
    line-height: 1;
    margin-bottom: 0.5rem;
}

.stat-label {
    font-size: 0.85rem;
    color: #b0b0b0;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
    .images-grid {
        grid-template-columns: repeat(2, 1fr);
    }
    
    .image-card.featured-large {
        grid-column: span 1;
        grid-row: span 1;
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1.5rem;
    }
}

@media (max-width: 768px) {
    .content-header {
        padding: 2rem 0 1.5rem;
    }
    
    .images-grid {
        grid-template-columns: 1fr;
        gap: 1rem;
    }
    
    .stats-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
    }
    
    .stat-item {
        padding: 1rem;
    }
    
    .stat-number {
        font-size: 1.5rem;
    }
    
    .stat-icon {
        font-size: 1.5rem;
        margin-bottom: 0.75rem;
    }
}

@media (max-width: 480px) {
    .stats-grid {
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
    
    .stat-item {
        flex-direction: row;
        text-align: left;
        gap: 1rem;
    }
    
    .stat-icon {
        margin-bottom: 0;
        font-size: 1.25rem;
    }
    
    .stat-content {
        align-items: flex-start;
    }
}
</style> 