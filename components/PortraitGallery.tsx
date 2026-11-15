import React from 'react';
import Portrait from './Portrait';
import { portraits } from '../portraits';

/**
 * PortraitGallery — the Madhubani portrait medallions of the epic's
 * great souls. Generated SVG busts with rayed halos and patterned
 * borders, in the shared style of the Sacred Codices.
 */
const PortraitGallery: React.FC = () => (
  <div>
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 md:gap-6">
      {portraits.map((p) => (
        <figure key={p.id} className="portrait-card">
          <Portrait spec={p} size={168} />
          <figcaption className="mt-3 text-center">
            <div className="font-display text-lg text-gradient-gold leading-tight">{p.name}</div>
            <p className="mt-1 font-serif text-sm text-[#d8cdb0] leading-snug">{p.role}</p>
          </figcaption>
        </figure>
      ))}
    </div>
    <p className="mt-8 text-center font-serif italic text-[#c9bd9b] max-w-2xl mx-auto">
      Painted in the Madhubani manner — bold ink, natural pigments, a sun with a face.
      Rama wears the deep indigo-blue of Vishnu; every figure carries the attribute the epic gave them.
    </p>
  </div>
);

export default PortraitGallery;
