import React, { useState, useEffect, useRef } from 'react';
import Header from './components/Header';
import StatCard from './components/StatCard';
import BenefitCard from './components/BenefitCard';
import KandaDetailModal from './components/KandaDetailModal';
import StoryCard from './components/StoryCard';
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
    <div className="min-h-screen text-[#1E1E1E] overflow-hidden relative">
      <div 
        className="absolute top-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-[#FF6B6B] rounded-full opacity-50 -translate-x-1/4 -translate-y-1/4"
        style={{ transform: `translateX(-25%) translateY(-25%) translateY(${scrollY * 0.2}px)` }}
      ></div>
      <div 
        className="absolute bottom-0 right-0 w-48 h-48 md:w-96 md:h-96 bg-[#4ECDC4] rounded-full opacity-50 translate-x-1/3 translate-y-1/3"
        style={{ transform: `translateX(33.33%) translateY(33.33%) translateY(${scrollY * -0.1}px)` }}
      ></div>
      <div 
        className="absolute top-1/2 left-1/3 w-24 h-24 md:w-48 md:h-48 bg-[#FFE66D] rounded-xl opacity-50 -translate-x-1/2 -translate-y-1/2 rotate-45"
        style={{ transform: `translateX(-50%) translateY(-50%) rotate(45deg) translateY(${scrollY * 0.15}px)` }}
      ></div>

      <main className="container mx-auto px-6 py-12 md:py-20 relative z-10">
        <Header />

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
            <h2 className="text-4xl md:text-6xl font-anton text-center uppercase tracking-wider text-[#1E1E1E] mb-12">
              The Seven <span className="text-[#FF6B6B]">Kandas</span> (Books)
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {kandas.map((kanda, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <BenefitCard
                  icon={kandaIcons[kanda.title] || <BookIcon />}
                  title={kanda.title}
                  description={kanda.description}
                  color={index % 3 === 0 ? 'bg-[#4ECDC4]' : index % 3 === 1 ? 'bg-[#FFE66D]' : 'bg-[#FF6B6B]'}
                  onClick={() => handleOpenModal(kanda)}
                  isViewed={viewedKandas.has(kanda.title)}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        <section id="characters" className="my-16 md:my-24">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-6xl font-anton text-center uppercase tracking-wider text-[#1E1E1E] mb-12">
              Character <span className="text-[#4ECDC4]">Archetypes</span>
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {characters.map((character, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <BenefitCard
                  icon={characterIcons[character.title] || <BookIcon />}
                  title={character.title}
                  description={character.description}
                  color={index % 2 === 0 ? 'bg-[#FF6B6B]' : 'bg-[#F7B801]'}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </section>
        
        <section id="themes" className="my-16 md:my-24">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-6xl font-anton text-center uppercase tracking-wider text-[#1E1E1E] mb-12">
              Core <span className="text-[#FFE66D]">Themes</span>
            </h2>
          </AnimateOnScroll>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {themes.map((theme, index) => (
              <AnimateOnScroll key={index} delay={index * 100}>
                <BenefitCard
                  icon={themeIcons[theme.title] || <BookIcon />}
                  title={theme.title}
                  description={theme.description}
                  color={index % 2 === 0 ? 'bg-[#4ECDC4]' : 'bg-[#FFE66D]'}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </section>

        <section id="stories" className="my-16 md:my-24">
          <AnimateOnScroll>
            <h2 className="text-4xl md:text-6xl font-anton text-center uppercase tracking-wider text-[#1E1E1E] mb-12">
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
                  color={index % 3 === 0 ? 'bg-[#FF6B6B]' : index % 3 === 1 ? 'bg-[#4ECDC4]' : 'bg-[#FFE66D]'}
                />
              </AnimateOnScroll>
            ))}
          </div>
        </section>


        <footer className="text-center py-12">
          <AnimateOnScroll>
            <p className="font-anton text-3xl md:text-5xl uppercase tracking-wide">
              A timeless epic of <br/> <span className="text-[#4ECDC4] underline decoration-wavy decoration-4 underline-offset-8">Dharma, Devotion, and Duty</span>
            </p>
          </AnimateOnScroll>
        </footer>
      </main>
      
      {selectedKanda && <KandaDetailModal kanda={selectedKanda} onClose={handleCloseModal} />}
    </div>
  );
};

export default App;