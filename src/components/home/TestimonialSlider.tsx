import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Title reveal
      gsap.from(".testimonial-title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power4.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        }
      });

      // 2. Staggered card entry
      gsap.from(cardsRef.current, {
        y: 80,
        opacity: 0,
        stagger: 0.15,
        duration: 1.2,
        scale: 0.95,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
        }
      });

      // 3. Floating animation for cards
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.to(card, {
          y: -15,
          duration: 2 + (i * 0.5),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: i * 0.2
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 px-6 md:px-24 bg-[#fafafa] overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        <h2 className="testimonial-title text-5xl md:text-8xl lg:text-[8rem] font-black tracking-tighter mb-24 uppercase text-center leading-none">{title}</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          {items.map((item, i) => (
            <div 
              key={item.id} 
              ref={(el) => (cardsRef.current[i] = el)}
              className="group bg-white p-10 md:p-14 rounded-[3rem] border border-neutral-100 transition-all duration-700 hover:border-black hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] relative flex flex-col justify-between min-h-[450px]"
            >
              {/* Large quote icon background */}
              <div className="absolute top-10 right-10 text-neutral-100 group-hover:text-black/5 transition-colors duration-700 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H11.017V21H14.017ZM5.017 21L5.017 18C5.017 16.8954 5.91243 16 7.017 16H10.017C10.5693 16 11.017 15.5523 11.017 15V9C11.017 8.44772 10.5693 8 10.017 8H7.017C6.46472 8 6.017 8.44772 6.017 9V12C6.017 12.5523 5.56929 13 5.017 13H2.017V21H5.017Z"/></svg>
              </div>

              <div className="relative z-10 flex-grow">
                <div className="mb-10 text-neutral-300 group-hover:text-black transition-colors duration-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 2.5 0 5-2 7z"/><path d="M14 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h1c0 1 0 1 1 1 0 2.5 0 5-2 7z"/></svg>
                </div>
                <p className="text-xl md:text-2xl font-medium leading-[1.6] mb-12 text-neutral-700 tracking-tight">"{item.description}"</p>
              </div>
              
              <div className="relative z-10 pt-8 border-t border-neutral-100 group-hover:border-neutral-200 transition-colors">
                <h4 className="text-xl font-bold tracking-tight mb-1">{item.category.split(',')[0]}</h4>
                <p className="text-sm text-neutral-400 font-bold uppercase tracking-[0.2em]">{item.category.split(',')[1]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSlider;
