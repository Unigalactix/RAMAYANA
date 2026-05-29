import React, { useEffect, useMemo, useState } from 'react';

type Term = {
  sanskrit: string;
  translit: string;
  meaning: string;
  context?: string;
};

// Curated Sanskrit terms that recur through the Ramayana
const TERMS: Term[] = [
  { sanskrit: 'धर्म', translit: 'Dharma', meaning: 'Sacred duty; the cosmic law that upholds every being in its rightful course.', context: 'Rama is dharma embodied — “रामो विग्रहवान् धर्मः”.' },
  { sanskrit: 'मर्यादा', translit: 'Maryāda', meaning: 'The shore-line of right conduct; the boundary a noble soul will not cross.', context: 'Rama is called Maryāda Puruṣottama — the supreme one who never violates the line.' },
  { sanskrit: 'सत्य', translit: 'Satya', meaning: 'Truth — that which is, was, and ever shall be.', context: 'Daśaratha dies because he placed Satya above his own son.' },
  { sanskrit: 'भक्ति', translit: 'Bhakti', meaning: 'Loving devotion; the most direct path to the Divine.', context: 'Hanumān is the perfect bhakta — strength awakens only when invoked in service.' },
  { sanskrit: 'अवतार', translit: 'Avatāra', meaning: 'A descent of the Divine into form to restore dharma.', context: 'Rama is the seventh avatāra of Viṣṇu.' },
  { sanskrit: 'काण्ड', translit: 'Kāṇḍa', meaning: 'A great book or section of an epic — literally “a section of a sugar-cane stalk”.', context: 'Vālmīki’s Rāmāyaṇa is divided into seven Kāṇḍas.' },
  { sanskrit: 'राक्षस', translit: 'Rākṣasa', meaning: 'A class of powerful beings of the night; not innately evil but driven by appetite.', context: 'Rāvaṇa, Kumbhakarṇa, Vibhīṣaṇa — all rākṣasas, all different paths.' },
  { sanskrit: 'वानर', translit: 'Vānara', meaning: 'The forest-people of Kishkindha; Hanumān, Sugrīva, Aṅgada, Jāmbavān.', context: 'Brahmā fathered the vānara host expressly to aid the avatāra.' },
  { sanskrit: 'अस्त्र', translit: 'Astra', meaning: 'A weapon empowered by mantra — divine missile.', context: 'Brahmāstra, Pāśupatāstra, Nārāyaṇāstra all appear in the Yuddha Kāṇḍa.' },
  { sanskrit: 'तपस्', translit: 'Tapas', meaning: 'Inner heat born of disciplined austerity; the currency of every boon.', context: 'Rāvaṇa’s ten thousand years of tapas earn him his Brahmā-boon.' },
  { sanskrit: 'वनवास', translit: 'Vanavāsa', meaning: 'Dwelling in the forest as a vow of renunciation.', context: 'Rama’s 14-year vanavāsa is the spine of the epic.' },
  { sanskrit: 'पतिव्रता', translit: 'Pativratā', meaning: 'A woman of unbroken vow to her husband; her tejas burns through fire.', context: 'Sītā walks unburnt through Agni — pratyakṣa proof of pātivratya.' },
  { sanskrit: 'ब्रह्मचर्य', translit: 'Brahmacarya', meaning: 'Disciplined celibacy; conservation of life-force.', context: 'Lakṣmaṇa is the supreme brahmacāri of the epic.' },
  { sanskrit: 'प्रतिज्ञा', translit: 'Pratijñā', meaning: 'A formal vow; once uttered, binding even unto death.', context: 'Daśaratha’s old pratijñā to Kaikeyī sets the whole epic in motion.' },
  { sanskrit: 'पुष्पक', translit: 'Puṣpaka', meaning: 'The flower-chariot, a flying vimāna that obeys its master’s will.', context: 'Rāvaṇa abducts Sītā in it; Rama returns to Ayodhyā in it.' },
  { sanskrit: 'सेतु', translit: 'Setu', meaning: 'A bridge; in the epic, the causeway built across the ocean to Lanka.', context: 'Rāma-Setu — Nala’s wonder-bridge, stones that floated when his name was written on them.' },
  { sanskrit: 'अग्निपरीक्षा', translit: 'Agni-parīkṣā', meaning: 'Trial by fire; here, vindication rather than punishment.', context: 'Sītā steps into fire so the world may not doubt her.' },
  { sanskrit: 'राम-राज्य', translit: 'Rāma-rājya', meaning: 'The reign of Rama; the eternal symbol of a just kingdom.', context: 'Where the earth bears in season and no living being weeps.' },
  { sanskrit: 'इक्ष्वाकु', translit: 'Ikṣvāku', meaning: 'The first king of the Sūrya-vaṁśa; ancestor of Rama.', context: 'The dynasty from which the avatāra descended.' },
  { sanskrit: 'सूर्यवंश', translit: 'Sūrya-vaṁśa', meaning: 'The Solar Dynasty; the line traced from Vivasvān to Rama and onward to Lava-Kuśa.', context: 'Counterpart to the Candra-vaṁśa of the Mahābhārata.' },
  { sanskrit: 'चिरंजीवी', translit: 'Cirañjīvī', meaning: 'A being who lives across yugas; immortal until the dissolution.', context: 'Hanumān is one of the seven cirañjīvīs.' },
  { sanskrit: 'फलश्रुति', translit: 'Phala-śruti', meaning: 'The “fruit of hearing” — the blessings promised at the end of a sacred text.', context: 'Vālmīki closes the Rāmāyaṇa with a phala-śruti for its reciter.' },
];

const GlossaryDrawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');

  useEffect(() => {
    (window as any).__openGlossary = () => setOpen(true);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
      if ((e.key === 'g' || e.key === 'G') && (e.metaKey || e.ctrlKey) && e.shiftKey) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  const filtered = useMemo(() => {
    const needle = q.trim().toLowerCase();
    if (!needle) return TERMS;
    return TERMS.filter((t) =>
      [t.sanskrit, t.translit, t.meaning, t.context].filter(Boolean).some((s) => (s as string).toLowerCase().includes(needle))
    );
  }, [q]);

  return (
    <>
      {open && <div className="drawer-backdrop" onClick={() => setOpen(false)} aria-hidden="true" />}
      <aside
        className={`drawer ${open ? 'is-open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Sanskrit glossary"
        aria-hidden={!open}
      >
        <div className="drawer-head">
          <div>
            <div className="font-cinzel text-[10px] tracking-[.4em] uppercase text-goldlight/80">शब्द-कोश</div>
            <h3 className="font-display text-2xl text-gradient-gold mt-1">Sanskrit Glossary</h3>
          </div>
          <button onClick={() => setOpen(false)} aria-label="Close glossary" className="drawer-close">✕</button>
        </div>

        <div className="drawer-search">
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search Sanskrit, transliteration, or meaning…"
            aria-label="Search glossary"
          />
        </div>

        <div className="drawer-body no-scrollbar">
          {filtered.length === 0 && (
            <p className="font-serif italic text-[#c9bd9b] mt-6">No terms match — try “dharma”, “astra”, or “setu”.</p>
          )}
          {filtered.map((t) => (
            <article key={t.translit} className="drawer-term">
              <header className="flex items-baseline gap-3">
                <span className="font-sanskrit text-2xl text-goldlight">{t.sanskrit}</span>
                <span className="font-cinzel text-xs tracking-[.2em] uppercase text-[#c9bd9b]">{t.translit}</span>
              </header>
              <p className="font-serif text-[#ece2c8] mt-2 leading-relaxed">{t.meaning}</p>
              {t.context && <p className="font-serif italic text-[#c9bd9b] text-sm mt-1">↳ {t.context}</p>}
            </article>
          ))}
        </div>

        <div className="drawer-foot font-cinzel text-[10px] tracking-[.3em] uppercase text-[#a99875]">
          {filtered.length} term{filtered.length === 1 ? '' : 's'} · ⌘⇧G
        </div>
      </aside>
    </>
  );
};

export default GlossaryDrawer;
