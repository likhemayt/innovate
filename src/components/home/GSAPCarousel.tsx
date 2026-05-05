import React, { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register plugin safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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
  const [imagesLoaded, setImagesLoaded] = useState(0);

  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const trigger = triggerRef.current;
      
      if (!container || !trigger) return;

      const getScrollAmount = () => {
        const containerWidth = container.scrollWidth;
        const windowWidth = window.innerWidth;
        return -(containerWidth - windowWidth);
      };

      gsap.to(container, {
        x: getScrollAmount,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: "top top",
          end: () => `+=${container.scrollWidth - window.innerWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [items, imagesLoaded]);

  return (
    <section className="overflow-hidden bg-white py-24 relative z-10">
      <div ref={triggerRef} className="max-w-[100vw] flex flex-col justify-center min-h-screen">
        <div className="px-6 md:px-24 mb-12">
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-black uppercase leading-none">{title}</h2>
        </div>
        
        <div 
          ref={containerRef} 
          className="flex gap-8 px-6 md:px-24 w-max items-center"
        >
          {items.map((item) => (
            <div 
              key={`${item.id}-${item.title}`} 
              className="group relative w-[320px] md:w-[700px] h-[450px] md:h-[600px] flex-shrink-0 overflow-hidden rounded-[2.5rem] bg-neutral-100 transition-all duration-700 ease-in-out hover:rounded-3xl hover:shadow-2xl hover:shadow-black/10"
            >
              {/* Background Content (Image or Fallback) */}
              <div className="absolute inset-0 z-0">
                {item.image ? (
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    onLoad={handleImageLoad}
                    className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                ) : (
                  <div className="h-full w-full bg-neutral-50 flex flex-col items-center justify-center p-12 text-center border-2 border-dashed border-neutral-200 rounded-[2.5rem]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" className="text-neutral-300 mb-6"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1 0 2.5 0 5-2 7z"/><path d="M14 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h1c0 1 0 1 1 1 0 2.5 0 5-2 7z"/></svg>
                    <span className="text-neutral-400 text-xs font-bold uppercase tracking-[0.5em] mb-4">Quote</span>
                    <div className="w-12 h-0.5 bg-neutral-200"></div>
                  </div>
                )}
              </div>
              
              {/* Overlay Content */}
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-8 md:p-12 flex flex-col justify-end translate-y-8 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                {item.category && (
                  <span className="text-white/60 text-[10px] md:text-xs font-bold uppercase tracking-[0.4em] mb-4 block">
                    {item.category}
                  </span>
                )}
                <h3 className="text-2xl md:text-5xl font-bold text-white mb-4 tracking-tighter leading-none">{item.title}</h3>
                <p className="text-white/70 text-sm md:text-lg line-clamp-2 max-w-lg leading-relaxed">{item.description}</p>
                
                <div className="mt-8 flex items-center gap-4">
                   <div className="h-px w-10 bg-white/30 group-hover:w-20 transition-all duration-700"></div>
                   <span className="text-white text-[10px] md:text-xs font-bold uppercase tracking-widest">Details</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Spacer at the end */}
          <div className="w-[15vw] md:w-[25vw] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default GSAPCarousel;
