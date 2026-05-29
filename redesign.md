# Ramayana Codex — Redesign Plan

> **यतो धर्मस्ततो जयः** — *where there is dharma, there is victory.*
> Inspired by the routed, devotional density of the [Mahābhārata Codex](https://unigalactix.github.io/Mahabharat/), this plan lifts the Ramayana Codex from a single-page tribute into a true *codex* — a multi-route, scripturally-faithful, design-system-driven living text.

---

## 0 · Phase Zero (already shipped in this pass)

| | Feature | Why it matters |
|---|---|---|
| ✅ | **Glassmorphic edge-fade navigation** with active-section detection (IntersectionObserver) | Premium feel matching the Mahābhārata codex header rail |
| ✅ | **⌘K Command Palette** — searches characters, kandas, themes, stories, sections (also `/` shortcut) | Power-user navigation; mirrors the Mahābhārata polish phase |
| ✅ | **Sanskrit Glossary Drawer** (`⌘⇧G`) — 22 curated terms with source-context | Educates without breaking flow |
| ✅ | **Verse of the Day** card on the landing page | Devotional anchor; daily reason to return |
| ✅ | **Phala-Śruti closing section** with the canonical fruit-of-hearing śloka | Authentic devotional bracket — opens with Maṅgalācaraṇa, closes with Phala-śruti |

Build verified: `npm run build` → 272 KB JS bundle (85 KB gzipped), 31 KB HTML (7 KB gzipped).

---

## 1 · Story & Scriptural Authenticity

The current codex draws from a mixed retelling. To honor the source as the Mahābhārata Codex does (citing parvas, shlokas, and traditions), Ramayana Codex should:

### 1.1 Anchor every line to a textual source

For each character, kanda, story, and key moment, store a `source` reference object:

```ts
type Source = {
  text: 'Valmiki' | 'Adhyatma' | 'Kamba' | 'Tulsidas' | 'Adbhuta' | 'Ananda' | 'Tattvasangraha';
  kanda?: KandaName;
  sarga?: number;      // chapter
  shloka?: number;     // verse
  note?: string;       // 'paraphrase' | 'tradition' | 'commentary'
};
```

This single change is what most elevates the project from "infographic" to "codex".

### 1.2 Honor the regional and traditional Rāmāyaṇas

A canonical-but-respectful set to draw from, in priority order:

| Tradition | Why include | Where to surface |
|---|---|---|
| **Vālmīki Rāmāyaṇa** (Sanskrit, 24,000 ślokas) | The Ādi-Kāvya — the spine | Every page; primary source |
| **Adhyātma Rāmāyaṇa** (Sanskrit, in the Brahmāṇḍa Purāṇa) | Philosophical / Advaitic lens; basis of Tulsidas | Themes, Sītā Tattva, Hanumān as Jīva |
| **Tulsīdās — Rāmcaritmānas** (Awadhi, 16th C) | The Ramayana of the common heart | Bhakti themes, hymns (Hanumān Cālīsā, Sundarakāṇḍa) |
| **Kamba Rāmāyaṇam** (Tamil) | Southern poetic tradition; richer Sītā psychology | Sundara Kāṇḍa, Yuddha Kāṇḍa |
| **Adbhuta Rāmāyaṇa** | Sītā as Mahākālī slaying Sahasrarāvaṇa | A standalone "Devī Mode" page |
| **Ānanda Rāmāyaṇa** | Post-coronation līlās, names of Rama (1000) | Sahasranāma page |

The Mahābhārata Codex's strength is that it does this for the Mahābhārata, Bhagavad Gītā, Harivaṁśa, and Anuśāsana parvas. The Ramayana Codex should mirror that breadth.

### 1.3 Sanskrit-first, transliteration always, translation devotionally

Adopt the convention used in the Mahābhārata Codex:

```
Devanāgarī (top, font-sanskrit, gold)
IAST or Harvard-Kyoto transliteration (italic, parchment)
English meaning, marked clearly as paraphrase
Source citation in small caps (Cinzel uppercase tracking)
```

Already used by the new `VerseOfTheDay` and `ClosingShloka` components. Roll out to every quotation.

### 1.4 Story corrections and additions to prioritize

A non-exhaustive list of authenticity fixes / additions for the existing content:

- **Bāla Kāṇḍa**
  - Add Viśvāmitra–Vasiṣṭha rivalry and the Triśaṅku episode (the basis of Viśvāmitra coming to Daśaratha).
  - Tāṭakā-vadha → Mārīca and Subāhu at the yajña → Ahalyā-uddhāra → Mithilā → bow of Śiva. Each is its own moment.
  - The Paraśurāma encounter on the way home — the surrender of Vaiṣṇava-tejas from one Viṣṇu-avatāra to the next.
- **Ayodhyā Kāṇḍa**
  - Mantharā as the catalyst is too thin — include Kaikeyī's two old boons from the deva-asura war.
  - Daśaratha's death from the curse of the blind ṛṣi couple (Śravaṇa Kumāra) — *the* reason a king who never broke his word found himself bound by it.
  - Bharata–Rama meeting at Citrakūṭa is one of the great moments in Sanskrit literature; deserves a full sub-page.
- **Araṇya Kāṇḍa**
  - Encounters with sages — Atri & Anasūyā (Sītā's stotra and the divine gifts), Sutīkṣṇa, Agastya (the gift of the inexhaustible quiver, sword, and Vaiṣṇava-dhanus).
  - Jaṭāyu's fall and Rama performing his last rites — one of the tenderest passages in the epic.
- **Kiṣkindhā Kāṇḍa**
  - The slaying of Vāli — the *only* genuinely controversial act of Rama. The codex must present both sides honestly (Vāli's challenge, Rama's reply).
- **Sundara Kāṇḍa** (the heart of devotion)
  - This whole kāṇḍa deserves a route of its own (see §3.3). Hanumān-as-jīva crossing the ocean of saṁsāra is the dominant Advaitic reading.
- **Yuddha Kāṇḍa**
  - Vibhīṣaṇa-śaraṇāgati — Rama's vow: *"sakṛd eva prapannāya tavāsmīti ca yācate; abhayaṁ sarva-bhūtebhyo dadāmy etad vrataṁ mama"* — the central Śrī-Vaiṣṇava verse.
  - The full eighteen-day correspondences are not in Vālmīki (that's Mahābhārata); Rama's war is across multiple days but not numbered eighteen. Be careful not to import the Kurukṣetra structure.
  - Agni-parīkṣā: present *with* the Vālmīki context — Sītā insists on it to silence the world; Brahmā and the devas testify; Daśaratha appears.
- **Uttara Kāṇḍa**
  - The most contested. Note its layered authorship (post-Vālmīki interpolations are widely accepted by scholars). Present what is in the received text, but flag tradition.
  - Lava-Kuśa singing the Rāmāyaṇa back to Rama in his own court is a *meta-literary masterpiece* — Vālmīki's signature.
  - Sītā's return to Bhūmi-devī — frame as a homecoming, not a punishment.

### 1.5 Add what is missing

- **Sītā-tattva** — a dedicated section on Sītā as Mahālakṣmī, drawing from Adhyātma and the Śrī-Vaiṣṇava ācāryas.
- **Hanumān corpus** — Cālīsā, Bāhuk, Sundarakāṇḍa-pāṭha tradition.
- **The Rāmāyaṇa outside India** — Rāmakerti (Cambodia), Ramakien (Thailand), Hikayat Seri Rama (Malaysia), Phra Lak Phra Lam (Laos), Yama Zatdaw (Burma). The Mahābhārata Codex hints at this through Krishna's līlās; Ramayana has an even greater pan-Asian reach.

---

## 2 · Design System Upgrade

The current site has good bones — Cinzel Decorative + Cormorant Garamond + Tiro Devanagari Sanskrit + a saffron / gold / royal-blue palette. The next layer:

### 2.1 Token the palette

Move from ad-hoc hex values to a named token system in `tailwind.config` and CSS variables:

```ts
colors: {
  // Backgrounds
  ink:        '#08060F', // deepest night
  night:      '#0B0712',
  royal:      '#15101F',
  parchment:  '#F5E8C9',

  // Sacred accents — each maps to a deity / mood
  gold:       '#D4AF37', // Lakṣmī, ornament
  goldlight:  '#F5D061', // Sūrya
  saffron:    '#FF8C42', // tyāga / renunciation
  crimson:    '#B91C1C', // Kṣātra-vīrya, Rāvaṇa
  sapphire:   '#3B82F6', // Rama-nīlam (the dark-blue lord)
  jade:       '#10B981', // Lakṣmaṇa, vana
  lotus:      '#E879F9', // Sītā
  amber:      '#F59E0B', // Hanumān
},
```

Then *every* component pulls its accent from this token table by character/kanda role. Today's `accent: '#3B82F6'` strings should reference `tokens.sapphire` etc.

### 2.2 Type scale

Lock to a modular scale (1.250 — major third) and document it in CSS custom props so headings never drift.

### 2.3 Motion language

The current site is intentionally static (`Reveal` is a no-op). The Mahābhārata Codex uses *restrained* motion: subtle reveals, the radial Viśvarūpa stage. Add a single motion vocabulary:

- `motion-rise` — 200ms opacity + 8px translateY, used on section entry once
- `motion-glow` — 4s breathing box-shadow on hero glyph
- `motion-foil` — *very* slow gradient shift on card holo (no JS, pure CSS)
- Respect `prefers-reduced-motion` everywhere

### 2.4 Iconography

Replace emoji glyphs (`🏹`, `🪷`) with inline SVG sigils per character. Emojis ship the OS font — a bow on Windows looks nothing like a bow on iOS. Custom SVG keeps the codex looking like itself everywhere.

### 2.5 The "card" deserves more

The trading card is the signature element. Extend it:

- **Holo variants by rarity**: mythic = aurora, legendary = molten gold, epic = aura, rare = static foil.
- **Edition number** on every card (e.g. `001 / 108` — *aṣṭottara-śatam*, a sacred count).
- **Sanskrit corner mark** with the bīja-mantra of the character: रां for Rāma, सीं for Sītā, हं for Hanumān.

---

## 3 · Multi-Route Expansion (the big move)

Move from a single `App.tsx` composition to a routed structure modelled on the Mahābhārata Codex's 13-route shape — but tailored to the Rāmāyaṇa.

### 3.1 Router

Adopt `react-router-dom` v6 with `HashRouter` (so GitHub Pages deep-links survive a hard refresh without server-side SPA fallback — exact pattern used by Mahābhārata Codex):

```tsx
import { HashRouter, Routes, Route } from 'react-router-dom';
```

### 3.2 Proposed routes

| Route | Page | Notes |
|---|---|---|
| `/` | Home | Hero · Maṅgalācaraṇa · Verse of the Day · Stats · Featured cards · Phala-śruti |
| `/characters` | Pantheon | 30+ flippable cards · filters: Avatāra / Ikṣvāku / Vānara / Rākṣasa / Ṛṣi / Devī |
| `/kandas` | Seven Kāṇḍas | Tabbed timeline (already exists, lift to its own route) |
| `/bala` | Bāla Kāṇḍa deep-dive | Each kāṇḍa as a route of its own — sub-episodes inside |
| `/ayodhya` | Ayodhyā Kāṇḍa | Mantharā, Kaikeyī's two boons, Daśaratha's curse, Citrakūṭa |
| `/aranya` | Araṇya Kāṇḍa | Sage circuit, Pañcavaṭī, Mārīca, abduction, Jaṭāyu |
| `/kishkindha` | Kiṣkindhā Kāṇḍa | Vāli, Sugrīva, four directions search |
| `/sundara` | **Sundara Kāṇḍa** | The crown — Hanumān's leap, devotional sub-pages, full pāṭha mode |
| `/yuddha` | Yuddha Kāṇḍa | Sea-bridge, day-wise war log, Kumbhakarṇa, Indrajit, Rāvaṇa-vadha |
| `/uttara` | Uttara Kāṇḍa | Lava-Kuśa, Sītā's return to Bhūmi, the layered authorship discussion |
| `/hanuman` | Hanumān | The Vāyu-putra deep-dive · 12 names · Cālīsā · Sundara-pāṭha tradition |
| `/sita` | Sītā-Tattva | Lakṣmī-avatāra · Adhyātma reading · Adbhuta Rāmāyaṇa appearance · Bhūmi-jā |
| `/rama` | Rama-Nāma | Tāraka-mantra · Rāma-sahasranāma · Rāmarakṣā-stotra |
| `/setu` | Sacred Path & Setu | Interactive map (already exists) + Setubandha story · the floating stones |
| `/temples` | Sri Rama Kṣetras | 12 great temples (already exists) — pivoted to its own route |
| `/lineage` | Sūrya-vaṁśa | Recursive family tree (already exists) |
| `/ramayanas` | The Many Rāmāyaṇas | Vālmīki / Adhyātma / Kamba / Tulsīdās / Adbhuta + pan-Asian retellings |
| `/glossary` | Glossary | Full-page version of the drawer with 200+ terms |

### 3.3 Sundara Kāṇḍa deserves a *museum*

Sundara Kāṇḍa is the only kāṇḍa traditionally recited in its entirety as a devotional practice. It is the heart of the Rāmāyaṇa for Hanumān bhaktas. The codex should offer:

- A scroll-driven, chapter-by-chapter animated reading (Hanumān growing → Mainākā → Surasā → Siṁhikā → the leap → Aśoka-vāṭikā → Sītā-darśana → the ring → Laṅkā-dahana → return).
- A "pāṭha mode" — verse-by-verse Sanskrit text with audio reciter, used as a daily devotional practice.
- This is the closest analog to the Mahābhārata Codex's `/vishwarupa` chapter — a single page that is unmistakably the soul of the project.

### 3.4 New cross-cutting pages

- **`/wisdom`** — *Subhāṣitas of the Rāmāyaṇa.* 20–30 single-verse ślokas with full source citation. Filterable by theme: rāja-dharma, bhakti, friendship, satya, valor.
- **`/timeline`** — A horizontal narrative timeline of the 14 years of vanavāsa, with monthly granularity where the text supports it (the *Mārgaśīrṣa* return to Ayodhyā = Vijayadaśamī tradition).

---

## 4 · Accessibility, Performance, i18n

### 4.1 Accessibility

- All modals are already focus-trapped — keep that, add `aria-modal="true"` (done in the new palette/drawer).
- Skip-link already exists — verify it lands on `#characters` and works after the route migration.
- Audit color contrast: `#c9bd9b on #0d0a18` is borderline at small sizes — bump to `#d8cdb0` for body copy under 14 px.
- Respect `prefers-reduced-motion` — disable the foil sheen, the holo gradient, and the hero glow.
- Sanskrit text needs `lang="sa"` on the surrounding element; English needs `lang="en"`. Important for screen readers.

### 4.2 Performance

- Code-split per route (`React.lazy` + `Suspense`) once the router lands — matches the Mahābhārata Codex's recent `feat(polish)` commit.
- Preload only the home route's chunk.
- Switch from Tailwind-CDN to a built Tailwind (or keep CDN and accept the trade-off — the Mahābhārata Codex keeps CDN for portability).
- Replace emoji glyphs with inline SVGs to avoid a 200KB system-font fallback on Linux.
- Add `<link rel="preload">` for `Cinzel Decorative` and `Tiro Devanagari Sanskrit` woff2.

### 4.3 SEO / shareability

- Per-route `<title>` and `<meta description>` using `react-helmet-async`.
- OpenGraph card per character (`/og/rama.png`, etc.) generated at build with Satori or a static set.
- JSON-LD `CreativeWork` markup for each kāṇḍa.

### 4.4 i18n

The most natural second-language is **Hindi** (the Awadhi/Hindi Tulsīdās tradition is the way most of South Asia first hears the Rāmāyaṇa). A `Devanāgarī body translation` mode could become the second toggle in the nav next to Glossary.

---

## 5 · Content roadmap (priority order)

1. **Re-source what exists** — add `source` references to every character `keyMoment`, kanda `keyEvents`, and story.
2. **Sundara Kāṇḍa route** — the single highest-impact new page.
3. **Hanumān & Sītā routes** — the two pages most users will linger on.
4. **The Many Rāmāyaṇas route** — the project's intellectual signature.
5. **Sahasranāma / Stotras** — the devotional practice layer.

---

## 6 · Engineering hygiene

| | Item |
|---|---|
| ⬜ | Migrate `constants.ts` → `data/` folder split by domain (`characters.ts`, `kandas.ts`, `themes.ts`, `stories.ts`, `lineage.ts`, `kshetras.ts`, `glossary.ts`) — exactly as the Mahābhārata Codex does. |
| ⬜ | Add `ErrorBoundary` per route (already exists once globally — wrap each route too). |
| ⬜ | Add a `<NotFound />` for `*` route with a Vālmīki-styled lament. |
| ⬜ | Add Vitest + a tiny snapshot suite for `CharacterCard` and `KandaTimeline`. |
| ⬜ | Add Lighthouse CI to the GitHub Pages workflow — fail the deploy if LCP > 2.5 s. |
| ⬜ | Pin Node 20 in `engines` and the workflow matrix. |

---

## 7 · The closing thought

The Mahābhārata Codex's quiet strength is *restraint with reverence*: it never over-decorates, it cites its source, and it lets the text breathe. The Rāmāyaṇa is older, simpler, and more devotional — the Codex should feel that.

Where the Mahābhārata Codex pulses with the cosmic war drum, the Rāmāyaṇa Codex should ring like a bell at dawn in Ayodhyā.

> **रामो विग्रहवान् धर्मः** — *Rama is dharma embodied.*
> May this codex be worthy of that name.

॥ श्री राम जय राम जय जय राम ॥
