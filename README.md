# Ramayana Codex

An immersive, single-page tribute to the **Ramayana** — Valmiki's Adi Kavya — reimagined as a premium interactive codex of mythic trading cards, sacred geography, and the lineage of the Suryavansha.

🔗 **Live site:** [unigalactix.github.io/RAMAYANA](https://unigalactix.github.io/RAMAYANA/)

## Features

- **Pantheon** — Flip-card portraits of Rama, Sita, Lakshmana, Hanuman, Ravana, and the wider cast, each with stats, Sanskrit names, hand-drawn SVG sigils (no emoji), and lore. Filterable by rarity, with direct Codex access from the card front.
- **Seven Kandas** — An interactive timeline through Bala, Ayodhya, Aranya, Kishkindha, Sundara, Yuddha, and Uttara Kanda.
- **Key Scenes** — Four scenic SVG tableaux per Kanda (28 in all), from the Putrakameshti Yajna and the breaking of Shiva's bow to Lanka Dahan and Sita's return to the Earth.
- **Interactive Leelas** — Six playable moments: break Shiva's Dhanush, face Parashurama, hold Kaikeyi's chariot in the Battle for Indra, face the fourteen thousand in Aranya, burn Lanka as Hanuman, and search for the Sanjeevani before dawn.
- **Sacred Path** — A real interactive map of the 14-year journey from Ayodhya to Lanka, with a drawn route, tappable pins, and every halt, ashram, temple, and turning point along the way.
- **Themes & Stories** — Curated meditations on dharma, devotion, and sacrifice, plus 18 tales retold in full inside the Codex (no external links), filterable by Kanda.
- **Solar Dynasty** — The zoomable Suryavansha family tree, with tap-for-detail on every name.

## Tech Stack

- React 19 + TypeScript
- Vite 6
- Tailwind CSS 3 (built with PostCSS — no CDN)
- Deployed to GitHub Pages via GitHub Actions

## Run Locally

**Prerequisites:** Node.js 20+

```bash
npm install
npm run dev
```

Open the URL printed in the terminal (typically `http://localhost:5173`).

## Build

```bash
npm run build      # outputs to dist/
npm run preview    # serve the production build locally
```

## Deployment

Pushes to `main` trigger `.github/workflows/gh-pages.yml`, which builds with `VITE_BASE="./"` (so the bundle works at the repo subpath) and publishes via the GitHub Pages workflow.

## Project Structure

```
App.tsx              # page composition
index.html           # Tailwind config, fonts, global styles
constants.ts         # characters, kandas, themes, stories, family tree
types.ts
components/          # CharacterCard, KandaTimeline, InteractiveMap, FamilyTree, …
.github/workflows/   # gh-pages deploy
```

## Credits

Design, code, and curation by **Unigalactix**. The source text honors Valmiki's Ramayana and the traditions that have carried it for millennia.

