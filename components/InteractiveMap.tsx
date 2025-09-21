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
        viewBox="0 0 200 300"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Map of Ancient India"
      >
        <path className="map-land" d="M100 5 L170 80 L160 180 L130 250 L70 250 L40 180 L30 80 Z" />
        <path className="map-sri-lanka" d="M115 270 C 125 265, 135 275, 125 285 C 115 295, 105 285, 115 270 Z" />
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