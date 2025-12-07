<!-- Auto-generated guidance for AI coding agents working on the `premium-soulful` repo -->

# Repo summary

- This is a small React + Vite + TypeScript frontend for the "Soulful Journeys" site (project root).
- Key folders: `src/pages` (route pages), `src/components` (reusable UI), `src/assets` (images/icons), `public` / `index.html` (static entry and favicon). Tailwind CSS is used for styling.

# Quick start (commands)

- Install & run dev server: `npm install` then `npm run dev` (runs `vite`).
- Build for production: `npm run build` (runs `tsc -b && vite build`).
- Preview production build: `npm run preview`.
- Lint: `npm run lint` (uses ESLint configs in repo).

# Architecture & important patterns

- Entry & routing:

  - `src/main.tsx` mounts the app and wraps `<App />` with `BrowserRouter`.
  - `src/App.tsx` defines routes using React Router v7 (`Routes` / `Route`). A `Layout` component wraps nested routes; add new routes as children of the `/` layout route.
    - Example: to add a new page, create `src/pages/MyPage.tsx` and add `<Route path="my-page" element={<MyPage/>} />` inside the `<Route path="/" element={<Layout/>}>` block.

- Pages & components:

  - All route pages live in `src/pages` and are primarily composed with components from `src/components`.
  - `Layout.tsx` contains site chrome (Header, Footer). Keep layout-level hooks and context providers here.
  - `Header.tsx` imports the logo from `src/assets/Thumbnails/Soulful Logo.jpg` and must remain consistent with `index.html` favicon path (`/src/assets/Misc/Logo-4.png`). Use these assets for any footer/logo replacements.

- Styling:

  - Tailwind CSS is configured (`tailwind.config.js`) and used throughout via utility classes. Use `index.css` + Tailwind directives for global styles.
  - Prefer composition with utility classes rather than custom CSS unless necessary. When adding custom utilities or a color, update `tailwind.config.js`.

- TypeScript + build specifics:
  - Project uses TS; `tsconfig.*.json` present for app/node. Builds run `tsc -b` before `vite build`.
  - Keep types for props and components; follow existing style (no single-letter variable names unless local loop indices).

# Integration points & network flows

- The lead capture flow is implemented in `src/pages/MetaLeadForm.tsx` — it collects form data, handles cookies/URL params for tracking, and sends to external endpoints (HubSpot + a custom CAPI endpoint). Review this file before changing tracking or submission behavior.
- Third-party libs of interest: `react-router-dom` (v7), `framer-motion` (animations), `tailwindcss` for styling, and `vite` for dev/build.

# Project conventions and gotchas

- Routing: routes are nested under `Layout` in `src/App.tsx`; a missing nested route will render the layout but may show a blank middle area — always add new routes as children of the layout route.
- Assets: images referenced from `src/assets` are imported directly in components (e.g., `import soulfulLogo from '../assets/Thumbnails/Soulful Logo.jpg'`) while `index.html` uses a static href for the favicon (`/src/assets/Misc/Logo-4.png`). When changing or renaming assets, update both import paths and `index.html`.
- Styling & responsiveness: many components rely on Tailwind classes and responsive breakpoints. Test visual changes in dev (`npm run dev`) at multiple viewport widths.
- HubSpot/API calls: some endpoints expect non-empty fields — ensure all required fields are set before submission to avoid API errors (see existing handling in `MetaLeadForm.tsx`).

# Useful files to inspect (examples)

- `package.json` — scripts and dependencies (`dev`, `build`, `preview`, `lint`).
- `src/main.tsx` — app bootstrap and router provider.
- `src/App.tsx` — central route definitions and `Layout` nesting.
- `src/pages/MetaLeadForm.tsx` — lead capture, tracking, HubSpot + CAPI submission logic.
- `src/components/Footer.tsx`, `src/components/Header.tsx`, `src/components/Layout.tsx` — site chrome and best examples of composition and asset usage.
- `tailwind.config.js` and `postcss.config.js` — styling pipeline and customization.

# How AI agents should modify the codebase

- For UI changes: update `src/components/*` or `src/pages/*` and run `npm run dev` to preview; keep Tailwind-first approach.
- For routing/page additions: create page under `src/pages` and add a child `<Route>` in `src/App.tsx` under the layout route.
- For assets: put images into `src/assets/...` and import them where used; update `index.html` favicon path if replacing the main site icon.
- For external API changes: update `src/pages/MetaLeadForm.tsx` and ensure all outgoing payload fields have non-empty values; observe network requests in browser devtools when testing.

# When to ask the human

- If a required external API key or endpoint is missing or private (e.g., HubSpot or CAPI keys), ask for the secure value rather than hard-coding.
- If a design change requires new assets (logo/icon) provide a recommended file path and image sizes.

# Final notes

- Keep edits minimal and focused; follow existing file patterns. If introducing larger refactors, open a short PR describing the motivation and manual QA steps (visual checks across breakpoints).

---

If you'd like, I can iterate this file to include private workflow keys, more examples of common edits (e.g., how to add a Tailwind color), or auto-generated quick-links to the files referenced above.
