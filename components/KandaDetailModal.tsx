import React, { useEffect } from 'react';
import type { KandaDetailModalProps } from '../types';
import AudioManager from '../utils/AudioManager';

const KandaDetailModal: React.FC<KandaDetailModalProps> = ({ kanda, onClose }) => {
  const audioManager = AudioManager.getInstance();

  useEffect(() => {
    // Play opening sound when modal opens
    audioManager.playSoundEffect('gong');
  }, []);

  const handleClose = () => {
    audioManager.playSoundEffect('bell');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={handleClose} aria-label="Close modal">&times;</button>
        <h2 className="font-anton text-3xl md:text-4xl text-[#FF6B6B] uppercase tracking-wider mb-2">
          {kanda.title}
        </h2>
        <p className="font-bold text-lg text-gray-700 dark:text-gray-300 mb-6">{kanda.theme}</p>
        
        <div className="space-y-4 text-left">
          <div>
            <h3 className="font-anton text-xl text-[#4ECDC4] uppercase tracking-wide mb-2">Key Events</h3>
            <ul className="list-disc list-inside space-y-1 text-black/80 dark:text-white/80 font-medium">
              {kanda.keyEvents.map((event, index) => (
                <li key={index}>{event}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-anton text-xl text-[#4ECDC4] uppercase tracking-wide mb-2">Major Characters</h3>
            <p className="text-black/80 dark:text-white/80 font-medium">
              {kanda.majorCharacters.join(', ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KandaDetailModal;