---
layout: default
title: About Me
permalink: /about/
---

<div class="container">
    <div class="about-header">
        <h1>About Me</h1>
    </div>

    <div class="about-content">
        <div class="about-text">
            <p>My passion for astrophotography began three years ago when I first pointed my camera toward the night sky. What started as a simple curiosity has evolved into a deep fascination with capturing the cosmos.</p>
            
            <p>Through countless nights under dark skies, I've learned that astrophotography is more than just taking pictures—it's about patience, precision, and connecting with the universe on a profound level.</p>

            <h2>Equipment</h2>
            <ul class="equipment-list">
                <li>
                    <strong>Primary Imaging Scope:</strong> 8" Newtonian Reflector
                </li>
                <li>
                    <strong>Secondary Scope:</strong> 6" Refractor
                </li>
                <li>
                    <strong>Cameras:</strong> 
                    <ul>
                        <li>ZWO ASI2600MM Pro (Monochrome)</li>
                        <li>Canon EOS R (Modified)</li>
                    </ul>
                </li>
                <li>
                    <strong>Mount:</strong> Sky-Watcher EQ6-R Pro
                </li>
            </ul>

            <h2>Favorite Imaging Locations</h2>
            <ul class="location-list">
                <li>Cherry Springs State Park, PA</li>
                <li>Death Valley National Park, CA</li>
                <li>Mauna Kea, HI</li>
            </ul>
        </div>
        
        <div class="about-image">
            <img src="/assets/images/profile.jpg" alt="Chaitanya at telescope" class="profile-image">
        </div>
    </div>
</div>

<style>
.about-header {
    text-align: center;
    padding: 4rem 0 2rem;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 3rem;
}

.about-header h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    color: var(--text-color);
    font-family: var(--font-mono);
}

.about-content {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 4rem;
    align-items: start;
}

.about-text {
    color: #e0e0e0;
}

.about-text p {
    font-size: 1.1rem;
    line-height: 1.8;
    margin-bottom: 1.5rem;
}

.about-text h2 {
    font-size: 1.75rem;
    color: var(--accent-color);
    margin: 2.5rem 0 1rem;
    font-family: var(--font-mono);
}

.equipment-list, .location-list {
    list-style: none;
    padding: 0;
    margin: 1rem 0 2rem;
}

.equipment-list li, .location-list li {
    margin-bottom: 1rem;
    font-size: 1.1rem;
}

.equipment-list ul {
    list-style: none;
    padding-left: 1.5rem;
    margin-top: 0.5rem;
}

.equipment-list strong {
    color: var(--accent-color);
    font-family: var(--font-mono);
    font-weight: 500;
}

.about-image {
    position: sticky;
    top: 2rem;
}

.profile-image {
    width: 100%;
    border-radius: 12px;
    box-shadow: var(--shadow-lg);
}

@media (max-width: 1024px) {
    .about-content {
        grid-template-columns: 1fr;
        gap: 2rem;
    }

    .about-image {
        position: static;
        max-width: 600px;
        margin: 0 auto;
    }
}

@media (max-width: 768px) {
    .about-header {
        padding: 3rem 0 1.5rem;
        margin-bottom: 2rem;
    }

    .about-text p {
        font-size: 1rem;
    }

    .about-text h2 {
        font-size: 1.5rem;
        margin: 2rem 0 1rem;
    }

    .equipment-list li, .location-list li {
        font-size: 1rem;
    }
}
</style> 