import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link, useLocation } from 'react-router-dom';
import { GlassButton } from './GlassButton';

interface NavLink {
  name: string;
  href: string;
  isHash: boolean;
}

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: NavLink[] = [
    { name: 'Home', href: '/', isHash: false },
    { name: 'Services', href: '/#services', isHash: true },
    { name: 'Our Vibes', href: '/vibes', isHash: false },
    { name: 'Locations', href: '/#locations', isHash: true },
    { name: 'Reviews', href: '/#reviews', isHash: true },
    { name: 'Admin', href: '/admin', isHash: false },
  ];

  const renderLink = (link: NavLink, mobile = false) => {
    const className = mobile 
      ? "text-2xl font-serif font-bold text-white py-2" 
      : "hover:text-white transition-colors";
    const onClick = () => mobile && setIsMobileMenuOpen(false);

    if (link.name === 'Our Vibes' || link.name === 'Admin') {
      return (
        <GlassButton key={link.name} as={Link} to={link.href} onClick={onClick} className={className}>
          {link.name}
        </GlassButton>
      );
    }

    if (link.name === 'Home') {
      return (
        <GlassButton key={link.name} as={Link} to="/" onClick={onClick} className={className}>
          {link.name}
        </GlassButton>
      );
    }

    return (
      <GlassButton key={link.name} as="a" href={link.href} onClick={onClick} className={className}>
        {link.name}
      </GlassButton>
    );
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'bg-black py-3 md:py-4 border-b border-white/10' : 'bg-transparent py-4 md:py-6'}`}>
        <div className="container mx-auto px-4 md:px-6 flex justify-between items-center gap-2 md:gap-4">
          <Link to="/" className="flex flex-col items-center justify-center border border-white/80 p-1 md:p-1.5 hover:bg-white/5 transition-colors shrink-0">
            <span className="text-sm sm:text-base md:text-xl font-serif tracking-[0.2em] leading-none text-white font-light">
              JACKSON'S
            </span>
            <div className="flex items-center w-full mt-1 opacity-80">
              <div className="h-[1px] bg-white flex-grow"></div>
              <span className="text-[6px] sm:text-[7px] md:text-[9px] font-serif tracking-[0.3em] mx-1 md:mx-1.5 leading-none flex items-center text-white font-light">
                
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-0.5 md:ml-1 md:w-2.5 md:h-2.5">
                  <circle cx="6" cy="6" r="3"></circle>
                  <circle cx="6" cy="18" r="3"></circle>
                  <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                  <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                  <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                </svg>
              </span>
              <div className="h-[1px] bg-white flex-grow"></div>
            </div>
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden lg:flex space-x-6 xl:space-x-8 text-sm uppercase tracking-widest font-medium">
            {navLinks.map((link) => renderLink(link))}
          </div>

          <div className="flex items-center space-x-2 md:space-x-4 shrink-0">
            <GlassButton 
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
              className="px-3 md:px-6 py-1.5 md:py-3 bg-white/10 text-white border border-white/20 font-bold text-[9px] md:text-xs uppercase tracking-widest rounded-full whitespace-nowrap"
            >
              Book Now
            </GlassButton>
            
            {/* Mobile Menu Toggle */}
            <GlassButton 
              className="lg:hidden text-white p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={20} className="md:w-6 md:h-6" /> : <Menu size={20} className="md:w-6 md:h-6" />}
            </GlassButton>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black pt-24 px-6 md:hidden"
          >
            <div className="flex flex-col space-y-6 text-center">
              {navLinks.map((link) => renderLink(link, true))}
              <div className="pt-8">
                <GlassButton 
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.dispatchEvent(new CustomEvent('open-booking'));
                  }}
                  className="w-full py-4 bg-white/10 text-white border border-white/20 font-bold uppercase tracking-widest rounded-full"
                >
                  Book Appointment
                </GlassButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
