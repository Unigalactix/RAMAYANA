import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import CharacterCard from './components/CharacterCard';
import CharacterModal from './components/CharacterModal';
import KandaTimeline from './components/KandaTimeline';
import KandaDetailModal from './components/KandaDetailModal';
import ThemeCard from './components/ThemeCard';
import StoryCard from './components/StoryCard';
import FamilyTree from './components/FamilyTree';
import InteractiveMap from './components/InteractiveMap';
import { characters, kandas, themesData, stats, stories } from './constants';
import { Character, Kanda } from './types';

// Static wrapper (no scroll animations) — preserves API used throughout the page
const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({ children, className }) => (
  <div className={className}>{children}</div>
);

const SectionTitle: React.FC<{ eyebrow: string; title: React.ReactNode; subtitle?: React.ReactNode }> = ({ eyebrow, title, subtitle }) => (
  <div className="text-center mb-12">
    <div className="font-cinzel text-[11px] tracking-[.4em] uppercase text-goldlight/80 mb-3">{eyebrow}</div>
    <h2 className="font-display text-4xl md:text-6xl text-gradient-gold leading-tight">{title}</h2>
    {subtitle && <p className="mt-4 max-w-2xl mx-auto font-serif text-lg text-[#ece2c8]">{subtitle}</p>}
    <div className="hr-ornate mt-6"><span>✦</span></div>
  </div>
);

const App: React.FC = () => {
  const [selectedChar, setSelectedChar] = useState<Character | null>(null);
  const [selectedKanda, setSelectedKanda] = useState<Kanda | null>(null);

  return (
    <div id="top" className="relative">
      <Navigation />

      <Hero />

      {/* STATS */}
      <section className="max-w-6xl mx-auto px-6 -mt-12 md:-mt-20 relative z-10">
        <Reveal>
          <div className="glass grid grid-cols-2 md:grid-cols-4 gap-px overflow-hidden">
            {stats.map((s, i) => (
              <div key={i} className="p-6 md:p-8 text-center bg-[rgba(20,14,30,0.4)]">
                <div className="font-display text-4xl md:text-5xl text-gradient-gold">{s.value}</div>
                <div className="mt-2 font-cinzel uppercase tracking-[.2em] text-[10px] text-[#c9bd9b]">{s.label}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {/* CHARACTERS — THE PANTHEON */}
      <section id="characters" className="max-w-7xl mx-auto px-6 py-24 md:py-32">
        <Reveal>
          <SectionTitle
            eyebrow="The Pantheon · पात्र-संग्रह"
            title={<>Holographic <span className="text-gradient-saffron">Character Codex</span></>}
            subtitle="Hover to feel the foil shift. Click any card to flip it and read the codex of the soul behind it — their lineage, abilities, and the moments that wrote them into eternity."
          />
        </Reveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
          {characters.map((c, i) => (
            <Reveal key={c.id} delay={(i % 4) * 80}>
              <CharacterCard character={c} onOpen={setSelectedChar} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* KANDAS TIMELINE */}
      <section id="kandas" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <Reveal>
          <SectionTitle
            eyebrow="The Seven Books · सप्त काण्ड"
            title={<>The <span className="text-gradient-saffron">Seven Kandas</span></>}
            subtitle="From a divine birth in Ayodhya to a queen returning to the earth — walk the seven sacred books of Valmiki’s Ramayana."
          />
        </Reveal>
        <Reveal delay={100}>
          <KandaTimeline kandas={kandas} onOpen={setSelectedKanda} />
        </Reveal>
      </section>

      {/* THEMES */}
      <section id="themes" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <Reveal>
          <SectionTitle
            eyebrow="Eternal Currents · सनातन भाव"
            title={<>The <span className="text-gradient-saffron">Living Themes</span></>}
            subtitle="The Ramayana is less a story than a mirror — these are the eternal questions it holds up to every age."
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {themesData.map((t, i) => (
            <Reveal key={t.title} delay={i * 80}><ThemeCard theme={t} /></Reveal>
          ))}
        </div>
      </section>

      {/* STORIES */}
      <section id="stories" className="max-w-7xl mx-auto px-6 py-20 md:py-28">
        <Reveal>
          <SectionTitle
            eyebrow="The Storybook · कथा-कोश"
            title={<>Tales from the <span className="text-gradient-saffron">Epic</span></>}
            subtitle="Eighteen tales — each a single gem in the necklace of the Ramayana. Tap any to read its full retelling."
          />
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stories.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 80}><StoryCard story={s} /></Reveal>
          ))}
        </div>
      </section>

      {/* SACRED PATH */}
      <section id="map" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <Reveal>
          <SectionTitle
            eyebrow="Sacred Geography · पुण्य-भूमि"
            title={<>The <span className="text-gradient-saffron">Sacred Path</span></>}
            subtitle="From Ayodhya to Lanka and home again — the halts, ashrams, and turning points of the fourteen-year journey."
          />
        </Reveal>
        <Reveal delay={100}><InteractiveMap /></Reveal>
      </section>

      {/* LINEAGE */}
      <section id="lineage" className="max-w-6xl mx-auto px-6 py-20 md:py-28">
        <Reveal>
          <SectionTitle
            eyebrow="House of Ikshvaku · सूर्य-वंश"
            title={<>The <span className="text-gradient-saffron">Solar Dynasty</span></>}
            subtitle="The Suryavansha — the line of kings from which the avatar descended."
          />
        </Reveal>
        <Reveal delay={100}><FamilyTree /></Reveal>
      </section>

      {/* FOOTER */}
      <footer className="max-w-4xl mx-auto px-6 py-20 text-center">
        <p className="font-sanskrit text-lg md:text-xl text-goldlight leading-relaxed">
          रामं दशरथं विद्धि मां विद्धि जनकात्मजाम् ।<br />
          अयोध्यां अटवीं विद्धि गच्छ तात यथासुखम् ॥
        </p>
        <p className="mt-4 font-serif italic text-[#c9bd9b] max-w-xl mx-auto">
          “Know Rama as Dasharatha; know me as Janaka’s daughter; know the forest as Ayodhya — go, dear one, at peace.”
        </p>
        <div className="hr-ornate my-8"><span>✦ ❀ ✦</span></div>
        <h3 className="font-display text-3xl md:text-5xl text-gradient-gold leading-tight">
          A timeless epic of<br />Dharma, Devotion, and Duty
        </h3>
        <p className="mt-6 font-sanskrit text-2xl text-saffron tracking-widest">जय श्री राम</p>
        <p className="mt-10 text-xs text-[#a99875] tracking-widest uppercase">© Ramayana Codex · Built with reverence</p>
      </footer>

      {selectedChar && <CharacterModal character={selectedChar} onClose={() => setSelectedChar(null)} />}
      {selectedKanda && <KandaDetailModal kanda={selectedKanda} onClose={() => setSelectedKanda(null)} />}
    </div>
  );
};

export default App;
