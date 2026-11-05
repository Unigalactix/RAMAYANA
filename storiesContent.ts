/**
 * In-app retellings for the 18 tales — the Codex no longer sends
 * readers away to external share links. Each tale: its Kanda,
 * a short full retelling, and the lesson it carries.
 */
export interface StoryDetail { kanda: string; lesson: string; body: string[] }

export const storyDetails: Record<string, StoryDetail> = {
  'The Birth of the Princes': { kanda: 'Bala Kanda', lesson: 'Great ages begin with answered prayer, not with armies.', body: [
    'King Dasharatha of Ayodhya had everything a king could want — except a son. On the counsel of his priests he performed the Putrakameshti, the fire sacrifice for offspring, and the gods themselves took notice, for heaven had its own need: Ravana could be slain only by a man.',
    'From the sacrificial fire rose a divine being holding a golden vessel of payasam. Dasharatha gave it to his three queens, and in time four sons were born — Rama to Kausalya, Bharata to Kaikeyi, and the twins Lakshmana and Shatrughna to Sumitra.',
    'What Ayodhya celebrated as a royal birth, the gods knew as an advent: Vishnu had entered the world in four portions, and the wheel of the epic had begun to turn.'] },
  'The Gurukul of Vasishtha': { kanda: 'Bala Kanda', lesson: 'Strength is only half an education; the other half is stillness.', body: [
    'The four princes were sent to the hermitage-school of the royal preceptor Vasishtha, where princes slept on the ground, served their teacher, and memorised the Vedas alongside the science of the bow.',
    'Rama excelled at everything — and was remembered most for his calm. He mastered the Dhanurveda, the scriptures, and, hardest of all for a prince, the discipline of silence: listening fully before he spoke.',
    'It was this formation — skill governed by serenity — that Vishwamitra would soon come to test in the real world.'] },
  'Sita’s Swayamvara': { kanda: 'Bala Kanda', lesson: 'What force cannot move, worth moves without effort.', body: [
    'King Janaka of Mithila possessed the Pinaka, the immense bow of Shiva, and declared that only the man who could string it would wed his daughter Sita — a princess found, as an infant, in a furrow of the sacrificial field.',
    'Kings and princes came from every land. Some could not lift the bow; some could not even shift it, though it was brought in on a great wheeled cart by hundreds of men. One by one they withdrew, humiliated.',
    'Then Rama, at his guru’s nod, took the bow in one hand, bent it — and it broke with a sound like a thunderclap. The earth shook, flowers rained from heaven, and Sita placed the garland around his neck.'] },
  'The Royal Wedding': { kanda: 'Bala Kanda', lesson: 'Joy, in the epic, is never private — it binds kingdoms.', body: [
    'Messengers rode to Ayodhya, and Dasharatha arrived in Mithila with his court. Janaka proposed a quadruple alliance: his daughter Sita for Rama, her sister Urmila for Lakshmana, and his brother’s daughters Mandavi and Shrutakirti for Bharata and Shatrughna.',
    'Under canopies of silk, with fires lit and mantras rising, the four brothers wed the four princesses of Mithila. Two ancient houses — the Solar line of Ayodhya and the line of Janaka the philosopher-king — became one family.',
    'Only one shadow crossed the road home: a furious sage with an axe, waiting to demand an answer for a broken bow.'] },
  'The Plot of Kaikeyi': { kanda: 'Ayodhya Kanda', lesson: 'A grievance whispered at the right ear can move an empire.', body: [
    'Ayodhya was garlanding itself for Rama’s coronation when Manthara, Kaikeyi’s hunchbacked maid, climbed to the palace roof and saw the festival lamps. Her words worked like slow poison: today Rama is crowned — tomorrow, what becomes of Bharata? Of you?',
    'Kaikeyi, who loved Rama, resisted — until Manthara reminded her of the two boons Dasharatha had granted her years ago, when she saved his life in battle, and never claimed.',
    'That night the queen lay in the chamber of anger, jewels cast off, and when the king came rejoicing, she asked: Bharata to be crowned, and Rama to the forest for fourteen years.'] },
  'Rama’s Exile Begins': { kanda: 'Ayodhya Kanda', lesson: 'Dharma is what you do when obedience costs you everything.', body: [
    'Rama received the news of his own ruin without a flicker. “My father’s word is my command,” he said, and traded his silk for bark cloth. His only sorrow was breaking it to his mother.',
    'Sita refused to remain: “A wife’s place is where her husband is; the forest with you is Ayodhya to me.” Lakshmana, blazing, refused too — and so the three walked out of the city together.',
    'All Ayodhya followed them to the river Tamasa and camped weeping on its banks. Before dawn, Rama rose quietly and left, so that his people, waking, would find only the chariot tracks — and turn home.'] },
  'The Grief of Dasharatha': { kanda: 'Ayodhya Kanda', lesson: 'Even kings must reap words spoken in another life.', body: [
    'Dasharatha never recovered from Rama’s departure. He told Kausalya the story he had hidden for decades: as a young prince hunting by sound alone, he had shot a boy — Shravana Kumar, carrying water for his blind parents — mistaking him for an elephant at the river.',
    'The dying boy’s parents had cursed him: “You too shall die grieving for your son, as we do.” The old king understood at last that the wheel had come full circle.',
    'On the sixth night after Rama left, calling his name, Dasharatha died — a king who never broke his word, broken by keeping it.'] },
  'Bharata’s Devotion': { kanda: 'Ayodhya Kanda', lesson: 'The crown refused can weigh more than the crown worn.', body: [
    'Bharata returned from his uncle’s kingdom to find his father dead, his brother exiled, and a throne prepared for him by his own mother’s intrigue. He recoiled from it in horror — and publicly renounced both the crown and, in fury, her deed.',
    'With the whole court he travelled to Chitrakuta to beg Rama to return. Rama embraced him — and refused: their father’s word bound them both. The brothers debated dharma before the sages like two kings at philosophy.',
    'At last Bharata asked for Rama’s sandals. He carried them home on his head, set them on the throne of Nandigrama, and ruled fourteen years as their servant, in bark cloth, awaiting his brother.'] },
  'The Abduction of Sita': { kanda: 'Aranya Kanda', lesson: 'Desire, dressed as beauty, is the oldest trap in the forest.', body: [
    'In Panchavati appeared a deer unlike any in nature — golden, jewel-spotted, dancing at the clearing’s edge. It was Maricha, sent by Ravana, who remembered Rama’s arrows and came unwillingly, knowing he would die either way.',
    'Sita begged for the deer; Rama pursued it, and with his dying breath Maricha cried out in Rama’s voice: “Ah, Sita! Ah, Lakshmana!” Sita, frantic, taunted Lakshmana into following — and the hut stood empty.',
    'Then came a mendicant asking alms. He stepped across the threshold as a guest — and rose into the sky as Ravana, king of Lanka, with Sita in his chariot.'] },
  'Jatayu’s Last Flight': { kanda: 'Aranya Kanda', lesson: 'Age is no excuse; the old eagle still rose.', body: [
    'Jatayu, king of vultures, friend of Dasharatha, was ancient beyond counting when he heard Sita’s cries. He rose into the sky and challenged Ravana alone: “While I live, you shall not take her.”',
    'The battle in the air was hopeless and magnificent. Jatayu shattered Ravana’s bow, killed his horses, broke his chariot — before Ravana’s sword took his wings, and the old king fell to earth.',
    'He lived until Rama came. “I fought him… south, he went south…” Then he died in Rama’s arms, and Rama performed his funeral rites as for a father, granting him the highest liberation.'] },
  'The Search for Sita': { kanda: 'Kishkindha Kanda', lesson: 'Grief becomes purpose the moment it finds allies.', body: [
    'Rama and Lakshmana wandered south through a world emptied of Sita, until on Rishyamukha hill a vanara minister named Hanuman came down to them in disguise — and knew his lord at a glance.',
    'Before a sacred fire, Rama and the exiled vanara king Sugriva swore friendship. Rama’s arrow settled Sugriva’s feud with his brother Vali, and Kishkindha’s throne changed hands.',
    'Then came the rains, and delay, and Rama’s anger — until Lakshmana’s embassy and Sugriva’s muster turned sorrow into strategy: armies of vanaras streaming to the four directions, searching every mountain and shore for a lost queen.'] },
  'The Leap to Lanka': { kanda: 'Sundara Kanda', lesson: 'Devotion does not calculate the width of the ocean.', body: [
    'The southern search party reached the shore and despaired: a hundred yojanas of sea, and Lanka beyond it. Then Jambavan reminded the silent Hanuman of his birth, his curses, and his forgotten strength.',
    'Hanuman grew until his form filled the sky. From Mount Mahendra he launched himself over the ocean — refusing the resting-mountain Mainaka’s hospitality, outwitting Surasa’s open mouth, killing the shadow-catcher Simhika on the way.',
    'He landed on Mount Trikuta by night, shrank to the size of a cat, and slipped into the golden city to find one imprisoned queen.'] },
  'Hanuman in Lanka': { kanda: 'Sundara Kanda', lesson: 'Proof travels in both directions: a ring, and a jewel.', body: [
    'In the Ashoka grove Hanuman found Sita — defiant, starving, ringed by threats — and from the branches sang Rama’s story softly, so she would know the singer. He gave her Rama’s signet ring; she gave him her chudamani and two months of hope.',
    'Then Hanuman decided Lanka should know he had come. He uprooted the grove, killed its guards and Ravana’s son Aksha, and let himself be bound and dragged before the king — to deliver, face to face, Rama’s warning.',
    'Ravana’s answer was to set his tail on fire. Hanuman’s answer was Lanka itself, burning — every roof but the grove where Sita sat untouched by flame.'] },
  'The Bridge of Stones': { kanda: 'Yuddha Kanda', lesson: 'An army that carries mountains for love moves the sea itself.', body: [
    'On the southern shore Rama prayed to the ocean for three days. When no answer came, his anger rose — and Sagara, god of the sea, appeared, bowing: build a bridge, and my waters will hold it.',
    'Under the vanara architects Nala and Nila, the work began: bears and monkeys hauling trees, rocks, whole hilltops. A squirrel, rolling in the dust to carry a few grains, was blessed by Rama’s hand — and bears his stripes to this day, the story says.',
    'Stones bearing Rama’s name floated. In five days the army of Rama walked across the sea on Ram Setu, and the drums sounded on the far shore.'] },
  'The Great War': { kanda: 'Yuddha Kanda', lesson: 'Wars are won by the side that refuses to let its fallen lie alone.', body: [
    'The war for Lanka shook the three worlds: Dhumraksha, Vajradamshtra, Akampana fell; Kumbhakarna woke and was slain; Indrajit’s serpent-arrows bound Rama and Lakshmana in coils until Garuda’s wings scattered the nagas like straw.',
    'Again Indrajit struck — and Lakshmana fell lifeless, and the physician Sushena spoke of one herb on a Himalayan peak, needed before dawn. Hanuman brought back the mountain itself.',
    'Through it all the pattern held: every victory in the epic’s greatest war is answered not with triumph, but with rescue — a brother carried, a herb fetched, a life given back.'] },
  'The Fall of Ravana': { kanda: 'Yuddha Kanda', lesson: 'Enmity ends with death — that too is dharma.', body: [
    'At last the kings faced each other, chariot to chariot, while gods crowded the sky. Rama’s arrows took Ravana’s heads — and new heads grew, for the secret of his life lay in the nectar stored in his navel.',
    'Agastya’s hymn, the Aditya Hridayam, steadied Rama’s heart. On Matali’s counsel he loosed the Brahmastra, Brahma’s own weapon, blazing like the end of time — and Ravana fell, and the earth breathed again.',
    'Then Rama turned to the grieving Vibhishana: “Bury him with a king’s honours. He was my enemy in war; enmity ends with death. Now he is as much mine as yours.”'] },
  'The Agni Pariksha': { kanda: 'Yuddha Kanda', lesson: 'Fire, which witnesses all vows, witnessed hers.', body: [
    'Victory had a shadow. Before the watching armies, Sita was brought to Rama — and Rama, bound by what the world would whisper of a queen held in another’s house, spoke with a coldness that cut deeper than the war.',
    'Sita turned to Lakshmana: “Build me a pyre.” She circumambulated Rama, bowed to the gods, and stepped into the flames, asking Agni — the fire who witnesses every vow ever sworn — to protect her if she was true.',
    'The flames parted. Agni himself rose, bearing her unharmed, and testified before gods and men; Brahma declared Rama’s own divinity; Dasharatha descended from heaven to embrace his son. The war ended not with a sword, but with a vindication.'] },
  'The Coronation of Rama': { kanda: 'Yuddha Kanda', lesson: 'Fourteen years of night end with lamps in every window.', body: [
    'The Pushpaka Vimana carried them home over the whole geography of their exile — Rama pointing out to Sita the forests, rivers and battlefields below, the epic reciting its own map.',
    'Bharata, counting the very day, waited at Nandigrama with the sandals; Hanuman flew ahead with the news, and found him ready to enter the fire if the day passed without Rama. It did not pass.',
    'Ayodhya lit a thousand lamps along its streets — the first Diwali, the tradition says — and Rama was crowned at last, with Sita beside him, and the age of Ramarajya began.'] },
};
