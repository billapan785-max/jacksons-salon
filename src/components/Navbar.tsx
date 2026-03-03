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
      <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${scrolled || isMobileMenuOpen ? 'bg-black py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <Link to="/" className="text-xl md:text-2xl font-serif font-bold tracking-widest text-white">
            JACKSON'S
          </Link>
          
          {/* Desktop Links */}
          <div className="hidden md:flex space-x-8 text-sm uppercase tracking-widest font-medium">
            {navLinks.map((link) => renderLink(link))}
          </div>

          <div className="flex items-center space-x-4">
            <GlassButton 
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
              className="px-4 md:px-6 py-2 md:py-3 bg-white/10 text-white border border-white/20 font-bold text-[10px] md:text-xs uppercase tracking-widest rounded-full"
            >
              Book Now
            </GlassButton>
            
            {/* Mobile Menu Toggle */}
            <GlassButton 
              className="md:hidden text-white p-1"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
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
