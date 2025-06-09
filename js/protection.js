// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Disable drag and drop
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// Disable keyboard shortcuts for saving images
document.addEventListener('keydown', function(e) {
    // Prevent Ctrl+S, Ctrl+U, Ctrl+P
    if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'u' || e.key === 'p')) {
        e.preventDefault();
        return false;
    }
});

// Add loading animation to images
document.addEventListener('DOMContentLoaded', function() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.transition = 'opacity 0.3s ease-in-out';
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
    });
}); 