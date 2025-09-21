import React from 'react';
import type { StoryCardProps } from '../types';
import { ExternalLinkIcon } from './Icons';

const StoryCard: React.FC<StoryCardProps> = ({ icon, title, description, link, color }) => {
  const cardClasses = `${color} p-6 rounded-2xl border-2 border-black flex flex-col items-start h-full transform hover:-translate-y-2 transition-transform duration-300 shadow-lg`;

  return (
    <div className={cardClasses}>
      <div className="w-16 h-16 bg-[#FDF6E9] rounded-xl flex items-center justify-center border-2 border-black mb-4">
        {icon}
      </div>
      <h3 className="font-anton text-2xl text-black tracking-wide uppercase">
        {title}
      </h3>
      <p className="mt-2 text-black/80 font-medium leading-relaxed flex-grow">
        {description}
      </p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 bg-[#1E1E1E] text-white font-bold py-2 px-4 rounded-lg inline-flex items-center self-start hover:bg-black transition-colors"
        aria-label={`Read story: ${title}`}
      >
        Read Story
        <ExternalLinkIcon />
      </a>
    </div>
  );
};

export default StoryCard;