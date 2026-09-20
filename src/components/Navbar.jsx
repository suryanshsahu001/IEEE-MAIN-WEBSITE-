import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar({ onOpenChapters }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#home' },
    { name: 'ABOUT', href: '#about' },
    { name: 'EVENTS', href: '#events' },
    { name: 'GALLERY', href: '#gallery' },
    { name: 'TEAM', href: '#team' },
    { name: 'CONTACT', href: '#contact' },
  ];

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-200"
      style={{
        background: isScrolled ? 'rgba(255,255,255,0.98)' : 'rgba(255,255,255,0.95)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid #e4e4e7',
        boxShadow: isScrolled ? '0 1px 0 rgba(0,0,0,0.08)' : 'none',
      }}
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between h-16 sm:h-18">

          {/* Logo row */}
          <a href="#home" className="flex items-center justify-start gap-3 sm:gap-5 group mr-auto pr-4 lg:pr-8">
            <div className="flex items-center justify-center flex-shrink-0">
              <img
                src="./logos/adypu-logo.png"
                alt="Ajeenkya DY Patil University Logo"
                className="h-9 sm:h-11 w-auto object-contain transition-opacity group-hover:opacity-80"
              />
            </div>
            <div className="h-8 w-px bg-zinc-200 hidden sm:block flex-shrink-0" />
            <div className="flex items-center justify-center flex-shrink-0">
              <img
                src="./logos/ieee-stb-logo.png"
                alt="IEEE STB60205406 Logo"
                className="h-9 sm:h-11 w-auto object-contain mix-blend-multiply transition-opacity group-hover:opacity-80"
              />
            </div>
            <div className="h-8 w-px bg-zinc-200 hidden md:block flex-shrink-0" />
            <div className="hidden md:flex items-center justify-center flex-shrink">
              <img
                src="./logos/ieee-maharashtra-logo.png"
                alt="IEEE Maharashtra Section Logo"
                className="h-9 sm:h-11 max-w-[180px] lg:max-w-[240px] object-contain mix-blend-multiply transition-opacity group-hover:opacity-80"
              />
            </div>
          </a>

          {/* Desktop nav — Harvard style: clean mono text, underline hover */}
          <nav className="hidden lg:flex items-center gap-5 xl:gap-8 flex-shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-500 hover:text-zinc-900 transition-colors relative group py-1"
              >
                {link.name}
                {/* Harvard-style underline on hover */}
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  style={{ background: '#A51C30' }}
                />
              </a>
            ))}

            {/* Small Dropdown for More Options */}
            <div 
              className="relative"
              onMouseEnter={() => setMoreMenuOpen(true)}
              onMouseLeave={() => setMoreMenuOpen(false)}
            >
              <button
                className="text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-500 hover:text-zinc-900 transition-colors relative group py-1 flex items-center gap-1"
              >
                MORE
                <span
                  className="absolute bottom-0 left-0 right-0 h-0.5 origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-200"
                  style={{ background: '#A51C30' }}
                />
              </button>
              
              {moreMenuOpen && (
                <div className="absolute top-full right-0 mt-0 w-56 bg-white border border-zinc-200 shadow-xl py-2 animate-fadeIn z-50">
                  <a 
                    href="https://forms.gle/JSebyPxB8KsE5btm7" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block px-4 py-2 text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-600 hover:text-[#A51C30] hover:bg-zinc-50 transition-colors"
                  >
                    EXPLORE MEMBERSHIP
                  </a>
                  <button 
                    onClick={() => {
                      setMoreMenuOpen(false);
                      if (onOpenChapters) onOpenChapters();
                    }}
                    className="w-full text-left block px-4 py-2 text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-600 hover:text-[#A51C30] hover:bg-zinc-50 transition-colors"
                  >
                    CHAPTERS & SOCIETIES
                  </button>
                </div>
              )}
            </div>
          </nav>

          {/* Mobile toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 flex items-center justify-center border border-zinc-200 text-zinc-700 hover:border-zinc-900 transition-colors"
            aria-label="Toggle Navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-zinc-200 animate-fadeIn overflow-y-auto" style={{ maxHeight: 'calc(100vh - 4rem)' }}>
          <div className="max-w-7xl mx-auto px-6 py-4">

            {/* Regular nav links */}
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-between py-3 border-b border-zinc-100 text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-600 hover:text-zinc-900 transition-colors"
              >
                {link.name}
                <span style={{ color: '#A51C30' }}>→</span>
              </a>
            ))}

            {/* MORE section */}
            <p className="text-[9px] font-mono font-bold tracking-[0.2em] text-zinc-400 uppercase pt-4 pb-1">More</p>
            <a
              href="https://forms.gle/JSebyPxB8KsE5btm7"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-3 border-b border-zinc-100 text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              EXPLORE MEMBERSHIP
              <span style={{ color: '#A51C30' }}>→</span>
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                if (onOpenChapters) onOpenChapters();
              }}
              className="w-full flex items-center justify-between py-3 border-b border-zinc-100 text-[11px] font-mono font-bold tracking-[0.18em] text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              CHAPTERS &amp; SOCIETIES
              <span style={{ color: '#A51C30' }}>→</span>
            </button>

          </div>
        </div>
      )}
    </header>
  );
}
