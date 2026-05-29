import React, { useRef, useState } from 'react';
import { Character } from '../types';

const RARITY_LABEL: Record<Character['rarity'], string> = {
  mythic: 'Mythic Avatar',
  legendary: 'Legendary',
  epic: 'Epic',
  rare: 'Rare',
};

interface Props {
  character: Character;
  onOpen?: (c: Character) => void;
}

const CharacterCard: React.FC<Props> = ({ character, onOpen }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [flipped, setFlipped] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const px = (x / rect.width) * 100;
    const py = (y / rect.height) * 100;
    const rx = ((y / rect.height) - 0.5) * -10;
    const ry = ((x / rect.width) - 0.5) * 12;
    el.style.setProperty('--mx', `${px}%`);
    el.style.setProperty('--my', `${py}%`);
    if (!flipped) {
      el.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    }
  };

  const handleLeave = () => {
    const el = cardRef.current;
    if (!el) return;
    el.style.setProperty('--mx', '50%');
    el.style.setProperty('--my', '50%');
    if (!flipped) el.style.transform = '';
  };

  return (
    <div className="card-stage">
      <div
        ref={cardRef}
        className={`tc ${flipped ? 'is-flipped' : ''}`}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => setFlipped(f => !f)}
        style={{ ['--accent' as any]: character.accent }}
        role="button"
        tabIndex={0}
        aria-label={`${character.name} card. Click to flip.`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setFlipped(f => !f); } }}
      >
        {/* FRONT */}
        <div className="tc-face">
          <div className="tc-frame" />
          <div className="tc-inner">
            <div
              className="tc-portrait"
              style={{
                background: `radial-gradient(ellipse at 50% 35%, ${character.accent}55 0%, transparent 65%), linear-gradient(180deg, #1f1632 0%, #0d0a18 100%)`,
              }}
            >
              <div className="tc-glyph" aria-hidden="true">{character.glyph}</div>
            </div>
            <div className="tc-name">{character.name}</div>
            <div className="tc-epithet">{character.epithet}</div>

            <div className="tc-stats">
              {character.stats.map(s => (
                <div className="tc-stat" key={s.label}>
                  <span style={{ width: 56 }}>{s.label}</span>
                  <div className="tc-stat-bar">
                    <div className="tc-stat-fill" style={{ width: `${s.value}%` }} />
                  </div>
                  <span className="tc-stat-val">{s.value}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="tc-holo" />
          <div className="tc-shine" />
          <div className="tc-corner tl" />
          <div className="tc-corner br" />
          <div className={`tc-rarity-badge rarity-${character.rarity}`}>{RARITY_LABEL[character.rarity]}</div>
        </div>

        {/* BACK */}
        <div className="tc-face tc-back">
          <div className="tc-frame" />
          <div className="tc-back-inner">
            <div className="tc-back-title">{character.name}</div>
            <div className="font-sanskrit text-center text-[20px]" style={{ color: character.accent }}>{character.sanskrit}</div>
            <div className="tc-quote">{character.quote}</div>
            <div className="space-y-2 text-[12px]">
              <div className="tc-fact-row"><strong>Alignment</strong><span>{character.alignment}</span></div>
              <div className="tc-fact-row"><strong>Affiliation</strong><span className="text-right">{character.affiliation}</span></div>
              <div className="tc-fact-row"><strong>Origin</strong><span className="text-right">{character.origin}</span></div>
              <div className="tc-fact-row"><strong>Era</strong><span>{character.era}</span></div>
              <div className="tc-fact-row"><strong>Weapon</strong><span className="text-right">{character.weapon}</span></div>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); onOpen?.(character); }}
              className="btn-gold mt-auto self-center"
              aria-label={`Open detailed codex for ${character.name}`}
            >
              Read the Codex
            </button>
          </div>
          <div className="tc-holo" style={{ opacity: 0.35 }} />
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
