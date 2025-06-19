// Main JavaScript for Bonzo-inspired theme

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initAnimations();
    initSmoothScrolling();
    initHeaderEffects();
    initGalleryInteractions();
    initStatsCounter();
});

// Smooth scrolling for anchor links
function initSmoothScrolling() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Header effects and navigation
function initHeaderEffects() {
    const header = document.querySelector('.site-header');
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        // Add/remove scrolled class for styling
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Hide/show header on scroll
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
    });
}

// Intersection Observer for animations
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    const animateElements = document.querySelectorAll('.gallery-item, .equipment-item, .stat-item, .about-content');
    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Gallery interactions
function initGalleryInteractions() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click to expand functionality
        item.addEventListener('click', function() {
            const image = this.querySelector('img');
            if (image) {
                openLightbox(image.src, image.alt);
            }
        });
    });
}

// Lightbox functionality
function openLightbox(imageSrc, imageAlt) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${imageSrc}" alt="${imageAlt}">
            <button class="lightbox-close">&times;</button>
        </div>
    `;
    
    document.body.appendChild(lightbox);
    document.body.style.overflow = 'hidden';
    
    // Close lightbox
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            if (document.body.contains(lightbox)) {
                document.body.removeChild(lightbox);
                document.body.style.overflow = '';
            }
        }
    });
}

// Animated stats counter
function initStatsCounter() {
    const statValues = document.querySelectorAll('.stat-value');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounter(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statValues.forEach(stat => {
        observer.observe(stat);
    });
}

function animateCounter(element) {
    const text = element.textContent;
    const number = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '');
    
    let current = 0;
    const increment = number / 50;
    const timer = setInterval(() => {
        current += increment;
        if (current >= number) {
            current = number;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + suffix;
    }, 30);
}

// Add lightbox styles
const lightboxStyles = `
<style>
.lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10000;
    animation: fadeIn 0.3s ease;
}

.lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
}

.lightbox-content img {
    width: 100%;
    height: auto;
    border-radius: 8px;
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
}

.lightbox-close {
    position: absolute;
    top: -40px;
    right: 0;
    background: none;
    border: none;
    color: white;
    font-size: 2rem;
    cursor: pointer;
    padding: 0;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    transition: background-color 0.3s ease;
}

.lightbox-close:hover {
    background: rgba(255, 255, 255, 0.1);
}

@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

/* Header scroll effects */
.site-header {
    transition: transform 0.3s ease, background-color 0.3s ease;
}

.site-header.scrolled {
    background-color: rgba(15, 15, 15, 0.98);
    backdrop-filter: blur(30px);
}

/* Enhanced gallery hover effects */
.gallery-item {
    cursor: pointer;
}

.gallery-item-image {
    position: relative;
}

.gallery-item-image::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent 30%, rgba(100, 255, 218, 0.1) 50%, transparent 70%);
    opacity: 0;
    transition: opacity 0.3s ease;
}

.gallery-item:hover .gallery-item-image::after {
    opacity: 1;
}
</style>
`;

// Inject lightbox styles
document.head.insertAdjacentHTML('beforeend', lightboxStyles);

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Handle window resize
window.addEventListener('resize', debounce(() => {
    // Recalculate any layout-dependent elements
    const galleryGrid = document.querySelector('.gallery-grid');
    if (galleryGrid) {
        // Trigger reflow if needed
        galleryGrid.style.display = 'none';
        galleryGrid.offsetHeight; // Force reflow
        galleryGrid.style.display = '';
    }
}, 250));

// Add loading states
function showLoading(element) {
    element.classList.add('loading');
}

function hideLoading(element) {
    element.classList.remove('loading');
}

// Export functions for potential use in other scripts
window.BonzoTheme = {
    openLightbox,
    showLoading,
    hideLoading,
    animateCounter
}; 