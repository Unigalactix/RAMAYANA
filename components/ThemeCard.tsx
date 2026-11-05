import React from 'react';
import { ThemeBlock } from '../types';
import Sigil, { type SigilKind } from './Sigil';
const KIND: Record<string, SigilKind> = { 'The Burden of Dharma': 'wheel', 'The Human Face of the Divine': 'sun', 'Devotion as Power': 'lamp', 'The Ideal of Ramarajya': 'temple' };

interface Props { theme: ThemeBlock; }

const ThemeCard: React.FC<Props> = ({ theme }) => (
  <div className="glass glass-hover p-6 transition-transform duration-300 hover:-translate-y-1">
    <div className="mb-3"><Sigil kind={KIND[theme.title] || 'star'} color="#F5D061" size={44} /></div>
    <h3 className="font-display text-xl text-gradient-gold leading-tight mb-2">{theme.title}</h3>
    <p className="font-serif text-[#ece2c8] leading-relaxed">{theme.description}</p>
  </div>
);

export default ThemeCard;
