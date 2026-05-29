import React from 'react';

type Temple = {
  name: string;
  sanskrit?: string;
  location: string;
  state: string;
  glyph: string;
  accent: string;
  significance: string;
  legend: string;
};

const temples: Temple[] = [
  {
    name: 'Ram Mandir, Ayodhya',
    sanskrit: 'राम जन्मभूमि',
    location: 'Ayodhya',
    state: 'Uttar Pradesh',
    glyph: '🛕',
    accent: '#F5D061',
    significance: 'Ram Janmabhoomi — the sanctified birthplace of Bhagavan Sri Rama on the banks of the Sarayu.',
    legend: 'The very soil on which Maryada Purushottam was born to King Dasharatha and Queen Kaushalya. The new mandir was consecrated (Pran Pratishtha) in January 2024.',
  },
  {
    name: 'Bhadrachalam',
    sanskrit: 'श्री सीताराम चन्द्र स्वामी देवस्थानम्',
    location: 'Bhadrachalam',
    state: 'Telangana',
    glyph: '🏞️',
    accent: '#10B981',
    significance: 'The “Ayodhya of the South,” where Rama, Sita, and Lakshmana are believed to have rested during their forest exile.',
    legend: 'Built in the 17th century by the devotee Kancherla Gopanna (Bhakta Ramadasu), who composed hundreds of kirtanas while imprisoned for using royal revenue to raise the shrine.',
  },
  {
    name: 'Ontimitta Kodandarama',
    sanskrit: 'कोदण्डराम स्वामी',
    location: 'Ontimitta',
    state: 'Andhra Pradesh',
    glyph: '🏹',
    accent: '#3B82F6',
    significance: 'A single granite block carved into a triad of Rama with his Kodanda bow, Sita, and Lakshmana — without Hanuman, an extraordinary rarity.',
    legend: 'Sung in the verses of Bammera Pothana and the poet Vavilakolanu Subba Rao, called the “Andhra Valmiki.” The annual Sita Rama Kalyanam draws lakhs of pilgrims.',
  },
  {
    name: 'Ramaswamy Temple, Kumbakonam',
    sanskrit: 'श्री रामस्वामी',
    location: 'Kumbakonam',
    state: 'Tamil Nadu',
    glyph: '🪔',
    accent: '#FF8C42',
    significance: 'Houses an exquisite idol of Rama enthroned with Sita, with all four brothers — Bharata and Shatrughna fanning chamaras, Lakshmana holding the umbrella.',
    legend: 'Built by Raghunatha Nayak in the 16th century. Its mandapa walls bear 219 painted panels depicting the entire Ramayana — a stone-and-pigment epic in itself.',
  },
  {
    name: 'Triprayar Sri Rama',
    sanskrit: 'श्री राम',
    location: 'Triprayar',
    state: 'Kerala',
    glyph: '🌺',
    accent: '#E879F9',
    significance: 'A revered Kerala kshetram where Rama is worshipped in the chathur-bahu (four-armed) form — bearing conch, discus, bow, and garland.',
    legend: 'The idol, said to have been worshipped by Sri Krishna himself, was rescued from the sea by fishermen and installed by Vakkayil Kaimal. Part of the “Nalambalam” yatra.',
  },
  {
    name: 'Kalaram Mandir, Nashik',
    sanskrit: 'कालाराम मन्दिर',
    location: 'Panchavati, Nashik',
    state: 'Maharashtra',
    glyph: '🌲',
    accent: '#B91C1C',
    significance: 'Stands on the very site of Panchavati where Rama, Sita, and Lakshmana lived during exile — and from where Sita was abducted by Ravana.',
    legend: 'Built in 1792 by Sardar Rangarao Odhekar. The mandir takes its name (“Black Rama”) from the striking black-stone vigraha of the Lord.',
  },
  {
    name: 'Ramanathaswamy, Rameswaram',
    sanskrit: 'श्री रामनाथस्वामी',
    location: 'Rameswaram',
    state: 'Tamil Nadu',
    glyph: '🕉️',
    accent: '#F5D061',
    significance: 'One of the twelve Jyotirlingas and a Char Dham. Rama consecrated this Shivalinga before crossing the ocean to Lanka.',
    legend: 'Hanuman was sent to Kailash for a lingam; while he was away, Sita fashioned one from sand so the auspicious hour would not pass. Both are worshipped here.',
  },
  {
    name: 'Hampi Hazara Rama',
    sanskrit: 'हज़ार राम',
    location: 'Hampi',
    state: 'Karnataka',
    glyph: '⛩️',
    accent: '#10B981',
    significance: 'The royal chapel of the Vijayanagara emperors — its walls a continuous stone-relief retelling of the entire Ramayana, panel by panel.',
    legend: 'Built by Devaraya II in the 15th century. “Hazara” means a thousand — for the thousand carvings of Rama’s life that wrap the sanctum walls.',
  },
  {
    name: 'Chitrakoot Kamadgiri',
    sanskrit: 'कामदगिरि',
    location: 'Chitrakoot',
    state: 'Madhya Pradesh / Uttar Pradesh',
    glyph: '⛰️',
    accent: '#10B981',
    significance: 'The forested hill where Rama, Sita, and Lakshmana lived for eleven and a half years of exile. Every footpath, ghat, and grove is held sacred.',
    legend: 'Pilgrims circumambulate the 5 km parikrama path of Kamadgiri barefoot, with the faith that the Lord still walks these woods.',
  },
  {
    name: 'Sita Ramachandraswamy, Vontimitta',
    sanskrit: 'सीताराम',
    location: 'Sri Rangam',
    state: 'Tamil Nadu',
    glyph: '🛕',
    accent: '#FF8C42',
    significance: 'A precious shrine within the great Ranganathaswamy complex — said to have been gifted by Vibhishana to Rama’s ancestor Ikshvaku.',
    legend: 'The Ranga Vimanam is believed to be the form of Vishnu first worshipped by Brahma, then by Ikshvaku, then by Rama himself at Ayodhya — and finally given to Vibhishana of Lanka.',
  },
  {
    name: 'Raghunath Mandir, Jammu',
    sanskrit: 'रघुनाथ मन्दिर',
    location: 'Jammu',
    state: 'Jammu & Kashmir',
    glyph: '👑',
    accent: '#E879F9',
    significance: 'One of the largest temple complexes in north India — seven historical shrines clustered around the principal mandir of Raghunathji.',
    legend: 'Begun by Maharaja Gulab Singh in 1835 and completed by his son Maharaja Ranbir Singh. Its inner walls are gilded in gold sheets and inlaid with countless saligrama stones.',
  },
  {
    name: 'Sri Ram Tirath, Amritsar',
    sanskrit: 'राम तीरथ',
    location: 'Amritsar',
    state: 'Punjab',
    glyph: '🌊',
    accent: '#3B82F6',
    significance: 'The hermitage of Maharishi Valmiki, where Sita is believed to have given birth to Lava and Kusha — and where the Ramayana was first composed.',
    legend: 'Lava and Kusha tied Rama’s Ashwamedha horse to a tree here and defeated his army. An annual fair on Kartik Purnima draws devotees in vast numbers.',
  },
];

const TempleCard: React.FC<{ t: Temple; i: number }> = ({ t, i }) => (
  <article
    className="glass relative overflow-hidden rounded-2xl p-6 group"
    style={{ borderColor: `${t.accent}55` }}
  >
    <div
      className="absolute inset-x-0 top-0 h-[3px]"
      style={{ background: `linear-gradient(90deg, transparent, ${t.accent}, transparent)` }}
    />
    <div className="flex items-start gap-4 mb-3">
      <div
        className="w-14 h-14 rounded-full flex items-center justify-center text-3xl shrink-0"
        style={{
          background: `radial-gradient(circle at 30% 25%, ${t.accent}55, ${t.accent}15)`,
          border: `1px solid ${t.accent}66`,
          boxShadow: `0 0 18px ${t.accent}40`,
        }}
        aria-hidden="true"
      >{t.glyph}</div>
      <div className="min-w-0 flex-1">
        <h3 className="font-display text-xl text-goldlight leading-tight">{t.name}</h3>
        {t.sanskrit && <div className="font-sanskrit text-base" style={{ color: t.accent }}>{t.sanskrit}</div>}
        <div className="font-cinzel text-[10px] tracking-[.2em] uppercase mt-1 text-[#c9bd9b]">
          {t.location} · {t.state}
        </div>
      </div>
      <span className="font-cinzel text-[10px] tracking-[.2em] text-goldlight/60 shrink-0">
        {String(i + 1).padStart(2, '0')}
      </span>
    </div>
    <p className="font-serif text-[15px] text-[#ece2c8] leading-relaxed mb-3">{t.significance}</p>
    <div className="pt-3 border-t border-goldlight/15">
      <div className="font-cinzel text-[9px] tracking-[.25em] uppercase text-saffron/90 mb-1">Sthala Purana</div>
      <p className="font-serif text-sm text-[#d8cdb0] italic leading-relaxed">{t.legend}</p>
    </div>
  </article>
);

const Temples: React.FC = () => (
  <div>
    <div className="text-center mb-10">
      <p className="font-sanskrit text-2xl md:text-3xl text-saffron tracking-wider">श्री राम जय राम जय जय राम</p>
      <p className="mt-2 font-serif italic text-[#c9bd9b]">“Wherever His name is sung, there His feet rest.”</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {temples.map((t, i) => <TempleCard key={t.name} t={t} i={i} />)}
    </div>
  </div>
);

export default Temples;
