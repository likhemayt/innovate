import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface WorkSliderProps {
  items: WorkItem[];
  title: string;
}

const WorkSlider: React.FC<WorkSliderProps> = ({ items, title }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToIndex = (index: number) => {
    if (index < 0 || index >= items.length) return;
    
    setCurrentIndex(index);
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = cardsRef.current[0]?.offsetWidth || 0;
    const gap = window.innerWidth > 768 ? 48 : 24;
    const scrollAmount = index * (cardWidth + gap);

    gsap.to(container, {
      x: -scrollAmount,
      duration: 1.2,
      ease: "expo.out",
    });

    // Parallax and Scale effects
    cardsRef.current.forEach((card, i) => {
      if (!card) return;
      const image = card.querySelector('img');
      gsap.to(image, {
        x: i === index ? 0 : (i < index ? -50 : 50),
        scale: i === index ? 1.1 : 1,
        duration: 1.5,
        ease: "power2.out"
      });
    });
  };

  const nextSlide = () => goToIndex(currentIndex + 1);
  const prevSlide = () => goToIndex(currentIndex - 1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Pinning the section briefly for impact
      ScrollTrigger.create({
        trigger: sectionRef.current,
        pin: true,
        start: "top top",
        end: "+=100%",
        pinSpacing: true,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-black py-12 md:py-32 overflow-hidden min-h-[85vh] md:h-screen flex flex-col justify-center">
      <div className="px-6 md:px-24 mb-12 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-2xl">
            <h2 className="text-white text-5xl md:text-9xl font-black tracking-tighter uppercase leading-[0.8] mb-8">{title}</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <span className="text-white text-xl font-bold tracking-tighter">{(currentIndex + 1).toString().padStart(2, '0')}</span>
                <div className="h-px w-20 bg-white/20 relative overflow-hidden">
                   <motion.div 
                     className="absolute inset-0 bg-white"
                     initial={{ x: '-100%' }}
                     animate={{ x: `${((currentIndex + 1) / items.length) * 100 - 100}%` }}
                     transition={{ duration: 0.8, ease: "circOut" }}
                   />
                </div>
                <span className="text-white/20 text-xl font-bold tracking-tighter">{items.length.toString().padStart(2, '0')}</span>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-4">
            <button 
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`group h-16 w-16 md:h-24 md:w-24 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${currentIndex === 0 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white hover:text-black hover:border-white'}`}
              aria-label="Previous Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentIndex === items.length - 1}
              className={`group h-16 w-16 md:h-24 md:w-24 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500 ${currentIndex === items.length - 1 ? 'opacity-20 cursor-not-allowed' : 'hover:bg-white hover:text-black hover:border-white'}`}
              aria-label="Next Project"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="flex gap-6 md:gap-12 px-6 md:px-24 w-max items-center">
        {items.map((item, i) => (
          <div 
            key={item.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`group relative w-[85vw] md:w-[70vw] lg:w-[60vw] aspect-[16/10] md:aspect-[21/10] flex-shrink-0 overflow-hidden rounded-[2.5rem] md:rounded-[4rem] bg-neutral-900 shadow-2xl transition-all duration-1000 ease-in-out ${currentIndex === i ? 'opacity-100 scale-100' : 'opacity-20 scale-[0.9] blur-[2px]'}`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-700" />
            </div>

            <div className={`card-content absolute inset-0 p-8 md:p-20 flex flex-col justify-end transition-all duration-700 delay-300 ${currentIndex === i ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <span className="text-white/60 text-xs md:text-sm font-bold uppercase tracking-[0.4em] mb-4">{item.category}</span>
              <h3 className="text-white text-4xl md:text-8xl font-bold tracking-tighter mb-6 leading-none">{item.title}</h3>
              <p className="text-white/40 text-base md:text-xl max-w-xl line-clamp-2 mb-10 group-hover:text-white/80 transition-colors leading-relaxed">{item.description}</p>
              
              <div className="flex items-center gap-6 group/btn cursor-pointer w-fit">
                <div className="h-14 w-14 md:h-20 md:w-20 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="-rotate-45 md:w-10 md:h-10 group-hover/btn:rotate-0 transition-transform duration-500"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
                <span className="text-white font-bold uppercase tracking-[0.3em] text-xs md:text-sm">View Case Study</span>
              </div>
            </div>
          </div>
        ))}
        {/* Spacer for layout */}
        <div className="w-[10vw] md:w-[20vw] flex-shrink-0" />
      </div>
    </section>
  );
};

export default WorkSlider;
