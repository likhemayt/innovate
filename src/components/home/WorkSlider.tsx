import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { Observer } from 'gsap/dist/Observer';

import { motion } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, Observer);
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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const section = sectionRef.current;
      if (!container || !section) return;

      let animating = false;
      let currentIndex = 0;
      const totalItems = items.length;

      // Function to go to a specific index
      const goToIndex = (index: number) => {
        if (animating || index < 0 || index >= totalItems) return;
        animating = true;
        currentIndex = index;
        setCurrentIndex(index);

        const cardWidth = cardsRef.current[0]?.offsetWidth || 0;
        const gap = 48; // md:gap-12
        const scrollAmount = index * (cardWidth + gap);

        gsap.to(container, {
          x: -scrollAmount,
          duration: 1.2,
          ease: "expo.out",
          onComplete: () => {
            animating = false;
          }
        });

        // Animate card contents
        cardsRef.current.forEach((card, i) => {
          if (!card) return;
          const image = card.querySelector('img');
          const content = card.querySelector('.card-content');
          
          gsap.to(image, {
            scale: i === index ? 1.1 : 1,
            duration: 1.5,
            ease: "power2.out"
          });

          gsap.to(content, {
            opacity: i === index ? 1 : 0.3,
            y: i === index ? 0 : 20,
            duration: 1,
            ease: "power2.out"
          });
        });
      };

      // Set initial state
      gsap.set(container, { x: 0 });
      goToIndex(0);

      // ScrollTrigger for pinning
      const ST = ScrollTrigger.create({
        trigger: section,
        pin: true,
        start: "top top",
        end: () => `+=${totalItems * 100}%`,
        onUpdate: (self) => {
           // We can use progress to drive indices if we want, 
           // but Observer is better for event-based.
        }
      });

      // Observer for event-based transitions
      const obs = Observer.create({
        target: window,
        type: "wheel,touch,pointer",
        wheelSpeed: -1,
        onDown: () => {
          if (!animating && currentIndex > 0 && ST.isActive) {
            goToIndex(currentIndex - 1);
          }
        },
        onUp: () => {
          if (!animating && currentIndex < totalItems - 1 && ST.isActive) {
            goToIndex(currentIndex + 1);
          }
        },
        tolerance: 10,
        preventDefault: false, // Don't prevent native scroll yet
      });

    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className="bg-black py-20 md:py-32 overflow-hidden h-screen flex flex-col justify-center">
      <div className="px-6 md:px-24 mb-10 md:mb-20">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">{title}</h2>
          <div className="flex items-center gap-4">
            <span className="text-white/20 text-4xl md:text-6xl font-black tracking-tighter">{(currentIndex + 1).toString().padStart(2, '0')}</span>
            <div className="h-px w-12 md:w-24 bg-white/20">
               <motion.div 
                 className="h-full bg-white"
                 animate={{ width: `${((currentIndex + 1) / items.length) * 100}%` }}
               />
            </div>
            <span className="text-white/20 text-4xl md:text-6xl font-black tracking-tighter">{items.length.toString().padStart(2, '0')}</span>
          </div>
        </div>
      </div>

      <div ref={containerRef} className="flex gap-6 md:gap-12 px-6 md:px-24 w-max items-center">
        {items.map((item, i) => (
          <div 
            key={item.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className={`group relative w-[85vw] md:w-[65vw] lg:w-[55vw] aspect-[16/10] md:aspect-[16/9] flex-shrink-0 overflow-hidden rounded-[2rem] md:rounded-[3rem] bg-neutral-900 shadow-2xl transition-all duration-700 ${currentIndex === i ? 'opacity-100 scale-100' : 'opacity-40 scale-95'}`}
          >
            <div className="absolute inset-0 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/20 transition-colors duration-700" />
            </div>

            <div className="card-content absolute inset-0 p-6 md:p-16 flex flex-col justify-end">
              <span className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.3em] mb-2 md:mb-4">{item.category}</span>
              <h3 className="text-white text-3xl md:text-7xl font-bold tracking-tighter mb-4 md:mb-6 leading-none">{item.title}</h3>
              <p className="text-white/40 text-sm md:text-lg max-w-md line-clamp-2 mb-6 md:mb-10 group-hover:text-white/80 transition-colors leading-relaxed">{item.description}</p>
              
              <div className="flex items-center gap-4 group/btn cursor-pointer w-fit">
                <div className="h-10 w-10 md:h-16 md:w-16 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500">
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="-rotate-45 md:w-8 md:h-8 group-hover/btn:rotate-0 transition-transform duration-500"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
                <span className="text-white font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">Explore Project</span>
              </div>
            </div>
          </div>
        ))}
        {/* Large spacer at the end */}
        <div className="w-[10vw] md:w-[20vw] flex-shrink-0" />
      </div>

      {/* Mobile Indicator */}
      <div className="md:hidden mt-10 px-6 flex justify-center gap-2">
         {items.map((_, i) => (
           <div 
             key={i} 
             className={`h-1 rounded-full transition-all duration-500 ${currentIndex === i ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
           />
         ))}
      </div>
    </section>
  );
};

export default WorkSlider;
