import React from 'react';

const Hero: React.FC = () => {
  return (
    <header className="relative min-h-[92vh] flex items-center justify-center overflow-hidden">
      <div className="hero-orbit" aria-hidden="true" />
      <div className="divine-rays" aria-hidden="true" />
      <svg className="chakra" viewBox="0 0 200 200" aria-hidden="true">
        <defs>
          <radialGradient id="cg" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#f5d061" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="95" fill="none" stroke="#d4af37" strokeWidth="0.6" />
        <circle cx="100" cy="100" r="70" fill="none" stroke="#d4af37" strokeWidth="0.5" />
        <circle cx="100" cy="100" r="30" fill="url(#cg)" />
        {Array.from({ length: 24 }).map((_, i) => (
          <line
            key={i}
            x1="100" y1="100"
            x2={100 + 95 * Math.cos((i / 24) * Math.PI * 2)}
            y2={100 + 95 * Math.sin((i / 24) * Math.PI * 2)}
            stroke="#d4af37" strokeWidth="0.4" opacity="0.5"
          />
        ))}
      </svg>

      <div className="relative z-10 text-center px-6 max-w-5xl">
        <div className="font-sanskrit text-xl md:text-2xl text-goldlight mb-6 tracking-widest" aria-label="Om Sri Ramaya Namah">
          ॐ श्री रामाय नमः
        </div>

        <h1 className="hero-title">
          <span className="text-gradient-gold">RAMAYANA</span>
          <span className="block font-cinzel text-xl md:text-3xl font-normal tracking-[0.5em] mt-4 text-[#e6d9b2]">CODEX</span>
        </h1>

        <p className="mt-8 max-w-2xl mx-auto font-serif text-lg md:text-xl text-[#ece2c8] leading-relaxed">
          A premium tribute to Valmiki’s eternal epic — collect holographic <em>character cards</em>,
          walk the <em>seven Kandas</em>, and trace the heroes and villains who shaped the age of Treta.
        </p>

        <div className="hr-ornate mt-8 mb-8">
          <span>✦ ❀ ✦</span>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <a href="#characters" className="btn-gold">Open the Pantheon</a>
          <a href="#kandas" className="btn-ghost">Walk the Seven Kandas</a>
          <a href="#leelas" className="btn-ghost">Play the Divine Leelas</a>
        </div>

        <p className="mt-12 font-serif italic text-[#c9bd9b] max-w-xl mx-auto">
          “Rama is Dharma personified — and Dharma is the breath of the world.”
        </p>
      </div>

      <svg viewBox="0 0 1440 120" className="absolute bottom-0 left-0 w-full pointer-events-none" aria-hidden="true" preserveAspectRatio="none" style={{ height: 90, opacity: .95 }}>
        <path d="M0 120 V84 L120 84 L120 62 L240 62 L240 84 L360 84 L360 44 L470 44 L470 84 L590 84 L590 58 L720 20 L850 58 L850 84 L970 84 L970 44 L1080 44 L1080 84 L1200 84 L1200 62 L1320 62 L1320 84 L1440 84 V120 Z" fill="#150b26" stroke="rgba(245,208,97,.8)" strokeWidth="2" />
        {[420,720,1020].map(x => (<circle key={x} cx={x} cy={88} r="4" fill="#F5D061" opacity="0.9" />))}
      </svg>
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 text-goldlight text-xs tracking-[0.3em] uppercase animate-pulse z-10" aria-hidden="true">
        <span className="diya" />&nbsp; Scroll &nbsp;<span className="diya" />
      </div>
    </header>
  );
};

export default Hero;
