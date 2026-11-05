import React, { useEffect } from 'react';
import { Story } from '../types';
import { storyDetails } from '../storiesContent';
import Sigil from './Sigil';

const StoryModal: React.FC<{ story: Story; onClose: () => void }> = ({ story, onClose }) => {
  const detail = storyDetails[story.title];
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-[90] flex items-end sm:items-center justify-center sm:p-6" role="dialog" aria-modal="true" aria-label={story.title}>
      <button className="absolute inset-0 bg-black/75 backdrop-blur-sm" onClick={onClose} aria-label="Close story" />
      <div className="relative glass w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl p-6 md:p-10 reading-modal">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="font-cinzel text-[11px] tracking-[.3em] uppercase text-goldlight/90">{detail?.kanda || 'Katha-Kosha'} · A Tale from the Epic</div>
            <h3 className="font-display text-3xl md:text-4xl text-gradient-gold leading-tight mt-2">{story.title}</h3>
          </div>
          <button onClick={onClose} className="btn-ghost !px-3 !py-2" aria-label="Close">✕</button>
        </div>
        <div className="hr-ornate my-6"><span>✦</span></div>
        {detail ? detail.body.map((p, i) => (
          <p key={i} className="font-serif text-lg text-[#ece2c8] leading-relaxed">{p}</p>
        )) : <p className="font-serif text-lg text-[#ece2c8] leading-relaxed">{story.description}</p>}
        {detail && (
          <div className="mt-4 rounded-xl border border-gold/25 bg-[rgba(212,175,55,.06)] p-4 flex gap-3">
            <Sigil kind="lamp" color="#F5D061" size={30} className="shrink-0" />
            <p className="font-serif italic text-[#e8ddba]">{detail.lesson}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StoryModal;
