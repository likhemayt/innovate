import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface Testimonial {
  id: number;
  title: string;
  category: string;
  description: string;
}

interface TestimonialSliderProps {
  items: Testimonial[];
  title: string;
}

const TestimonialSlider: React.FC<TestimonialSliderProps> = ({ items, title }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToIndex = (index: number) => {
    if (index < 0 || index >= items.length) return;
    
    // Only use carousel logic if we're not in the desktop grid (checked via window width)
    if (window.innerWidth >= 1024) return;

    setCurrentIndex(index);
    const container = containerRef.current;
    if (!container) return;

    const cardWidth = cardsRef.current[0]?.offsetWidth || 0;
    const gap = 24; // Standard mobile gap
    const scrollAmount = index * (cardWidth + gap);

    gsap.to(container, {
      x: -scrollAmount,
      duration: 1,
      ease: "expo.out",
    });
  };

  const nextSlide = () => goToIndex(currentIndex + 1);
  const prevSlide = () => goToIndex(currentIndex - 1);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // reveal animation for the whole section
      gsap.from(".testimonial-header", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 md:py-48 px-6 md:px-24 bg-[#fafafa] overflow-hidden" data-bgcolor="#f5f5f5">
      <div className="max-w-[1440px] mx-auto">
        <div className="testimonial-header flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16 md:mb-24">
          <div className="max-w-3xl">
            <h2 className="text-[clamp(3.5rem,9vw,11rem)] font-black tracking-[-0.05em] uppercase leading-[0.8]">{title}</h2>
          </div>
          
          {/* Navigation Controls - only visible on carousel breakpoints */}
          <div className="flex items-center gap-4 lg:hidden">
            <button 
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className={`h-14 w-14 rounded-full border border-black/10 flex items-center justify-center transition-all ${currentIndex === 0 ? 'opacity-20' : 'hover:bg-black hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rotate-180"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
            <button 
              onClick={nextSlide}
              disabled={currentIndex === items.length - 1}
              className={`h-14 w-14 rounded-full border border-black/10 flex items-center justify-center transition-all ${currentIndex === items.length - 1 ? 'opacity-20' : 'hover:bg-black hover:text-white'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
            </button>
          </div>
        </div>
        
        {/* Container: Carousel on mobile/tablet, Grid on desktop */}
        <div 
          ref={containerRef}
          className="flex lg:grid lg:grid-cols-3 gap-6 md:gap-12"
        >
          {items.map((item, i) => (
            <div 
              key={item.id} 
              ref={(el) => (cardsRef.current[i] = el)}
              className="group bg-white p-10 md:p-14 rounded-[3rem] border border-neutral-100 transition-all duration-700 hover:border-black hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative flex flex-col justify-between min-h-[400px] md:min-h-[450px] w-[85vw] md:w-[45vw] lg:w-auto flex-shrink-0 lg:flex-shrink"
            >
              <div className="absolute top-10 right-10 text-neutral-100 group-hover:text-black/5 transition-colors duration-700 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H2.017V21H5.017Z"/></svg>
              </div>

              <div className="relative z-10 flex-grow">
                <div className="mb-8 text-neutral-300 group-hover:text-black transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 2.5 0 5-2 7z"/><path d="M14 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h1c0 1 0 1 1 1 0 2.5 0 5-2 7z"/></svg>
                </div>
                <p className="text-lg md:text-2xl font-medium leading-[1.6] mb-10 text-neutral-700 tracking-tight">"{item.description}"</p>
              </div>
              
              <div className="relative z-10 pt-8 border-t border-neutral-100 group-hover:border-neutral-200 transition-colors">
                <h4 className="text-lg md:text-xl font-bold tracking-tight mb-1">{item.category.split(',')[0]}</h4>
                <p className="text-[10px] md:text-xs text-neutral-400 font-bold uppercase tracking-[0.2em]">{item.category.split(',')[1]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
