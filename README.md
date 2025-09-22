<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
# RAMAYANA — Interactive Ramayana Infographic

A modern, interactive infographic that presents the Ramayana — its seven Kandas, core themes, principal characters, and an illustrated family tree. The project mixes a parchment-style visual theme with interactive audio, subtle animations, and (optionally) a background map of key locations from the epic.

Live site: https://unigalactix.github.io/RAMAYANA/

## Key Features

- Beautiful parchment-styled UI with dark/light theme support
- Seven Kandas (books) presented as clickable cards with modal detail views
- Character archetypes and themed insight cards
- Interactive family tree visualization
- Configurable devotional/background audio system with UI controls
- Optional interactive map with location markers and tooltips
- Small, fast Vite + React (TypeScript) build optimized for GitHub Pages

## Tech Stack

- React + TypeScript
- Vite (build tool)
- Tailwind CSS (CDN for quick utility classes)
- GitHub Actions for automated builds & GitHub Pages deployment

## Getting Started (Local Development)

Prerequisites

- Node.js 16+ (Node 20 recommended)
- npm (comes with Node.js)

Install

1. Clone the repository and change into the project directory:

```powershell
git clone https://github.com/Unigalactix/RAMAYANA.git
cd RAMAYANA
```

2. Install dependencies:

```powershell
npm ci
```

3. Start development server (Vite):

```powershell
npm run dev
```

Open: http://localhost:5173/RAMAYANA/ (Vite will show the exact local URL)

## Build for production

```powershell
npm run build
```

The static site will be generated into the `dist/` folder.

## Deploy (GitHub Pages)

This project uses a GitHub Actions workflow to build and publish the `dist/` folder to GitHub Pages.

- Push to the `deploy` branch to trigger the workflow (or run it manually from Actions).
- The workflow uses the repository path as the Vite base so the site works at:

  https://unigalactix.github.io/RAMAYANA/

## Configuration Notes

- `vite.config.ts` sets `base: '/RAMAYANA/'` so asset paths resolve on GitHub Pages. If you change repository name or host path, update the base accordingly.
- If you keep the optional audio system, you may see `AUDIO_GUIDE.md` with instructions and usage notes.

## Troubleshooting

- Blank page after deploy: ensure `vite.config.ts` base is correct and GitHub Actions successfully uploaded `dist/` to Pages. Check the Actions logs and the `dist/index.html` to confirm the script tag points to `/RAMAYANA/assets/...`.
- Favicon not updating: browsers cache favicons aggressively. Clear browser cache or open in an incognito window.
- Mobile layout issues: test with the dev server and use responsive devtools to check layout breakpoints.

## Contributing

Contributions are welcome. Create an issue or submit a PR with a clear description of the change and why it helps the project.

## License

This project contains original code provided by the owner. Add your license file if you want to open-source it.

---

If you'd like, I can:
- Add examples/screenshots to the README
- Add a short `CONTRIBUTING.md` and `CODE_OF_CONDUCT.md`
- Add automated tests or GitHub Pages status badge

Tell me which you'd like next.
