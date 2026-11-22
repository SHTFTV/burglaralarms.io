# BurglarAlarms.io

Buyer education for home intrusion alarm systems. The Vite build publishes the
homepage and the static, source-linked guides in `public/guides/`. The homepage
artwork is an original generated editorial illustration.

## Build

Run `npm ci` and `npm run build`. Vercel serves the resulting `dist/` directory.
Production uses the existing burglaralarms-io project.

## Publishing

Review claims and cited sources before updating guides. Keep the canonical
URLs and sitemap in sync when adding a page. Verify the public page body,
canonical and status after production deployment. Treat DNS, production
deployment, and unattended publishing as separate verification steps.
