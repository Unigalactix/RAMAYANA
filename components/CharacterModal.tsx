import React, { useEffect } from 'react';
import { Character } from '../types';

interface Props {
  character: Character;
  onClose: () => void;
}

const CharacterModal: React.FC<Props> = ({ character, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={`${character.name} codex`}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-gold border border-gold/40 hover:bg-gold/10 transition"
          aria-label="Close"
        >✕</button>

        <div
          className="px-8 pt-10 pb-6 relative"
          style={{ background: `radial-gradient(600px 240px at 50% 0%, ${character.accent}33, transparent 70%)` }}
        >
          <div className="flex items-center gap-5">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center text-5xl shrink-0"
              style={{ background: `linear-gradient(135deg, ${character.accent}44, transparent)`, border: `1px solid ${character.accent}66`, boxShadow: `0 0 30px ${character.accent}55` }}
            >{character.glyph}</div>
            <div>
              <div className="font-sanskrit text-xl" style={{ color: character.accent }}>{character.sanskrit}</div>
              <h2 className="font-display text-3xl md:text-4xl text-gradient-gold leading-tight">{character.name}</h2>
              <div className="font-serif italic text-[#e6d9b2] text-sm md:text-base">{character.epithet}</div>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mt-5">
            <span className="pill">{character.alignment}</span>
            <span className="pill">{character.era}</span>
            <span className="pill">{character.affiliation}</span>
          </div>
        </div>

        <div className="modal-scroll px-8 pb-8 space-y-6">
          <p className="font-serif text-lg leading-relaxed text-[#ece2c8]">{character.lore}</p>

          <blockquote className="font-serif italic text-xl text-center px-6 py-4 border-l-2 border-r-2 border-gold/40 text-goldlight">
            {character.quote}
          </blockquote>

          <div className="grid md:grid-cols-2 gap-5">
            <div className="glass p-5">
              <h3 className="font-cinzel text-sm tracking-[.2em] uppercase text-goldlight mb-3">Attributes</h3>
              <div className="space-y-2">
                {character.stats.map(s => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className="w-24 text-xs uppercase tracking-widest text-[#c9bd9b]">{s.label}</div>
                    <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                      <div className="h-full rounded-full" style={{ width: `${s.value}%`, background: `linear-gradient(90deg, ${character.accent}, #f5d061)`, boxShadow: `0 0 10px ${character.accent}` }} />
                    </div>
                    <div className="w-8 text-right tabular-nums text-sm">{s.value}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="glass p-5">
              <h3 className="font-cinzel text-sm tracking-[.2em] uppercase text-goldlight mb-3">Abilities</h3>
              <ul className="space-y-2">
                {character.abilities.map(a => (
                  <li key={a} className="flex items-start gap-2 text-[#ece2c8]">
                    <span className="text-goldlight mt-1">◈</span>
                    <span className="font-serif text-base leading-snug">{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <h3 className="font-cinzel text-sm tracking-[.2em] uppercase text-goldlight mb-4 text-center">Key Moments in the Epic</h3>
            <ol className="relative border-l-2 border-gold/30 ml-3 space-y-5 pl-6">
              {character.keyMoments.map((m, i) => (
                <li key={i} className="relative">
                  <span
                    className="absolute -left-[33px] top-1 w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold"
                    style={{ background: character.accent, color: '#0b0712', boxShadow: `0 0 10px ${character.accent}` }}
                  >{i + 1}</span>
                  <div className="text-xs uppercase tracking-[.2em] text-goldlight/80 mb-1">{m.kanda}</div>
                  <div className="font-cinzel text-lg text-[#fdf4d6]">{m.title}</div>
                  <div className="font-serif text-[#d9cea7] mt-1">{m.description}</div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterModal;
