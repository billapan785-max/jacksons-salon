import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Scissors, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassButton } from './GlassButton';

export const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img 
          src="https://lh3.googleusercontent.com/gps-cs-s/AHVAweoDudBVF1vz3HW1D16bIDBjd7pX99syN4-TfYLoKesuZc6QC9NnWyqt8Cisy0U2Qsf3opSyoWzDW75mWQiUpp9LSPgfmUlJCr1AmYfvM57hWxbhMkxOlNxLFdvm4u4lFMnYYMxw=s2048" 
          alt="Salon Interior" 
          className="w-full h-full object-cover opacity-40"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-[#050505]" />
      </div>

      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-zinc-900 border border-white/10 text-white text-xs font-bold uppercase tracking-[0.2em]">
            <Sparkles size={14} className="text-white/80" />
            <span>Islamabad's Premier Grooming Destination</span>
          </div>
          <div className="flex justify-center my-8 md:my-12">
            <div className="inline-flex flex-col items-center justify-center p-4 md:p-6 lg:p-8">
              <span className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-serif tracking-[0.2em] leading-none text-white font-light">
                JACKSON'S
              </span>
              <div className="flex items-center justify-end w-full mt-3 md:mt-4 lg:mt-5 opacity-80">
                <span className="text-sm sm:text-base md:text-xl lg:text-2xl font-serif tracking-[0.3em] leading-none flex items-center text-white font-light">
                  SALON
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="ml-2 md:ml-3 lg:ml-4 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 lg:w-10 lg:h-10">
                    <circle cx="6" cy="6" r="3"></circle>
                    <circle cx="6" cy="18" r="3"></circle>
                    <line x1="20" y1="4" x2="8.12" y2="15.88"></line>
                    <line x1="14.47" y1="14.48" x2="20" y2="20"></line>
                    <line x1="8.12" y1="8.12" x2="12" y2="12"></line>
                  </svg>
                </span>
              </div>
            </div>
          </div>
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/60 font-light leading-relaxed">
            Experience the pinnacle of luxury grooming. From precision cuts to premium treatments, 
            Jackson's Salon f11 delivers excellence at every location.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8 w-full sm:w-auto">
            <GlassButton 
              onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
              className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 bg-white/10 text-white font-bold uppercase tracking-widest rounded-full border border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.1)] text-xs md:text-sm"
            >
              Book Appointment
            </GlassButton>
            <GlassButton 
              as={Link}
              to="/vibes"
              className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 border border-white/20 text-white font-bold uppercase tracking-widest rounded-full text-xs md:text-sm"
            >
              Our Vibes
            </GlassButton>
            <GlassButton 
              as="a"
              href="#services"
              className="w-full sm:w-auto px-6 py-4 md:px-10 md:py-5 border border-white/20 text-white font-bold uppercase tracking-widest rounded-full text-xs md:text-sm"
            >
              View Services
            </GlassButton>
          </div>
        </motion.div>
      </div>

      <motion.div 
        animate={{ y: [0, -20, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-10 hidden lg:block opacity-20"
      >
        <Scissors size={120} className="text-white rotate-45" />
      </motion.div>
      <motion.div 
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-1/4 right-10 hidden lg:block opacity-20"
      >
        <User size={120} className="text-white" />
      </motion.div>
    </section>
  );
};
