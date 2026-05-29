import React, { useState } from 'react';
import { Kanda } from '../types';

interface Props {
  kandas: Kanda[];
  onOpen: (k: Kanda) => void;
}

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII'];

const KandaTimeline: React.FC<Props> = ({ kandas, onOpen }) => {
  const [active, setActive] = useState(0);
  const k = kandas[active];

  return (
    <div className="glass p-6 md:p-10">
      {/* Rail */}
      <div className="relative">
        <div className="absolute left-0 right-0 top-1/2 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" aria-hidden="true" />
        <div className="relative grid grid-cols-7 gap-2 md:gap-4">
          {kandas.map((kk, i) => {
            const isActive = i === active;
            return (
              <button
                key={kk.title}
                onClick={() => setActive(i)}
                className="group flex flex-col items-center text-center"
                aria-label={`Select ${kk.title}`}
              >
                <span
                  className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center font-cinzel font-bold transition-all"
                  style={{
                    background: isActive ? `linear-gradient(135deg, ${kk.accent}, #d4af37)` : 'rgba(20,14,30,.85)',
                    color: isActive ? '#0b0712' : '#d9c897',
                    border: `1px solid ${isActive ? kk.accent : 'rgba(212,175,55,.3)'}`,
                    boxShadow: isActive ? `0 0 22px ${kk.accent}88` : 'none',
                  }}
                >{ROMAN[i]}</span>
                <span className={`mt-2 text-[10px] md:text-xs uppercase tracking-widest transition ${isActive ? 'text-goldlight' : 'text-[#a99875] group-hover:text-goldlight'}`}>{kk.title.split(' ')[0]}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Detail */}
      <div className="mt-10 grid md:grid-cols-[1fr_1.4fr] gap-8 items-start" key={k.title}>
        <div>
          <div className="text-[120px] md:text-[160px] font-display leading-none text-gradient-gold opacity-90 select-none">{ROMAN[active]}</div>
          <div className="font-sanskrit text-2xl" style={{ color: k.accent }}>{k.sanskrit}</div>
          <h3 className="font-display text-3xl md:text-4xl text-gradient-gold mt-1">{k.title}</h3>
          <div className="font-serif italic text-[#e6d9b2] mt-1">{k.subtitle}</div>
          <span className="pill mt-4" style={{ borderColor: `${k.accent}66`, color: k.accent }}>{k.theme}</span>
        </div>

        <div className="space-y-5">
          <p className="font-serif text-lg leading-relaxed text-[#ece2c8]">{k.description}</p>
          <div>
            <h4 className="font-cinzel text-xs tracking-[.2em] uppercase text-goldlight mb-3">Key Events</h4>
            <ul className="space-y-2">
              {k.keyEvents.map((e, i) => (
                <li key={i} className="flex items-start gap-3 text-[#ece2c8]">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: k.accent, boxShadow: `0 0 8px ${k.accent}` }} />
                  <span className="font-serif text-base leading-snug">{e}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-2 pt-2">
            {k.majorCharacters.map(c => (
              <span key={c} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 font-cinzel tracking-wide text-[#d9c897]">{c}</span>
            ))}
          </div>
          <button onClick={() => onOpen(k)} className="btn-ghost mt-4">Open Full Chapter</button>
        </div>
      </div>
    </div>
  );
};

export default KandaTimeline;
