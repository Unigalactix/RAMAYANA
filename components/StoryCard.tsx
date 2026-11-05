import React from 'react';
import { Story } from '../types';
import { storyDetails } from '../storiesContent';
import Sigil from './Sigil';

interface Props { story: Story; onOpen?: (s: Story) => void; }

const StoryCard: React.FC<Props> = ({ story, onOpen }) => {
  const detail = storyDetails[story.title];
  return (
    <button onClick={() => onOpen?.(story)} className="glass glass-hover p-6 block w-full text-left transition-transform duration-300 hover:-translate-y-1 group" aria-label={`Read the tale: ${story.title}`}>
      <div className="flex items-start justify-between gap-3 mb-3">
        <Sigil kind="scroll" color="#F5D061" size={30} />
        <span className="text-[11px] uppercase tracking-[.2em] text-goldlight/80">{detail?.kanda || 'Tale'}</span>
      </div>
      <h3 className="font-display text-lg md:text-xl text-gradient-gold leading-tight mb-2 group-hover:underline decoration-gold/40 underline-offset-4">{story.title}</h3>
      <p className="font-serif text-[#ece2c8] leading-relaxed">{story.description}</p>
      <div className="mt-4 font-cinzel text-[11px] tracking-[.2em] uppercase text-goldlight inline-flex items-center gap-1">Read in the Codex <span>→</span></div>
    </button>
  );
};

export default StoryCard;
