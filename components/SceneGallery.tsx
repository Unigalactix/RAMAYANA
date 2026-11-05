import React, { useState } from 'react';
import { kandaScenes, type KandaScene } from '../scenes';
import { kandas } from '../constants';
import SceneArt from './SceneArt';
import Sigil from './Sigil';

const SceneGallery: React.FC<{ onPlayLeela?: (id: string) => void }> = ({ onPlayLeela }) => {
  const [filter, setFilter] = useState<string>('All');
  const [selected, setSelected] = useState<KandaScene | null>(null);
  const shown = filter === 'All' ? kandaScenes : kandaScenes.filter(s => s.kanda === filter);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-10">
        {['All', ...kandas.map(k => k.title)].map(k => (
          <button key={k} onClick={() => setFilter(k)} className={`chip ${filter === k ? 'active' : ''}`} aria-pressed={filter === k}>
            {k === 'All' ? 'All Kandas' : k.replace(' Kanda', '')}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {shown.map(s => (
          <button key={s.id} className="scene-card" onClick={() => setSelected(s)} aria-label={`Open scene: ${s.title}`}>
            <SceneArt kind={s.art} accent={s.accent} title={s.title} />
            <div className="p-5">
              <div className="flex items-center justify-between gap-2">
                <span className="font-cinzel text-[11px] tracking-[.22em] uppercase" style={{ color: s.accent }}>{s.kanda}</span>
                {s.interactive && <span className="font-cinzel text-[10px] tracking-[.18em] uppercase px-2 py-1 rounded-full border border-gold/50 text-goldlight">▶ Playable</span>}
              </div>
              <h3 className="font-display text-xl text-gradient-gold leading-tight mt-2">{s.title}</h3>
              <div className="font-sanskrit text-base mt-1" style={{ color: s.accent }}>{s.sanskrit}</div>
              <p className="font-serif text-[#ece2c8] leading-relaxed mt-2 line-clamp-3">{s.description}</p>
            </div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center p-0 sm:p-6" role="dialog" aria-modal="true" aria-label={selected.title}>
          <button className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={() => setSelected(null)} aria-label="Close scene" />
          <div className="relative glass w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl">
            <SceneArt kind={selected.art} accent={selected.accent} title={selected.title} />
            <div className="p-6 md:p-8">
              <div className="font-cinzel text-[11px] tracking-[.3em] uppercase" style={{ color: selected.accent }}>{selected.kanda} · Key Scene</div>
              <h3 className="font-display text-3xl md:text-4xl text-gradient-gold leading-tight mt-2">{selected.title}</h3>
              <div className="font-sanskrit text-xl mt-1" style={{ color: selected.accent }}>{selected.sanskrit}</div>
              <p className="font-serif text-lg text-[#ece2c8] leading-relaxed mt-4">{selected.description}</p>
              <div className="mt-5 rounded-xl border border-gold/25 bg-[rgba(212,175,55,.06)] p-4 flex gap-3">
                <Sigil kind="lamp" color="#F5D061" size={30} className="shrink-0" />
                <p className="font-serif italic text-[#e8ddba]">{selected.significance}</p>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                {selected.interactive && onPlayLeela && (
                  <button className="btn-gold" onClick={() => { const id = selected.interactive!; setSelected(null); onPlayLeela(id); }}>Play this Leela</button>
                )}
                <button className="btn-ghost" onClick={() => setSelected(null)}>Close</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SceneGallery;
