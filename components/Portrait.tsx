import React from 'react';
import type { PortraitSpec, AttributeKind } from '../portraits';

/**
 * Portrait — a Madhubani medallion portrait, generated entirely in SVG.
 * Bust portrait inside a patterned double border, rayed golden halo,
 * bharni pattern fills, bold ink outlines, natural pigments on cream.
 * Shared visual language across the Sacred Codices: Vishnu's avatars
 * are deep indigo-blue; every figure carries their canonical attribute.
 */

const INK = '#2e1608';
const CREAM = '#f7ead2';
const TURM = '#e8a812';
const VERM = '#d43d1a';
const INDIGO = '#1d4e89';
const LEAF = '#3e7d2c';
const LOTUS = '#e56b9f';
const GOLD = '#f6c945';
const HAIR = '#2a1708';

const Portrait: React.FC<{ spec: PortraitSpec; size?: number }> = ({ spec, size = 200 }) => {
  const gid = React.useId().replace(/[:]/g, '');
  const s = spec.headScale || 1;
  const mood = spec.mood || 'serene';
  const hairCol = spec.greyHair || spec.beard === 'white' ? '#cfc4ae' : HAIR;
  const muzzle = '#efd3ae';

  const rays = Array.from({ length: 16 }, (_, i) => (i * 22.5 * Math.PI) / 180);

  const attribute = (kind: AttributeKind, side: 'left' | 'right') => {
    const x = side === 'left' ? 34 : 166;
    const flip = side === 'left' ? 1 : -1;
    switch (kind) {
      case 'bow':
        return (
          <g fill="none" strokeLinecap="round" key={kind + side}>
            <path d={`M${x} 178 C${x - 12 * flip} 130 ${x - 12 * flip} 84 ${x} 44`} stroke={INK} strokeWidth={6} />
            <path d={`M${x} 178 C${x - 12 * flip} 130 ${x - 12 * flip} 84 ${x} 44`} stroke={TURM} strokeWidth={2.8} />
            <path d={`M${x} 44 L${x + 16 * flip} 150`} stroke={INK} strokeWidth={1.6} />
            <path d={`M${x + 4 * flip} 96 L${x + 22 * flip} 108`} stroke={INK} strokeWidth={2.6} />
          </g>
        );
      case 'bowQuiver':
        return (
          <g key={kind + side}>
            {attribute('bow', 'left')}
            <g stroke={INK} strokeWidth={2.2}>
              <path d="M150 62 L166 96 L156 100 L142 68 Z" fill={VERM} />
              <path d="M152 60 L150 44 M160 64 L162 48" strokeWidth={2.6} />
              <path d="M150 44 l-4 8 h8 Z M162 48 l-4 8 h8 Z" fill={TURM} stroke="none" />
            </g>
          </g>
        );
      case 'lotus':
        return (
          <g key={kind + side} stroke={INK} strokeWidth={2}>
            <path d={`M${x} 182 C${x} 160 ${x + 2 * flip} 148 ${x + 4 * flip} 138`} fill="none" stroke={LEAF} strokeWidth={3} />
            <path d={`M${x + 4 * flip} 138 q${-11 * flip} ${-4} ${-12 * flip} ${-15} q${8 * flip} 2 ${12 * flip} 7 q${4 * flip} -5 12 * flip -7 q-1 11 -12 * flip 15Z`} fill={LOTUS} transform={`translate(${-4 * flip} 0)`} />
          </g>
        );
      case 'gada':
        return (
          <g key={kind + side} stroke={INK} strokeWidth={2.2}>
            <line x1={x} y1={182} x2={x} y2={104} stroke={INK} strokeWidth={5} />
            <line x1={x} y1={182} x2={x} y2={104} stroke="#a5672f" strokeWidth={2.6} />
            <circle cx={x} cy={88} r={17} fill={TURM} />
            <path d={`M${x - 17} 88 h34 M${x} 71 v34`} strokeWidth={1.6} opacity={0.55} />
            <circle cx={x} cy={88} r={6} fill={VERM} />
          </g>
        );
      case 'mountain':
        return (
          <g key={kind + side} stroke={INK} strokeWidth={2}>
            <path d={`M${x - 20} 184 L${x - 4} 148 L${x + 6} 164 L${x + 14} 152 L${x + 22} 184 Z`} fill={LEAF} opacity={0.85} />
            <circle cx={x} cy={142} r={3.4} fill={LOTUS} />
            <path d={`M${x - 4} 148 l3 5 l3 -5`} fill="none" strokeWidth={1.4} />
          </g>
        );
      case 'paduka':
        return (
          <g key={kind + side} stroke={INK} strokeWidth={2}>
            <rect x={x - 20} y={168} width={40} height={8} fill={TURM} />
            <path d={`M${x - 13} 168 q2 -12 7 -12 q5 0 7 12 M${x + 1} 168 q2 -12 7 -12 q5 0 7 12`} fill="#c98d4b" />
            <circle cx={x - 6} cy={156} r={2.2} fill={VERM} stroke="none" />
            <circle cx={x + 8} cy={156} r={2.2} fill={VERM} stroke="none" />
          </g>
        );
      case 'kamandalu':
        return (
          <g key={kind + side} stroke={INK} strokeWidth={2.1}>
            <path d={`M${x} 150 q14 6 12 18 q-2 14 -12 14 q-10 0 -12 -14 q-2 -12 12 -18Z`} fill="#c98d4b" />
            <path d={`M${x - 5} 150 q5 -8 10 0`} fill="none" />
            <path d={`M${x - 10} 166 h20`} strokeWidth={1.4} opacity={0.6} />
          </g>
        );
      case 'staff':
        return (
          <g key={kind + side} strokeLinecap="round" fill="none">
            <path d={`M${x} 184 L${x} 62 q0 -12 10 -12`} stroke={INK} strokeWidth={5} />
            <path d={`M${x} 184 L${x} 62 q0 -12 10 -12`} stroke="#a5672f" strokeWidth={2.4} />
          </g>
        );
      case 'serpent':
        return (
          <g key={kind + side} stroke={INK} strokeWidth={2} fill="none">
            <path d={`M${x + 8} 178 q-16 -8 -10 -22 q5 -12 -4 -18 q-8 -6 -2 -14`} stroke={LEAF} strokeWidth={6} strokeLinecap="round" />
            <path d={`M${x + 8} 178 q-16 -8 -10 -22 q5 -12 -4 -18 q-8 -6 -2 -14`} strokeWidth={1.4} stroke={INK} opacity={0.5} />
            <path d={`M${x - 8} 124 q6 -8 12 0 q-6 5 -12 0Z`} fill={VERM} />
          </g>
        );
      case 'berries':
        return (
          <g key={kind + side} stroke={INK} strokeWidth={2}>
            <path d={`M${x - 16} 162 h32 l-5 18 h-22 Z`} fill="#c98d4b" />
            <path d={`M${x - 16} 170 h32 M${x - 14} 177 h28`} strokeWidth={1.2} opacity={0.55} />
            {[-9, 0, 9, -4, 5].map((dx, i) => (
              <circle key={i} cx={x + dx} cy={158 - (i % 2) * 4} r={4.4} fill={i % 2 ? VERM : TURM} />
            ))}
          </g>
        );
      case 'sword':
        return (
          <g key={kind + side} stroke={INK} strokeWidth={2}>
            <path d={`M${x} 52 L${x + 4} 128 L${x} 140 L${x - 4} 128 Z`} fill="#d9d4c5" />
            <path d={`M${x - 9} 140 h18`} strokeWidth={3.4} />
            <line x1={x} y1={140} x2={x} y2={156} strokeWidth={4} />
            <circle cx={x} cy={160} r={3.6} fill={TURM} />
          </g>
        );
      case 'conch':
        return (
          <g key={kind + side} stroke={INK} strokeWidth={2}>
            <path d={`M${x} 146 q16 2 15 16 q-1 13 -13 15 q-11 1 -13 -9 q-1 -9 7 -11 q6 -1 7 5`} fill={CREAM} />
            <path d={`M${x - 2} 146 l-3 -10 l10 4 Z`} fill={TURM} />
          </g>
        );
      default:
        return null;
    }
  };

  const tenHeads = () => (
    <g stroke={INK} strokeWidth={1.8}>
      {Array.from({ length: 9 }, (_, i) => {
        const a = ((195 + i * 18.75) * Math.PI) / 180;
        const cx = 100 + 56 * Math.cos(a);
        const cy = 94 + 56 * Math.sin(a);
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={11} fill={spec.skin} />
            <path d={`M${cx - 8} ${cy - 7} l2.6 -6 l4 4 l4 -4 l2.6 6Z`} fill={TURM} />
            <circle cx={cx - 3.6} cy={cy + 1} r={1.3} fill={INK} stroke="none" />
            <circle cx={cx + 3.6} cy={cy + 1} r={1.3} fill={INK} stroke="none" />
          </g>
        );
      })}
    </g>
  );

  const crownEl = () => {
    switch (spec.crown) {
      case 'royal':
        return (
          <g stroke={INK} strokeWidth={2.2}>
            <path d="M73 68 L79 44 L91 58 L100 38 L109 58 L121 44 L127 68 Z" fill={TURM} />
            <rect x={73} y={64} width={54} height={7} fill={VERM} />
            <circle cx={100} cy={56} r={3.4} fill={LOTUS} />
            <circle cx={85} cy={62} r={2.2} fill={CREAM} stroke="none" />
            <circle cx={115} cy={62} r={2.2} fill={CREAM} stroke="none" />
          </g>
        );
      case 'grand':
        return (
          <g stroke={INK} strokeWidth={2.2}>
            <path d="M71 66 L77 32 L90 50 L100 24 L110 50 L123 32 L129 66 Z" fill={TURM} />
            <rect x={71} y={62} width={58} height={8} fill={VERM} />
            <circle cx={100} cy={46} r={4} fill={INDIGO} />
            <circle cx={84} cy={58} r={2.4} fill={LOTUS} stroke="none" />
            <circle cx={116} cy={58} r={2.4} fill={LOTUS} stroke="none" />
          </g>
        );
      case 'queen':
        return (
          <g stroke={INK} strokeWidth={2}>
            <circle cx={100} cy={34} r={9} fill={HAIR} />
            <path d="M77 66 L83 48 L93 58 L100 44 L107 58 L117 48 L123 66 Z" fill={TURM} />
            <circle cx={100} cy={57} r={3} fill={VERM} />
          </g>
        );
      case 'jata':
        return (
          <g stroke={INK} strokeWidth={2}>
            <path d="M70 74 A31 34 0 0 1 130 74 Z" fill="#4a2c14" />
            <path d="M74 62 A28 28 0 0 1 126 62 M78 52 A24 22 0 0 1 122 52" fill="none" strokeWidth={1.6} opacity={0.7} />
            <circle cx={100} cy={38} r={8} fill="#4a2c14" />
            <circle cx={100} cy={38} r={8} fill="none" />
          </g>
        );
      case 'topknot':
        return (
          <g stroke={INK} strokeWidth={2}>
            <path d="M70 74 A31 34 0 0 1 130 74 Z" fill={hairCol} />
            <circle cx={100} cy={36} r={8.6} fill={hairCol} />
            <path d="M92 66 A26 26 0 0 1 108 48" fill="none" strokeWidth={1.4} opacity={0.6} />
          </g>
        );
      case 'bun':
        return (
          <g stroke={INK} strokeWidth={2}>
            <path d="M70 76 A31 34 0 0 1 130 76 Z" fill={hairCol} />
            <circle cx={122} cy={48} r={8} fill={hairCol} />
          </g>
        );
      case 'hair':
        return (
          <g stroke={INK} strokeWidth={2}>
            <path d="M68 78 A32 36 0 0 1 132 78 L132 96 A32 30 0 0 0 68 96 Z" fill={HAIR} />
            <line x1={100} y1={44} x2={100} y2={62} stroke={VERM} strokeWidth={2.2} />
          </g>
        );
      case 'wild':
        return (
          <path d="M68 76 L62 52 L76 60 L78 38 L92 54 L100 32 L108 54 L122 38 L124 60 L138 52 L132 76 A32 30 0 0 0 68 76Z" fill="#22301a" stroke={INK} strokeWidth={2} />
        );
      case 'vanara':
        return (
          <g stroke={INK} strokeWidth={2}>
            <path d="M70 76 A31 34 0 0 1 130 76 Z" fill={spec.skin} />
            <path d="M78 58 A24 22 0 0 1 100 46" fill="none" strokeWidth={1.5} opacity={0.55} />
          </g>
        );
      case 'bird':
        return (
          <g stroke={INK} strokeWidth={2}>
            <path d="M70 76 A31 34 0 0 1 130 76 Z" fill="#5d4326" />
            <path d="M84 46 q4 -12 10 -4 q2 -12 8 -6 q6 -8 8 2 q8 -4 6 8" fill="#5d4326" />
            <circle cx={88} cy={56} r={2} fill={TURM} stroke="none" />
            <circle cx={104} cy={50} r={2} fill={VERM} stroke="none" />
            <circle cx={116} cy={58} r={2} fill={LOTUS} stroke="none" />
          </g>
        );
      default:
        return null;
    }
  };

  const eyes = () => {
    if (mood === 'sleepy') {
      return (
        <g stroke={INK} strokeWidth={2.4} fill="none" strokeLinecap="round">
          <path d="M80 90 q9 6 18 0 M102 90 q9 6 18 0" />
          <path d="M79 82 q10 -5 20 -1 M101 81 q10 -4 20 1" strokeWidth={2} />
        </g>
      );
    }
    const brow = mood === 'fierce' ? 'M78 78 L99 84 M122 78 L101 84' : 'M79 80 q10 -6 20 -1 M101 79 q10 -5 20 1';
    return (
      <g>
        <path d={brow} fill="none" stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
        {[89, 111].map((cx) => (
          <g key={cx}>
            <path d={`M${cx - 10} 91 Q${cx} 84 ${cx + 10} 91 Q${cx} 97 ${cx - 10} 91Z`} fill="#fff8ea" stroke={INK} strokeWidth={1.9} />
            <circle cx={cx} cy={90.6} r={3.1} fill={INK} />
          </g>
        ))}
      </g>
    );
  };

  const tilakEl = () => {
    if (spec.tilak === 'pundra') {
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M94 62 v14 q6 5 12 0 v-14" stroke="#fff8ea" strokeWidth={3.4} />
          <line x1={100} y1={64} x2={100} y2={76} stroke={VERM} strokeWidth={1.8} />
        </g>
      );
    }
    if (spec.tilak === 'bindi') {
      return <circle cx={100} cy={70} r={3.2} fill={VERM} stroke={INK} strokeWidth={1.2} />;
    }
    if (spec.tilak === 'rakshasa') {
      return <path d="M90 66 q10 -5 20 0" fill="none" stroke={VERM} strokeWidth={3.2} strokeLinecap="round" />;
    }
    return null;
  };

  return (
    <svg viewBox="0 0 200 200" width={size} height={size} role="img" aria-label={`Madhubani portrait of ${spec.name}`} className="portrait-art">
      <defs>
        <pattern id={`pd-${gid}`} width="15" height="15" patternUnits="userSpaceOnUse">
          <rect width="15" height="15" fill={VERM} />
          <path d="M7.5 1.8 L13.2 7.5 L7.5 13.2 L1.8 7.5Z" fill={TURM} />
          <circle cx="7.5" cy="7.5" r="1.4" fill={INK} />
        </pattern>
        <pattern id={`pt-${gid}`} width="9" height="9" patternUnits="userSpaceOnUse">
          <circle cx="2.4" cy="2.4" r="1.2" fill={INK} opacity="0.45" />
        </pattern>
        <clipPath id={`pc-${gid}`}>
          <circle cx={100} cy={100} r={83} />
        </clipPath>
      </defs>

      {/* patterned double border */}
      <circle cx={100} cy={100} r={99} fill={`url(#pd-${gid})`} />
      <circle cx={100} cy={100} r={90} fill={CREAM} stroke={INK} strokeWidth={2.4} />
      <circle cx={100} cy={100} r={83} fill="#f3e6cd" stroke={INK} strokeWidth={1.4} />

      <g clipPath={`url(#pc-${gid})`}>
        {/* rayed golden halo */}
        <g stroke={TURM} strokeWidth={2.6} strokeLinecap="round">
          {rays.map((a, i) => (
            <line key={i} x1={100 + 40 * Math.cos(a)} y1={88 + 40 * Math.sin(a)} x2={100 + (i % 2 ? 52 : 58) * Math.cos(a)} y2={88 + (i % 2 ? 52 : 58) * Math.sin(a)} opacity={0.9} />
          ))}
        </g>
        <circle cx={100} cy={88} r={40} fill={GOLD} opacity={0.5} />
        <circle cx={100} cy={88} r={40} fill="none" stroke={VERM} strokeWidth={1.6} strokeDasharray="4 4" />

        {spec.attribute === 'tenheads' && tenHeads()}

        {/* behind-shoulder attributes */}
        {(spec.attribute === 'bow' || spec.attribute === 'bowQuiver' || spec.attribute === 'gada' || spec.attribute === 'staff' || spec.attribute === 'sword' || spec.attribute === 'serpent') && attribute(spec.attribute, spec.attribute === 'bow' || spec.attribute === 'staff' ? 'left' : 'right')}
        {spec.attribute2 && attribute(spec.attribute2, 'left')}

        {/* bust / robe */}
        <path d="M26 200 C32 158 58 140 100 140 C142 140 168 158 174 200 Z" fill={spec.robe} stroke={INK} strokeWidth={2.6} />
        <path d="M26 200 C32 158 58 140 100 140 C142 140 168 158 174 200 Z" fill={`url(#pt-${gid})`} />
        <path d="M74 144 L100 168 L126 144" fill="none" stroke={TURM} strokeWidth={3.4} />
        <circle cx={100} cy={172} r={4.6} fill={TURM} stroke={INK} strokeWidth={1.6} />
        {spec.garland && (
          <g stroke={INK} strokeWidth={1.4}>
            {Array.from({ length: 9 }, (_, i) => {
              const t = -1 + i * 0.25;
              return <circle key={i} cx={100 + 36 * t} cy={158 + 20 * (1 - t * t)} r={4.6} fill={i % 3 === 0 ? LOTUS : i % 3 === 1 ? TURM : VERM} />;
            })}
          </g>
        )}

        {/* neck + face */}
        <rect x={91} y={118} width={18} height={24} fill={spec.skin} stroke={INK} strokeWidth={2} />
        {spec.vanara && (
          <g stroke={INK} strokeWidth={2.2}>
            <circle cx={68} cy={90} r={9} fill={spec.skin} />
            <circle cx={132} cy={90} r={9} fill={spec.skin} />
            <circle cx={68} cy={90} r={4.4} fill={LOTUS} stroke="none" opacity={0.8} />
            <circle cx={132} cy={90} r={4.4} fill={LOTUS} stroke="none" opacity={0.8} />
          </g>
        )}
        <g transform={`translate(100 90) scale(${s}) translate(-100 -90)`}>
          <ellipse cx={100} cy={90} rx={29} ry={35} fill={spec.skin} stroke={INK} strokeWidth={2.6} />
          {spec.vanara && <ellipse cx={100} cy={106} rx={16} ry={12} fill={muzzle} stroke={INK} strokeWidth={2} />}
          {spec.bird && (
            <g stroke={INK} strokeWidth={2.2}>
              <path d="M86 100 L114 100 L100 128 Z" fill={TURM} />
              <path d="M96 122 L100 128 L104 122" fill={INK} stroke="none" />
            </g>
          )}
          {!spec.bird && eyes()}
          {spec.bird && (
            <g>
              <circle cx={88} cy={88} r={4} fill={INK} />
              <circle cx={112} cy={88} r={4} fill={INK} />
              <path d="M76 78 L96 84 M124 78 L104 84" stroke={INK} strokeWidth={2.4} strokeLinecap="round" />
            </g>
          )}
          {!spec.vanara && !spec.bird && (
            <g stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round">
              <path d="M100 94 v8 q-3 3 0 5" strokeWidth={1.8} />
              <path d={mood === 'fierce' ? 'M91 116 q9 -3 18 0' : 'M91 114 q9 6 18 0'} strokeWidth={2.2} />
            </g>
          )}
          {spec.vanara && (
            <g stroke={INK} strokeWidth={2} fill="none" strokeLinecap="round">
              <circle cx={94} cy={102} r={1.7} fill={INK} stroke="none" />
              <circle cx={106} cy={102} r={1.7} fill={INK} stroke="none" />
              <path d="M90 112 q10 5 20 0" strokeWidth={2.2} />
            </g>
          )}
          {spec.mustache && (
            <path d="M84 110 q8 -5 16 1 q8 -6 16 -1 q-6 7 -16 4 q-10 3 -16 -4Z" fill={HAIR} stroke={INK} strokeWidth={1.6} />
          )}
          {tilakEl()}
          {crownEl()}
          {spec.female && (
            <g stroke={INK} strokeWidth={1.8}>
              <path d="M71 84 q-4 30 3 52 M129 84 q4 30 -3 52" fill="none" stroke={HAIR} strokeWidth={5} />
              <circle cx={70} cy={108} r={4.6} fill={TURM} />
              <circle cx={130} cy={108} r={4.6} fill={TURM} />
              <circle cx={100} cy={52} r={3} fill={TURM} />
            </g>
          )}
          {spec.beard && (
            <path d={`M76 104 Q100 ${spec.beard === 'white' ? 152 : 142} 124 104 Q112 122 100 122 Q88 122 76 104Z`} fill={spec.beard === 'white' ? '#e8e0cc' : spec.beard === 'grey' ? '#9a8f7a' : '#33200f'} stroke={INK} strokeWidth={2} />
          )}
        </g>

        {/* front attributes at the base */}
        {(spec.attribute === 'lotus' || spec.attribute === 'berries' || spec.attribute === 'kamandalu' || spec.attribute === 'conch' || spec.attribute === 'paduka') && attribute(spec.attribute, spec.id === 'sita' || spec.id === 'ahalya' ? 'right' : 'left')}
      </g>

      <circle cx={100} cy={100} r={83} fill="none" stroke={INK} strokeWidth={2} />
    </svg>
  );
};

export default Portrait;
