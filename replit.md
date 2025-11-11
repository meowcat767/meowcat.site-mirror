# Meowcat's Site

## Overview

Meowcat's Site is a personal static website featuring a modern, interactive design with eye-catching visual effects. The site serves as a portfolio and collection of projects, webrings, and gallery content. The homepage features animated particles, glitch text effects, interactive navigation cards, and real-time stats.

The project is built as a static HTML/CSS/JavaScript website with no backend server, relying on external services for dynamic features like analytics, chat embeds, and webring integrations.

## Recent Changes (November 11, 2025)

- Completely rebuilt the homepage with a modern, interactive design
- Added animated particle background with connecting lines
- Implemented glitch text effect on the main title
- Created card-based navigation with 3D parallax hover effects
- Added stats section with visitor counter, real-time clock, and random facts
- Enhanced mobile responsiveness with improved breakpoints
- Maintained all original assets and external integrations

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Static Site Structure**: The application uses vanilla HTML, CSS, and JavaScript without any frontend framework. Each page is a standalone HTML file with shared styling through `style.css`. This approach prioritizes simplicity and performance for a personal website.

**Visual Design Philosophy**: The site blends retro aesthetics with modern interactive design:
- Custom cursor using Nintendo Wii pointer theme
- Animated particle background with connecting lines
- Glitch text effects with color-shifting shadows (cyan/magenta)
- Wave animations using emoji characters (🌊🐱🚀)
- Windows Vista-inspired icons for navigation
- Glassmorphism effects (frosted glass backdrop filters)
- Card-based navigation with colorful hover states and glow effects
- Smooth CSS animations with staggered delays for visual appeal

**Responsive Layout**: Mobile-first CSS approach with viewport meta tags and flexible layouts that adapt to different screen sizes. The particle system dynamically adjusts particle count based on viewport dimensions.

**Progressive Web App (PWA) Support**: Includes `manifest.json` and `service-worker.js` for offline functionality and app-like installation. The service worker implements cache-first strategy with network fallback.

### Client-Side Features

**Terminal Emulator** (`terminal.js`): Provides a minimal command-line interface within the browser for navigating the site. Implements basic shell commands (help, clear, ls, cd, open) and maintains command history. This adds an interactive, developer-friendly navigation alternative.

**Particle Animation System** (`script.js`): Canvas-based particle animation that creates an interactive background effect. Particles move with randomized vectors, bounce off viewport boundaries, and connect to nearby particles with dynamic lines. Performance-optimized by calculating particle count based on screen area (1 particle per ~15,000 pixels).

**Interactive Features**: The homepage includes several interactive JavaScript features:
- Real-time clock display
- Animated visitor counter with smooth counting animation
- Random cat facts generator
- "Surprise Me" button that randomly navigates to different sections
- 3D parallax effect on navigation cards responding to mouse movement
- Sound effects on link clicks with proper timing delays

**Custom Error Pages**: Dedicated error handling pages (401.html, 404.html, 418.html, maintain.html) with fullscreen background images and centered error messages. Each maintains the site's visual theme while providing clear user feedback.

### Navigation Architecture

**Card-Based Navigation System**: 
- Primary: Interactive cards with icons, descriptions, and gradient buttons
- Each card has a unique color theme and hover glow effect
- 3D parallax rotation effect on mouse movement for desktop users
- Alternative: Terminal-based navigation for technical users (on other pages)
- Simple button-based "Go back" links on sub-pages

**Page Structure**:
- `index.html` - Main landing page with hero section
- `project-directory.html` - Projects showcase
- `gallery.html` - Image gallery
- `webrings.html` - Community webring memberships
- `status.html` - Site status page
- `sitemap.html` - Site navigation overview
- `ui.html` - UI demonstration page

### Styling System

**CSS Architecture**: Single monolithic `style.css` file using:
- CSS custom properties for theming
- Import of Google Fonts (Poppins)
- Keyframe animations for background gradients and effects
- Backdrop filters for glassmorphism
- Fixed positioning for immersive layouts

**Design Tokens**: Background animations cycle through color gradients using keyframes over 13-second intervals, creating dynamic visual interest without JavaScript overhead.

## External Dependencies

### Analytics & Tracking

**Google Analytics** (gtag.js): Integrated on multiple pages with tracking ID `G-JER9XHWF9B` for visitor analytics and behavior tracking.

**Google AdSense**: Advertising integration with publisher ID `ca-pub-3059320394040070` for potential monetization.

### Third-Party Integrations

**John's Citrons Widget** (`https://john.citrons.xyz/embed`): Embedded iframe widget appearing on multiple pages, likely for visitor counting or community features.

**iframe.chat**: Chat widget integration loaded via `https://iframe.chat/scripts/main.min.js` for embedded real-time communication features.

**Webring Services**:
- No AI Webring (`baccyflap.com/noai`) - Community ring opposing AI-generated content
- Vocaring (`electric-tenshi.nekoweb.org/vocaring`) - Vocaloid-themed webring with custom widget

### Development Tools

**Storybook**: Development dependency (`@storybook/html-vite`, `@storybook/addon-docs`) for component development and documentation, though not actively used in production.

**Build System**: Uses Vite through Storybook integration, suggesting potential for future bundling/optimization.

### Font & Assets

**Google Fonts API**: Loads Poppins font family (weights: 300, 500, 700) for consistent typography.

**Custom Cursor**: Nintendo Wii cursor set by Stefano Tinaglia loaded from local assets.

**Background Images**: Static image assets stored in `/images/` directory for error pages and gallery content.

### Service Worker

**Cache Strategy**: Implements custom caching logic with:
- Cache-first approach for offline support
- Conditional request headers (If-Modified-Since, ETag) for efficient updates
- Special `?cached` and `?uncached` query parameter handling
- Named cache: `meowcatmenu`

This architecture supports offline-first functionality while maintaining cache freshness through HTTP cache validation.