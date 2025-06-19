---
layout: default
title: Contact
permalink: /contact/
---

<div class="container">
    <div class="contact-header">
        <h1>Get in Touch</h1>
        <p>Have questions about my astrophotography or interested in collaboration? I'd love to hear from you.</p>
    </div>

    <div class="contact-content">
        <div class="contact-methods">
            <div class="contact-method">
                <div class="method-icon">📧</div>
                <h3>Email</h3>
                <p>{{ site.email }}</p>
                <a href="mailto:{{ site.email }}" class="contact-link">Send Email</a>
            </div>

            <div class="contact-method">
                <div class="method-icon">📱</div>
                <h3>Social Media</h3>
                <p>Follow my astrophotography journey</p>
                <div class="social-links">
                    <a href="https://instagram.com/{{ site.instagram_username }}" target="_blank" rel="noopener" class="contact-link">Instagram</a>
                    <a href="https://github.com/{{ site.github_username }}" target="_blank" rel="noopener" class="contact-link">GitHub</a>
                </div>
            </div>

            <div class="contact-method">
                <div class="method-icon">📍</div>
                <h3>Location</h3>
                <p>Based in Maharashtra, India</p>
                <p>Available for collaborations worldwide</p>
            </div>
        </div>
    </div>
</div>

<style>
.contact-header {
    text-align: center;
    padding: 4rem 0 2rem;
    border-bottom: 1px solid var(--border-color);
    margin-bottom: 3rem;
}

.contact-header h1 {
    font-size: clamp(2.5rem, 5vw, 3.5rem);
    font-weight: 700;
    color: var(--text-color);
    margin-bottom: 1rem;
    font-family: var(--font-mono);
}

.contact-header p {
    font-size: 1.2rem;
    color: var(--accent-color);
    opacity: 0.9;
}

.contact-content {
    max-width: 900px;
    margin: 0 auto;
}

.contact-methods {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2rem;
}

.contact-method {
    background: var(--card-bg);
    padding: 2rem;
    border-radius: 12px;
    text-align: center;
    border: 1px solid var(--border-color);
    transition: all 0.3s ease;
}

.contact-method:hover {
    transform: translateY(-4px);
    border-color: var(--accent-color);
    box-shadow: var(--shadow-md);
}

.method-icon {
    font-size: 2.5rem;
    margin-bottom: 1rem;
}

.contact-method h3 {
    color: var(--text-color);
    font-size: 1.25rem;
    margin-bottom: 0.5rem;
    font-family: var(--font-mono);
}

.contact-method p {
    color: #b0b0b0;
    margin-bottom: 1rem;
    font-size: 0.95rem;
}

.contact-link {
    display: inline-block;
    padding: 0.5rem 1rem;
    background: var(--accent-color);
    color: var(--bg-color);
    text-decoration: none;
    border-radius: 6px;
    font-size: 0.9rem;
    font-weight: 500;
    transition: all 0.3s ease;
}

.contact-link:hover {
    background: #4cd4b0;
    transform: translateY(-1px);
}

.social-links {
    display: flex;
    gap: 1rem;
    justify-content: center;
}

@media (max-width: 768px) {
    .contact-methods {
        grid-template-columns: 1fr;
        gap: 1.5rem;
    }

    .contact-header {
        padding: 3rem 0 1.5rem;
        margin-bottom: 2rem;
    }

    .contact-method {
        padding: 1.5rem;
    }
}
</style> 