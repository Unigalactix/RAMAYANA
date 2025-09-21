import { Kanda, Story, FamilyTreeNode, MapLocation } from './types';

export const stats = [
  {
    value: '7',
    label: 'Kandas (Books) shaping the epic narrative',
    color: 'bg-[#FF9933]',
  },
  {
    value: '24,000+',
    label: 'Couplets (Shlokas) composing the Adi Kavya',
    color: 'bg-[#005B96]',
  },
  {
    value: '14 Years',
    label: 'of exile demonstrating honor and sacrifice',
    color: 'bg-[#FFD700]',
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
  {
    title: "Rama's Exile",
    description: "A story about Rama, Sita, and Lakshmana leaving Ayodhya and beginning their life in the forest.",
    link: "https://g.co/gemini/share/e8963612ada6"
  },
  {
    title: "The Grief of Dasharatha",
    description: "A story about King Dasharatha's sorrow and death after Rama's departure.",
    link: "https://g.co/gemini/share/6c9e0f158616"
  },
  {
    title: "Bharata's Devotion",
    description: "A story about Bharata's refusal to accept the throne and his journey to persuade Rama to return. When Rama refuses, Bharata places Rama's sandals on the throne and rules as a regent.",
    link: "https://g.co/gemini/share/9051fa71bbdb"
  },
  {
    title: "The Abduction of Sita",
    description: "A story about how the demon king Ravana, disguised as a sage, abducts Sita while Rama and Lakshmana are away.",
    link: "https://g.co/gemini/share/234ae1bfffa7"
  },
  {
    title: "Jatayu's Sacrifice",
    description: "A story about the brave vulture Jatayu who fights Ravana to save Sita but is mortally wounded.",
    link: "https://g.co/gemini/share/0a71f027ee83"
  },
  {
    title: "The Search for Sita",
    description: "A story about Rama and Lakshmana's desperate search for Sita, and their encounter with the monkey king Sugriva and his loyal minister Hanuman.",
    link: "https://g.co/gemini/share/9cbd9d3ee0e9"
  },
  {
    title: "Hanuman's Leap to Lanka",
    description: "A story about Hanuman's incredible leap across the ocean to the island of Lanka in search of Sita.",
    link: "https://g.co/gemini/share/896b58c855fa"
  },
  {
    title: "Hanuman in Lanka",
    description: "A story about Hanuman finding Sita in Ravana's Ashok Vatika, delivering Rama's message, and setting Lanka on fire.",
    link: "https://g.co/gemini/share/f243c5c4c26c"
  },
  {
    title: "The Bridge to Lanka",
    description: "A story about how the monkey army, under the guidance of Nala and Nila, builds a bridge across the ocean to Lanka.",
    link: "https://g.co/gemini/share/7d811eb43e6e"
  },
  {
    title: "The Great War",
    description: "A story about the epic battle between Rama's army and Ravana's forces, including the defeat of powerful demons like Kumbhakarna and Indrajit.",
    link: "https://g.co/gemini/share/c218d3ed5eba"
  },
  {
    title: "The Slaying of Ravana",
    description: "A story about the final duel between Rama and Ravana, where Rama kills the ten-headed demon king with the divine Brahmastra.",
    link: "https://g.co/gemini/share/b52f9c5cd7a6"
  },
  {
    title: "The Agni Pariksha of Sita",
    description: "A story about Sita's trial by fire to prove her purity after her captivity.",
    link: "https://g.co/gemini/share/8c9cfb2a6860"
  },
  {
    title: "The Return to Ayodhya and Coronation",
    description: "A story about Rama, Sita, and Lakshmana's triumphant return to Ayodhya after 14 years, and Rama's coronation as the king.",
    link: "https://g.co/gemini/share/d58474a2a72d"
  }
];

export const familyTreeData: FamilyTreeNode = {
  name: 'Dasharatha',
  spouse: 'Kausalya, Kaikeyi, Sumitra',
  children: [
    {
      name: 'Rama',
      spouse: 'Sita',
      children: [
        { name: 'Lava' },
        { name: 'Kusha' },
      ],
    },
    {
      name: 'Bharata',
    },
    {
      name: 'Lakshmana',
    },
    {
      name: 'Shatrughna',
    },
  ],
};

export const mapLocations: MapLocation[] = [
  {
    id: 'ayodhya',
    name: 'Ayodhya',
    description: 'The capital of the Kosala kingdom and the birthplace of Rama. The story begins and ends here.',
    coords: { x: '55%', y: '25%' },
  },
  {
    id: 'mithila',
    name: 'Mithila',
    description: 'The kingdom of King Janaka, the father of Sita. This is where Rama won Sita\'s hand in marriage.',
    coords: { x: '68%', y: '27%' },
  },
  {
    id: 'dandaka',
    name: 'Dandaka Forest',
    description: 'A vast and dense forest where Rama, Sita, and Lakshmana spent most of their 14-year exile.',
    coords: { x: '50%', y: '50%' },
  },
  {
    id: 'panchavati',
    name: 'Panchavati',
    description: 'A beautiful spot within the Dandaka Forest, near the Godavari river, from where Sita was abducted by Ravana.',
    coords: { x: '42%', y: '58%' },
  },
  {
    id: 'kishkindha',
    name: 'Kishkindha',
    description: 'The kingdom of the Vanaras (monkeys), where Rama allied with Sugriva and Hanuman to search for Sita.',
    coords: { x: '48%', y: '75%' },
  },
  {
    id: 'rameshwaram',
    name: 'Rameshwaram',
    description: 'The southern tip of India from where the Vanara army built the Ram Setu bridge to Lanka.',
    coords: { x: '53%', y: '88%' },
  },
  {
    id: 'lanka',
    name: 'Lanka',
    description: 'The island kingdom of the demon king Ravana, where Sita was held captive. The site of the epic final battle.',
    coords: { x: '58%', y: '95%' },
  },
];