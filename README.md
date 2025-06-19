# Chaitanya Khoje - Astrophotography Portfolio

A modern, Bonzo-inspired astrophotography portfolio website built with Jekyll. Features a clean, elegant design with smooth animations and responsive layout.

## 🎨 Theme Features

### Design
- **Modern Bonzo-inspired design** with clean typography and elegant spacing
- **Dark theme** optimized for astrophotography content
- **Responsive layout** that works on all devices
- **Smooth animations** and hover effects
- **Custom scrollbar** and enhanced user experience

### Typography
- **Inter** for body text and headings
- **JetBrains Mono** for code and technical details
- **Responsive font sizing** using clamp()
- **Gradient text effects** for headings

### Color Scheme
- **Primary**: `#64ffda` (Cyan/Teal)
- **Background**: `#0f0f0f` (Very Dark Gray)
- **Cards**: `#1e1e1e` (Dark Gray)
- **Text**: `#ffffff` (White)
- **Secondary Text**: `#b0b0b0` (Light Gray)

### Interactive Features
- **Smooth scrolling** navigation
- **Animated stats counters**
- **Gallery filtering** by category
- **Lightbox image viewer**
- **Hover effects** and transitions
- **Header scroll effects**

## 🚀 Getting Started

### Prerequisites
- Ruby (2.4 or higher)
- Jekyll (4.0 or higher)
- Bundler

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/chaitanyakhoje/chaitanyakhoje.github.io.git
   cd chaitanyakhoje.github.io
   ```

2. **Install dependencies**
   ```bash
   bundle install
   ```

3. **Add sample images**
   - Open `create-sample-images.html` in your browser
   - Download the sample images to `assets/images/` folder
   - Delete the `create-sample-images.html` file after downloading

4. **Run the development server**
   ```bash
   bundle exec jekyll serve
   ```

5. **Visit the site**
   Open `http://localhost:4000` in your browser

## 📁 Project Structure

```
├── _layouts/          # Jekyll layouts
│   ├── default.html   # Main layout template
│   └── gallery.html   # Gallery layout
├── assets/
│   ├── images/        # Sample images (add your own)
│   └── css/           # Stylesheets
├── css/
│   └── main.css       # Main stylesheet
├── js/
│   └── main.js        # JavaScript functionality
├── _config.yml        # Jekyll configuration
├── index.md           # Homepage
├── gallery.md         # Gallery page
└── about.md           # About page
```

## 🎯 Customization

### Colors
Edit the CSS custom properties in `css/main.css`:
```css
:root {
    --accent-color: #64ffda;
    --bg-color: #0f0f0f;
    --card-bg: #1e1e1e;
    /* ... other colors */
}
```

### Content
- **Homepage**: Edit `index.md` for hero content and featured sections
- **Gallery**: Modify `gallery.md` to add your own images
- **About**: Update `about.md` with your personal information

### Images
Replace the sample images in `assets/images/` with your own astrophotography:
- `hero-bg.jpg` - Hero section background
- `andromeda-galaxy.jpg` - Sample galaxy image
- `orion-nebula.jpg` - Sample nebula image
- `milky-way-core.jpg` - Sample wide-field image
- `astrophotographer.jpg` - About section image

## 📱 Responsive Design

The theme is fully responsive with breakpoints at:
- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

## 🎨 Components

### Hero Section
- Full-width background image
- Gradient text effects
- Call-to-action buttons
- Shimmer animation

### Gallery Grid
- Responsive masonry layout
- Hover overlays
- Category filtering
- Lightbox viewer

### Stats Section
- Animated counters
- Icon-based design
- Responsive grid

### Equipment Section
- Card-based layout
- Icon representations
- Hover effects

## 🔧 Technical Details

### CSS Features
- CSS Grid and Flexbox layouts
- CSS Custom Properties (variables)
- Modern CSS animations
- Backdrop filters
- Smooth transitions

### JavaScript Features
- Intersection Observer API
- Smooth scrolling
- Dynamic content loading
- Event delegation
- Debounced resize handlers

### Performance
- Lazy loading images
- Optimized animations
- Efficient DOM queries
- Minimal JavaScript footprint

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please open an issue on GitHub or contact:
- Email: contact@chaitanyakhoje.com
- GitHub: [@chaitanyakhoje](https://github.com/chaitanyakhoje)

---

**Built with ❤️ for the astrophotography community**
