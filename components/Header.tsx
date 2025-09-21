
import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="text-center py-12 md:py-20 relative">
       <div className="absolute -top-10 -right-10 w-40 h-40 border-8 border-[#1E1E1E] rounded-full opacity-20 -z-10"></div>
       <div className="absolute top-20 -left-10 w-20 h-20 bg-[#FF6B6B] rounded-full -z-10"></div>
      <h1 className="text-5xl md:text-8xl lg:text-9xl font-anton uppercase tracking-wider text-[#1E1E1E] leading-none">
        The Valmiki
        <br />
        <span className="text-[#4ECDC4]">Ramayana</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-700">
        The foundational epic (Adi Kavya) of Indian civilization, a profound and multi-layered story of dharma, devotion, and the complex interplay between the human and the divine.
      </p>
    </header>
  );
};

export default Header;
