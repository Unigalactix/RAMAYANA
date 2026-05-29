import React from 'react';

// Phala-śruti — the traditional "fruit of hearing" verse from the close of the Rāmāyaṇa.
const ClosingShloka: React.FC = () => (
  <section className="max-w-4xl mx-auto px-6 py-20 md:py-28 relative z-10 text-center">
    <div className="glass rounded-2xl px-6 md:px-12 py-10 md:py-14 relative overflow-hidden">
      <div className="absolute inset-x-0 -top-32 h-48" style={{ background: 'radial-gradient(circle at 50% 0%, rgba(255,140,66,0.22), transparent 70%)' }} aria-hidden="true" />
      <div className="font-cinzel text-[10px] tracking-[.4em] uppercase text-goldlight/80">
        Phala-Śruti · फलश्रुति
      </div>
      <p className="mt-5 font-sanskrit text-xl md:text-2xl text-goldlight leading-relaxed">
        य इदं श‍ृणुयान्नित्यं काव्यं वाल्मीकिना कृतम्।<br />
        सर्वपापविनिर्मुक्तो विष्णुलोकं स गच्छति॥
      </p>
      <p className="mt-4 font-serif italic text-[#d8cdb0]">
        “Whoever listens daily to this poem composed by Vālmīki is freed of every sin and attains the realm of Viṣṇu.”
      </p>
      <div className="hr-ornate my-6"><span>✦ ❀ ✦</span></div>
      <p className="font-sanskrit text-2xl md:text-3xl text-saffron tracking-widest">
        ॥ श्री राम जय राम जय जय राम ॥
      </p>
      <p className="mt-3 font-serif italic text-[#c9bd9b] max-w-xl mx-auto">
        Tradition holds that the chanting of this name — three repetitions — is itself the Tāraka-mantra, the boat that ferries the soul across the ocean of saṁsāra.
      </p>
    </div>
  </section>
);

export default ClosingShloka;
