import React, { useState } from 'react';
import { mapLocations } from '../constants';
import type { MapLocation } from '../types';

const InteractiveMap: React.FC = () => {
  const [activeLocation, setActiveLocation] = useState<MapLocation | null>(null);

  const handleMarkerClick = (location: MapLocation, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveLocation(activeLocation?.id === location.id ? null : location);
  };
  
  const handleClose = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setActiveLocation(null);
  }

  return (
    <div className="map-container" onClick={() => handleClose()}>
      <svg
        className="map-svg"
        viewBox="0 0 350 500"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Map of Ancient India"
      >
        <path className="map-india" d="M175 10 C 120 20, 80 80, 85 150 L 70 200 C 60 250, 90 350, 150 420 L 175 450 L 200 420 C 260 350, 290 250, 280 200 L 265 150 C 270 80, 230 20, 175 10 Z" />
        <path className="map-sri-lanka" d="M195,460 C185,465 180,480 190,495 L195,498 L200,495 C210,480 205,465 195,460 Z" />
      </svg>
      {mapLocations.map((location) => (
        <div
          key={location.id}
          className="map-marker"
          style={{ top: location.coords.y, left: location.coords.x }}
          onClick={(e) => handleMarkerClick(location, e)}
          aria-label={`Location: ${location.name}`}
          role="button"
          tabIndex={0}
        >
          <div className="map-marker-dot"></div>
          <div className="map-marker-pulse"></div>
          {/* Desktop Tooltip */}
          <div className={`map-tooltip ${activeLocation?.id === location.id ? 'is-active' : ''}`}>
            <h4>{location.name}</h4>
            <p>{location.description}</p>
          </div>
        </div>
      ))}
       {/* Mobile Info Panel */}
      <div 
        className={`map-info-panel ${activeLocation ? 'is-active' : ''}`}
        onClick={(e) => e.stopPropagation()}
      >
        {activeLocation && (
          <>
            <button className="map-info-close" onClick={() => handleClose()} aria-label="Close location details">&times;</button>
            <h4>{activeLocation.name}</h4>
            <p>{activeLocation.description}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default InteractiveMap;