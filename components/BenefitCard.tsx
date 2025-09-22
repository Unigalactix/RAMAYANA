import React from 'react';
import type { BenefitCardProps } from '../types';
import { CheckmarkIcon } from './Icons';
import AudioManager from '../utils/AudioManager';

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, color, onClick, isViewed }) => {
  const cardClasses = `${color} p-6 rounded-2xl flex flex-col items-start h-full shadow-lg relative custom-card ${onClick ? 'cursor-pointer' : ''} ${isViewed ? 'is-viewed' : ''}`;
  const audioManager = AudioManager.getInstance();

  const handleCardHover = () => {
    // Play character-specific sounds
    const characterSounds: { [key: string]: string } = {
      'Rama': 'conch',
      'Sita': 'bell',
      'Hanuman': 'mantra',
      'Ravana': 'gong'
    };
    
    const sound = characterSounds[title] || 'chime';
    audioManager.playSoundEffect(sound);
  };

  const handleCardClick = () => {
    audioManager.playSoundEffect('tabla');
    if (onClick) onClick();
  };

  return (
    <div 
      className={cardClasses} 
      onClick={handleCardClick}
      onMouseEnter={handleCardHover}
    >
      {isViewed && (
        <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-black dark:border-white checkmark-icon">
          <CheckmarkIcon />
        </div>
      )}
      <div className="w-16 h-16 bg-[#FDF6E9] dark:bg-[#3b2a29] rounded-xl flex items-center justify-center border-2 border-black dark:border-[#a39483] mb-4 text-black dark:text-white">
        {icon}
      </div>
      <h3 className="font-anton text-2xl text-black tracking-wide uppercase">
        {title}
      </h3>
      <p className="mt-2 text-black/80 font-medium leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default BenefitCard;