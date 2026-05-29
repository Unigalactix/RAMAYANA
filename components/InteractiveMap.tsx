import React, { useState } from 'react';
import { mapLocations } from '../constants';

const InteractiveMap: React.FC = () => {
  const [active, setActive] = useState<string | null>(null);
  const activeLoc = mapLocations.find(l => l.id === active);

  return (
    <div className="map-wrap">
      <div className="relative">
        <svg className="map-svg" viewBox="0 0 100 130" preserveAspectRatio="xMidYMid meet" aria-label="Map of ancient Bharata showing key Ramayana locations">
          {/* Stylized India outline */}
          <path d="M50 8 C 62 6, 72 12, 78 22 C 82 32, 80 40, 76 46 C 72 52, 70 60, 66 68 C 62 78, 58 88, 55 96 C 53 102, 52 108, 50 112 C 48 108, 46 102, 44 96 C 40 86, 36 76, 32 66 C 28 56, 24 46, 26 36 C 28 24, 38 12, 50 8 Z" />
          {/* Sri Lanka */}
          <ellipse cx="58" cy="120" rx="6" ry="7" />
        </svg>

        {mapLocations.map(loc => (
          <button
            key={loc.id}
            className="map-marker"
            style={{ left: loc.coords.x, top: loc.coords.y }}
            onMouseEnter={() => setActive(loc.id)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(loc.id)}
            onBlur={() => setActive(null)}
            onClick={() => setActive(prev => prev === loc.id ? null : loc.id)}
            aria-label={loc.name}
          >
            <span className="map-pulse" />
            <span className="map-dot" />
            <div className={`map-tip ${active === loc.id ? 'active' : ''}`} role="tooltip">
              <h4>{loc.name}</h4>
              <p>{loc.description}</p>
            </div>
          </button>
        ))}
      </div>

      {/* Mobile-friendly info panel */}
      {activeLoc && (
        <div className="md:hidden mt-4 glass p-4">
          <h4 className="font-cinzel text-goldlight">{activeLoc.name}</h4>
          <p className="font-serif text-[#ece2c8] mt-1">{activeLoc.description}</p>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
