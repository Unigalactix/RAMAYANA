import React from 'react';

const navLinks = [
  { href: '#kandas', label: 'Kandas', color: 'hover:text-[#FF6B6B]' },
  { href: '#characters', label: 'Characters', color: 'hover:text-[#4ECDC4]' },
  { href: '#themes', label: 'Themes', color: 'hover:text-[#FFE66D]' },
  { href: '#stories', label: 'Stories', color: 'hover:text-[#F7B801]' },
  { href: '#map', label: 'Map', color: 'hover:text-[#4ECDC4]' },
  { href: '#family-tree', label: 'Family Tree', color: 'hover:text-[#FF6B6B]' },
];

const Navigation: React.FC = () => {
  return (
    <nav className="main-nav font-anton">
      {navLinks.map((link) => (
        <a
          key={link.href}
          href={link.href}
          className={`px-4 py-2 sm:px-6 sm:py-3 rounded-full text-sm sm:text-base uppercase tracking-wider text-[#1E1E1E] transition-colors duration-300 ${link.color} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#FDF6E9] focus:ring-[#1E1E1E]`}
        >
          {link.label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;