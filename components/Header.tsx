
import React from 'react';
import { SunIcon, MoonIcon } from './Icons';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ theme, toggleTheme }) => {
  return (
    <header className="text-center py-12 md:py-20 relative">
      <button
        onClick={toggleTheme}
        className="absolute top-4 right-4 md:top-8 md:right-8 w-12 h-12 bg-[#FBF5E8] dark:bg-[#4A2E2C] rounded-full flex items-center justify-center border-2 border-[#4A2E2C] dark:border-[#FBF5E8] shadow-md transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF9933] z-20"
        aria-label="Toggle dark mode"
      >
        {theme === 'light' ? (
          <MoonIcon className="w-6 h-6 text-[#4A2E2C]" />
        ) : (
          <SunIcon className="w-6 h-6 text-[#FBF5E8]" />
        )}
      </button>

       <div className="absolute -top-10 -right-10 w-40 h-40 border-8 border-[#4A2E2C] dark:border-[#FBF5E8] rounded-full opacity-10 -z-10"></div>
       <div className="absolute top-20 -left-10 w-20 h-20 bg-[#FF9933] rounded-full -z-10 opacity-50"></div>
       <div className="absolute inset-0 flex items-center justify-center -z-10">
         <svg width="200" height="200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-48 h-48 md:w-64 md:h-64 text-[#FFD700] opacity-20">
            <path d="M12 21C12 21 15.3333 16 21 16C21 12 18 10 18 10C18 10 20 6 17 4C14 2 12 5 12 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 21C12 21 8.66667 16 3 16C3 12 6 10 6 10C6 10 4 6 7 4C10 2 12 5 12 5" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
       </div>
      <h1 className="text-5xl md:text-8xl lg:text-9xl font-anton uppercase tracking-wider text-[#4A2E2C] dark:text-[#FBF5E8] leading-none">
        The Valmiki
        <br />
        <span className="text-[#005B96] dark:text-[#63B3ED]">Ramayana</span>
      </h1>
      <p className="mt-6 text-lg md:text-xl max-w-3xl mx-auto text-gray-800 dark:text-gray-300">
        The foundational epic (Adi Kavya) of Indian civilization, a profound and multi-layered story of dharma, devotion, and the complex interplay between the human and the divine.
      </p>
    </header>
  );
};

export default Header;