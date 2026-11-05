import React, { useState } from 'react';
import Sigil, { type SigilKind } from './Sigil';

type Stop = {
  name: string;
  sanskrit?: string;
  kind: 'stay' | 'temple' | 'event';
  glyph: string;
  accent: string;
  description: string;
  x: number;
  y: number;
};

const journey: Stop[] = [
  { name: 'Ayodhya', sanskrit: 'अयोध्या', kind: 'stay', glyph: '🏯', accent: '#F5D061',
    description: 'Capital of Kosala. Rama’s birthplace and the throne to which he returns. Ram Janmabhoomi temple now marks the site.', x: 55, y: 18 },
  { name: 'Mithila', sanskrit: 'मिथिला', kind: 'stay', glyph: '🏹', accent: '#3B82F6',
    description: 'Janaka’s kingdom. Rama lifts and breaks Shiva’s bow Pinaka — Sita garlands him in svayamvara.', x: 68, y: 20 },
  { name: 'Tamasa River', kind: 'event', glyph: '🌊', accent: '#10B981',
    description: 'First night of exile. Rama, Sita, and Lakshmana cross at dawn while Ayodhya weeps on the far bank.', x: 58, y: 26 },
  { name: 'Sringaverapura', sanskrit: 'शृङ्गवेरपुर', kind: 'stay', glyph: '⛵', accent: '#3B82F6',
    description: 'Kingdom of Guha the Nishada chief. He ferries the trio across the Ganga in his boat — a temple to Rama stands here today.', x: 53, y: 28 },
  { name: 'Bharadwaja Ashram', kind: 'temple', glyph: '🕉️', accent: '#FF8C42',
    description: 'At Prayag (Allahabad). Sage Bharadwaja receives Rama and directs him to Chitrakuta.', x: 50, y: 31 },
  { name: 'Chitrakuta', sanskrit: 'चित्रकूट', kind: 'stay', glyph: '⛰️', accent: '#10B981',
    description: 'First long exile dwelling. Bharata arrives with Dasharatha’s sandals; Rama gives them as regents of Ayodhya.', x: 47, y: 36 },
  { name: 'Atri Ashram', kind: 'temple', glyph: '🕉️', accent: '#FF8C42',
    description: 'Sage Atri and Anasuya bless Sita, gifting her divine ornaments and a celestial garland.', x: 46, y: 42 },
  { name: 'Dandaka Forest', sanskrit: 'दण्डकारण्य', kind: 'stay', glyph: '🌲', accent: '#10B981',
    description: 'Ten years of wandering hermitages, slaying rakshasas who harass the rishis of the great forest.', x: 44, y: 52 },
  { name: 'Agastya Ashram', kind: 'temple', glyph: '🕉️', accent: '#FF8C42',
    description: 'Sage Agastya gifts Rama the bow of Vishnu, the quiver of inexhaustible arrows, and the sword of Indra.', x: 45, y: 58 },
  { name: 'Panchavati', sanskrit: 'पञ्चवटी', kind: 'stay', glyph: '🛖', accent: '#10B981',
    description: 'Hut by the Godavari at Nashik. Surpanakha is disfigured here; Maricha appears as the golden deer; Sita is taken.', x: 38, y: 62 },
  { name: 'Jatayu’s Fall', kind: 'event', glyph: '🦅', accent: '#B91C1C',
    description: 'The vulture-king fights Ravana to save Sita and dies in Rama’s arms — the only witness to the abduction.', x: 42, y: 68 },
  { name: 'Shabari’s Ashram', kind: 'temple', glyph: '🕉️', accent: '#FF8C42',
    description: 'The elderly devotee offers Rama berries she has already tasted to ensure none are bitter. Pure bhakti rewarded with moksha.', x: 46, y: 72 },
  { name: 'Rishyamukha', kind: 'stay', glyph: '🐒', accent: '#E879F9',
    description: 'Mountain refuge of the exiled Sugriva. Hanuman meets Rama here; the fire-witnessed pact of friendship is sealed.', x: 47, y: 78 },
  { name: 'Kishkindha', sanskrit: 'किष्किन्धा', kind: 'stay', glyph: '👑', accent: '#E879F9',
    description: 'Vanara capital. Rama slays Vali; Sugriva is crowned king and musters the search for Sita.', x: 48, y: 80 },
  { name: 'Mahendra Mountain', kind: 'event', glyph: '🌬️', accent: '#3B82F6',
    description: 'From this southern peak Hanuman launches his hundred-yojana leap across the ocean to Lanka.', x: 52, y: 88 },
  { name: 'Rameshwaram', sanskrit: 'रामेश्वरम्', kind: 'temple', glyph: '🕉️', accent: '#FF8C42',
    description: 'Rama consecrates a Shiva lingam here before crossing. One of the twelve Jyotirlingas and a Char Dham of the south.', x: 54, y: 90 },
  { name: 'Ram Setu', kind: 'event', glyph: '🌉', accent: '#F5D061',
    description: 'The vanara army, led by Nala and Nila, builds the floating stone bridge to Lanka in five days.', x: 57, y: 94 },
  { name: 'Lanka', sanskrit: 'लङ्का', kind: 'stay', glyph: '🔥', accent: '#B91C1C',
    description: 'Ravana’s golden city. The eighteen-day war. Indrajit, Kumbhakarna, and Ravana fall. Sita is reclaimed.', x: 60, y: 97 },
  { name: 'Return to Ayodhya', kind: 'event', glyph: '🪔', accent: '#F5D061',
    description: 'The Pushpaka Vimana carries Rama home. Lamps line every street — the first Diwali. Ramarajya begins.', x: 55, y: 18 },
];

const KIND_LABEL: Record<Stop['kind'], string> = { stay: 'Halt', temple: 'Ashram / Temple', event: 'Sacred Event' };
const KIND_SIGIL: Record<Stop['kind'], SigilKind> = { stay: 'mountain', temple: 'temple', event: 'flame' };
const ROUTE = journey.slice(0, 18);

const InteractiveMap: React.FC = () => {
  const [selected, setSelected] = useState<Stop>(journey[0]);
  const select = (s: Stop) => setSelected(s);
  return (
    <div>
      <div className="grid lg:grid-cols-[1.15fr_.85fr] gap-6 items-stretch">
        <div className="glass p-4 md:p-6 rounded-3xl">
          <svg viewBox="0 0 100 108" className="w-full h-auto" role="img" aria-label="Stylised map of Bharata showing the Sacred Path from Ayodhya to Lanka">
            <defs>
              <linearGradient id="land" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#1d2b16" /><stop offset="100%" stopColor="#0d1f2d" /></linearGradient>
            </defs>
            {/* Stylised subcontinent + Lanka */}
            <path d="M28 6 L52 2 L72 10 L78 26 L70 38 L74 52 L64 66 L58 84 L54 96 L50 84 L42 68 L34 56 L24 46 L18 28 Z" fill="url(#land)" stroke="rgba(245,208,97,.45)" strokeWidth="0.8" />
            <ellipse cx="60" cy="102" rx="6" ry="4.5" fill="#2a1408" stroke="rgba(255,140,66,.6)" strokeWidth="0.7" />
            <path d="M54 92 C56 95 58 97 60 98" stroke="#7dd3fc" strokeWidth="1.4" fill="none" strokeDasharray="2 2" />
            {/* Rivers */}
            <path d="M52 14 C48 24 52 32 46 42 C41 50 44 58 40 66" stroke="#3B82F6" strokeWidth="0.9" fill="none" opacity="0.6" />
            <path d="M66 16 C60 26 64 36 58 46" stroke="#3B82F6" strokeWidth="0.7" fill="none" opacity="0.45" />
            {/* The Sacred Path route */}
            <polyline className="map-route" points={ROUTE.map(s => `${s.x},${s.y}`).join(' ')} fill="none" stroke="#F5D061" strokeWidth="1.1" strokeLinejoin="round" strokeLinecap="round" opacity="0.85" />
            {journey.slice(0, 18).map((s, i) => (
              <g key={s.name} className="map-pin" tabIndex={0} role="button" aria-label={`${i + 1}. ${s.name} — ${KIND_LABEL[s.kind]}`}
                onClick={() => select(s)} onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); select(s); } }}>
                <circle cx={s.x} cy={s.y} r={selected.name === s.name ? 3.4 : 2.1} fill={selected.name === s.name ? '#F5D061' : s.accent} stroke="#08060F" strokeWidth="0.7" />
                <text x={s.x} y={s.y + 1.1} textAnchor="middle" fontSize="2.6" fill="#08060F" fontWeight="700">{i + 1}</text>
              </g>
            ))}
            <text x="14" y="102" fontSize="4" fill="#7dd3fc" fontFamily="Cinzel, serif" letterSpacing="1">BAY OF BENGAL</text>
            <text x="6" y="60" fontSize="4" fill="#7dd3fc" fontFamily="Cinzel, serif" letterSpacing="1" transform="rotate(-90 8 60)">ARABIAN SEA</text>
          </svg>
          <p className="font-serif italic text-[#d8cdb0] text-center mt-2">Tap a numbered pin — the path runs Ayodhya → Mithila → the forest years → Kishkindha → Rameshwaram → Lanka.</p>
        </div>
        <div className="glass p-6 md:p-8 rounded-3xl flex flex-col" aria-live="polite">
          <div className="flex items-center gap-4">
            <span className="w-14 h-14 rounded-full flex items-center justify-center shrink-0" style={{ background: `radial-gradient(circle at 30% 25%, ${selected.accent}55, ${selected.accent}15)`, border: `1px solid ${selected.accent}66` }}>
              <Sigil kind={KIND_SIGIL[selected.kind]} color={selected.accent} size={30} />
            </span>
            <div>
              <h3 className="font-display text-2xl md:text-3xl text-gradient-gold leading-tight">{selected.name}</h3>
              {selected.sanskrit && <div className="font-sanskrit text-lg" style={{ color: selected.accent }}>{selected.sanskrit}</div>}
            </div>
          </div>
          <span className="chip active self-start mt-4">{KIND_LABEL[selected.kind]}</span>
          <p className="font-serif text-lg text-[#ece2c8] leading-relaxed mt-4">{selected.description}</p>
          <div className="flex gap-2 mt-auto pt-6">
            <button className="btn-ghost" onClick={() => select(journey[(journey.indexOf(selected) + journey.length - 1) % journey.length])}>← Previous halt</button>
            <button className="btn-gold" onClick={() => select(journey[(journey.indexOf(selected) + 1) % journey.length])}>Next halt →</button>
          </div>
        </div>
      </div>
      <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {journey.map((s, i) => (
          <li key={s.name}>
            <button onClick={() => select(s)} className="glass p-5 relative overflow-hidden rounded-2xl w-full text-left h-full" style={{ borderColor: selected.name === s.name ? '#F5D061' : `${s.accent}55` }} aria-pressed={selected.name === s.name}>
              <div className="absolute inset-x-0 top-0 h-[3px]" style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }} />
              <div className="flex items-center gap-3">
                <Sigil kind={KIND_SIGIL[s.kind]} color={s.accent} size={30} />
                <div className="min-w-0">
                  <div className="font-display text-lg text-goldlight leading-tight">{s.name}</div>
                  {s.sanskrit && <div className="font-sanskrit text-sm" style={{ color: s.accent }}>{s.sanskrit}</div>}
                </div>
                <span className="ml-auto text-[10px] font-cinzel tracking-[.18em] uppercase px-2 py-1 rounded-full border whitespace-nowrap" style={{ color: s.accent, borderColor: `${s.accent}66` }}>{String(i + 1).padStart(2, '0')} · {KIND_LABEL[s.kind]}</span>
              </div>
              <p className="mt-3 font-serif text-[#ece2c8] leading-relaxed text-[15px]">{s.description}</p>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default InteractiveMap;
