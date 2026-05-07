import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Check if device is touch-capable
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    const label = labelRef.current;
    if (!cursor || !follower || !label) return;

    // QuickTo for smooth, lagging follower
    const xTo = gsap.quickTo(follower, "x", { duration: 0.4, ease: "power3" });
    const yTo = gsap.quickTo(follower, "y", { duration: 0.4, ease: "power3" });

    const onMouseMove = (e: MouseEvent) => {
      // Cursor follows instantly
      gsap.set(cursor, { x: e.clientX, y: e.clientY });
      // Follower lags behind smoothly
      xTo(e.clientX);
      yTo(e.clientY);
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('[data-cursor]');
      const link = target.closest('a, button');

      if (interactive) {
        const type = (interactive as HTMLElement).getAttribute('data-cursor');
        setCursorText(type?.toUpperCase() || '');
        
        gsap.to(follower, {
          width: 120,
          height: 120,
          backgroundColor: "rgba(0,0,0,0.9)",
          borderColor: "rgba(0,0,0,0.9)",
          duration: 0.4,
          ease: "expo.out"
        });
        gsap.to(label, { opacity: 1, scale: 1, duration: 0.3 });
        gsap.to(cursor, { opacity: 0, duration: 0.2 });
      } else if (link) {
        gsap.to(follower, {
          width: 60,
          height: 60,
          backgroundColor: "rgba(0,0,0,0.05)",
          borderColor: "rgba(0,0,0,0.1)",
          duration: 0.4,
          ease: "expo.out"
        });
        gsap.to(cursor, { scale: 0.5, duration: 0.2 });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactive = target.closest('[data-cursor]');
      const link = target.closest('a, button');

      if (interactive || link) {
        gsap.to(follower, {
          width: 40,
          height: 40,
          backgroundColor: "transparent",
          borderColor: "rgba(0,0,0,0.2)",
          duration: 0.4,
          ease: "expo.out"
        });
        gsap.to(label, { opacity: 0, scale: 0.5, duration: 0.3 });
        gsap.to(cursor, { opacity: 1, scale: 1, duration: 0.2 });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <>
      {/* Small dot - follows instantly */}
      <div 
        ref={cursorRef} 
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-black rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 hidden md:block"
      />
      {/* Follower ring - lags behind with label */}
      <div 
        ref={followerRef} 
        className="fixed top-0 left-0 w-10 h-10 border border-black/20 rounded-full pointer-events-none z-[9997] -translate-x-1/2 -translate-y-1/2 hidden md:flex items-center justify-center overflow-hidden"
      >
        <span 
          ref={labelRef} 
          className="text-[10px] font-black text-white opacity-0 scale-50 tracking-widest absolute"
        >
          {cursorText}
        </span>
      </div>
    </>
  );
};

export default CustomCursor;
