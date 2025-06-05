---
layout: default
title: About
---

<div class="about-container">
    <div class="about-header">
        <h1>About My Astrophotography</h1>
    </div>

    <div class="about-content">
        <section class="about-section">
            <h2>My Journey</h2>
            <p>Welcome to my astrophotography portfolio. I've been capturing the wonders of the night sky for several years, combining my passion for astronomy with the art of photography. Each image represents countless hours of planning, capturing, and processing to reveal the hidden beauty of our universe.</p>
        </section>

        <section class="about-section">
            <h2>Equipment</h2>
            <div class="equipment-grid">
                <div class="equipment-item">
                    <h3>Telescopes</h3>
                    <ul>
                        <li>10-inch Newtonian Reflector</li>
                        <li>8-inch Schmidt-Cassegrain</li>
                        <li>6-inch Refractor</li>
                    </ul>
                </div>
                <div class="equipment-item">
                    <h3>Cameras</h3>
                    <ul>
                        <li>ZWO ASI2600MM Pro</li>
                        <li>ZWO ASI533MC Pro</li>
                        <li>Canon EOS Ra</li>
                    </ul>
                </div>
                <div class="equipment-item">
                    <h3>Mounts</h3>
                    <ul>
                        <li>Sky-Watcher EQ6-R Pro</li>
                        <li>Celestron CGX</li>
                    </ul>
                </div>
            </div>
        </section>

        <section class="about-section">
            <h2>Processing</h2>
            <p>Each image undergoes careful processing to bring out the details while maintaining scientific accuracy. I use a combination of specialized software including:</p>
            <ul class="software-list">
                <li>PixInsight for deep sky processing</li>
                <li>Adobe Photoshop for final touches</li>
                <li>DeepSkyStacker for image stacking</li>
                <li>AstroPixelProcessor for calibration</li>
            </ul>
        </section>
    </div>
</div>

<style>
.about-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 40px 20px;
}

.about-header {
    text-align: center;
    margin-bottom: 60px;
}

.about-header h1 {
    font-size: 2.5rem;
    margin-bottom: 20px;
}

.about-section {
    margin-bottom: 60px;
}

.about-section h2 {
    font-size: 1.8rem;
    margin-bottom: 20px;
    color: var(--accent-color);
}

.about-section p {
    margin-bottom: 20px;
    line-height: 1.8;
}

.equipment-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 30px;
    margin-top: 30px;
}

.equipment-item {
    background: var(--secondary-color);
    padding: 20px;
    border-radius: 8px;
}

.equipment-item h3 {
    margin-bottom: 15px;
    color: var(--accent-color);
}

.equipment-item ul {
    list-style: none;
}

.equipment-item li {
    margin-bottom: 10px;
    padding-left: 20px;
    position: relative;
}

.equipment-item li:before {
    content: "•";
    color: var(--accent-color);
    position: absolute;
    left: 0;
}

.software-list {
    list-style: none;
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 15px;
    margin-top: 20px;
}

.software-list li {
    background: var(--secondary-color);
    padding: 15px;
    border-radius: 5px;
    text-align: center;
}

@media (max-width: 768px) {
    .about-header h1 {
        font-size: 2rem;
    }
    
    .equipment-grid {
        grid-template-columns: 1fr;
    }
}
</style> 