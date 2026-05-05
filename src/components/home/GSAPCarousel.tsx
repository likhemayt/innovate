import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

// Register plugin outside or inside useLayoutEffect safely
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
  const totalItems = items.length;

  // Handle image loading to ensure scrollWidth is calculated correctly
  const handleImageLoad = () => {
    setImagesLoaded((prev) => prev + 1);
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const container = containerRef.current;
      const trigger = triggerRef.current;
      
      if (!container || !trigger) return;

      // Calculate total scroll distance
      // We use a function for end to handle resizing
      const getScrollAmount = () => {
        return -(container.scrollWidth - window.innerWidth + (window.innerWidth > 768 ? 192 : 48)); // Adjust for padding
      };

      const totalWidth = container.scrollWidth;
      const windowWidth = window.innerWidth;
      const amountToScroll = totalWidth - windowWidth;

      if (amountToScroll <= 0) return;

      gsap.to(container, {
        x: -amountToScroll,
        ease: "none",
        scrollTrigger: {
          trigger: trigger,
          pin: true,
          scrub: 1,
          start: "top top",
          // The end should be proportional to the content width for a consistent scroll speed
          end: () => `+=${container.scrollWidth}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, triggerRef);

    return () => ctx.revert();
  }, [items, imagesLoaded]); // Re-run when items change or images load

  return (
    <section className="overflow-hidden bg-white py-24">
      <div ref={triggerRef} className="max-w-[100vw] flex flex-col justify-center min-h-screen">
        <div className="px-6 md:px-24 mb-12">
          <h2 className="text-4xl md:text-7xl font-extrabold tracking-tighter text-black uppercase">{title}</h2>
        </div>
        
        <div 
          ref={containerRef} 
          className="flex gap-8 px-6 md:px-24 w-max items-center"
        >
          {items.map((item) => (
            <div 
              key={item.id} 
              className="group relative w-[300px] md:w-[700px] h-[400px] md:h-[600px] flex-shrink-0 overflow-hidden rounded-[2rem] bg-neutral-100 transition-all duration-500 hover:rounded-3xl"
            >
              {item.image ? (
                <img 
                  src={item.image} 
                  alt={item.title} 
                  onLoad={handleImageLoad}
                  className="h-full w-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
              ) : (
                <div className="h-full w-full bg-neutral-900 flex items-center justify-center">
                   <span className="text-neutral-700 text-9xl font-black">{item.id}</span>
                </div>
              )}
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent p-8 md:p-12 flex flex-col justify-end translate-y-6 opacity-0 transition-all duration-700 ease-out group-hover:translate-y-0 group-hover:opacity-100">
                {item.category && (
                  <span className="text-white/60 text-xs font-bold uppercase tracking-[0.3em] mb-4">
                    {item.category}
                  </span>
                )}
                <h3 className="text-3xl md:text-5xl font-bold text-white mb-4 tracking-tighter leading-none">{item.title}</h3>
                <p className="text-white/70 text-base md:text-lg line-clamp-2 max-w-lg leading-relaxed">{item.description}</p>
                
                <div className="mt-8 flex items-center gap-4">
                   <div className="h-px w-12 bg-white/30 group-hover:w-24 transition-all duration-700"></div>
                   <span className="text-white text-sm font-bold uppercase tracking-widest">Explore Project</span>
                </div>
              </div>
            </div>
          ))}
          
          {/* Large spacer at the end for better feel */}
          <div className="w-[10vw] md:w-[20vw] flex-shrink-0" />
        </div>
      </div>
    </section>
  );
};

export default GSAPCarousel;

