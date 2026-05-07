import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'About', href: '/about' },
  { name: 'Work', href: '/work' },
];

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    console.log('Toggle menu clicked, current state:', isOpen);
    setIsOpen(!isOpen);
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    // Find the global lenis instance if it exists
    const lenis = (window as any).lenis;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      if (lenis) lenis.stop();
    } else {
      document.body.style.overflow = 'unset';
      if (lenis) lenis.start();
    }
  }, [isOpen]);

  return (
    <>
      <header 
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 pointer-events-none ${
          scrolled ? 'py-4' : 'py-8'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 pointer-events-auto">
          <div className={`glass-nav rounded-full px-6 md:px-10 h-16 md:h-20 flex items-center justify-between transition-all duration-500 ${
            scrolled ? 'shadow-lg border-neutral-200/50' : 'border-transparent'
          }`}>
            {/* Logo */}
            <a href="/" className="text-xl md:text-2xl font-bold tracking-tighter uppercase group">
              Innovate<span className="text-neutral-400 group-hover:text-black transition-colors">.</span>
            </a>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-10">
              {navItems.map((item) => (
                <a 
                  key={item.name}
                  href={item.href} 
                  className="text-sm font-semibold text-neutral-500 hover:text-black transition-all relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-black transition-all duration-300 group-hover:w-full" />
                </a>
              ))}
            </nav>

            {/* CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              <a 
                href="/contact" 
                className="hidden md:inline-flex items-center justify-center px-8 py-3 text-sm font-bold text-white bg-black rounded-full hover:bg-neutral-800 transition-all hover:scale-105 active:scale-95 shadow-xl shadow-black/10"
              >
                Get in touch
              </a>
              <button 
                onClick={toggleMenu}
                className="md:hidden w-10 h-10 flex flex-col items-center justify-center gap-1.5 focus:outline-none z-50"
                aria-label="Toggle Menu"
              >
                <motion.span 
                  animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-black block" 
                />
                <motion.span 
                  animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="w-6 h-0.5 bg-black block" 
                />
                <motion.span 
                  animate={isOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                  className="w-6 h-0.5 bg-black block" 
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[90] bg-white md:hidden flex flex-col pt-28 pb-10 px-10 overflow-y-auto"
          >
            {/* Nav Links */}
            <nav className="flex flex-col gap-6 flex-1">
              {navItems.map((item, index) => (
                <motion.a
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="text-5xl font-extrabold tracking-tighter hover:text-neutral-400 transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </nav>

            {/* Bottom Section: Connect + CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45 }}
              className="mt-auto flex flex-col gap-8"
            >
              <div>
                <p className="text-neutral-400 text-sm font-medium mb-4 uppercase tracking-widest">Connect</p>
                <div className="flex gap-6">
                  <a href="https://linkedin.com/company/innovate" className="font-bold text-lg">LinkedIn</a>
                  <a href="https://twitter.com/innovate" className="font-bold text-lg">Twitter</a>
                  <a href="https://instagram.com/innovate" className="font-bold text-lg">Instagram</a>
                </div>
              </div>

              <a 
                href="/contact" 
                onClick={() => setIsOpen(false)}
                className="inline-flex items-center justify-center w-full py-5 text-xl font-bold text-white bg-black rounded-3xl hover:bg-neutral-800 transition-colors active:scale-95"
              >
                Let's Talk
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
