# Hostinger Deployment Checklist

Recommended steps to deploy the Vite SPA to Hostinger (public_html):

- Build the app: `npm run build` (this produces `dist` by default).
- Upload `dist` contents to your Hostinger `public_html` (or use SFTP/FTP).
- Ensure `public/.htaccess` (added to the project) is uploaded to `public_html` as `.htaccess`.
  - The provided `.htaccess` rewrites unknown routes to `index.html` so BrowserRouter works.

## Notes & edge-case fixes

- If you cannot upload `.htaccess` or don't control server config, switch to `HashRouter` in
  `src/main.tsx` (quick fallback). That avoids server rewrites but changes URLs to include `/#/`.
- If your app is hosted in a subfolder (example: `example.com/mysite/`), set `base` in `vite.config.ts` to
  the subpath (e.g. `base: '/mysite/'`) before building so asset paths are correct.
- We enabled route-level code-splitting using `React.lazy`+`Suspense` in `src/App.tsx`. This reduces
  the initial bundle size and ensures pages are loaded on demand.
- Clear Hostinger caches (and any CDN) after deploy to avoid stale `index.html` being served.

## Quick troubleshooting

- 404s on direct navigation: missing `.htaccess` or rewrite rules. Upload `.htaccess` to `public_html`.
- Missing assets or incorrect paths: check `base` in `vite.config.ts` if deployed to a subpath.
- Large initial download: make sure route-level lazy-loading is present and `node_modules` not bundled.

If you want, I can:

- Patch `src/main.tsx` to use `HashRouter` instead of `BrowserRouter` (no server changes needed).
- Set `base` in `vite.config.ts` to `./` (useful for some shared-host environments) — tell me the site subpath.
