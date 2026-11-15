import React from 'react';

/**
 * SceneArt — MADHUBANI (Mithila folk art) scenic panel for a key scene.
 * Restyled 2026-11-14 at Rajesh's request (inspired by a Madhubani
 * animation-style reel): bold dark outlines, flat natural-pigment
 * colours on cream paper, double patterned border bands, pattern-filled
 * forms (bharni), sun/moon with a face, fish, lotus, peacocks and
 * tree-of-life foliage. Same artwork on every device.
 */

export type SceneArtKind =
  | 'palace' | 'birth' | 'bow' | 'sage' | 'court' | 'exile' | 'forest' | 'deer'
  | 'river' | 'battle' | 'sky' | 'garden' | 'ocean' | 'fire' | 'bridge' | 'herb'
  | 'mountain' | 'throne' | 'earth' | 'chariot' | 'wedding' | 'hermitage';

const INK = '#2e1608';
const CREAM = '#f7ead2';
const TURM = '#e8a812';
const VERM = '#d43d1a';
const INDIGO = '#1d4e89';
const LEAF = '#3e7d2c';
const LOTUS = '#e56b9f';

const BG: Partial<Record<SceneArtKind, string>> = {
  birth: '#fdf3d8', wedding: '#fdf3d8', throne: '#fdf3d8', palace: '#fbeed3', court: '#fbeed3',
  forest: '#eef3d8', sage: '#eef3d8', hermitage: '#eef3d8', deer: '#eef3d8', garden: '#f3e9f4',
  ocean: '#e8f0d8', bridge: '#e8f0d8', river: '#e6ecdf', fire: '#fdeeda', herb: '#e6ecdf',
  mountain: '#eef3d8', earth: '#f7ead2', exile: '#fdeeda', bow: '#fdf3d8', battle: '#fdeeda',
  chariot: '#fdeeda', sky: '#e8f0d8',
};

const SceneArt: React.FC<{ kind: SceneArtKind; accent: string; title: string }> = ({ kind, accent, title }) => {
  const gid = React.useId().replace(/[:]/g, '');
  const night = kind === 'garden' || kind === 'herb';
  const rays = Array.from({ length: 12 }, (_, i) => (i * 30 * Math.PI) / 180);
  const sunFace = (cx: number, cy: number, r: number, fill: string) => (
    <g>
      {rays.map((a, i) => (
        <line key={i} x1={cx + (r + 2) * Math.cos(a)} y1={cy + (r + 2) * Math.sin(a)} x2={cx + (r + 10) * Math.cos(a)} y2={cy + (r + 10) * Math.sin(a)} stroke={VERM} strokeWidth="2.4" />
      ))}
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke={INK} strokeWidth="2.4" />
      <circle cx={cx - r * 0.34} cy={cy - r * 0.1} r={r * 0.1} fill={INK} />
      <circle cx={cx + r * 0.34} cy={cy - r * 0.1} r={r * 0.1} fill={INK} />
      <path d={`M${cx - r * 0.3} ${cy + r * 0.34} Q${cx} ${cy + r * 0.55} ${cx + r * 0.3} ${cy + r * 0.34}`} fill="none" stroke={INK} strokeWidth="2" />
      <circle cx={cx} cy={cy - r * 0.44} r={r * 0.09} fill={VERM} />
    </g>
  );
  const tree = (x: number, y: number, s: number, col: string) => (
    <g stroke={INK} strokeWidth={2.2}>
      <path d={`M${x} ${y} q${3 * s} ${-24 * s} 0 ${-40 * s}`} fill="none" strokeWidth={3 * s} />
      <circle cx={x - 12 * s} cy={y - 48 * s} r={12 * s} fill={col} />
      <circle cx={x + 12 * s} cy={y - 48 * s} r={12 * s} fill={col} />
      <circle cx={x} cy={y - 60 * s} r={14 * s} fill={col} />
      <circle cx={x - 9 * s} cy={y - 50 * s} r={2.2 * s} fill={VERM} stroke="none" />
      <circle cx={x + 11 * s} cy={y - 42 * s} r={2.2 * s} fill={TURM} stroke="none" />
      <circle cx={x + 2 * s} cy={y - 64 * s} r={2.2 * s} fill={LOTUS} stroke="none" />
    </g>
  );
  const fish = (x: number, y: number, s: number, col: string) => (
    <g stroke={INK} strokeWidth={2}>
      <path d={`M${x} ${y} q${15 * s} ${-10 * s} ${32 * s} 0 q${-17 * s} ${10 * s} ${-32 * s} 0Z`} fill={col} />
      <path d={`M${x + 32 * s} ${y} l${9 * s} ${-7 * s} v${14 * s}Z`} fill={col} />
      <circle cx={x + 8 * s} cy={y - 1} r={1.9 * s} fill={INK} stroke="none" />
      <path d={`M${x + 17 * s} ${y - 5.5 * s} v${11 * s}`} strokeWidth={1.4} />
    </g>
  );
  const lotus = (x: number, y: number, s: number, col: string) => (
    <path d={`M${x} ${y} q${-11 * s} ${-4 * s} ${-12 * s} ${-15 * s} q${8 * s} ${2 * s} ${12 * s} ${7 * s} q${4 * s} ${-5 * s} ${12 * s} ${-7 * s} q${-1 * s} ${11 * s} ${-12 * s} ${15 * s}Z`} fill={col} stroke={INK} strokeWidth={1.9} />
  );
  const bird = (x: number, y: number, s: number, col: string) => (
    <path d={`M${x} ${y} q${9 * s} ${-8 * s} ${19 * s} ${-1 * s} q${-8 * s} ${-2 * s} ${-10 * s} ${3 * s} q${-4 * s} ${-4 * s} ${-9 * s} ${-2 * s}Z`} fill={col} stroke={INK} strokeWidth={1.9} />
  );
  const figure = (x: number, y: number, s: number, robe: string) => (
    <g stroke={INK} strokeWidth={2.1}>
      <path d={`M${x - 10 * s} ${y} L${x} ${y - 30 * s} L${x + 10 * s} ${y} Z`} fill={robe} />
      <circle cx={x} cy={y - 37 * s} r={7.6 * s} fill="#c97b4a" />
      <path d={`M${x - 7.4 * s} ${y - 41 * s} a${7.6 * s} ${7.6 * s} 0 0 1 ${15 * s} 0Z`} fill={INK} stroke="none" />
      <ellipse cx={x - 2.6 * s} cy={y - 37 * s} rx={2.3 * s} ry={1.3 * s} fill={INK} stroke="none" />
    </g>
  );

  return (
    <svg viewBox="0 0 400 225" className="scene-art" role="img" aria-label={`Madhubani style scenic representation: ${title}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id={`dm-${gid}`} width="15" height="15" patternUnits="userSpaceOnUse">
          <rect width="15" height="15" fill={VERM} />
          <path d="M7.5 1.8 L13.2 7.5 L7.5 13.2 L1.8 7.5Z" fill={TURM} />
          <circle cx="7.5" cy="7.5" r="1.4" fill={INK} />
        </pattern>
        <pattern id={`sc-${gid}`} width="17" height="9" patternUnits="userSpaceOnUse">
          <path d="M0 9 A8.5 8.5 0 0 1 17 9" fill="none" stroke={INDIGO} strokeWidth="1.5" />
          <path d="M-8.5 9 A8.5 8.5 0 0 1 8.5 9 M8.5 9 A8.5 8.5 0 0 1 25.5 9" fill="none" stroke={INDIGO} strokeWidth="1.5" transform="translate(0,-4.5)" />
        </pattern>
        <pattern id={`dt-${gid}`} width="10" height="10" patternUnits="userSpaceOnUse">
          <circle cx="2.6" cy="2.6" r="1.3" fill={INK} opacity="0.5" />
        </pattern>
        <pattern id={`ht-${gid}`} width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="8" stroke={INK} strokeWidth="1.2" opacity="0.45" />
        </pattern>
      </defs>

      {/* Madhubani frame: diamond band + cream panel */}
      <rect width="400" height="225" fill={CREAM} />
      <rect x="2" y="2" width="396" height="221" fill={`url(#dm-${gid})`} />
      <rect x="15" y="15" width="370" height="195" fill={BG[kind] || CREAM} />
      <rect x="15" y="15" width="370" height="195" fill="none" stroke={INK} strokeWidth="2.8" />
      <rect x="20" y="20" width="360" height="185" fill="none" stroke={INK} strokeWidth="1.1" />

      {/* sun / moon with a face */}
      {night ? sunFace(322, 52, 15, '#fdf6dd') : sunFace(200, 62, 20, kind === 'fire' || kind === 'battle' || kind === 'chariot' ? '#f6b73c' : TURM)}
      {bird(58, 52, 0.9, INDIGO)}
      {bird(310, 96, 0.75, VERM)}

      {/* patterned hills */}
      <path d="M15 168 L78 116 L138 152 L212 104 L282 148 L338 118 L385 150 V210 H15 Z" fill={LEAF} opacity="0.32" />
      <path d="M15 168 L78 116 L138 152 L212 104 L282 148 L338 118 L385 150 V210 H15 Z" fill={`url(#ht-${gid})`} />
      <path d="M15 168 L78 116 L138 152 L212 104 L282 148 L338 118 L385 150" fill="none" stroke={INK} strokeWidth="2.4" />

      {(kind === 'palace' || kind === 'court' || kind === 'throne' || kind === 'birth' || kind === 'wedding') && (
        <g stroke={INK} strokeWidth={2.4}>
          <path d="M152 196 V118 L200 84 L248 118 V196 Z" fill={TURM} />
          <path d="M152 196 V118 L200 84 L248 118 V196 Z" fill={`url(#dt-${gid})`} />
          <path d="M187 196 V148 a13 13 0 0 1 26 0 V196 Z" fill={VERM} />
          <path d="M112 196 V142 L134 126 L156 142 V196 Z" fill={LOTUS} />
          <path d="M244 196 V142 L266 126 L288 142 V196 Z" fill={LOTUS} />
          <path d="M200 84 V64" /><circle cx="200" cy="60" r="4" fill={VERM} />
          {kind === 'birth' && <>{lotus(84, 178, 1, LOTUS)}{lotus(306, 178, 1, TURM)}</>}
          {kind === 'wedding' && <>{figure(178, 196, 0.85, VERM)}{figure(222, 196, 0.85, INDIGO)}</>}
          {kind === 'throne' && <path d="M182 132 h36 M188 132 v-10 M212 132 v-10" stroke={VERM} strokeWidth={3} />}
        </g>
      )}

      {(kind === 'forest' || kind === 'sage' || kind === 'hermitage' || kind === 'deer') && (
        <g>
          {tree(56, 200, 1.05, LEAF)}
          {tree(344, 200, 1.05, LEAF)}
          {tree(200, 206, 1.25, LEAF)}
          {kind === 'hermitage' && (
            <g stroke={INK} strokeWidth={2.2}>
              <path d="M164 198 V166 L200 146 L236 166 V198 Z" fill="#c98d4b" />
              <path d="M156 168 L200 140 L244 168" fill="none" stroke={VERM} strokeWidth={4} />
              <circle cx="200" cy="182" r="4.4" fill={TURM} />
            </g>
          )}
          {kind === 'sage' && figure(200, 200, 0.95, TURM)}
          {kind === 'deer' && (
            <g stroke={INK} strokeWidth={2.3} fill={TURM}>
              <ellipse cx="200" cy="168" rx="21" ry="12" />
              <circle cx="222" cy="154" r="7.5" />
              <path d="M226 148 L232 132 M220 149 L216 134" fill="none" strokeWidth={2.2} />
              <path d="M186 178 L182 194 M196 179 L196 195 M208 178 L212 194" fill="none" strokeWidth={2.2} />
              <circle cx="192" cy="164" r="2.2" fill={VERM} stroke="none" /><circle cx="204" cy="170" r="2.2" fill={LOTUS} stroke="none" /><circle cx="196" cy="172" r="2" fill={CREAM} stroke="none" />
              <circle cx="224.5" cy="152" r="1.6" fill={INK} stroke="none" />
            </g>
          )}
        </g>
      )}

      {(kind === 'ocean' || kind === 'bridge' || kind === 'river') && (
        <g>
          <rect x="15" y="160" width="370" height="50" fill={`url(#sc-${gid})`} />
          <rect x="15" y="160" width="370" height="50" fill={INDIGO} opacity="0.16" />
          {fish(52, 184, 0.95, TURM)}
          {fish(282, 192, 0.8, LOTUS)}
          {fish(196, 198, 0.65, LEAF)}
          {kind === 'bridge' && <path d="M34 168 C140 128 260 128 366 164" stroke={INK} strokeWidth={8} fill="none" strokeLinecap="round" />}
          {kind === 'bridge' && <path d="M34 168 C140 128 260 128 366 164" stroke={accent} strokeWidth={4.4} fill="none" strokeLinecap="round" strokeDasharray="7 5" />}
          {kind === 'river' && <>{figure(96, 168, 0.9, INDIGO)}<path d="M120 176 q26 -10 44 2 l-4 12 q-22 -8 -40 -2Z" fill="#a5672f" stroke={INK} strokeWidth={2.1} />{figure(196, 176, 0.8, VERM)}</>}
          {kind === 'ocean' && <>{figure(200, 168, 0.95, TURM)}{lotus(120, 150, 0.9, LOTUS)}{lotus(272, 146, 0.9, LOTUS)}</>}
        </g>
      )}

      {kind === 'bow' && (
        <g fill="none" strokeLinecap="round">
          <path d="M104 198 C76 132 76 72 104 24" stroke={INK} strokeWidth={7} />
          <path d="M104 198 C76 132 76 72 104 24" stroke={TURM} strokeWidth={3.4} />
          <path d="M296 24 C324 72 324 132 298 194" stroke={INK} strokeWidth={7} />
          <path d="M296 24 C324 72 324 132 298 194" stroke={VERM} strokeWidth={3.4} />
          <path d="M104 24 L200 104 M296 24 L202 102" stroke={INK} strokeWidth={1.8} />
          <path d="M180 92 L224 118" stroke={INK} strokeWidth={3.4} />
          {figure(200, 202, 0.9, INDIGO)}
        </g>
      )}

      {kind === 'fire' && (
        <g stroke={INK} strokeWidth={2.3}>
          {[58, 124, 262, 326].map((x, i) => (
            <g key={x}>
              <path d={`M${x} 198 V${140 - (i % 2) * 18} L${x + 15} ${126 - (i % 2) * 18} L${x + 30} ${140 - (i % 2) * 18} V198 Z`} fill={i % 2 ? TURM : LOTUS} />
              <path d={`M${x + 15} ${118 - (i % 2) * 18} C${x + 27} ${96 - (i % 2) * 16} ${x + 7} ${86 - (i % 2) * 12} ${x + 17} ${62 - (i % 2) * 10} C${x + 31} ${84 - (i % 2) * 12} ${x + 33} ${100 - (i % 2) * 14} ${x + 23} ${116 - (i % 2) * 16} Z`} fill={i % 2 ? VERM : TURM} />
            </g>
          ))}
          {figure(200, 200, 0.95, INDIGO)}
        </g>
      )}

      {kind === 'herb' && (
        <g>
          <path d="M92 202 L172 76 L232 148 L272 104 L326 202 Z" fill={LEAF} opacity={0.55} stroke={INK} strokeWidth={2.3} />
          <path d="M92 202 L172 76 L232 148 L272 104 L326 202 Z" fill={`url(#dt-${gid})`} />
          <circle cx="212" cy="116" r="7" fill={LOTUS} stroke={INK} strokeWidth={2} />
          <circle cx="212" cy="116" r="15" fill="none" stroke={LOTUS} strokeWidth={1.8} strokeDasharray="3 4" />
          <path d="M212 130 C206 116 208 102 212 90 C216 102 218 116 212 130" fill={LEAF} stroke={INK} strokeWidth={1.8} />
          {figure(120, 204, 0.85, TURM)}
        </g>
      )}

      {(kind === 'battle' || kind === 'chariot') && (
        <g stroke={INK} strokeWidth={2.3} fill="none" strokeLinecap="round">
          <path d="M64 192 L152 100 M336 192 L248 100" />
          <path d="M152 100 L140 104 M152 100 L148 112 M248 100 L260 104 M248 100 L252 112" />
          <circle cx="200" cy="150" r="23" stroke={VERM} strokeWidth={3.4} />
          <path d="M200 127 V106 M187 139 H213" stroke={VERM} strokeWidth={3} />
          {kind === 'chariot' && (
            <>
              <circle cx="100" cy="192" r="13" fill={TURM} />
              <circle cx="300" cy="192" r="13" fill={TURM} />
              <path d="M94 180 C150 154 250 154 306 180" />
              {figure(200, 178, 0.8, VERM)}
            </>
          )}
        </g>
      )}

      {kind === 'garden' && (
        <g>
          {tree(60, 202, 1, LEAF)}
          {tree(340, 202, 1, LEAF)}
          {tree(130, 206, 0.8, TURM)}
          {tree(272, 206, 0.8, TURM)}
          {lotus(168, 168, 1.1, LOTUS)}
          {lotus(222, 178, 0.95, LOTUS)}
          {figure(200, 204, 0.9, LOTUS)}
        </g>
      )}

      {kind === 'sky' && (
        <g>
          <path d="M118 136 L48 102 C70 126 88 134 108 138 L74 146 C98 152 114 148 130 144 C146 152 164 152 192 144 L162 134 C180 130 196 118 210 98 C206 124 184 138 118 136 Z" fill={TURM} stroke={INK} strokeWidth={2.3} />
          <circle cx="134" cy="120" r="4.6" fill={INK} />
          {figure(268, 198, 0.85, VERM)}
          {tree(66, 204, 0.85, LEAF)}
        </g>
      )}

      {kind === 'mountain' && (
        <g>
          <path d="M54 202 L168 68 L230 140 L272 98 L348 202 Z" fill={INDIGO} opacity={0.4} stroke={INK} strokeWidth={2.3} />
          <path d="M54 202 L168 68 L230 140 L272 98 L348 202 Z" fill={`url(#ht-${gid})`} />
          <path d="M146 94 L168 68 L190 94 L178 86 L168 98 L156 86 Z" fill={CREAM} stroke={INK} strokeWidth={1.8} />
          {figure(96, 204, 0.8, TURM)}
          {figure(306, 204, 0.8, LEAF)}
        </g>
      )}

      {kind === 'earth' && (
        <g>
          <path d="M15 188 C110 172 290 172 385 188 V210 H15 Z" fill={VERM} opacity={0.75} />
          <path d="M15 188 C110 172 290 172 385 188" fill="none" stroke={INK} strokeWidth={2.4} />
          <ellipse cx="200" cy="188" rx="126" ry="9" fill="none" stroke={INK} strokeWidth={2} />
          {lotus(200, 182, 1.3, LOTUS)}
          {figure(158, 196, 0.85, INDIGO)}
          {figure(244, 196, 0.85, TURM)}
        </g>
      )}

      {kind === 'exile' && (
        <g stroke={INK} strokeWidth={2.2}>
          <path d="M150 200 V160 L200 134 L250 160 V200 Z" fill="#c98d4b" />
          <path d="M136 162 L200 128 L264 162" fill="none" stroke={VERM} strokeWidth={4} />
          <circle cx="200" cy="180" r="4.6" fill={TURM} />
          {figure(96, 202, 0.85, INDIGO)}
          {figure(306, 202, 0.85, LEAF)}
          <path d="M36 202 C120 188 280 188 364 202" stroke={LEAF} strokeWidth={3} fill="none" />
        </g>
      )}

      {/* ground pattern strip */}
      <rect x="15" y="196" width="370" height="14" fill={`url(#dt-${gid})`} opacity="0.6" />
      <line x1="15" y1="196" x2="385" y2="196" stroke={INK} strokeWidth="1.6" />
    </svg>
  );
};

export default SceneArt;
