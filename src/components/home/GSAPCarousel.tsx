import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface CarouselItem {
  id: number;
  title: string;
  description: string;
  image?: string;
  category?: string;
}

interface GSAPCarouselProps {
  items: CarouselItem[];
  title: string;
}

const GSAPCarousel: React.FC<GSAPCarouselProps> = ({ items, title }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const totalWidth = container.scrollWidth - container.offsetWidth;

    const pin = gsap.fromTo(
      container,
      { x: 0 },
      {
        x: -totalWidth,
        ease: "none",
        scrollTrigger: {
          trigger: triggerRef.current,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${container.scrollWidth}`,
          invalidateOnRefresh: true,
        },
      }
    );

    return () => {
      pin.kill();
    };
  }, [items]);

  return (
    <section className="overflow-hidden bg-white py-24">
      <div ref={triggerRef} className="max-w-[100vw]">
        <div className="px-6 md:px-24 mb-12">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-black">{title}</h2>
        </div>
        
        <div 
          ref={containerRef} 
          className="flex gap-8 px-6 md:px-24 w-max"
        >
          {items.map((item) => (
            <div 
              key={item.id} 
              className="group relative w-[350px] md:w-[600px] h-[400px] md:h-[600px] flex-shrink-0 overflow-hidden rounded-2xl bg-neutral-100"
            >
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              ) : (
                <div className="h-full w-full bg-neutral-900 flex items-center justify-center">
                   <span className="text-neutral-700 text-8xl font-black">{item.id}</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent p-8 flex flex-col justify-end translate-y-4 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {item.category && (
                  <span className="text-white/60 text-xs font-semibold uppercase tracking-widest mb-2">
                    {item.category}
                  </span>
                )}
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-white/80 text-sm md:text-base line-clamp-2 max-w-sm">{item.description}</p>
              </div>
            </div>
          ))}
          
          {/* Spacer for padding at the end */}
          <div className="w-24 flex-shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default GSAPCarousel;
