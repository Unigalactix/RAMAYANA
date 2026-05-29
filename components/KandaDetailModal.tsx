import React from 'react';
import { Kanda } from '../types';

interface Props {
  kanda: Kanda;
  onClose: () => void;
}

const KandaDetailModal: React.FC<Props> = ({ kanda, onClose }) => (
  <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-label={kanda.title}>
    <div className="modal-card" onClick={(e) => e.stopPropagation()}>
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center text-gold border border-gold/40 hover:bg-gold/10 transition"
        aria-label="Close"
      >✕</button>
      <div
        className="px-8 pt-10 pb-6"
        style={{ background: `radial-gradient(600px 240px at 50% 0%, ${kanda.accent}33, transparent 70%)` }}
      >
        <div className="font-sanskrit text-2xl" style={{ color: kanda.accent }}>{kanda.sanskrit}</div>
        <h2 className="font-display text-3xl md:text-4xl text-gradient-gold leading-tight mt-1">{kanda.title}</h2>
        <div className="font-serif italic text-[#e6d9b2] mt-1">{kanda.subtitle}</div>
        <span className="pill mt-4" style={{ borderColor: `${kanda.accent}66`, color: kanda.accent }}>{kanda.theme}</span>
      </div>
      <div className="modal-scroll px-8 pb-8 space-y-6">
        <p className="font-serif text-lg leading-relaxed text-[#ece2c8]">{kanda.description}</p>
        <div>
          <h3 className="font-cinzel text-sm tracking-[.2em] uppercase text-goldlight mb-3">Key Events</h3>
          <ul className="space-y-2">
            {kanda.keyEvents.map((e, i) => (
              <li key={i} className="flex items-start gap-3 text-[#ece2c8]">
                <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: kanda.accent, boxShadow: `0 0 8px ${kanda.accent}` }} />
                <span className="font-serif text-base leading-snug">{e}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-cinzel text-sm tracking-[.2em] uppercase text-goldlight mb-3">Major Characters</h3>
          <div className="flex flex-wrap gap-2">
            {kanda.majorCharacters.map(c => (
              <span key={c} className="text-xs px-3 py-1 rounded-full bg-white/5 border border-white/10 font-cinzel tracking-wide text-[#d9c897]">{c}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default KandaDetailModal;
