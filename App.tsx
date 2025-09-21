import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import BenefitCard from './components/BenefitCard';
import KandaDetailModal from './components/KandaDetailModal';
import StoryCard from './components/StoryCard';
import FamilyTree from './components/FamilyTree';
import InteractiveMap from './components/InteractiveMap';
import Navigation from './components/Navigation';
import { stats, kandas, characters, themes, stories } from './constants';
import { Kanda } from './types';
import { BookIcon, CrownIcon, ForestIcon, MonkeyIcon, LeapIcon, WarIcon, ScrollIcon, BowIcon, LotusIcon, MaceIcon, TenHeadsIcon, DharmaWheelIcon, BalanceIcon, TempleIcon, DivineIcon, StorybookOpenIcon } from './components/Icons';

const AnimateOnScroll: React.FC<{ children: React.ReactNode, className?: string, delay?: number }> = ({ children, className, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.1,
            }
        );

        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, []);

    return (
        <div 
            ref={ref} 
            className={`${className || ''} scroll-animate ${isVisible ? 'is-visible' : ''}`}
            style={{ transitionDelay: `${delay}ms` }}
        >
            {children}
        </div>
    );
};

const App: React.FC = () => {
  const [selectedKanda, setSelectedKanda] = useState<Kanda | null>(null);
  const [viewedKandas, setViewedKandas] = useState<Set<string>>(new Set());
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedTheme = window.localStorage.getItem('theme');
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (storedTheme === 'dark' || (!storedTheme && systemPrefersDark)) {
        return 'dark';
      }
    }
    return 'light';
  });

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const kandaIcons: { [key: string]: React.ReactNode } = {
    'Bala Kanda': <BookIcon />,
    'Ayodhya Kanda': <CrownIcon />,
    'Aranya Kanda': <ForestIcon />,
    'Kishkindha Kanda': <MonkeyIcon />,
    'Sundara Kanda': <LeapIcon />,
    'Yuddha Kanda': <WarIcon />,
    'Uttara Kanda': <ScrollIcon />,
  };

  const characterIcons: { [key: string]: React.ReactNode } = {
    'Rama': <BowIcon />,
    'Sita': <LotusIcon />,
    'Hanuman': <MaceIcon />,
    'Ravana': <TenHeadsIcon />,
  };
  
  const themeIcons: { [key: string]: React.ReactNode } = {
    'The Conflict and Complexity of Dharma': <DharmaWheelIcon />,
    'The Human and the Divine': <DivineIcon />,
    'The Triumph of Good over Evil': <BalanceIcon />,
    'The Ideal of Kingship: Ramarajya': <TempleIcon />,
  };

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      window.requestAnimationFrame(() => {
        setScrollY(window.scrollY);
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenModal = (kanda: Kanda) => {
    setSelectedKanda(kanda);
    document.body.style.overflow = 'hidden';
  }

  const handleCloseModal = () => {
    if (selectedKanda) {
      setViewedKandas(prev => new Set(prev).add(selectedKanda.title));
    }
    setSelectedKanda(null);
    document.body.style.overflow = '';
  }

  return (
    <div className="min-h-screen text-[#4A2E2C] dark:text-[#FBF5E8] overflow-hidden relative">
      {/* START: Decorative Background SVGs */}
      <div aria-hidden="true" className="hidden md:block absolute top-24 -left-16 -z-10 opacity-10 text-[#FFD700] dark:text-yellow-300/10">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21C12 21 15.3333 16 21 16C21 12 18 10 18 10C18 10 20 6 17 4C14 2 12 5 12 5" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 21C12 21 8.66667 16 3 16C3 12 6 10 6 10C6 10 4 6 7 4C10 2 12 5 12 5" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 12C13.6569 12 15 10.6569 15 9C15 7.34315 13.6569 6 12 6C10.3431 6 9 7.34315 9 9C9 10.6569 10.3431 12 12 12Z" stroke="currentColor" strokeWidth="0.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
       <div aria-hidden="true" className="hidden md:block absolute top-1/3 -right-24 -z-10 opacity-10 text-[#005B96] dark:text-blue-300/10">
        <svg width="500" height="500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 21a9 9 0 100-18 9 9 0 000 18z" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M12 3v2.25m0 13.5V21m-6.75-9.75H3m18 0h-2.25m-11.25-4.5L5.625 5.625m12.75 0l-2.121 2.121M5.625 18.375l2.121-2.121m8.623-8.623l2.121-2.121" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </div>
      <div aria-hidden="true" className="hidden md:block absolute bottom-16 -left-20 -z-10 opacity-10 text-[#FF9933] dark:text-orange-300/10">
        <svg width="400" height="400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 21C3 15.4772 7.47715 11 13 11H21" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M21 3L3 21" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2 2"/>
            <path d="M11 21C11 17.134 7.86599 14 4 14" stroke="currentColor" strokeWidth="0.5"/>
            <path d="M21 3C15.4772 3 11 7.47715 11 13V21" stroke="currentColor" strokeWidth="0.5"/>
        </svg>
      </div>
      {/* END: Decorative Background SVGs */}
      <div 
        className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-[#FF9933] rounded-full opacity-30 dark:opacity-20 -translate-x-1/4 -translate-y-1/4"
        style={{ transform: `translateX(-25%) translateY(-25%) translateY(${scrollY * 0.2}px)` }}
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-[#005B96] rounded-full opacity-30 dark:opacity-20 translate-x-1/3 translate-y-1/3"
        style={{ transform: `translateX(33.33%) translateY(33.33%) translateY(${scrollY * -0.1}px)` }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/3 w-24 h-24 md:w-48 md:h-48 bg-[#FFD700] rounded-xl opacity-30 dark:opacity-20 -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{ transform: `translateX(-50%) translateY(-50%) rotate(45deg) translateY(${scrollY * 0.15}px)` }}
      ></div>
      
      <Navigation />

      <main className="container mx-auto px-6 py-12 md:py-20 relative z-10">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <section id="stats" className="my-16 md:my-24">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {stats.map((stat, index) => (
              <AnimateOnScroll key={index} delay={index * 150}>
                <StatCard value={stat.value} label={stat.label} color={stat.color} />
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        <section id="kandas" className="my-16 md:my-24">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-6xl font-anton text-center uppercase tracking-wider text-[#4A2E2C] dark:text-[#FBF5E8] mb-12">
              The Seven <span className="text-[#FF9933]">Kandas</span> (Books)
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {kandas.map((kanda, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <BenefitCard
                  icon={kandaIcons[kanda.title] || <BookIcon />}
                  title={kanda.title}
                  description={kanda.description}
                  color={index % 3 === 0 ? 'bg-[#005B96]' : index % 3 === 1 ? 'bg-[#FFD700]' : 'bg-[#FF9933]'}
                  onClick={() => handleOpenModal(kanda)}
                  isViewed={viewedKandas.has(kanda.title)}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        <section id="characters" className="my-16 md:my-24">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-6xl font-anton text-center uppercase tracking-wider text-[#4A2E2C] dark:text-[#FBF5E8] mb-12">
              Character <span className="text-[#005B96] dark:text-[#63B3ED]">Archetypes</span>
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {characters.map((character, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <BenefitCard
                  icon={characterIcons[character.title] || <BookIcon />}
                  title={character.title}
                  description={character.description}
                  color={index % 2 === 0 ? 'bg-[#FF9933]' : 'bg-[#F7B801]'}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </section>
        
        <section id="themes" className="my-16 md:my-24">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-6xl font-anton text-center uppercase tracking-wider text-[#4A2E2C] dark:text-[#FBF5E8] mb-12">
              Core <span className="text-[#FFD700]">Themes</span>
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {themes.map((theme, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <BenefitCard
                  icon={themeIcons[theme.title] || <BookIcon />}
                  title={theme.title}
                  description={theme.description}
                  color={index % 2 === 0 ? 'bg-[#005B96]' : 'bg-[#FFD700]'}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        <section id="stories" className="my-16 md:my-24">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-6xl font-anton text-center uppercase tracking-wider text-[#4A2E2C] dark:text-[#FBF5E8] mb-12">
              Story <span className="text-[#F7B801]">Book</span>
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <StoryCard
                  icon={<StorybookOpenIcon />}
                  title={story.title}
                  description={story.description}
                  link={story.link}
                  color={index % 3 === 0 ? 'bg-[#FF9933]' : index % 3 === 1 ? 'bg-[#005B96]' : 'bg-[#FFD700]'}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        <section id="map" className="my-16 md:my-24">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-6xl font-anton text-center uppercase tracking-wider text-[#4A2E2C] dark:text-[#FBF5E8] mb-12">
              Journey Across <span className="text-[#005B96] dark:text-[#63B3ED]">Ancient India</span>
            </h2>
            <p className="text-center text-lg max-w-3xl mx-auto mb-12 text-gray-700 dark:text-gray-300">
              Click on the markers to explore the key locations that set the stage for this epic tale.
            </p>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <InteractiveMap />
          </AnimateOnScroll>
        </section>

        <section id="family-tree" className="my-16 md:my-24">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-6xl font-anton text-center uppercase tracking-wider text-[#4A2E2C] dark:text-[#FBF5E8] mb-12">
              The Lineage of <span className="text-[#FF9933]">Ikshvaku</span>
            </h2>
          </AnimateOnScroll>
          <AnimateOnScroll delay={200}>
            <FamilyTree />
          </AnimateOnScroll>
        </section>


        <footer className="text-center py-12">
          <AnimateOnScroll>
            <p className="font-anton text-3xl md:text-5xl uppercase tracking-wide">
              A timeless epic of <br/> <span className="text-[#005B96] dark:text-[#63B3ED] underline decoration-wavy decoration-4 underline-offset-8">Dharma, Devotion, and Duty</span>
            </p>
          </AnimateOnScroll>
        </footer>
      </main>
      
      {selectedKanda && <KandaDetailModal kanda={selectedKanda} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;