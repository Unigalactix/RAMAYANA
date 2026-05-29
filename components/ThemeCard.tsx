import React from 'react';
import { ThemeBlock } from '../types';

interface Props { theme: ThemeBlock; }

const ThemeCard: React.FC<Props> = ({ theme }) => (
  <div className="glass glass-hover p-6 transition-transform duration-300 hover:-translate-y-1">
    <div className="text-4xl mb-3 text-goldlight" aria-hidden="true">{theme.glyph}</div>
    <h3 className="font-display text-xl text-gradient-gold leading-tight mb-2">{theme.title}</h3>
    <p className="font-serif text-[#ece2c8] leading-relaxed">{theme.description}</p>
  </div>
);

export default ThemeCard;
