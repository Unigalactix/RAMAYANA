import React from 'react';
import type { StoryCardProps } from '../types';
import { ExternalLinkIcon } from './Icons';

const StoryCard: React.FC<StoryCardProps> = ({ icon, title, description, link, color }) => {
  const cardClasses = `${color} p-6 rounded-2xl flex flex-col items-start h-full shadow-lg custom-card`;

  return (
    <div className={cardClasses}>
      <div className="w-16 h-16 bg-[#FDF6E9] dark:bg-[#3b2a29] rounded-xl flex items-center justify-center border-2 border-black dark:border-[#a39483] mb-4 text-black dark:text-white">
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
        rel="noopener noreferrer"
        className="mt-4 bg-[#1E1E1E] text-white font-bold py-2 px-4 rounded-lg inline-flex items-center self-start hover:bg-black dark:bg-[#FBF5E8] dark:text-[#1E1E1E] dark:hover:bg-gray-200 transition-colors"
        aria-label={`Read story: ${title}`}
      >
        Read Story
        <ExternalLinkIcon />
      </a>
    </div>
  );
};

export default StoryCard;