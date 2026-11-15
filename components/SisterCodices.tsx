import React from 'react';

/**
 * SisterCodices — "The Sacred Codices": the four codex sites of the
 * eternal epics, cross-linked. The Ramayana and the Bhagavata Purana
 * are bound by the Vishnu thread — Rama here, Krishna and the ten
 * avatars there — so the Bhagavata Codex is honoured first among sisters.
 */

export interface SisterCodex {
  name: string;
  devanagari: string;
  thread: string;
  description: string;
  href: string;
  accent: string;
  self?: boolean;
}

export const SISTER_CODICES: SisterCodex[] = [
  {
    name: 'Bhagavata Codex',
    devanagari: 'श्रीमद्भागवतम्',
    thread: 'The Vishnu Thread',
    description: 'The Bhagavata Purana — Vishnu’s ten avatars, Krishna’s leelas, and the very wellspring from which Rama’s story flows. Begin here to see the Lord whole.',
    href: 'https://unigalactix.github.io/BHAGAVATHAM/',
    accent: '#7fb0e6',
  },
  {
    name: 'Mahabharata Codex',
    devanagari: 'महाभारतम्',
    thread: 'The Cousin Epic',
    description: 'The other great Itihasa — the Kurukshetra war, the Gita, and Krishna as charioteer, counsellor, and God.',
    href: 'https://unigalactix.github.io/Mahabharat/',
    accent: '#e8875a',
  },
  {
    name: 'Shiva Purana Codex',
    devanagari: 'शिवपुराणम्',
    thread: 'The Destroyer’s Tales',
    description: 'The Shiva Purana — the lord of Kailasa whose bow Rama broke at Mithila, and whose devotee Ravana sang the Tandava Stotram.',
    href: 'https://unigalactix.github.io/ShivaPuran/',
    accent: '#9fd8c9',
  },
  {
    name: 'Ramayana Codex',
    devanagari: 'रामायणम्',
    thread: 'You Are Here',
    description: 'Valmiki’s Adi Kavya — the first poem, and the life of Rama, dharma embodied.',
    href: 'https://unigalactix.github.io/RAMAYANA/',
    accent: '#f5d061',
    self: true,
  },
];

const DiyaRow: React.FC = () => (
  <div className="flex items-end justify-center gap-5 md:gap-7" aria-hidden="true">
    {Array.from({ length: 7 }).map((_, i) => (
      <span key={i} className="diya-lamp" style={{ animationDelay: `${i * 0.35}s`, transform: `scale(${i === 3 ? 1.25 : 1 - Math.abs(3 - i) * 0.09})` }}>
        <span className="diya-flame" />
        <span className="diya-bowl" />
      </span>
    ))}
  </div>
);

const SisterCodices: React.FC = () => (
  <div>
    <DiyaRow />
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
      {SISTER_CODICES.map((c) => (
        <article key={c.name} className="sister-card" style={{ ['--accent' as string]: c.accent }}>
          <div className="font-sanskrit text-2xl" style={{ color: c.accent }}>{c.devanagari}</div>
          <h3 className="font-display text-2xl text-gradient-gold leading-tight mt-2">{c.name}</h3>
          <div className="font-cinzel text-[10px] tracking-[.3em] uppercase mt-2" style={{ color: c.accent }}>{c.thread}</div>
          <p className="font-serif text-[#ece2c8] leading-relaxed mt-3">{c.description}</p>
          {c.self ? (
            <span className="sister-here">✦ You are here ✦</span>
          ) : (
            <a className="sister-link" href={c.href} target="_blank" rel="noopener noreferrer">
              Visit the Codex <span aria-hidden="true">→</span>
            </a>
          )}
        </article>
      ))}
    </div>
    <svg viewBox="0 0 1440 90" className="gopuram-band" aria-hidden="true" preserveAspectRatio="none">
      <path d="M0 90 V58 L140 58 L140 40 L280 40 L280 58 L420 58 L420 30 L545 30 L545 58 L660 58 L660 44 L720 12 L780 44 L780 58 L895 58 L895 30 L1020 30 L1020 58 L1160 58 L1160 40 L1300 40 L1300 58 L1440 58 V90 Z" fill="rgba(21,11,38,.85)" stroke="rgba(245,208,97,.55)" strokeWidth="1.6" />
      {[490, 720, 950].map((x) => (<circle key={x} cx={x} cy={64} r="3.4" fill="#F5D061" opacity="0.9" />))}
    </svg>
    <div className="lotus-band" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <svg key={i} viewBox="0 0 40 24" className="lotus-band-item">
          <path d="M20 21 q-11 -3 -12 -14 q8 2 12 7 q4 -5 12 -7 q-1 11 -12 14Z" fill={i % 2 ? '#e56b9f' : '#e8a812'} stroke="#2e1608" strokeWidth="1.4" />
        </svg>
      ))}
    </div>
  </div>
);

export default SisterCodices;
