import React from 'react';

const links = [
  { href: '#characters', label: 'Pantheon' },
  { href: '#kandas', label: 'Kandas' },
  { href: '#themes', label: 'Themes' },
  { href: '#stories', label: 'Stories' },
  { href: '#map', label: 'Map' },
  { href: '#lineage', label: 'Lineage' },
  { href: '#ask', label: 'Ask' },
];

const Navigation: React.FC = () => (
  <nav className="topnav no-scrollbar" aria-label="Primary">
    <a href="#top" className="!text-goldlight font-display !text-[13px]">॥ RAMAYANA ॥</a>
    {links.map(l => (
      <a key={l.href} href={l.href}>{l.label}</a>
    ))}
  </nav>
);

export default Navigation;
