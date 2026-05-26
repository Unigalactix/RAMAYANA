import React, { useEffect, useRef } from 'react';
import type { KandaDetailModalProps } from '../types';

const KandaDetailModal: React.FC<KandaDetailModalProps> = ({ kanda, onClose }) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    closeButtonRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-title">
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button ref={closeButtonRef} className="modal-close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
        <p className="text-center text-2xl text-[#FF9933] mb-1" aria-hidden="true">ॐ</p>
        <h2 id="modal-title" className="font-anton text-3xl md:text-4xl text-[#FF9933] uppercase tracking-wider mb-1">
          {kanda.title}
        </h2>
        <p className="font-bold text-base italic text-[#005B96] dark:text-[#63B3ED] mb-2">{kanda.theme}</p>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-6 leading-relaxed">{kanda.description}</p>
        
        <div className="space-y-4 text-left">
          <div>
            <h3 className="font-anton text-xl text-[#005B96] dark:text-[#63B3ED] uppercase tracking-wide mb-2">Key Events</h3>
            <ul className="list-none space-y-2 text-black/80 dark:text-white/80 font-medium">
              {kanda.keyEvents.map((event, index) => (
                <li key={index} className="flex items-start gap-2">
                  <span className="text-[#FF9933] mt-0.5 flex-shrink-0">◆</span>
                  <span>{event}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-anton text-xl text-[#005B96] dark:text-[#63B3ED] uppercase tracking-wide mb-2">Major Characters</h3>
            <p className="text-black/80 dark:text-white/80 font-medium">
              {kanda.majorCharacters.join(' · ')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KandaDetailModal;