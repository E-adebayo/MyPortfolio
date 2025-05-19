# My Portfolio - Distribution Files

This directory contains the built and optimized files for my personal portfolio website. These files are ready for deployment to a web server or hosting platform.

## 📁 Directory Structure

- `/browser` - Contains all static assets for the client-side application
  - JavaScript bundles (minified and optimized)
  - CSS files
  - HTML files
  - Images and other assets
  - CNAME file for custom domain configuration

## 🚀 Deployment

These files are ready for deployment to any static hosting service like:

- GitHub Pages
- Netlify
- Vercel
- Firebase Hosting
- Any standard web server

## 🔧 Serving Locally

To serve these files locally for testing, you can use any simple HTTP server, for example:

```bash
# Using npm's serve package (install first with: npm install -g serve)
serve -s browser

# Or using Python's built-in HTTP server
python -m http.server --directory browser
```

## ⚙️ Build Information

- Built with Angular 17+
- Optimized for production use
- Includes prerendered routes for improved performance
- Multi-language support (English/French)

## 📝 Note

- These files are generated from the source code and should not be modified directly.
- For any changes, modify the source code and rebuild the application using `ng build`.
