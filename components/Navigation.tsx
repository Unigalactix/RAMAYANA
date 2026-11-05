import React, { useEffect, useState } from 'react';

const links = [
  { href: '#characters', label: 'Pantheon' },
  { href: '#kandas', label: 'Kandas' },
  { href: '#scenes', label: 'Scenes' },
  { href: '#leelas', label: 'Leelas' },
  { href: '#themes', label: 'Themes' },
  { href: '#stories', label: 'Stories' },
  { href: '#map', label: 'Path' },
  { href: '#temples', label: 'Temples' },
  { href: '#lineage', label: 'Lineage' },
];

const isMac = typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.platform);

const Navigation: React.FC = () => {
  const [active, setActive] = useState<string>('#top');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = ['#top', ...links.map((l) => l.href)]
      .map((id) => document.querySelector(id))
      .filter(Boolean) as HTMLElement[];
    if (sections.length === 0) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive('#' + (visible.target as HTMLElement).id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  const openPalette = () => (window as any).__openPalette?.();
  const openGlossary = () => (window as any).__openGlossary?.();

  return (
    <div className="topnav-wrap" aria-label="Primary navigation">
      <nav className="topnav no-scrollbar" aria-label="Primary">
        <a href="#top" className={`brand ${active === '#top' ? 'active' : ''}`} aria-label="Ramayana Codex — home">
          ॥ <span className="font-display">RAMAYANA</span> ॥
        </a>
        <span className="topnav-sep hidden lg:block" aria-hidden="true" />
        <span className="hidden lg:contents">
          {links.map((l) => (
            <a key={l.href} href={l.href} className={active === l.href ? 'active' : ''}>{l.label}</a>
          ))}
        </span>
        <span className="topnav-sep" aria-hidden="true" />
        <a href="#leap" className="topnav-btn topnav-leap" aria-label="Hanuman's Leap — an interactive flight to Lanka" title="Fly with Hanuman across the ocean">
          <span aria-hidden="true">✦</span><span className="hidden sm:inline">Hanuman’s Leap</span>
        </a>
        <button type="button" onClick={openPalette} className="topnav-btn" aria-label="Open command palette (Ctrl or Cmd + K)" title="Search the codex">
          <span aria-hidden="true">⌕</span><span className="hidden sm:inline">Search</span>
          <kbd className="topnav-kbd hidden md:inline">{isMac ? '⌘' : 'Ctrl'} K</kbd>
        </button>
        <button type="button" onClick={openGlossary} className="topnav-btn" aria-label="Open Sanskrit glossary" title="Sanskrit glossary">
          <span className="font-sanskrit" aria-hidden="true">अ</span><span className="hidden sm:inline">Glossary</span>
        </button>
        <button type="button" className="topnav-btn lg:!hidden" aria-expanded={menuOpen} aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(o => !o)}>
          <span aria-hidden="true">{menuOpen ? '✕' : '☰'}</span><span className="hidden sm:inline">Menu</span>
        </button>
      </nav>
      {menuOpen && (
        <div className="lg:hidden mx-3 mb-3 glass rounded-2xl p-3 grid grid-cols-2 gap-1" role="menu" aria-label="Sections">
          {links.map(l => (
            <a key={l.href} href={l.href} role="menuitem" onClick={() => setMenuOpen(false)}
              className={`px-4 py-3 rounded-xl font-cinzel text-sm tracking-[.15em] uppercase ${active === l.href ? 'text-goldlight bg-[rgba(245,208,97,.12)]' : 'text-[#e8ddba]'}`}>{l.label}</a>
          ))}
        </div>
      )}
    </div>
  );
};

export default Navigation;
