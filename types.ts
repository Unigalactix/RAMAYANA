import React from 'react';

export type Rarity = 'mythic' | 'legendary' | 'epic' | 'rare';
export type Alignment = 'Dharma' | 'Adharma' | 'Neutral';

export interface CharacterStat {
  label: string;
  value: number; // 0 - 100
}

export interface KeyMoment {
  title: string;
  kanda: string;
  description: string;
}

export interface Character {
  id: string;
  name: string;
  sanskrit: string;
  epithet: string;
  rarity: Rarity;
  alignment: Alignment;
  affiliation: string;
  origin: string;
  era: string;
  weapon: string;
  glyph: string; // emoji or short symbol
  accent: string; // hex color used for accent/glow
  stats: CharacterStat[];
  abilities: string[];
  quote: string;
  lore: string;
  keyMoments: KeyMoment[];
}

export interface Kanda {
  title: string;
  sanskrit: string;
  subtitle: string;
  description: string;
  theme: string;
  keyEvents: string[];
  majorCharacters: string[];
  accent: string;
}

export interface Story {
  title: string;
  description: string;
  link: string;
}

export interface FamilyTreeNode {
  name: string;
  spouse?: string;
  children?: FamilyTreeNode[];
}

export interface MapLocation {
  id: string;
  name: string;
  description: string;
  coords: { x: string; y: string };
}

export interface ThemeBlock {
  title: string;
  description: string;
  glyph: string;
}
