import React, { useEffect, useMemo, useRef, useState } from 'react';
import { characters, kandas, themesData, stories } from '../constants';

type Item = {
  kind: 'Character' | 'Kanda' | 'Theme' | 'Story' | 'Section';
  title: string;
  subtitle?: string;
  sanskrit?: string;
  href: string;
  glyph?: string;
};

const SECTIONS: Item[] = [
  { kind: 'Section', title: 'The Pantheon', subtitle: 'Holographic character codex', href: '#characters', glyph: '✦' },
  { kind: 'Section', title: 'The Seven Kandas', subtitle: 'Sapta Kanda timeline', href: '#kandas', glyph: '☉' },
  { kind: 'Section', title: 'Living Themes', subtitle: 'Eternal currents', href: '#themes', glyph: '❀' },
  { kind: 'Section', title: 'Tales from the Epic', subtitle: 'Storybook of sub-narratives', href: '#stories', glyph: '✶' },
  { kind: 'Section', title: 'Sacred Path', subtitle: 'Ayodhya → Lanka → home', href: '#map', glyph: '◈' },
  { kind: 'Section', title: 'Rama Temples', subtitle: 'Sri Rama Kshetras', href: '#temples', glyph: '卐' },
  { kind: 'Section', title: 'Solar Dynasty', subtitle: 'Suryavansha lineage', href: '#lineage', glyph: '☼' },
];

const buildIndex = (): Item[] => {
  const c: Item[] = characters.map((x) => ({
    kind: 'Character',
    title: x.name,
    sanskrit: x.sanskrit,
    subtitle: x.epithet,
    href: '#characters',
    glyph: x.glyph,
  }));
  const k: Item[] = kandas.map((x) => ({
    kind: 'Kanda',
    title: x.title,
    sanskrit: x.sanskrit,
    subtitle: x.subtitle,
    href: '#kandas',
    glyph: '☉',
  }));
  const t: Item[] = themesData.map((x) => ({
    kind: 'Theme',
    title: x.title,
    subtitle: x.description.slice(0, 70) + (x.description.length > 70 ? '…' : ''),
    href: '#themes',
    glyph: x.glyph,
  }));
  const s: Item[] = stories.map((x) => ({
    kind: 'Story',
    title: x.title,
    subtitle: x.description.slice(0, 70) + (x.description.length > 70 ? '…' : ''),
    href: '#stories',
    glyph: '✶',
  }));
  return [...SECTIONS, ...c, ...k, ...t, ...s];
};

const KIND_COLOR: Record<Item['kind'], string> = {
  Character: '#F5D061',
  Kanda: '#FF8C42',
  Theme: '#E879F9',
  Story: '#3B82F6',
  Section: '#10B981',
};

const CommandPalette: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const index = useMemo(buildIndex, []);

  // Global hotkey: Cmd/Ctrl+K, or '/'
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const isK = (e.key === 'k' || e.key === 'K') && (e.metaKey || e.ctrlKey);
      const isSlash = e.key === '/' && !(e.target as HTMLElement)?.matches?.('input,textarea,[contenteditable]');
      if (isK || isSlash) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQ('');
      setActive(0);
      setTimeout(() => inputRef.current?.focus(), 10);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return index.slice(0, 24);
    return index
      .filter((it) =>
        [it.title, it.subtitle, it.sanskrit, it.kind]
          .filter(Boolean)
          .some((s) => (s as string).toLowerCase().includes(needle))
      )
      .slice(0, 40);
  }, [q, index]);

  useEffect(() => {
    setActive(0);
  }, [q]);

  const jumpTo = (it: Item) => {
    setOpen(false);
    setTimeout(() => {
      const el = document.querySelector(it.href);
      if (el) (el as HTMLElement).scrollIntoView({ behavior: 'smooth', block: 'start' });
      else window.location.hash = it.href;
    }, 30);
  };

  const onKeyInList = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((a) => Math.min(a + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const it = results[active];
      if (it) jumpTo(it);
    }
  };

  // Trigger button (exposed globally for nav)
  useEffect(() => {
    (window as any).__openPalette = () => setOpen(true);
  }, []);

  if (!open) return null;

  return (
    <div
      className="palette-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={() => setOpen(false)}
    >
      <div className="palette-card" onClick={(e) => e.stopPropagation()}>
        <div className="palette-search">
          <span className="palette-leading">⌘</span>
          <input
            ref={inputRef}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyInList}
            placeholder="Search characters, kandas, themes, stories…  (try “Hanuman”, “Sundara”, “dharma”)"
            className="palette-input"
            aria-label="Search the codex"
          />
          <kbd className="palette-kbd">ESC</kbd>
        </div>

        <div ref={listRef} className="palette-list" role="listbox">
          {results.length === 0 && (
            <div className="palette-empty font-serif italic">
              No matches — try “Sita”, “Lanka”, “devotion”, or browse the sections above.
            </div>
          )}
          {results.map((it, i) => (
            <button
              key={`${it.kind}-${it.title}-${i}`}
              role="option"
              aria-selected={i === active}
              className={`palette-row ${i === active ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              onClick={() => jumpTo(it)}
            >
              <span
                className="palette-glyph"
                style={{
                  color: KIND_COLOR[it.kind],
                  textShadow: `0 0 14px ${KIND_COLOR[it.kind]}55`,
                }}
              >
                {it.glyph ?? '✦'}
              </span>
              <span className="palette-text">
                <span className="palette-title">
                  {it.title}
                  {it.sanskrit && <span className="palette-sanskrit font-sanskrit"> · {it.sanskrit}</span>}
                </span>
                {it.subtitle && <span className="palette-sub">{it.subtitle}</span>}
              </span>
              <span
                className="palette-kind"
                style={{ color: KIND_COLOR[it.kind], borderColor: `${KIND_COLOR[it.kind]}55` }}
              >
                {it.kind}
              </span>
            </button>
          ))}
        </div>

        <div className="palette-foot">
          <span><kbd className="palette-kbd">↑</kbd><kbd className="palette-kbd">↓</kbd> navigate</span>
          <span><kbd className="palette-kbd">↵</kbd> jump</span>
          <span><kbd className="palette-kbd">⌘</kbd>+<kbd className="palette-kbd">K</kbd> to open · <kbd className="palette-kbd">/</kbd> shortcut</span>
        </div>
      </div>
    </div>
  );
};

export default CommandPalette;
