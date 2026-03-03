import React from 'react';
import { Instagram, Facebook, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassButton } from './GlassButton';

export const Footer = () => {
  return (
    <footer className="bg-black py-12 md:py-16 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="text-3xl font-serif font-bold tracking-widest text-white">
              JACKSON'S SALON F11
            </div>
            <p className="text-white/40 max-w-md leading-relaxed">
              Islamabad's premier destination for high-end grooming and luxury salon services. 
              We combine traditional techniques with modern style to create your perfect look.
            </p>
            <div className="flex space-x-4">
              <GlassButton 
                as="a"
                href="https://www.instagram.com/jacksonssalon/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </GlassButton>
              <GlassButton 
                as="a"
                href="https://web.facebook.com/p/Jacksons-salon-100039597536552/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-3 bg-white/5 rounded-full hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </GlassButton>
            </div>
          </div>
          
          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Quick Links</h4>
            <ul className="space-y-3 text-white/60">
              <li><GlassButton as={Link} to="/" className="hover:text-white transition-colors">Home</GlassButton></li>
              <li><GlassButton as="a" href="/#services" className="hover:text-white transition-colors">Services</GlassButton></li>
              <li><GlassButton as={Link} to="/vibes" className="hover:text-white transition-colors">Our Vibes</GlassButton></li>
              <li><GlassButton as="a" href="/#locations" className="hover:text-white transition-colors">Locations</GlassButton></li>
              <li><GlassButton as="a" href="/#reviews" className="hover:text-white transition-colors">Reviews</GlassButton></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-sm font-bold uppercase tracking-widest text-white">Newsletter</h4>
            <p className="text-xs text-white/40">Subscribe for exclusive offers and style tips.</p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Email Address" 
                className="bg-white/5 border border-white/10 px-4 py-3 rounded-l-xl focus:outline-none focus:border-white w-full"
              />
              <GlassButton className="bg-white/10 text-white border border-white/20 px-4 py-3 rounded-r-xl">
                <ChevronRight size={20} />
              </GlassButton>
            </div>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 text-center text-xs text-white/30 uppercase tracking-[0.2em]">
          &copy; {new Date().getFullYear()} Jackson's Salon f11. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};
