import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

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

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const section = sectionRef.current;
      if (!container || !section) return;

      // 1. Horizontal Scroll Tween
      const scrollTween = gsap.to(container, {
        x: () => -(container.scrollWidth - window.innerWidth),
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${container.scrollWidth}`,
          invalidateOnRefresh: true,
        }
      });

      // 2. Velocity-based Skew Effect
      let proxy = { skew: 0 };
      const skewSetter = gsap.quickSetter(container, "skewX", "deg");
      const clamp = gsap.utils.clamp(-10, 10);

      ScrollTrigger.create({
        onUpdate: (self) => {
          const skew = clamp(self.getVelocity() / -400);
          if (Math.abs(skew) > Math.abs(proxy.skew)) {
            proxy.skew = skew;
            gsap.to(proxy, {
              skew: 0,
              duration: 0.8,
              ease: "power3",
              overwrite: true,
              onUpdate: () => skewSetter(proxy.skew)
            });
          }
        }
      });

      // 3. Per-card Interactive Animations (using containerAnimation)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        
        const image = card.querySelector('img');
        const textElements = card.querySelectorAll('.card-content > *');

        // Image Parallax
        gsap.to(image, {
          x: -100,
          ease: "none",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left right",
            end: "right left",
            scrub: true
          }
        });

        // Content Stagger Reveal
        gsap.from(textElements, {
          y: 50,
          opacity: 0,
          stagger: 0.1,
          duration: 1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            containerAnimation: scrollTween,
            start: "left 80%",
            toggleActions: "play none none reverse"
          }
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [items]);

  return (
    <section ref={sectionRef} className="bg-black py-32 overflow-hidden">
      <div className="px-6 md:px-24 mb-20">
        <h2 className="text-white text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.8]">{title}</h2>
      </div>

      <div ref={containerRef} className="flex gap-12 px-6 md:px-24 w-max items-center">
        {items.map((item, i) => (
          <div 
            key={item.id}
            ref={(el) => (cardsRef.current[i] = el)}
            className="group relative w-[85vw] md:w-[65vw] lg:w-[50vw] aspect-[16/10] flex-shrink-0 overflow-hidden rounded-[2.5rem] bg-neutral-900 shadow-2xl"
          >
            <div className="absolute inset-0 scale-110 overflow-hidden">
              <img 
                src={item.image} 
                alt={item.title} 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-700" />
            </div>

            <div className="card-content absolute inset-0 p-8 md:p-16 flex flex-col justify-end">
              <span className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-4">{item.category}</span>
              <h3 className="text-white text-4xl md:text-7xl font-bold tracking-tighter mb-6 leading-none">{item.title}</h3>
              <p className="text-white/40 text-lg max-w-md line-clamp-2 mb-8 group-hover:text-white/80 transition-colors leading-relaxed">{item.description}</p>
              
              <div className="flex items-center gap-4 group/btn cursor-pointer w-fit">
                <div className="h-14 w-14 rounded-full border border-white/20 flex items-center justify-center group-hover/btn:bg-white group-hover/btn:text-black transition-all duration-500">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" className="-rotate-45 group-hover/btn:rotate-0 transition-transform duration-500"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                </div>
                <span className="text-white font-bold uppercase tracking-[0.2em] text-xs">Explore Project</span>
              </div>
            </div>
          </div>
        ))}
        {/* Large spacer at the end */}
        <div className="w-[20vw] flex-shrink-0" />
      </div>
    </section>
  );
};

export default WorkSlider;
