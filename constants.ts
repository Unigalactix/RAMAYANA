import { Kanda, Story } from './types';

export const stats = [
  {
    value: '7',
    label: 'Kandas (Books) shaping the epic narrative',
    color: 'bg-[#FF6B6B]',
  },
  {
    value: '24,000+',
    label: 'Couplets (Shlokas) composing the Adi Kavya',
    color: 'bg-[#4ECDC4]',
  },
  {
    value: '14 Years',
    label: 'of exile demonstrating honor and sacrifice',
    color: 'bg-[#FFE66D]',
  },
];

export const kandas: Kanda[] = [
  {
    title: 'Bala Kanda',
    description: 'The Book of Youth. Chronicles the divine birth and heroic youth of Rama, his tutelage under Vishwamitra, and his marriage to Sita after breaking Shiva\'s mighty bow.',
    theme: 'Divine Advent & Human Childhood',
    keyEvents: [
      "Birth of princes Rama, Lakshmana, Bharata, and Shatrughna.",
      "Vishwamitra's tutelage and the slaying of demons Tataka and Subahu.",
      "Rama breaks Shiva's bow and wins Sita's hand in marriage."
    ],
    majorCharacters: ["Rama", "Lakshmana", "Bharata", "Shatrughna", "King Dasharatha", "Vishwamitra", "Sita", "Janaka", "Ravana"],
  },
  {
    title: 'Ayodhya Kanda',
    description: 'The Book of Ayodhya. Details the palace intrigue leading to Rama\'s 14-year exile, showcasing his unwavering commitment to dharma and Bharata\'s loyal regency.',
    theme: 'Sacrifice & Duty',
    keyEvents: [
      "King Dasharatha decides to crown Rama.",
      "Queen Kaikeyi, influenced by Manthara, demands her two boons.",
      "Rama accepts a 14-year exile to honor his father's word.",
      "Bharata rules as a regent from Nandigram with Rama's sandals on the throne."
    ],
    majorCharacters: ["Rama", "Lakshmana", "Sita", "Bharata", "King Dasharatha", "Kaikeyi", "Kausalya", "Sumitra", "Manthara"],
  },
  {
    title: 'Aranya Kanda',
    description: 'The Book of the Forest. Narrates life in the forest and the pivotal event of the epic: the abduction of Sita by the demon king Ravana, setting the stage for the great war.',
    theme: 'The Turning Point',
    keyEvents: [
      "Life in the Dandaka forest.",
      "Humiliation of the demoness Surpanakha.",
      "Ravana abducts Sita, using the demon Maricha disguised as a golden deer."
    ],
    majorCharacters: ["Rama", "Lakshmana", "Sita", "Jatayu", "Surpanakha", "Maricha", "Ravana"],
  },
  {
    title: 'Kishkindha Kanda',
    description: 'The Book of the Monkey Empire. Rama forms a crucial alliance with the vanara king Sugriva, helping him defeat his brother Vali and beginning the search for Sita.',
    theme: 'Alliance & Moral Ambiguity',
    keyEvents: [
      "Rama and Lakshmana meet Hanuman.",
      "Alliance with the vanara king Sugriva.",
      "Rama slays Vali from a hidden position, a controversial act.",
      "The vanara army begins the search for Sita."
    ],
    majorCharacters: ["Rama", "Lakshmana", "Hanuman", "Sugriva", "Vali", "Jambavan", "Vibhishana"],
  },
  {
    title: 'Sundara Kanda',
    description: 'The Book of Beauty. Focuses on Hanuman\'s heroic leap to Lanka, his discovery of Sita, and the display of his immense power and devotion, single-handedly burning the city.',
    theme: 'Heroism & Devotion',
    keyEvents: [
      "Hanuman's heroic leap across the ocean to Lanka.",
      "Discovery of Sita in the Ashoka Vatika.",
      "Hanuman destroys Ravana's gardens and burns the city of Lanka."
    ],
    majorCharacters: ["Hanuman", "Sita", "Ravana", "Trijata", "Vibhishana"],
  },
  {
    title: 'Yuddha Kanda',
    description: 'The Book of War. The climactic confrontation between Rama\'s army and Ravana\'s forces, culminating in the defeat of Ravana and the rescue of Sita after her trial by fire.',
    theme: 'The Final Confrontation',
    keyEvents: [
      "Construction of the Ram Setu bridge to Lanka.",
      "The great war between Rama's and Ravana's armies.",
      "Rama slays Ravana in a final duel.",
      "Sita's Agni Pariksha (trial by fire) to prove her purity.",
      "Triumphant return to Ayodhya."
    ],
    majorCharacters: ["Rama", "Lakshmana", "Hanuman", "Sugriva", "Vibhishana", "Ravana", "Kumbhakarna", "Indrajit", "Sita"],
  },
  {
    title: 'Uttara Kanda',
    description: 'The Later Book. A controversial and tragic epilogue detailing Rama\'s reign, the banishment of Sita, the birth of their sons, and Sita\'s final return to the Earth.',
    theme: 'Righteous Kingship & Tragedy',
    keyEvents: [
      "Rama's righteous reign (Ramarajya) is established.",
      "Due to public rumor, Rama banishes the pregnant Sita.",
      "Birth of Lava and Kusha in Valmiki's hermitage.",
      "Sita returns to her mother, the Earth, after a final trial."
    ],
    majorCharacters: ["Rama", "Sita", "Lakshmana", "Valmiki", "Lava", "Kusha"],
  },
];

export const characters = [
  {
    title: 'Rama',
    description: 'The Maryada Purushottam (Ideal Man). An incarnation of Vishnu, he embodies dharma, compassion, and righteous duty, facing immense personal sacrifice for the sake of honor.',
  },
  {
    title: 'Sita',
    description: 'The Paradigm of Purity. An incarnation of Lakshmi, she represents resilience, fidelity, and feminine strength, demonstrating immense courage and self-respect in the face of adversity.',
  },
  {
    title: 'Hanuman',
    description: 'The Epitome of Devotion. A divine being of immense strength and intellect, his selfless service and unwavering faith in Rama make him the perfect devotee.',
  },
  {
    title: 'Ravana',
    description: 'The Tragic Antagonist. A great scholar and powerful king whose hubris, ego, and lust lead to his downfall, serving as a cautionary tale on the corrupting nature of adharma.',
  },
];

export const themes = [
    {
        title: 'The Conflict and Complexity of Dharma',
        description: 'The epic explores righteousness not as a simple code, but as a complex web of duties (to father, kingdom, and self) that often leads to painful, ambiguous choices.',
    },
    {
        title: 'The Human and the Divine',
        description: 'Divine incarnations navigate the world through human emotions and fallibility. Their struggles and choices make their adherence to dharma relatable and meaningful.',
    },
    {
        title: 'The Triumph of Good over Evil',
        description: 'The ultimate victory of Rama over Ravana symbolizes the restoration of cosmic order, where righteousness, truth, and justice prevail over ego and injustice.',
    },
    {
        title: 'The Ideal of Kingship: Ramarajya',
        description: 'Rama\'s reign establishes the utopian ideal of a just society, where a selfless ruler prioritizes the welfare of the people above all else, creating peace and prosperity.',
    }
];

export const stories: Story[] = [
  {
    title: 'The Birth of Rama and His Brothers',
    description: 'A story about the divine birth of Rama, Lakshmana, Bharata, and Shatrughna to King Dasharatha and his three queens.',
    link: 'https://g.co/gemini/share/5219d589608e'
  },
  {
    title: 'Rama\'s Gurukul Education',
    description: 'A story about Rama and his brothers learning archery, warfare, and scriptures from their guru, Sage Vasishtha.',
    link: 'https://g.co/gemini/share/de97aacba7c2'
  },
  {
    title: 'Sita\'s Swayamvara',
    description: 'A story about how Rama wins Sita\'s hand in marriage by lifting and stringing the divine bow of Lord Shiva.',
    link: 'https://g.co/gemini/share/3ee98b861c00'
  },
  {
    title: 'The Royal Wedding',
    description: 'A story about the grand wedding of Rama and Sita, and his brothers with Sita\'s sisters.',
    link: 'https://g.co/gemini/share/3fb03b56be92'
  },
  {
    title: 'The Plot of Kaikeyi',
    description: 'A story about how Queen Kaikeyi, influenced by her maid Manthara, asks King Dasharatha to fulfill two boons: to make her son Bharata the king and to send Rama into exile for 14 years.',
    link: 'https://g.co/gemini/share/a3059de809aa'
  },
];