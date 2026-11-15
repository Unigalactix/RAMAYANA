/**
 * Madhubani portrait medallions — the shared-spec character portraits.
 * Consistent across the Sacred Codices: Vishnu's avatars wear deep
 * indigo-blue skin; every figure keeps their canonical attributes
 * (Rama: bow + quiver; Sita: lotus; Hanuman: gada + mountain;
 * Ravana: ten crowned heads). Portraits are generated SVG — no images.
 */

export type CrownKind = 'royal' | 'grand' | 'queen' | 'jata' | 'topknot' | 'bun' | 'hair' | 'wild' | 'vanara' | 'bird';
export type TilakKind = 'pundra' | 'bindi' | 'rakshasa' | 'none';
export type AttributeKind =
  | 'bow' | 'bowQuiver' | 'lotus' | 'gada' | 'mountain' | 'paduka' | 'kamandalu'
  | 'staff' | 'serpent' | 'berries' | 'sword' | 'conch' | 'tenheads' | 'none';
export type Mood = 'serene' | 'gentle' | 'fierce' | 'sleepy';

export interface PortraitSpec {
  id: string;
  name: string;
  role: string; // one-line role for the gallery card
  skin: string;
  robe: string;
  crown: CrownKind;
  tilak: TilakKind;
  attribute: AttributeKind;
  attribute2?: AttributeKind;
  female?: boolean;
  vanara?: boolean;
  bird?: boolean;
  beard?: 'white' | 'grey' | 'dark';
  mustache?: boolean;
  garland?: boolean;
  greyHair?: boolean;
  mood?: Mood;
  headScale?: number; // Kumbhakarna is enormous
}

const BLUE = '#2f5e96'; // deep indigo-blue — Vishnu / Rama
const HUMAN = '#a06a38';
const HUMAN2 = '#9c6533';
const SAGE = '#8a5a30';

export const portraits: PortraitSpec[] = [
  { id: 'rama', name: 'Rama', role: 'Maryada Purushottama — Vishnu’s avatar, prince of Ayodhya', skin: BLUE, robe: '#e8a812', crown: 'royal', tilak: 'pundra', attribute: 'bowQuiver', mood: 'serene' },
  { id: 'sita', name: 'Sita', role: 'Daughter of the Earth, princess of Mithila, queen of hearts', skin: '#b06a35', robe: '#d43d1a', crown: 'queen', tilak: 'bindi', attribute: 'lotus', female: true, mood: 'gentle' },
  { id: 'lakshmana', name: 'Lakshmana', role: 'The devoted brother — Rama’s shadow and shield', skin: HUMAN, robe: '#1d4e89', crown: 'royal', tilak: 'pundra', attribute: 'bow', mood: 'serene' },
  { id: 'hanuman', name: 'Hanuman', role: 'Son of the Wind — devotion with the strength of mountains', skin: '#c47b3a', robe: '#d43d1a', crown: 'vanara', tilak: 'pundra', attribute: 'gada', attribute2: 'mountain', vanara: true, mood: 'gentle' },
  { id: 'ravana', name: 'Ravana', role: 'Ten-headed king of Lanka — scholar, devotee, and doom of his house', skin: '#3b2d5c', robe: '#8c2b12', crown: 'grand', tilak: 'rakshasa', attribute: 'tenheads', mustache: true, mood: 'fierce' },
  { id: 'dasharatha', name: 'Dasharatha', role: 'King of Ayodhya, of the Solar line — a father bound by his word', skin: HUMAN, robe: '#e8a812', crown: 'grand', tilak: 'pundra', attribute: 'none', beard: 'grey', mood: 'gentle' },
  { id: 'kaikeyi', name: 'Kaikeyi', role: 'The queen whose two boons turned the wheel of the epic', skin: '#a9713d', robe: '#e56b9f', crown: 'queen', tilak: 'bindi', attribute: 'none', female: true, mood: 'fierce' },
  { id: 'bharata', name: 'Bharata', role: 'The brother who refused a throne and crowned a pair of sandals', skin: HUMAN, robe: '#e8a812', crown: 'royal', tilak: 'pundra', attribute: 'paduka', mood: 'gentle' },
  { id: 'shatrughna', name: 'Shatrughna', role: 'The youngest prince — Bharata’s twin in loyalty', skin: HUMAN2, robe: '#3e7d2c', crown: 'royal', tilak: 'pundra', attribute: 'sword', mood: 'serene' },
  { id: 'vishvamitra', name: 'Vishvamitra', role: 'The king who became a Brahmarishi by sheer will', skin: SAGE, robe: '#e8862e', crown: 'jata', tilak: 'pundra', attribute: 'staff', beard: 'dark', mood: 'fierce' },
  { id: 'vasishtha', name: 'Vasishtha', role: 'Royal preceptor of the Ikshvakus — stillness that guides kings', skin: HUMAN2, robe: '#d9a83c', crown: 'topknot', tilak: 'pundra', attribute: 'kamandalu', beard: 'white', mood: 'serene' },
  { id: 'jatayu', name: 'Jatayu', role: 'King of vultures — the old eagle who rose one last time', skin: '#7a5a34', robe: '#5d4326', crown: 'bird', tilak: 'none', attribute: 'none', bird: true, mood: 'fierce' },
  { id: 'sugriva', name: 'Sugriva', role: 'Exiled vanara prince, crowned by friendship with Rama', skin: '#d99a4e', robe: '#3e7d2c', crown: 'royal', tilak: 'pundra', attribute: 'none', vanara: true, mood: 'gentle' },
  { id: 'vali', name: 'Vali', role: 'The mighty vanara king — half the strength of any foe he faced', skin: '#a8642c', robe: '#8c2b12', crown: 'grand', tilak: 'rakshasa', attribute: 'none', vanara: true, garland: true, mood: 'fierce' },
  { id: 'vibhishana', name: 'Vibhishana', role: 'The rakshasa who chose dharma over blood, and was crowned in Lanka', skin: '#2e4a5a', robe: '#1d4e89', crown: 'royal', tilak: 'pundra', attribute: 'conch', mood: 'serene' },
  { id: 'kumbhakarna', name: 'Kumbhakarna', role: 'The sleeping giant — loyalty and conscience in one enormous heart', skin: '#4a3226', robe: '#5d4326', crown: 'grand', tilak: 'rakshasa', attribute: 'none', headScale: 1.18, mood: 'sleepy' },
  { id: 'indrajit', name: 'Indrajit', role: 'Conqueror of Indra — Ravana’s sorcerer-son, master of the Nagapasha', skin: '#3b2d5c', robe: '#8c2b12', crown: 'royal', tilak: 'rakshasa', attribute: 'serpent', attribute2: 'bow', mood: 'fierce' },
  { id: 'surpanakha', name: 'Surpanakha', role: 'Ravana’s sister — whose humiliation lit the fuse of war', skin: '#51683a', robe: '#5d4326', crown: 'wild', tilak: 'rakshasa', attribute: 'none', female: true, mood: 'fierce' },
  { id: 'agastya', name: 'Agastya', role: 'The sage who drank the ocean — and armed Rama for the war', skin: SAGE, robe: '#e8a812', crown: 'topknot', tilak: 'pundra', attribute: 'bow', beard: 'dark', mood: 'serene' },
  { id: 'shabari', name: 'Shabari', role: 'The tribal devotee who waited a lifetime, tasting berries for her Lord', skin: '#9c6a3d', robe: '#3e7d2c', crown: 'bun', tilak: 'bindi', attribute: 'berries', female: true, greyHair: true, mood: 'gentle' },
  { id: 'ahalya', name: 'Ahalya', role: 'Turned to stone by a curse — redeemed by the dust of Rama’s feet', skin: '#8d8578', robe: '#5a6b8a', crown: 'hair', tilak: 'bindi', attribute: 'lotus', female: true, mood: 'serene' },
  { id: 'mandodari', name: 'Mandodari', role: 'Queen of Lanka — wisdom that warned, and was never heeded', skin: '#a9713d', robe: '#1d4e89', crown: 'queen', tilak: 'bindi', attribute: 'none', female: true, mood: 'gentle' },
];
