
import React from 'react';
import type { StatCardProps } from '../types';

const StatCard: React.FC<StatCardProps> = ({ value, label, color }) => {
  return (
    <div className={`${color} p-8 rounded-2xl shadow-lg custom-card`}>
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