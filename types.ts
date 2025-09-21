import React from 'react';

export interface StatCardProps {
  value: string;
  label: string;
  color: string;
}

export interface Kanda {
  title: string;
  description: string;
  theme: string;
  keyEvents: string[];
  majorCharacters: string[];
}

export interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick?: () => void;
  isViewed?: boolean;
}

export interface KandaDetailModalProps {
  kanda: Kanda;
  onClose: () => void;
}

export interface Story {
  title: string;
  description: string;
  link: string;
}

export interface StoryCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
  color: string;
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