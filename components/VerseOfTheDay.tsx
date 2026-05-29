import React, { useMemo } from 'react';

type Verse = {
  sanskrit: string;
  iast: string;
  meaning: string;
  source: string;
};

// Each verse is sourced from the Vālmīki Rāmāyaṇa or its near-canonical companions.
const VERSES: Verse[] = [
  {
    sanskrit: 'मा निषाद प्रतिष्ठां त्वमगमः शाश्वतीः समाः।\nयत्क्रौञ्चमिथुनादेकमवधीः काममोहितम्॥',
    iast: 'mā niṣāda pratiṣṭhāṁ tvam agamaḥ śāśvatīḥ samāḥ,\nyat krauñca-mithunād ekam avadhīḥ kāma-mohitam.',
    meaning: 'O hunter, may you never find rest through endless years — for you have slain one of a pair of krauñca birds, even as it was lost in love.',
    source: 'Vālmīki Rāmāyaṇa · Bāla Kāṇḍa 2.15 — the first śloka of poetry itself, born of compassion.',
  },
  {
    sanskrit: 'रामो विग्रहवान् धर्मः साधुः सत्यपराक्रमः।\nराजा सर्वस्य लोकस्य देवानामिव वासवः॥',
    iast: 'rāmo vigrahavān dharmaḥ sādhuḥ satya-parākramaḥ,\nrājā sarvasya lokasya devānām iva vāsavaḥ.',
    meaning: 'Rama is dharma embodied — gentle, true in valor, sovereign of the worlds as Indra is sovereign of the gods.',
    source: 'Vālmīki Rāmāyaṇa · Araṇya Kāṇḍa 37.13 (Mārīca speaks).',
  },
  {
    sanskrit: 'यत्र यत्र रघुनाथकीर्तनं तत्र तत्र कृतमस्तकाञ्जलिम्।\nबाष्पवारिपरिपूर्णलोचनं मारुतिं नमत राक्षसान्तकम्॥',
    iast: 'yatra yatra raghunātha-kīrtanaṁ tatra tatra kṛta-mastakāñjalim,\nbāṣpa-vāri-paripūrṇa-locanaṁ mārutiṁ namata rākṣasāntakam.',
    meaning: 'Wherever Raghunātha is sung, there stands Hanumān — palms folded above his head, eyes brimming with tears. Bow to that slayer of demons.',
    source: 'Traditional Hanumān stuti, recited at the close of every Sundara-pāṭha.',
  },
  {
    sanskrit: 'जननी जन्मभूमिश्च स्वर्गादपि गरीयसी।',
    iast: 'jananī janma-bhūmiś ca svargād api garīyasī.',
    meaning: 'A mother and the land of one’s birth are greater than heaven itself.',
    source: 'Vālmīki Rāmāyaṇa · Yuddha Kāṇḍa 124 — Rama refusing to remain in golden Lanka.',
  },
  {
    sanskrit: 'सर्वथा सुकरं मित्रं दुष्करं प्रतिपालनम्।\nअनित्यत्वाच्च चित्तानां प्रीतिरल्पेऽपि भिद्यते॥',
    iast: 'sarvathā sukaraṁ mitraṁ duṣkaraṁ pratipālanam,\nanityatvāc ca cittānāṁ prītir alpe’pi bhidyate.',
    meaning: 'To make a friend is easy in every way; to keep one is hard. The mind is restless, and affection breaks upon the smallest stone.',
    source: 'Vālmīki Rāmāyaṇa · Kiṣkindhā Kāṇḍa 24 — Rama on the wound of broken friendship.',
  },
  {
    sanskrit: 'अहं वेद्मि महात्मानं रामं सत्यपराक्रमम्।\nवसिष्ठोऽपि च भगवान्ये चेमे तपसि स्थिताः॥',
    iast: 'ahaṁ vedmi mahātmānaṁ rāmaṁ satya-parākramam,\nvasiṣṭho’pi ca bhagavān ye ceme tapasi sthitāḥ.',
    meaning: 'I know the great-souled Rama, true of valor; so does the divine Vasiṣṭha, and these sages firm in tapas.',
    source: 'Vālmīki Rāmāyaṇa · Bāla Kāṇḍa 1 — Viśvāmitra’s testimony before the king.',
  },
  {
    sanskrit: 'न मां रामसमो लोके कश्चिदस्ति धनुर्धरः।',
    iast: 'na māṁ rāma-samo loke kaścid asti dhanur-dharaḥ.',
    meaning: 'There is none in the world to equal Rama with the bow.',
    source: 'Spoken of Rama by his own teachers — Vālmīki Rāmāyaṇa · Bāla Kāṇḍa.',
  },
];

// Stable verse-of-the-day based on local calendar date
const todaysVerse = (): Verse => {
  const d = new Date();
  const dayOfYear = Math.floor(
    (d.getTime() - new Date(d.getFullYear(), 0, 0).getTime()) / 86400000
  );
  return VERSES[dayOfYear % VERSES.length];
};

const VerseOfTheDay: React.FC = () => {
  const v = useMemo(todaysVerse, []);
  return (
    <section className="max-w-5xl mx-auto px-6 mt-10 md:mt-14 relative z-10">
      <div className="glass rounded-2xl px-6 md:px-12 py-8 md:py-10 relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full" style={{ background: 'radial-gradient(circle, rgba(245,208,97,0.18), transparent 60%)' }} aria-hidden="true" />
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="font-cinzel text-[10px] tracking-[.4em] uppercase text-goldlight/80">
            Verse of the Day · दिनस्य श्लोकः
          </div>
          <span className="pill">Vālmīki · Adi Kavi</span>
        </div>
        <p className="mt-5 font-sanskrit text-xl md:text-2xl text-goldlight leading-relaxed whitespace-pre-line">
          {v.sanskrit}
        </p>
        <p className="mt-3 font-serif italic text-[#d8cdb0] whitespace-pre-line">
          {v.iast}
        </p>
        <div className="hr-ornate my-5"><span>✦</span></div>
        <p className="font-serif text-lg text-[#ece2c8] leading-relaxed">
          “{v.meaning}”
        </p>
        <p className="mt-3 text-xs tracking-[.2em] uppercase text-[#a99875] font-cinzel">
          {v.source}
        </p>
      </div>
    </section>
  );
};

export default VerseOfTheDay;
