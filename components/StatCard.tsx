
import React from 'react';
import type { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => {
  return (
    <div className={`${color} p-8 rounded-2xl shadow-lg border-2 border-black transform hover:scale-105 transition-transform duration-300`}>
      <p className="font-anton text-7xl md:text-8xl text-black text-center tracking-tighter">
        {value}
      </p>
      <p className="mt-4 text-center text-lg font-medium text-black">
        {label}
      </p>
    </div>
  );
};

export default StatCard;
