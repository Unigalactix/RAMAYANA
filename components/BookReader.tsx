import React, { useCallback, useEffect, useRef, useState } from 'react';
import { stories } from '../constants';
import { storyDetails } from '../storiesContent';
import SceneArt from './SceneArt';
import type { SceneArtKind } from './SceneArt';
import './book.css';

/**
 * BookReader — the Reading Book of the Ramayana Codex.
 *
 * A faithful React port of the JINX reader (Rajesh's own book):
 * dark shell, stacked page edges, a hidden measure element that
 * paginates each tale to fit the page exactly, and a 3D leaf
 * flip for every turn. Restyled with the codices' Madhubani
 * identity — cream paper, a patterned cover, and every tale
 * opening on its Madhubani scene as a chapter plate.
 */

type BlockKind = 'paragraph' | 'context' | 'break';
interface BookBlock { kind: BlockKind; text: string }
interface Segment { kind: BlockKind; text: string; block: number; offset: number }
interface Chapter {
  title: string;
  number: string;
  kanda: string;
  subtitle: string;
  art: SceneArtKind;
  accent: string;
  blocks: BookBlock[];
}

const CHAPTERS: Chapter[] = stories.map((s, i) => {
  const d = storyDetails[s.title];
  const blocks: BookBlock[] = [];
  (d?.body ?? [s.description]).forEach((t) => blocks.push({ kind: 'paragraph', text: t }));
  if (d?.lesson) {
    blocks.push({ kind: 'break', text: '***' });
    blocks.push({ kind: 'context', text: `The Lesson — ${d.lesson}` });
  }
  return {
    title: s.title,
    number: `Tale ${String(i + 1).padStart(2, '0')}`,
    kanda: d?.kanda ?? 'Katha Kanda',
    subtitle: s.description,
    art: d?.art ?? 'palace',
    accent: d?.accent ?? '#D4AF37',
    blocks,
  };
});

const KANDA_GROUPS: { kanda: string; indices: number[] }[] = [];
CHAPTERS.forEach((c, i) => {
  const g = KANDA_GROUPS[KANDA_GROUPS.length - 1];
  if (g && g.kanda === c.kanda) g.indices.push(i);
  else KANDA_GROUPS.push({ kanda: c.kanda, indices: [i] });
});

interface ViewState { chapter: number; pages: Segment[][]; disp: number }
type Anchor = { block: number; offset: number };

/* ---------- pagination (the JINX measure-element technique) ---------- */

interface WordSegmenter { segment: (t: string) => Iterable<{ index: number; segment: string }> }
const SegCtor = (Intl as unknown as { Segmenter?: new (locale: string, opts: { granularity: string }) => WordSegmenter }).Segmenter;

function wordEnds(text: string, segmenter: WordSegmenter | null): number[] {
  if (segmenter) return [...segmenter.segment(text)].map((p) => p.index + p.segment.length);
  const ends: number[] = [];
  const re = /\S+\s*/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) ends.push(m.index + m[0].length);
  if (!ends.length || ends[ends.length - 1] !== text.length) ends.push(text.length);
  return ends;
}

function paginateChapterDom(measure: HTMLElement, chapter: Chapter): Segment[][] {
  const pages: Segment[][] = [];
  let page: Segment[] = [];
  const content = document.createElement('div');
  content.className = 'book-page-text';
  measure.replaceChildren(content);
  const fits = () => content.scrollHeight <= content.clientHeight + 1;
  if (content.clientHeight < 35) {
    measure.replaceChildren();
    throw new Error('There is not enough room for a book page. Enlarge the window or rotate your device.');
  }
  const finish = () => {
    if (page.length) pages.push(page);
    page = [];
    content.replaceChildren();
  };
  const segmenter = SegCtor ? new SegCtor('en', { granularity: 'word' }) : null;
  chapter.blocks.forEach((block, blockIndex) => {
    if (block.kind === 'break') {
      const rule = document.createElement('hr');
      content.append(rule);
      if (!fits()) { rule.remove(); finish(); content.append(rule); }
      page.push({ ...block, block: blockIndex, offset: 0 });
      return;
    }
    let offset = 0;
    while (offset < block.text.length) {
      const rest = block.text.slice(offset);
      const p = document.createElement('p');
      if (block.kind === 'context') p.className = 'source-context';
      p.textContent = rest;
      content.append(p);
      if (fits()) {
        page.push({ kind: block.kind, text: rest, block: blockIndex, offset });
        break;
      }
      const ends = wordEnds(rest, segmenter);
      let low = 0;
      let high = ends.length;
      while (low < high) {
        const mid = Math.ceil((low + high) / 2);
        p.textContent = rest.slice(0, ends[mid - 1]);
        if (fits()) low = mid;
        else high = mid - 1;
      }
      if (!low) {
        p.remove();
        if (!page.length) {
          measure.replaceChildren();
          throw new Error('Text cannot fit on this page. Reduce the text size or enlarge the window.');
        }
        finish();
        continue;
      }
      const len = ends[low - 1];
      const text = rest.slice(0, len);
      p.textContent = text;
      page.push({ kind: block.kind, text, block: blockIndex, offset });
      offset += len;
      finish();
    }
  });
  if (page.length) pages.push(page);
  measure.replaceChildren();
  return pages;
}

function pageForAnchor(pages: Segment[][], anchor: Anchor): number {
  let result = 0;
  pages.forEach((pg, idx) => {
    const start = pg[0];
    if (start && (start.block < anchor.block || (start.block === anchor.block && start.offset <= anchor.offset))) result = idx;
  });
  return result;
}

/* ---------- the reader ---------- */

const BookReader: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const measureRef = useRef<HTMLDivElement>(null);
  const leafRef = useRef<HTMLDivElement>(null);

  const [view, setView] = useState<ViewState>({ chapter: 0, pages: [], disp: -1 });
  const [leaf, setLeaf] = useState<(ViewState & { dir: 1 | -1 }) | null>(null);
  const [turning, setTurning] = useState(false);
  const [ready, setReady] = useState(false);
  const [size, setSize] = useState(18);
  const [fullPage, setFullPage] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const viewRef = useRef(view);
  viewRef.current = view;
  const turningRef = useRef(false);
  const readyRef = useRef(false);
  const fullPageRef = useRef(false);
  fullPageRef.current = fullPage;
  const resumeRef = useRef<{ disp: number; anchor: Anchor | null }>({ disp: 0, anchor: null });
  const pendingResizeRef = useRef(false);
  const geometryRef = useRef('');
  const ownsFsRef = useRef(false);
  const leafTargetRef = useRef<ViewState | null>(null);
  const returnFocusRef = useRef<Element | null>(null);
  const touchRef = useRef<{ x: number; y: number } | null>(null);

  const paginate = useCallback((chapterIdx: number): Segment[][] => {
    const measure = measureRef.current;
    if (!measure) return [];
    const pages = paginateChapterDom(measure, CHAPTERS[chapterIdx]);
    if (bookRef.current) geometryRef.current = `${bookRef.current.clientWidth}:${bookRef.current.clientHeight}`;
    return pages;
  }, []);

  const currentAnchor = useCallback((): Anchor | null => {
    const v = viewRef.current;
    if (v.disp < 1) return null;
    const first = v.pages[v.disp - 1]?.[0];
    return first ? { block: first.block, offset: first.offset } : null;
  }, []);

  const repaginate = useCallback(() => {
    if (!readyRef.current) return;
    const v = viewRef.current;
    try {
      const anchor = currentAnchor();
      const pages = paginate(v.chapter);
      let disp = v.disp;
      if (anchor) disp = pageForAnchor(pages, anchor) + 1;
      if (v.disp < 0 && resumeRef.current.anchor) {
        resumeRef.current = { disp: pageForAnchor(pages, resumeRef.current.anchor) + 1, anchor: resumeRef.current.anchor };
      }
      setView({ chapter: v.chapter, pages, disp });
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [paginate, currentAnchor]);

  /* ----- page turning ----- */

  const finishTurn = useCallback(() => {
    if (leafTargetRef.current) {
      setView(leafTargetRef.current);
      leafTargetRef.current = null;
    }
    setLeaf(null);
    turningRef.current = false;
    setTurning(false);
    bookRef.current?.focus({ preventScroll: true });
    if (pendingResizeRef.current) {
      pendingResizeRef.current = false;
      repaginate();
    }
  }, [repaginate]);

  useEffect(() => {
    if (!leaf) return;
    const el = leafRef.current;
    if (!el) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const frames: Keyframe[] = reduced
      ? [{ opacity: leaf.dir > 0 ? 1 : 0 }, { opacity: leaf.dir > 0 ? 0 : 1 }]
      : leaf.dir > 0
        ? [
            { transform: 'rotateY(0deg)', opacity: 1, offset: 0 },
            { transform: 'rotateY(-95deg)', opacity: 1, offset: 0.6 },
            { transform: 'rotateY(-175deg)', opacity: 0, offset: 1 },
          ]
        : [
            { transform: 'rotateY(-175deg)', opacity: 0, offset: 0 },
            { transform: 'rotateY(-95deg)', opacity: 1, offset: 0.4 },
            { transform: 'rotateY(0deg)', opacity: 1, offset: 1 },
          ];
    const anim = el.animate(frames, { duration: reduced ? 120 : 720, easing: 'cubic-bezier(.25,.65,.3,1)', fill: 'forwards' });
    let cancelled = false;
    anim.finished
      .then(() => { if (!cancelled) finishTurn(); })
      .catch(() => { /* animation cancelled — unmount cleanup owns the state */ });
    return () => { cancelled = true; anim.cancel(); };
  }, [leaf, finishTurn]);

  const turnTo = useCallback((target: ViewState, dir: 1 | -1) => {
    if (turningRef.current || !readyRef.current) return;
    const from = viewRef.current;
    turningRef.current = true;
    setTurning(true);
    if (dir > 0) {
      setView(target);
      setLeaf({ ...from, dir });
    } else {
      leafTargetRef.current = target;
      setLeaf({ ...target, dir });
    }
  }, []);

  const move = useCallback((dir: 1 | -1) => {
    if (!readyRef.current || turningRef.current) return;
    const v = viewRef.current;
    if (v.disp < 0) {
      if (dir > 0) turnTo({ chapter: v.chapter, pages: v.pages, disp: Math.min(resumeRef.current.disp, v.pages.length) }, 1);
      return;
    }
    const target = v.disp + dir;
    if (target < 0) {
      if (v.chapter > 0) {
        const pages = paginate(v.chapter - 1);
        turnTo({ chapter: v.chapter - 1, pages, disp: pages.length }, -1);
      } else {
        resumeRef.current = { disp: v.disp, anchor: currentAnchor() };
        turnTo({ chapter: v.chapter, pages: v.pages, disp: -1 }, -1);
      }
    } else if (target > v.pages.length) {
      if (v.chapter < CHAPTERS.length - 1) {
        const pages = paginate(v.chapter + 1);
        turnTo({ chapter: v.chapter + 1, pages, disp: 0 }, 1);
      }
    } else {
      turnTo({ chapter: v.chapter, pages: v.pages, disp: target }, dir);
    }
  }, [paginate, turnTo, currentAnchor]);

  const goToCover = useCallback(() => {
    const v = viewRef.current;
    if (!readyRef.current || turningRef.current || v.disp < 0) return;
    resumeRef.current = { disp: v.disp, anchor: currentAnchor() };
    turnTo({ chapter: v.chapter, pages: v.pages, disp: -1 }, -1);
  }, [turnTo, currentAnchor]);

  const changeChapter = useCallback((idx: number) => {
    if (!readyRef.current || turningRef.current) return;
    if (idx === -1) { goToCover(); return; }
    const v = viewRef.current;
    if (idx === v.chapter && v.disp >= 0) return;
    try {
      const pages = paginate(idx);
      turnTo({ chapter: idx, pages, disp: 0 }, 1);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    }
  }, [paginate, turnTo, goToCover]);

  /* ----- fullscreen / close ----- */

  const exitFullscreen = useCallback(async (): Promise<boolean> => {
    try {
      if (ownsFsRef.current && document.fullscreenElement === viewportRef.current) await document.exitFullscreen();
      ownsFsRef.current = false;
      setFullPage(false);
      return true;
    } catch {
      return false;
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    if (turningRef.current) return;
    if (fullPageRef.current) { await exitFullscreen(); return; }
    setFullPage(true);
    try {
      if (document.fullscreenElement) return;
      if (!document.fullscreenEnabled || !viewportRef.current?.requestFullscreen) return; // fallback: full-page class only
      await viewportRef.current.requestFullscreen();
      ownsFsRef.current = true;
    } catch { /* full-page class fallback stays */ }
  }, [exitFullscreen]);

  useEffect(() => {
    const onFs = () => {
      if (ownsFsRef.current && document.fullscreenElement !== viewportRef.current) {
        ownsFsRef.current = false;
        setFullPage(false);
      }
    };
    document.addEventListener('fullscreenchange', onFs);
    return () => document.removeEventListener('fullscreenchange', onFs);
  }, []);

  const closeBook = useCallback(async () => {
    if (fullPageRef.current && !(await exitFullscreen())) return;
    onClose();
  }, [exitFullscreen, onClose]);

  const handleEscape = useCallback(() => {
    if (fullPageRef.current) { void exitFullscreen(); }
    else { void closeBook(); }
  }, [exitFullscreen, closeBook]);

  /* ----- lifecycle ----- */

  useEffect(() => {
    const dlg = dialogRef.current;
    if (!dlg) return;
    returnFocusRef.current = document.activeElement;
    if (!dlg.open) dlg.showModal();
    document.body.classList.add('reader-open');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    dlg.animate(
      reduced
        ? [{ opacity: 0 }, { opacity: 1 }]
        : [
            { opacity: 0, transform: 'perspective(1800px) rotateY(-12deg) scale(.94)' },
            { opacity: 1, transform: 'perspective(1800px) rotateY(0deg) scale(1)' },
          ],
      { duration: reduced ? 100 : 450, easing: 'ease-out' }
    );
    const raf = requestAnimationFrame(() => {
      try {
        const pages = paginate(0);
        setView({ chapter: 0, pages, disp: -1 });
      } catch (e) {
        setError(e instanceof Error ? e.message : String(e));
      }
      readyRef.current = true;
      setReady(true);
      if (bookRef.current) geometryRef.current = `${bookRef.current.clientWidth}:${bookRef.current.clientHeight}`;
    });
    const onCancel = (e: Event) => { e.preventDefault(); handleEscape(); };
    dlg.addEventListener('cancel', onCancel);
    return () => {
      cancelAnimationFrame(raf);
      dlg.removeEventListener('cancel', onCancel);
      document.body.classList.remove('reader-open');
      if (dlg.open) dlg.close();
      const rf = returnFocusRef.current;
      if (rf instanceof HTMLElement && rf.isConnected) rf.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const book = bookRef.current;
    if (!book || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => {
      if (!readyRef.current) return;
      const g = `${book.clientWidth}:${book.clientHeight}`;
      if (g === geometryRef.current) return;
      geometryRef.current = g;
      if (turningRef.current) { pendingResizeRef.current = true; return; }
      repaginate();
    });
    ro.observe(book);
    return () => ro.disconnect();
  }, [repaginate]);

  const sizeRef = useRef(size);
  useEffect(() => {
    if (sizeRef.current === size) return;
    sizeRef.current = size;
    if (readyRef.current) repaginate();
  }, [size, repaginate]);

  /* ----- rendering pages ----- */

  const renderCover = (): React.ReactNode => (
    <div className="bk-cover">
      <div className="bk-cover-band top" aria-hidden="true" />
      <div className="bk-cover-band bottom" aria-hidden="true" />
      <div className="bk-cover-eyebrow">॥ श्रीरामायणम् ॥ · Valmiki’s Adi Kavya</div>
      <div className="bk-cover-art">
        <SceneArt kind="chariot" accent="#e8a812" title="The Ramayana — the return to Ayodhya" />
      </div>
      <h3 className="bk-cover-title">The Ramayana</h3>
      <p className="bk-cover-sub">
        The complete epic in thirty tales — from the Putrakameshti fire of Ayodhya to the still waters of the Sarayu.
      </p>
      <div className="bk-cover-rule" aria-hidden="true">❖ ❖ ❖</div>
      <button type="button" className="bk-open-btn" disabled={!ready || turning} onClick={() => move(1)}>
        Open book →
      </button>
      <p className="bk-cover-foot">Ramayana Codex · A Reading Book</p>
    </div>
  );

  const renderSurface = (st: ViewState): React.ReactNode => {
    const ch = CHAPTERS[st.chapter];
    if (st.disp < 0) return renderCover();
    if (st.disp === 0) {
      return (
        <>
          <div className="book-page-text bk-plate">
            <div className="bk-plate-kanda">{ch.kanda} · {ch.number} of {CHAPTERS.length}</div>
            <div className="bk-plate-art">
              <SceneArt kind={ch.art} accent={ch.accent} title={ch.title} />
            </div>
            <h3>{ch.title}</h3>
            <p className="book-chapter-subtitle">{ch.subtitle}</p>
            <hr />
            <p className="bk-plate-note">A tale of the {ch.kanda} — turn the page to read it in full.</p>
          </div>
          <div className="book-folio">
            <span>{ch.number}</span>
            <span className="bk-folio-orn" aria-hidden="true">❖</span>
            <span>1 / {st.pages.length + 1}</span>
          </div>
        </>
      );
    }
    const segs = st.pages[st.disp - 1] ?? [];
    return (
      <>
        <div className="book-running-title">{`The Ramayana / ${ch.title}`}</div>
        <div className={`book-page-text${st.disp === 1 ? ' bk-first' : ''}`}>
          {segs.map((s, i) =>
            s.kind === 'break'
              ? <hr key={i} />
              : <p key={i} className={s.kind === 'context' ? 'source-context' : undefined}>{s.text}</p>
          )}
        </div>
        <div className="book-folio">
          <span>{ch.title}</span>
          <span className="bk-folio-orn" aria-hidden="true">❖</span>
          <span>{st.disp + 1} / {st.pages.length + 1}</span>
        </div>
      </>
    );
  };

  /* ----- shell ----- */

  const ch = CHAPTERS[view.chapter];
  const busy = !ready || turning;
  const atLast = view.disp >= 0 && view.chapter === CHAPTERS.length - 1 && view.disp === view.pages.length;

  const onBookClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).closest('button, select, a, input, textarea')) return;
    const rect = bookRef.current?.getBoundingClientRect();
    if (!rect) return;
    move(e.clientX - rect.left > rect.width / 2 ? 1 : -1);
  };

  return (
    <dialog
      ref={dialogRef}
      className={`reader${fullPage ? ' reader-full-page' : ''}`}
      aria-labelledby="reader-title"
      onKeyDown={(e) => {
        if ((e.target as HTMLElement).closest('select, input, textarea, a, button')) return;
        if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); move(1); }
        if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); move(-1); }
      }}
    >
      <div className="reader-viewport" ref={viewportRef}>
        <header className="reader-header">
          <div>
            <span className="tiny-label">{view.disp < 0 ? 'The book / Ramayana Codex' : `${ch.number} / ${ch.title}`}</span>
            <h2 id="reader-title">The Ramayana</h2>
          </div>
          <div className="reader-window-controls">
            <button className="reader-fullscreen" type="button" aria-pressed={fullPage} onClick={() => void toggleFullscreen()}>
              <span aria-hidden="true">⛶</span> <span>{fullPage ? 'Exit full screen' : 'Full screen'}</span>
            </button>
            <button className="icon-button" type="button" aria-label="Close book" onClick={() => void closeBook()}>✕</button>
          </div>
        </header>

        <div className="reader-toolbar">
          <label className="book-chapter-label">
            <span>Chapter</span>
            <select
              aria-label="Chapter"
              value={view.disp < 0 ? '-1' : String(view.chapter)}
              disabled={busy}
              onChange={(e) => changeChapter(Number(e.target.value))}
            >
              <option value="-1">Cover</option>
              {KANDA_GROUPS.map((g) => (
                <optgroup key={g.kanda} label={g.kanda}>
                  {g.indices.map((i) => (
                    <option key={i} value={i}>{CHAPTERS[i].number} · {CHAPTERS[i].title}</option>
                  ))}
                </optgroup>
              ))}
            </select>
          </label>
          <div className="reader-text-controls">
            <button type="button" aria-label="Smaller text" disabled={busy || size <= 15} onClick={() => setSize((s) => Math.max(15, s - 1))}>A−</button>
            <button type="button" aria-label="Larger text" disabled={busy || size >= 25} onClick={() => setSize((s) => Math.min(25, s + 1))}>A+</button>
          </div>
        </div>

        {error && (
          <div id="reader-state" role="alert">
            <div className="error-message">
              The book could not be opened. {error}
              <button type="button" className="retry-button" onClick={() => repaginate()}>Try again</button>
            </div>
          </div>
        )}

        <div className="book-stage">
          <div
            className="book"
            ref={bookRef}
            tabIndex={0}
            role="group"
            aria-label="Book. Use the arrow keys or swipe to turn pages."
            aria-busy={!ready}
            style={{ '--book-size': `${size}px` } as React.CSSProperties}
            onClick={onBookClick}
            onTouchStart={(e) => {
              touchRef.current = e.touches.length === 1 ? { x: e.touches[0].clientX, y: e.touches[0].clientY } : null;
            }}
            onTouchEnd={(e) => {
              const t = touchRef.current;
              touchRef.current = null;
              if (!t || !e.changedTouches.length) return;
              const dx = e.changedTouches[0].clientX - t.x;
              const dy = e.changedTouches[0].clientY - t.y;
              if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) move(dx < 0 ? 1 : -1);
            }}
            onTouchCancel={() => { touchRef.current = null; }}
          >
            <article className={`book-page${view.disp < 0 ? ' madhubani-cover' : ''}`}>
              {renderSurface(view)}
            </article>
            <div className="book-page book-measure" ref={measureRef} aria-hidden="true" />
            {leaf && (
              <div className="book-leaf" ref={leafRef} aria-hidden="true">
                <div className={`book-page${leaf.disp < 0 ? ' madhubani-cover' : ''}`}>
                  {renderSurface(leaf)}
                </div>
                <div className="book-leaf-back" />
              </div>
            )}
          </div>
        </div>

        <div className="book-reading-tools">
          <button className="text-link" type="button" disabled={busy || view.disp < 0} onClick={goToCover}>
            Back to cover
          </button>
        </div>

        <footer className="reader-footer">
          <button className="text-link" type="button" disabled={busy || view.disp < 0} onClick={() => move(-1)}>
            ← Previous page
          </button>
          <span id="reader-position" className="tiny-label" role="status" aria-live="polite">
            {view.disp < 0 ? 'Cover' : view.pages.length ? `Page ${view.disp + 1} of ${view.pages.length + 1}` : ''}
          </span>
          <button className="text-link" type="button" disabled={busy || atLast} onClick={() => move(1)}>
            {view.disp < 0 ? 'Open book →' : atLast ? 'End of book' : 'Next page →'}
          </button>
        </footer>
      </div>
    </dialog>
  );
};

export default BookReader;
