# Portfolio Site

A React + Vite portfolio, multi-page (Home, Projects, Project Detail, About, Contact), dark/techy theme.

## Getting started in VSCode

1. Open this folder in VSCode.
2. Open a terminal (`` Ctrl+` ``) and run:
   ```
   npm install
   npm run dev
   ```
3. Open the local URL it prints (usually `http://localhost:5173`).

## Where to edit things

- **Your info** (name, tagline, skills, email, socials): `src/data/profile.js`
- **Projects list**: `src/data/projects.js` — add a new object to the array for each project; it automatically gets a card and a detail page at `/projects/<slug>`. Fields marked `TODO` still need filling in (especially the Asset Tracker entry).
- **Colors/fonts**: top of `src/index.css` under `:root` — change `--accent` to swap the accent color.
- **Pages**: `src/pages/` — one file per page.
- **Nav links**: `src/components/Navbar.jsx`.

## Deploying

Once you're happy with it, `npm run build` produces a `dist/` folder you can deploy to Vercel or Netlify (both have free tiers and connect directly to a GitHub repo for auto-deploys on push).
