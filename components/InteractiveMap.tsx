import React from 'react';

type Stop = {
  name: string;
  sanskrit?: string;
  kind: 'stay' | 'temple' | 'event';
  glyph: string;
  accent: string;
  description: string;
};

const journey: Stop[] = [
  { name: 'Ayodhya', sanskrit: 'अयोध्या', kind: 'stay', glyph: '🏯', accent: '#F5D061',
    description: 'Capital of Kosala. Rama’s birthplace and the throne to which he returns. Ram Janmabhoomi temple now marks the site.' },
  { name: 'Mithila', sanskrit: 'मिथिला', kind: 'stay', glyph: '🏹', accent: '#3B82F6',
    description: 'Janaka’s kingdom. Rama lifts and breaks Shiva’s bow Pinaka — Sita garlands him in svayamvara.' },
  { name: 'Tamasa River', kind: 'event', glyph: '🌊', accent: '#10B981',
    description: 'First night of exile. Rama, Sita, and Lakshmana cross at dawn while Ayodhya weeps on the far bank.' },
  { name: 'Sringaverapura', sanskrit: 'शृङ्गवेरपुर', kind: 'stay', glyph: '⛵', accent: '#3B82F6',
    description: 'Kingdom of Guha the Nishada chief. He ferries the trio across the Ganga in his boat — a temple to Rama stands here today.' },
  { name: 'Bharadwaja Ashram', kind: 'temple', glyph: '🕉️', accent: '#FF8C42',
    description: 'At Prayag (Allahabad). Sage Bharadwaja receives Rama and directs him to Chitrakuta.' },
  { name: 'Chitrakuta', sanskrit: 'चित्रकूट', kind: 'stay', glyph: '⛰️', accent: '#10B981',
    description: 'First long exile dwelling. Bharata arrives with Dasharatha’s sandals; Rama gives them as regents of Ayodhya.' },
  { name: 'Atri Ashram', kind: 'temple', glyph: '🕉️', accent: '#FF8C42',
    description: 'Sage Atri and Anasuya bless Sita, gifting her divine ornaments and a celestial garland.' },
  { name: 'Dandaka Forest', sanskrit: 'दण्डकारण्य', kind: 'stay', glyph: '🌲', accent: '#10B981',
    description: 'Ten years of wandering hermitages, slaying rakshasas who harass the rishis of the great forest.' },
  { name: 'Agastya Ashram', kind: 'temple', glyph: '🕉️', accent: '#FF8C42',
    description: 'Sage Agastya gifts Rama the bow of Vishnu, the quiver of inexhaustible arrows, and the sword of Indra.' },
  { name: 'Panchavati', sanskrit: 'पञ्चवटी', kind: 'stay', glyph: '🛖', accent: '#10B981',
    description: 'Hut by the Godavari at Nashik. Surpanakha is disfigured here; Maricha appears as the golden deer; Sita is taken.' },
  { name: 'Jatayu’s Fall', kind: 'event', glyph: '🦅', accent: '#B91C1C',
    description: 'The vulture-king fights Ravana to save Sita and dies in Rama’s arms — the only witness to the abduction.' },
  { name: 'Shabari’s Ashram', kind: 'temple', glyph: '🕉️', accent: '#FF8C42',
    description: 'The elderly devotee offers Rama berries she has already tasted to ensure none are bitter. Pure bhakti rewarded with moksha.' },
  { name: 'Rishyamukha', kind: 'stay', glyph: '🐒', accent: '#E879F9',
    description: 'Mountain refuge of the exiled Sugriva. Hanuman meets Rama here; the fire-witnessed pact of friendship is sealed.' },
  { name: 'Kishkindha', sanskrit: 'किष्किन्धा', kind: 'stay', glyph: '👑', accent: '#E879F9',
    description: 'Vanara capital. Rama slays Vali; Sugriva is crowned king and musters the search for Sita.' },
  { name: 'Mahendra Mountain', kind: 'event', glyph: '🌬️', accent: '#3B82F6',
    description: 'From this southern peak Hanuman launches his hundred-yojana leap across the ocean to Lanka.' },
  { name: 'Rameshwaram', sanskrit: 'रामेश्वरम्', kind: 'temple', glyph: '🕉️', accent: '#FF8C42',
    description: 'Rama consecrates a Shiva lingam here before crossing. One of the twelve Jyotirlingas and a Char Dham of the south.' },
  { name: 'Ram Setu', kind: 'event', glyph: '🌉', accent: '#F5D061',
    description: 'The vanara army, led by Nala and Nila, builds the floating stone bridge to Lanka in five days.' },
  { name: 'Lanka', sanskrit: 'लङ्का', kind: 'stay', glyph: '🔥', accent: '#B91C1C',
    description: 'Ravana’s golden city. The eighteen-day war. Indrajit, Kumbhakarna, and Ravana fall. Sita is reclaimed.' },
  { name: 'Return to Ayodhya', kind: 'event', glyph: '🪔', accent: '#F5D061',
    description: 'The Pushpaka Vimana carries Rama home. Lamps line every street — the first Diwali. Ramarajya begins.' },
];

const KIND_LABEL: Record<Stop['kind'], string> = {
  stay: 'Halt',
  temple: 'Ashram / Temple',
  event: 'Sacred Event',
};

const InteractiveMap: React.FC = () => (
  <div className="space-y-4">
    <div className="flex flex-wrap items-center justify-center gap-5 text-[11px] font-cinzel tracking-[.2em] uppercase text-goldlight/80 mb-8">
      <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-jade" />Halts</span>
      <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-saffron" />Temples & Ashrams</span>
      <span className="inline-flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full bg-crimson" />Sacred Events</span>
    </div>

    <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {journey.map((s, i) => (
        <li
          key={s.name}
          className="glass p-5 relative overflow-hidden rounded-2xl"
          style={{ borderColor: `${s.accent}55` }}
        >
          <div
            className="absolute inset-x-0 top-0 h-[3px]"
            style={{ background: `linear-gradient(90deg, transparent, ${s.accent}, transparent)` }}
          />
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div
                className="w-12 h-12 rounded-full flex items-center justify-center text-2xl shrink-0"
                style={{
                  background: `radial-gradient(circle at 30% 25%, ${s.accent}55, ${s.accent}15)`,
                  border: `1px solid ${s.accent}66`,
                  boxShadow: `0 0 14px ${s.accent}40`,
                }}
                aria-hidden="true"
              >{s.glyph}</div>
              <div className="min-w-0">
                <div className="font-display text-lg text-goldlight leading-tight truncate">{s.name}</div>
                {s.sanskrit && <div className="font-sanskrit text-sm" style={{ color: s.accent }}>{s.sanskrit}</div>}
              </div>
            </div>
            <span
              className="text-[9px] font-cinzel tracking-[.2em] uppercase px-2 py-1 rounded-full border whitespace-nowrap"
              style={{ color: s.accent, borderColor: `${s.accent}66`, background: `${s.accent}10` }}
            >{String(i + 1).padStart(2, '0')} · {KIND_LABEL[s.kind]}</span>
          </div>
          <p className="mt-3 font-serif text-[#ece2c8] leading-relaxed text-[15px]">{s.description}</p>
        </li>
      ))}
    </ol>
  </div>
);

export default InteractiveMap;
