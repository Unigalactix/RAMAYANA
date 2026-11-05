import React from 'react';

/**
 * SceneArt — original scenic SVG representation for a key scene.
 * Layered sky / sun-or-moon / landscape silhouettes in the Codex palette.
 * Same artwork on every device (no emoji, no external images).
 */

export type SceneArtKind =
  | 'palace' | 'birth' | 'bow' | 'sage' | 'court' | 'exile' | 'forest' | 'deer'
  | 'river' | 'battle' | 'sky' | 'garden' | 'ocean' | 'fire' | 'bridge' | 'herb'
  | 'mountain' | 'throne' | 'earth' | 'chariot' | 'wedding' | 'hermitage';

const SKY: Record<string, [string, string]> = {
  dawn: ['#2b1a4a', '#b45309'], day: ['#1e3a5f', '#7c5a1e'], dusk: ['#3b1030', '#b91c1c'],
  night: ['#070b24', '#1e2a5a'], forest: ['#062e22', '#14532d'], fire: ['#2a0a05', '#7c2d12'],
  gold: ['#241a05', '#92600a'], river: ['#0b2a4a', '#155e63'],
};
const SKY_FOR: Partial<Record<SceneArtKind, keyof typeof SKY>> = {
  birth: 'gold', bow: 'dawn', wedding: 'gold', court: 'day', exile: 'dusk', deer: 'forest',
  battle: 'dusk', sky: 'dawn', garden: 'night', ocean: 'river', fire: 'fire', bridge: 'river',
  herb: 'night', throne: 'gold', earth: 'dusk', chariot: 'dusk', palace: 'dawn', sage: 'forest',
  forest: 'forest', river: 'river', mountain: 'day', hermitage: 'forest',
};

const SceneArt: React.FC<{ kind: SceneArtKind; accent: string; title: string }> = ({ kind, accent, title }) => {
  const [top, bottom] = SKY[SKY_FOR[kind] || 'dawn'];
  const gid = React.useId().replace(/[:]/g, '');
  const sun = kind !== 'garden' && kind !== 'herb';
  return (
    <svg viewBox="0 0 400 225" className="scene-art" role="img" aria-label={`Scenic representation: ${title}`} preserveAspectRatio="xMidYMid slice">
      <defs>
        <linearGradient id={`sky-${gid}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} /><stop offset="100%" stopColor={bottom} />
        </linearGradient>
        <radialGradient id={`glow-${gid}`} cx="50%" cy="38%" r="55%">
          <stop offset="0%" stopColor={accent} stopOpacity="0.55" /><stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="400" height="225" fill={`url(#sky-${gid})`} />
      <rect width="400" height="225" fill={`url(#glow-${gid})`} />
      {sun
        ? <><circle cx="200" cy="86" r="30" fill="#F5D061" opacity="0.9" /><circle cx="200" cy="86" r="46" fill="none" stroke="#F5D061" strokeWidth="1.5" opacity="0.45" /></>
        : <><circle cx="318" cy="44" r="17" fill="#e8ddba" /><circle cx="311" cy="40" r="15" fill={top} opacity="0.55" />
            {[[40,30],[90,52],[150,24],[230,40],[60,80],[350,88]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="1.6" fill="#fff" opacity="0.8"/>))}</>}
      {/* far hills */}
      <path d="M0 158 L70 108 L140 148 L215 96 L290 142 L345 112 L400 150 V225 H0 Z" fill="#0d0a18" opacity="0.55" />
      {/* mid ground per kind */}
      {(kind === 'palace' || kind === 'court' || kind === 'throne' || kind === 'birth' || kind === 'wedding') && (
        <g fill="#141026" stroke={accent} strokeWidth="1.4">
          <path d="M150 190 V120 L200 84 L250 120 V190 Z" />
          <path d="M186 190 V146 a14 14 0 0 1 28 0 V190 Z" fill="#F5D061" stroke="none" opacity="0.9" />
          <path d="M108 190 V142 L132 124 L156 142 V190 Z" /><path d="M244 190 V142 L268 124 L292 142 V190 Z" />
          <path d="M200 84 V62 M188 70 H212" />
        </g>
      )}
      {(kind === 'forest' || kind === 'sage' || kind === 'hermitage' || kind === 'deer') && (
        <g fill="#081b12">
          {[30,80,320,365].map((x, i) => (<path key={i} d={`M${x} 200 L${x + 22} 118 L${x + 44} 200 Z`} />))}
          <path d="M168 200 L200 128 L232 200 Z" fill="#0a2417" />
          {kind === 'hermitage' && <path d="M168 200 V168 L200 148 L232 168 V200 Z" fill="#241708" stroke={accent} strokeWidth="1.2" />}
          {kind === 'deer' && <g stroke="#F5D061" strokeWidth="2.4" fill="none" strokeLinecap="round"><circle cx="200" cy="160" r="7" fill="#F5D061" /><path d="M196 150 L188 134 M202 150 L208 134 M200 167 C196 180 202 190 210 194 M206 176 L222 170" /></g>}
        </g>
      )}
      {(kind === 'ocean' || kind === 'bridge' || kind === 'river') && (
        <g>
          <path d="M0 168 C60 156 110 178 170 166 C230 154 290 178 340 166 C370 159 390 164 400 162 V225 H0 Z" fill="#0a2e4a" />
          {[182,196,210].map(y => (<path key={y} d={`M0 ${y} C70 ${y - 8} 140 ${y + 8} 210 ${y} C280 ${y - 8} 340 ${y + 6} 400 ${y - 2}`} stroke="#7dd3fc" strokeWidth="1.6" fill="none" opacity="0.55" />))}
          {kind === 'bridge' && <path d="M28 176 C140 138 260 138 372 172" stroke={accent} strokeWidth="7" fill="none" strokeLinecap="round" />}
          {kind === 'river' && <path d="M178 150 C196 176 188 198 204 225 H168 C180 198 164 176 178 150 Z" fill="#155e63" />}
        </g>
      )}
      {kind === 'bow' && (
        <g stroke="#F5D061" strokeWidth="4" fill="none" strokeLinecap="round">
          <path d="M96 196 C70 130 70 74 96 22" /><path d="M300 22 C326 74 326 130 302 192" stroke={accent} />
          <path d="M96 22 L198 104 M300 22 L204 102" strokeWidth="2" opacity="0.8" />
          <path d="M178 92 L222 118" stroke="#fff" strokeWidth="3" />
        </g>
      )}
      {kind === 'fire' && (
        <g>
          <path d="M52 200 V142 L84 126 V200 M118 200 V118 L152 104 V200 M258 200 V124 L292 110 V200 M322 200 V146 L350 134 V200" fill="#170806" stroke="#7c2d12" />
          {[68,135,275,336].map((x, i) => (<path key={i} d={`M${x} ${128 - (i % 2) * 16} C${x + 12} ${104 - (i % 2) * 16} ${x - 8} ${92 - (i % 2) * 10} ${x + 2} ${66 - (i % 2) * 12} C${x + 16} ${88 - (i % 2) * 10} ${x + 18} ${106 - (i % 2) * 14} ${x + 8} ${126 - (i % 2) * 16} Z`} fill={i % 2 ? '#FF8C42' : '#F5D061'} opacity="0.92" />))}
        </g>
      )}
      {kind === 'herb' && (
        <g>
          <path d="M96 210 L178 74 L238 150 L276 104 L330 210 Z" fill="#0b1e14" stroke={accent} strokeWidth="1.2" />
          <circle cx="212" cy="118" r="7" fill="#a7f3d0" /><circle cx="212" cy="118" r="16" fill="none" stroke="#a7f3d0" opacity="0.6" />
          <path d="M212 132 C206 118 208 104 212 92 C216 104 218 118 212 132" fill="#34d399" />
        </g>
      )}
      {(kind === 'battle' || kind === 'chariot') && (
        <g stroke={accent} strokeWidth="2.4" fill="none" strokeLinecap="round">
          <path d="M60 190 L150 96 M340 190 L250 96" opacity="0.85" />
          <path d="M150 96 L138 100 M150 96 L146 108 M250 96 L262 100 M250 96 L254 108" />
          <circle cx="200" cy="150" r="24" stroke="#F5D061" /><path d="M200 126 V104 M186 138 H214" stroke="#F5D061" />
          {kind === 'chariot' && <><circle cx="98" cy="196" r="13" /><circle cx="302" cy="196" r="13" /><path d="M92 184 C150 158 250 158 308 184" /></>}
        </g>
      )}
      {kind === 'garden' && <g fill="#0d2417">{[60,130,262,332].map((x,i)=>(<path key={i} d={`M${x} 204 L${x+18} 132 L${x+36} 204 Z`} />))}<circle cx="200" cy="150" r="9" fill="#E879F9" opacity="0.85" /><path d="M200 160 C192 176 194 190 200 202 C206 190 208 176 200 160" fill="#14532d" /></g>}
      {kind === 'sky' && <g stroke={accent} strokeWidth="2.4" fill="none" strokeLinecap="round"><path d="M120 132 L52 100 C72 122 88 130 108 134 L76 142 C98 148 112 144 128 140 C142 148 158 148 184 142 L156 132 C172 128 186 118 200 100 C196 124 176 134 120 132 Z" fill={accent} opacity="0.35" /><circle cx="136" cy="118" r="5" fill={accent} /></g>}
      {kind === 'mountain' && <g><path d="M52 206 L168 66 L232 142 L272 96 L352 206 Z" fill="#101828" stroke={accent} strokeWidth="1.2" /><path d="M146 92 L168 66 L190 92 L178 84 L168 96 L156 84 Z" fill="#e8ddba" /></g>}
      {kind === 'earth' && <g><path d="M70 196 C150 176 250 176 330 196 L330 210 C250 194 150 194 70 210 Z" fill="#000" opacity="0.75" /><ellipse cx="200" cy="196" rx="128" ry="10" fill="none" stroke={accent} strokeWidth="2" /><path d="M188 188 C194 160 206 160 212 188" stroke="#E879F9" strokeWidth="3" fill="none" /></g>}
      {kind === 'exile' && <g><path d="M150 204 V162 L200 136 L250 162 V204 Z" fill="#1c1206" stroke={accent} strokeWidth="1.3" /><path d="M136 164 L200 130 L264 164" stroke={accent} strokeWidth="3" fill="none" /><circle cx="200" cy="182" r="5" fill="#FF8C42" /><path d="M40 204 C120 188 280 188 360 204" stroke="#3f6212" strokeWidth="3" fill="none" /></g>}
      {/* ground line */}
      <path d="M0 206 C90 198 310 198 400 206 V225 H0 Z" fill="#05030a" opacity="0.72" />
    </svg>
  );
};

export default SceneArt;
