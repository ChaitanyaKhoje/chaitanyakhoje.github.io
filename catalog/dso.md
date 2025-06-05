---
layout: default
title: Deep Sky Objects Catalog
---

<div class="catalog-header">
    <h1>Deep Sky Objects Catalog</h1>
    <p class="catalog-description">A comprehensive collection of deep sky objects captured and processed for astrophotography</p>
</div>

<div class="catalog-filters">
    <div class="filter-group">
        <label for="object-type">Object Type:</label>
        <select id="object-type">
            <option value="all">All Types</option>
            <option value="galaxy">Galaxies</option>
            <option value="nebula">Nebulae</option>
            <option value="cluster">Star Clusters</option>
        </select>
    </div>
    <div class="filter-group">
        <label for="constellation">Constellation:</label>
        <select id="constellation">
            <option value="all">All Constellations</option>
            <option value="andromeda">Andromeda</option>
            <option value="orion">Orion</option>
            <option value="taurus">Taurus</option>
        </select>
    </div>
</div>

<div class="catalog-grid">
    {% for object in site.data.dso_catalog %}
    <div class="catalog-item" data-type="{{ object.type }}" data-constellation="{{ object.constellation }}">
        <div class="catalog-item-image">
            <img src="{{ object.image | relative_url }}" alt="{{ object.name }}" loading="lazy">
        </div>
        <div class="catalog-item-content">
            <h3>{{ object.name }}</h3>
            <p class="object-type">{{ object.type }}</p>
            <p class="object-description">{{ object.description }}</p>
            <div class="object-details">
                <div class="detail-item">
                    <span class="detail-label">Constellation:</span>
                    <span class="detail-value">{{ object.constellation }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Magnitude:</span>
                    <span class="detail-value">{{ object.magnitude }}</span>
                </div>
                <div class="detail-item">
                    <span class="detail-label">Distance:</span>
                    <span class="detail-value">{{ object.distance }}</span>
                </div>
            </div>
            <a href="{{ object.url | relative_url }}" class="button">View Details</a>
        </div>
    </div>
    {% endfor %}
</div>

<style>
.catalog-header {
    text-align: center;
    margin-bottom: 40px;
}

.catalog-header h1 {
    font-size: 2.5rem;
    margin-bottom: 10px;
}

.catalog-description {
    color: #ccc;
    max-width: 600px;
    margin: 0 auto;
}

.catalog-filters {
    display: flex;
    gap: 20px;
    margin-bottom: 30px;
    padding: 20px;
    background: var(--card-bg);
    border-radius: 8px;
}

.filter-group {
    display: flex;
    align-items: center;
    gap: 10px;
}

.filter-group label {
    color: #ccc;
}

.filter-group select {
    background: var(--secondary-color);
    color: var(--text-color);
    border: 1px solid var(--border-color);
    padding: 8px 12px;
    border-radius: 4px;
}

.object-type {
    color: var(--accent-color);
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.object-description {
    margin-bottom: 15px;
}

.object-details {
    margin: 15px 0;
    padding: 15px;
    background: var(--secondary-color);
    border-radius: 4px;
}

.detail-item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5px;
}

.detail-label {
    color: #ccc;
}

.detail-value {
    font-weight: 500;
}

.button {
    display: inline-block;
    padding: 8px 20px;
    background-color: var(--accent-color);
    color: white;
    text-decoration: none;
    border-radius: 4px;
    transition: background-color 0.3s ease;
}

.button:hover {
    background-color: #357abd;
}

@media (max-width: 768px) {
    .catalog-filters {
        flex-direction: column;
    }
    
    .filter-group {
        width: 100%;
    }
    
    .filter-group select {
        flex: 1;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const typeFilter = document.getElementById('object-type');
    const constellationFilter = document.getElementById('constellation');
    const items = document.querySelectorAll('.catalog-item');

    function filterItems() {
        const selectedType = typeFilter.value;
        const selectedConstellation = constellationFilter.value;

        items.forEach(item => {
            const type = item.dataset.type;
            const constellation = item.dataset.constellation;
            
            const typeMatch = selectedType === 'all' || type === selectedType;
            const constellationMatch = selectedConstellation === 'all' || constellation === selectedConstellation;
            
            item.style.display = typeMatch && constellationMatch ? 'block' : 'none';
        });
    }

    typeFilter.addEventListener('change', filterItems);
    constellationFilter.addEventListener('change', filterItems);
});
</script> 