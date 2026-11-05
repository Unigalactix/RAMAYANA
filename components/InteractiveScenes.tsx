import React, { useEffect, useMemo, useRef, useState } from 'react';
import Sigil from './Sigil';
import SceneArt from './SceneArt';

/**
 * InteractiveScenes — "Divine Leelas": six playable moments from the epic.
 * Shiva Dhanush · Parashurama · Ayodhya battle · Aranya battle ·
 * Lanka Dahan · Sanjeevani search. Pure React state, no assets.
 */

type GameId = 'dhanush' | 'parashurama' | 'ayodhya-battle' | 'aranya-battle' | 'lanka-dahan' | 'sanjeevani';

const GAMES: { id: GameId; label: string; kanda: string }[] = [
  { id: 'dhanush', label: 'Breaking Shiva’s Dhanush', kanda: 'Bala' },
  { id: 'parashurama', label: 'Parashurama Encounter', kanda: 'Bala' },
  { id: 'ayodhya-battle', label: 'Battle for Indra', kanda: 'Ayodhya' },
  { id: 'aranya-battle', label: 'Fourteen Thousand', kanda: 'Aranya' },
  { id: 'lanka-dahan', label: 'Lanka Dahan', kanda: 'Sundara' },
  { id: 'sanjeevani', label: 'Sanjeevani Search', kanda: 'Yuddha' },
];

export const LEELA_IDS = GAMES.map(g => g.id);

/* ── 1 · Shiva Dhanush ─────────────────────────────────────── */
const Dhanush: React.FC = () => {
  const [tension, setTension] = useState(0);
  const [broken, setBroken] = useState(false);
  const draw = (v: number) => {
    setTension(v);
    if (v >= 96 && !broken) setBroken(true);
  };
  const bend = broken ? 0 : tension * 0.55;
  return (
    <div>
      <p className="font-serif text-lg text-[#ece2c8] mb-4">Kings from every land tried to lift the Pinaka and failed. Take hold of the string and draw — slowly. The bow of Shiva answers only to one hand.</p>
      <div className="leela-stage relative flex flex-col items-center">
        <svg viewBox="0 0 360 220" className="w-full max-w-md" role="img" aria-label={broken ? 'The bow of Shiva, broken in two' : 'The bow of Shiva being drawn'}>
          {!broken ? (
            <>
              <path d={`M60 200 C${44 - bend} ${70 + bend} ${44 - bend} ${80 + bend} 60 12`} stroke="#F5D061" strokeWidth="7" fill="none" strokeLinecap="round" />
              <path d={`M60 12 L${180 - tension * 0.9} 106 L60 200`} stroke="#e8ddba" strokeWidth="2" fill="none" />
              <path d={`M${180 - tension * 0.9} 106 L238 106`} stroke="#fff" strokeWidth="3" />
            </>
          ) : (
            <>
              <path d="M60 12 C44 60 46 104 62 142" stroke="#F5D061" strokeWidth="7" fill="none" strokeLinecap="round" transform="rotate(-16 60 140)" />
              <path d="M62 142 C70 176 84 196 104 208" stroke="#FF8C42" strokeWidth="7" fill="none" strokeLinecap="round" transform="rotate(20 70 150)" />
              <path d="M60 12 L168 92 M60 200 L150 128" stroke="#e8ddba" strokeWidth="2" strokeDasharray="4 5" />
              {[[120,50],[180,34],[240,58],[90,86],[270,90]].map(([x,y],i)=>(<circle key={i} cx={x} cy={y} r="4" fill={i%2?'#E879F9':'#F5D061'} />))}
            </>
          )}
        </svg>
        <div className="w-full max-w-md mt-2">
          <label htmlFor="tension" className="font-cinzel text-xs tracking-[.2em] uppercase text-goldlight">String tension · {broken ? 'SNAP!' : `${tension}%`}</label>
          <input id="tension" type="range" min={0} max={100} value={broken ? 100 : tension} disabled={broken}
            onChange={e => draw(Number(e.target.value))} className="w-full accent-amber-400 mt-2" />
          <div className="progress-track mt-3"><div className="progress-fill" style={{ width: `${broken ? 100 : tension}%` }} /></div>
        </div>
        {broken ? (
          <div className="text-center mt-5">
            <p className="font-display text-2xl text-gradient-gold">॥ धनुर्भङ्ग ॥ — It breaks like thunder.</p>
            <p className="font-serif italic text-[#d8cdb0] mt-2">The earth trembles, the gods shower flowers, and Janaka rises: “My Sita has found her lord.”</p>
            <button className="btn-ghost mt-4" onClick={() => { setBroken(false); setTension(0); }}>Draw it again</button>
          </div>
        ) : <p className="font-serif italic text-[#d8cdb0] mt-4">{tension < 40 ? 'The bow barely stirs — this is how the kings felt.' : tension < 80 ? 'It groans. Mithila holds its breath…' : 'Something ancient is about to give way…'}</p>}
      </div>
    </div>
  );
};

/* ── 2 · Parashurama ───────────────────────────────────────── */
const PARASH_STEPS = [
  { speaker: 'Parashurama', line: '“You broke the bow of my guru, Shiva, boy. String THIS bow — Vishnu’s own — if you dare call yourself a kshatriya.”', choices: ['Bow, take the bow calmly, and string it', 'Answer anger with anger'], good: 0, reply: 'The bow bends to Rama’s hand as if it remembers him. Parashurama’s fury falters.' },
  { speaker: 'Parashurama', line: '“The arrow is drawn and cannot be wasted. Speak — where shall it go?”', choices: ['“To the pride that blinded you — and the worlds it won”', '“At you, sage. Stand aside.”'], good: 0, reply: 'The arrow takes his earned worlds, not his life. His tejas — Vishnu’s own energy — passes into Rama.' },
  { speaker: 'Parashurama', line: '“...Now I see. You are He. My age is over, and it ends in peace.”', choices: ['Touch his feet in reverence', 'Claim his axe as a trophy'], good: 0, reply: 'Parashurama circumambulates Rama and departs for Mount Mahendra. One avatar yields the age to the next.' },
];
const Parashurama: React.FC = () => {
  const [step, setStep] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const done = step >= PARASH_STEPS.length;
  const choose = (i: number) => {
    if (picked !== null) return;
    setPicked(i);
    if (i === PARASH_STEPS[step].good) setScore(s => s + 1);
  };
  return (
    <div>
      <p className="font-serif text-lg text-[#ece2c8] mb-4">Storming down the road from Mithila comes Bhargava Rama, axe on shoulder. Choose as Rama chose — strength, held in perfect calm — to complete the encounter.</p>
      <div className="leela-stage">
        {!done ? (
          <>
            <div className="flex items-start gap-4">
              <div className="shrink-0 w-14 h-14 rounded-full flex items-center justify-center bg-[rgba(185,28,28,.15)] border border-[rgba(185,28,28,.5)]"><Sigil kind="axe" color="#f87171" size={34} /></div>
              <div>
                <div className="font-cinzel text-xs tracking-[.25em] uppercase text-red-300">{PARASH_STEPS[step].speaker} · Step {step + 1} of 3</div>
                <p className="font-serif text-xl text-[#ece2c8] mt-1">{PARASH_STEPS[step].line}</p>
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 mt-5" role="group" aria-label="Choose Rama's response">
              {PARASH_STEPS[step].choices.map((c, i) => (
                <button key={i} onClick={() => choose(i)} disabled={picked !== null}
                  className={`chip !normal-case !tracking-normal !text-sm text-left ${picked === i ? (i === PARASH_STEPS[step].good ? 'active' : '') : ''}`}
                  style={picked === i && i !== PARASH_STEPS[step].good ? { borderColor: '#f87171', color: '#fca5a5' } : undefined}>{c}</button>
              ))}
            </div>
            {picked !== null && (
              <div className="mt-5">
                <p className="font-serif italic text-[#d8cdb0]">{picked === PARASH_STEPS[step].good ? PARASH_STEPS[step].reply : 'The sage’s eyes narrow. Rama’s way was never this — try his true response.'}</p>
                {picked === PARASH_STEPS[step].good
                  ? <button className="btn-gold mt-4" onClick={() => { setStep(s => s + 1); setPicked(null); }}>{step === 2 ? 'Complete the encounter' : 'Continue'}</button>
                  : <button className="btn-ghost mt-4" onClick={() => setPicked(null)}>Choose again</button>}
              </div>
            )}
          </>
        ) : (
          <div className="text-center py-4">
            <Sigil kind="sun" color="#F5D061" size={56} className="mx-auto" />
            <p className="font-display text-2xl text-gradient-gold mt-3">The age passes, in peace</p>
            <p className="font-serif italic text-[#d8cdb0] mt-2">Dharma points: {score}/3. {score === 3 ? 'Every choice, exactly Rama’s.' : 'Rama’s path is strength without a single wasted word.'}</p>
            <button className="btn-ghost mt-4" onClick={() => { setStep(0); setScore(0); setPicked(null); }}>Meet him again</button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── 3+4 · Whack-style battle engine ───────────────────────── */
const WhackGame: React.FC<{ variant: 'ayodhya' | 'aranya' }> = ({ variant }) => {
  const isAranya = variant === 'aranya';
  const GOAL = isAranya ? 14 : 10;
  const TIME = isAranya ? 45 : 40;
  const [hits, setHits] = useState(0);
  const [time, setTime] = useState(TIME);
  const [pos, setPos] = useState({ x: 50, y: 45 });
  const [running, setRunning] = useState(false);
  const [over, setOver] = useState(false);
  const timer = useRef<number | null>(null);
  const move = () => setPos({ x: 8 + Math.random() * 80, y: 12 + Math.random() * 62 });
  const start = () => {
    setHits(0); setTime(TIME); setOver(false); setRunning(true); move();
    if (timer.current) window.clearInterval(timer.current);
    timer.current = window.setInterval(() => setTime(t => {
      if (t <= 1) { if (timer.current) window.clearInterval(timer.current); setRunning(false); setOver(true); return 0; }
      return t - 1;
    }), 1000);
  };
  useEffect(() => () => { if (timer.current) window.clearInterval(timer.current); }, []);
  const won = hits >= GOAL;
  useEffect(() => { if (won && running) { if (timer.current) window.clearInterval(timer.current); setRunning(false); setOver(true); } }, [won, running]);
  const hit = () => { if (!running) return; setHits(h => h + 1); move(); };
  return (
    <div>
      <p className="font-serif text-lg text-[#ece2c8] mb-4">{isAranya
        ? 'Khara and Dushana advance on Panchavati with fourteen thousand rakshasas. Every strike of Rama’s bow fells a thousand. Clear the host before the time runs out.'
        : 'Long before the exile: Dasharatha fights Shambara, the asura king, for Indra — and Kaikeyi drives his chariot. When the axle breaks she holds the wheel herself. Block every incoming strike to keep the chariot standing.'}</p>
      <div className="leela-stage">
        <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
          <span className="font-cinzel text-xs tracking-[.2em] uppercase text-goldlight">{isAranya ? `Felled: ${hits * 1000} / 14,000` : `Strikes blocked: ${hits} / ${GOAL}`}</span>
          <span className="font-cinzel text-xs tracking-[.2em] uppercase text-goldlight" aria-live="polite">Time: {time}s</span>
          {!running && <button className="btn-gold" onClick={start}>{over ? 'Fight again' : isAranya ? 'Take up the bow' : 'To battle'}</button>}
        </div>
        <div className="progress-track mb-4"><div className="progress-fill" style={{ width: `${Math.min(100, (hits / GOAL) * 100)}%` }} /></div>
        <div className="relative h-64 rounded-xl overflow-hidden border border-white/10" style={{ background: isAranya ? 'linear-gradient(180deg,#062e22,#0a1f14)' : 'linear-gradient(180deg,#3b1030,#170806)' }}>
          <SceneArt kind={isAranya ? 'forest' : 'chariot'} accent={isAranya ? '#10B981' : '#F5D061'} title="" />
          {running && (
            <button className="leela-target" onClick={hit} aria-label={isAranya ? 'Strike a rakshasa' : 'Block the incoming strike'}
              style={{ left: `${pos.x}%`, top: `${pos.y}%`, background: isAranya ? 'rgba(185,28,28,.85)' : 'rgba(255,140,66,.9)' }}>
              <Sigil kind={isAranya ? 'sword' : 'shield'} color="#fff" size={30} />
            </button>
          )}
          {!running && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-center px-6">
              <p className="font-serif text-lg text-[#ece2c8]">{over
                ? (won ? (isAranya ? '॥ खर-दूषण-वध ॥ The field is silent. Sita brings water; the sages bless the hut of Panchavati.' : 'The chariot stands. Dasharatha, grateful and half in awe, grants Kaikeyi two boons — remember them. They will move the world.')
                        : 'The host presses in… Rama does not tire. Try once more.')
                : (isAranya ? 'The forest holds its breath.' : 'Indra’s war waits on one chariot.')}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── 5 · Lanka Dahan ───────────────────────────────────────── */
const ROOFS = ['Ravana’s Palace', 'Golden Mandapa', 'Indrajit’s Tower', 'The Treasury', 'Kumbhakarna’s Hall', 'The Armoury', 'Sea Gate', 'Ashoka Road'];
const LankaDahan: React.FC = () => {
  const [lit, setLit] = useState<number[]>([]);
  const [dipped, setDipped] = useState(false);
  const allLit = lit.length === ROOFS.length;
  return (
    <div>
      <p className="font-serif text-lg text-[#ece2c8] mb-4">They tied cloth and oil to Hanuman’s tail and lit it as a joke. It was not a joke. Leap from roof to roof and turn golden Lanka into a warning — then quench the tail in the ocean.</p>
      <div className="leela-stage">
        <div className="progress-track mb-2"><div className="progress-fill" style={{ width: `${(lit.length / ROOFS.length) * 100}%` }} /></div>
        <p className="font-cinzel text-xs tracking-[.2em] uppercase text-goldlight mb-4" aria-live="polite">{allLit ? 'Lanka burns from shore to shore' : `Ablaze: ${lit.length} / ${ROOFS.length} rooftops`}</p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ROOFS.map((r, i) => {
            const on = lit.includes(i);
            return (
              <button key={r} disabled={on} onClick={() => setLit(l => [...l, i])} aria-pressed={on}
                className="rounded-xl border p-4 text-center transition-all"
                style={{ borderColor: on ? '#FF8C42' : 'rgba(212,175,55,.3)', background: on ? 'linear-gradient(180deg,rgba(255,140,66,.35),rgba(124,45,18,.5))' : 'rgba(20,14,30,.6)' }}>
                <Sigil kind={on ? 'flame' : 'city'} color={on ? '#FFB37C' : '#D4AF37'} size={36} className="mx-auto" />
                <span className="block mt-2 font-cinzel text-[11px] tracking-[.15em] uppercase text-[#e8ddba]">{r}</span>
                <span className="block font-serif italic text-sm text-[#d8cdb0]">{on ? 'Ablaze' : 'Tap to leap here'}</span>
              </button>
            );
          })}
        </div>
        {allLit && !dipped && <div className="text-center mt-5"><button className="btn-gold" onClick={() => setDipped(true)}>Dive into the ocean and quench the tail</button></div>}
        {dipped && (
          <div className="text-center mt-5">
            <p className="font-display text-2xl text-gradient-gold">॥ लङ्का-दहन ॥</p>
            <p className="font-serif italic text-[#d8cdb0] mt-2">One grove alone stands untouched — the Ashoka Vatika, where Sita waits. Hanuman takes her leave once more, and flies home with firelight behind him.</p>
            <button className="btn-ghost mt-4" onClick={() => { setLit([]); setDipped(false); }}>Burn it again</button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── 6 · Sanjeevani Search ─────────────────────────────── */
const GRID = 25;
const Sanjeevani: React.FC = () => {
  const target = useMemo(() => Math.floor(Math.random() * GRID), []);
  const [picked, setPicked] = useState<number[]>([]);
  const [found, setFound] = useState(false);
  const [lifted, setLifted] = useState(false);
  const [round, setRound] = useState(0);
  const dist = (i: number) => Math.abs((i % 5) - (target % 5)) + Math.abs(Math.floor(i / 5) - Math.floor(target / 5));
  const last = picked[picked.length - 1];
  const hint = found ? '' : last === undefined ? 'Night on the Dronagiri peak. Somewhere here, one herb glows with its own light.' :
    dist(last) <= 1 ? 'A golden glow spills between the rocks — you are almost touching it!' : dist(last) <= 2 ? 'The air smells of nectar. Very close.' : dist(last) <= 4 ? 'A faint shimmer, far off. Keep searching.' : 'Cold stone and ordinary grass.';
  const pick = (i: number) => { if (found || picked.includes(i)) return; setPicked(p => [...p, i]); if (i === target) setFound(true); };
  return (
    <div key={round}>
      <p className="font-serif text-lg text-[#ece2c8] mb-4">Lakshmana lies between life and death, and dawn is the deadline. Sushena named four herbs on this peak — the Sanjeevani glows. Search the rocks before the sky pales; use each clue.</p>
      <div className="leela-stage">
        <p className="font-serif italic text-[#d8cdb0] mb-4" aria-live="polite">{hint} {found ? '' : `· Herbs checked: ${picked.length}`}</p>
        <div className="grid grid-cols-5 gap-2 max-w-md mx-auto" role="grid" aria-label="Search grid of the mountain peak">
          {Array.from({ length: GRID }).map((_, i) => {
            const isT = i === target && found;
            const was = picked.includes(i) && !isT;
            return (
              <button key={i} onClick={() => pick(i)} disabled={was || found} aria-label={isT ? 'The Sanjeevani, found' : `Search rock ${i + 1}`}
                className="aspect-square rounded-lg border flex items-center justify-center transition-all"
                style={{ borderColor: isT ? '#a7f3d0' : 'rgba(212,175,55,.25)', background: isT ? 'rgba(16,185,129,.4)' : was ? 'rgba(255,255,255,.05)' : 'rgba(11,30,20,.8)', boxShadow: isT ? '0 0 22px rgba(167,243,208,.7)' : 'none' }}>
                <Sigil kind="herb" color={isT ? '#a7f3d0' : was ? '#5b5340' : '#34d399'} size={26} />
              </button>
            );
          })}
        </div>
        {found && !lifted && (
          <div className="text-center mt-5">
            <p className="font-serif text-[#ece2c8]">Four herbs glow alike and there is no time to choose. You know what Hanuman did.</p>
            <button className="btn-gold mt-3" onClick={() => setLifted(true)}>Lift the whole mountain</button>
          </div>
        )}
        {lifted && (
          <div className="text-center mt-5">
            <Sigil kind="mountain" color="#F5D061" size={56} className="mx-auto" />
            <p className="font-display text-2xl text-gradient-gold mt-2">The mountain flies south</p>
            <p className="font-serif italic text-[#d8cdb0] mt-2">Found in {picked.length} searches. The herb’s fragrance alone revives the army as it passes overhead — and Lakshmana opens his eyes before dawn.</p>
            <button className="btn-ghost mt-4" onClick={() => { setRound(r => r + 1); }}>Search a new peak</button>
          </div>
        )}
      </div>
    </div>
  );
};

/* ── Shell ─────────────────────────────────────────────────── */
const InteractiveScenes: React.FC<{ focusId?: string }> = ({ focusId }) => {
  const [active, setActive] = useState<GameId>('dhanush');
  useEffect(() => { if (focusId && LEELA_IDS.includes(focusId)) setActive(focusId as GameId); }, [focusId]);
  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2 mb-8" role="tablist" aria-label="Choose an interactive leela">
        {GAMES.map(g => (
          <button key={g.id} role="tab" aria-selected={active === g.id} onClick={() => setActive(g.id)} className={`chip ${active === g.id ? 'active' : ''}`}>
            {g.label} <span className="opacity-70 normal-case tracking-normal">· {g.kanda}</span>
          </button>
        ))}
      </div>
      <div className="max-w-4xl mx-auto">
        {active === 'dhanush' && <Dhanush />}
        {active === 'parashurama' && <Parashurama />}
        {active === 'ayodhya-battle' && <WhackGame variant="ayodhya" />}
        {active === 'aranya-battle' && <WhackGame variant="aranya" />}
        {active === 'lanka-dahan' && <LankaDahan />}
        {active === 'sanjeevani' && <Sanjeevani />}
      </div>
    </div>
  );
};

export default InteractiveScenes;
