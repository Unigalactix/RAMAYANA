import React from 'react';

/**
 * Sigil — consistent inline-SVG sacred icons that replace OS emoji.
 * Every character / theme / place renders the same on every platform.
 * Drawn in a single stroke style, tinted by the owner's accent colour.
 */

export type SigilKind =
  | 'bow' | 'lotus' | 'gada' | 'crown' | 'sun' | 'moon' | 'conch' | 'chakra'
  | 'flame' | 'eagle' | 'mountain' | 'ocean' | 'forest' | 'temple' | 'bridge'
  | 'herb' | 'wheel' | 'lamp' | 'scroll' | 'shield' | 'deer' | 'ring' | 'earth'
  | 'axe' | 'sword' | 'star' | 'city' | 'boat' | 'sandals';

const PATHS: Record<SigilKind, React.ReactNode> = {
  bow: (<><path d="M28 6 C12 22 12 42 28 58" fill="none" /><path d="M28 6 L28 58" /><path d="M10 32 H46 M40 26 L46 32 L40 38" fill="none" /></>),
  lotus: (<><path d="M32 50 C20 44 14 34 16 24 C24 28 30 36 32 44 C34 36 40 28 48 24 C50 34 44 44 32 50 Z" /><path d="M32 44 C30 34 32 24 32 16 C32 24 34 34 32 44" fill="none" /><path d="M12 54 C22 58 42 58 52 54" fill="none" /></>),
  gada: (<><circle cx="32" cy="20" r="11" /><path d="M32 31 V54 M26 54 H38" /></>),
  crown: (<><path d="M10 46 L14 24 L24 36 L32 18 L40 36 L50 24 L54 46 Z" /><path d="M10 52 H54" /></>),
  sun: (<><circle cx="32" cy="32" r="10" />{[0,45,90,135,180,225,270,315].map(a => (<line key={a} x1={32 + 14 * Math.cos(a * Math.PI / 180)} y1={32 + 14 * Math.sin(a * Math.PI / 180)} x2={32 + 20 * Math.cos(a * Math.PI / 180)} y2={32 + 20 * Math.sin(a * Math.PI / 180)} />))}</>),
  moon: (<><path d="M42 10 C28 14 20 24 20 34 C20 46 30 54 44 54 C36 48 32 40 32 32 C32 24 36 16 42 10 Z" /></>),
  conch: (<><path d="M20 44 C14 32 20 16 34 12 C46 9 54 18 52 28 C50 37 42 40 36 36 C42 34 44 28 40 24 M20 44 C26 50 40 52 48 46" fill="none" /></>),
  chakra: (<><circle cx="32" cy="32" r="18" fill="none" />{[0,30,60,90,120,150,180,210,240,270,300,330].map(a => (<line key={a} x1={32 + 18 * Math.cos(a * Math.PI / 180)} y1={32 + 18 * Math.sin(a * Math.PI / 180)} x2={32 + 24 * Math.cos(a * Math.PI / 180)} y2={32 + 24 * Math.sin(a * Math.PI / 180)} />))}<circle cx="32" cy="32" r="4" /></>),
  flame: (<><path d="M32 6 C38 16 46 22 46 34 C46 46 40 54 32 54 C24 54 18 46 18 34 C18 26 24 20 27 14 C28 20 30 22 32 24 C32 18 32 12 32 6 Z" /></>),
  eagle: (<><path d="M32 28 L10 16 C16 28 20 32 26 34 L14 38 C24 42 28 40 32 38 C36 40 40 42 50 38 L38 34 C44 32 48 28 54 16 Z" /><circle cx="32" cy="24" r="4" /></>),
  mountain: (<><path d="M6 52 L24 20 L34 36 L42 24 L58 52 Z" /><path d="M20 28 L24 20 L28 28" fill="none" /></>),
  ocean: (<><path d="M6 24 C14 16 22 32 30 24 C38 16 46 32 54 24 M6 38 C14 30 22 46 30 38 C38 30 46 46 54 38 M6 52 C14 44 22 60 30 52 C38 44 46 60 54 52" fill="none" /></>),
  forest: (<><path d="M32 8 L44 28 H36 L48 44 H16 L28 28 H20 Z" /><path d="M32 44 V56" /></>),
  temple: (<><path d="M32 6 L38 16 H26 Z M22 26 L32 16 L42 26 M18 38 L32 26 L46 38 M14 52 H50 M20 52 V38 M32 52 V38 M44 52 V38" fill="none" /></>),
  bridge: (<><path d="M6 44 C20 30 44 30 58 44 M6 44 H58 M14 44 V34 M26 44 V30 M38 44 V30 M50 44 V34" fill="none" /></>),
  herb: (<><path d="M32 54 V30 M32 30 C22 28 16 20 16 10 C26 12 32 20 32 30 M32 26 C34 16 40 10 48 8 C48 18 42 24 32 26" fill="none" /></>),
  wheel: (<><circle cx="32" cy="32" r="20" fill="none" /><circle cx="32" cy="32" r="4" />{[0,45,90,135,180,225,270,315].map(a => (<line key={a} x1="32" y1="32" x2={32 + 20 * Math.cos(a * Math.PI / 180)} y2={32 + 20 * Math.sin(a * Math.PI / 180)} />))}</>),
  lamp: (<><path d="M32 12 C35 17 36 19 36 22 C36 25 34 27 32 27 C30 27 28 25 28 22 C28 19 29 17 32 12 Z" /><path d="M14 36 C20 46 44 46 50 36 C44 40 20 40 14 36 Z M24 52 H40" fill="none" /></>),
  scroll: (<><path d="M18 12 H46 C50 12 52 15 52 18 C52 21 50 24 46 24 H22 M18 12 C14 12 12 15 12 18 L12 46 C12 50 15 52 18 52 H46 M18 24 V52" fill="none" /></>),
  shield: (<><path d="M32 6 L52 14 V30 C52 44 44 52 32 58 C20 52 12 44 12 30 V14 Z" /><path d="M32 18 V44 M22 28 H42" fill="none" /></>),
  deer: (<><path d="M22 20 L14 8 M22 20 L28 8 M18 24 C14 34 18 44 26 48 L24 56 M38 44 C44 40 46 32 42 26 L50 22 M26 48 L40 48 L42 56" fill="none" /><circle cx="24" cy="22" r="5" /></>),
  ring: (<><circle cx="32" cy="36" r="14" fill="none" /><path d="M24 14 L32 24 L40 14 L36 10 H28 Z" /></>),
  earth: (<><circle cx="32" cy="32" r="22" fill="none" /><path d="M12 28 C20 24 26 30 34 26 C42 22 48 28 52 26 M16 44 C24 40 30 46 40 42" fill="none" /></>),
  axe: (<><path d="M38 8 L38 52 M38 12 C48 10 54 16 56 24 C48 24 42 20 38 16 M38 22 C44 22 48 26 50 30" fill="none" /></>),
  sword: (<><path d="M44 6 L50 12 L26 40 L18 42 L20 34 Z M16 40 L10 46 M12 54 L20 46" fill="none" /></>),
  star: (<><path d="M32 8 L38 24 L55 24 L42 34 L47 51 L32 41 L17 51 L22 34 L9 24 L26 24 Z" /></>),
  city: (<><path d="M10 54 V26 L20 26 V54 M26 54 V14 L38 14 V54 M44 54 V30 L54 30 V54 M8 54 H56" fill="none" /></>),
  boat: (<><path d="M10 40 C18 50 46 50 54 40 L48 52 H16 Z M32 40 V16 M32 16 L44 32 H32" fill="none" /></>),
  sandals: (<><ellipse cx="22" cy="34" rx="8" ry="18" /><ellipse cx="42" cy="34" rx="8" ry="18" /><path d="M22 24 L22 34 M42 24 L42 34" fill="none" /></>),
};

export const CHARACTER_SIGIL: Record<string, SigilKind> = {
  rama: 'bow', sita: 'lotus', hanuman: 'gada', ravana: 'crown', lakshmana: 'shield',
  bharata: 'sandals', sugriva: 'sun', vibhishana: 'conch', jatayu: 'eagle',
  indrajit: 'moon', kumbhakarna: 'mountain', vishwamitra: 'flame',
};

const Sigil: React.FC<{ kind: SigilKind; color?: string; size?: number; className?: string }> = ({ kind, color = '#F5D061', size = 64, className }) => (
  <svg viewBox="0 0 64 64" width={size} height={size} className={className} aria-hidden="true"
    fill={color} stroke={color} strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"
    style={{ filter: `drop-shadow(0 0 10px ${color}66)` }}>
    {PATHS[kind]}
  </svg>
);

export default Sigil;
