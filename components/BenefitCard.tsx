import React from 'react';
import type { BenefitCardProps } from '../types';
import { CheckmarkIcon } from './Icons';

const BenefitCard: React.FC<BenefitCardProps> = ({ icon, title, description, color, onClick, isViewed }) => {
  const cardClasses = `${color} p-6 rounded-2xl border-2 border-black flex flex-col items-start h-full transform hover:-translate-y-2 transition-transform duration-300 shadow-lg relative ${onClick ? 'cursor-pointer' : ''} ${isViewed ? 'is-viewed' : ''}`;

  return (
    <div className={cardClasses} onClick={onClick}>
      {isViewed && (
        <div className="absolute top-3 right-3 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center border-2 border-black checkmark-icon">
          <CheckmarkIcon />
        </div>
      )}
      <div className="w-16 h-16 bg-[#FDF6E9] rounded-xl flex items-center justify-center border-2 border-black mb-4">
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