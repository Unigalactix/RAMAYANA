import React from 'react';
import { Story } from '../types';

interface Props { story: Story; }

const StoryCard: React.FC<Props> = ({ story }) => (
  <a
    href={story.link}
    target="_blank"
    rel="noopener noreferrer"
    className="glass glass-hover p-6 block transition-transform duration-300 hover:-translate-y-1 group"
  >
    <div className="flex items-start justify-between gap-3 mb-3">
      <span className="text-goldlight text-xl">◈</span>
      <span className="text-[10px] uppercase tracking-[.2em] text-goldlight/70">Tale</span>
    </div>
    <h3 className="font-display text-lg md:text-xl text-gradient-gold leading-tight mb-2 group-hover:underline decoration-gold/40 underline-offset-4">{story.title}</h3>
    <p className="font-serif text-[#ece2c8] leading-relaxed">{story.description}</p>
    <div className="mt-4 font-cinzel text-[11px] tracking-[.2em] uppercase text-goldlight/80 inline-flex items-center gap-1">
      Read the Story <span>→</span>
    </div>
  </a>
);

export default StoryCard;
