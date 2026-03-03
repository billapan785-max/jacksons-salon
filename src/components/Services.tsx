import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { useData } from '../DataContext';

export const ServicesSection = () => {
  const { locations } = useData();
  const [activeLocation, setActiveLocation] = useState('');
  const [showGroomModal, setShowGroomModal] = useState(false);
  const [showSpecialModal, setShowSpecialModal] = useState(false);

  useEffect(() => {
    if (locations.length > 0 && !activeLocation) {
      setActiveLocation(locations[0].id);
    }
  }, [locations, activeLocation]);

  const currentLocation = useMemo(() => 
    locations.find(l => l.id === activeLocation) || locations[0]
  , [activeLocation, locations]);

  if (!locations || locations.length === 0) return null;

  return (
    <section id="services" className="py-16 md:py-24 bg-[#080808]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Our <span className="gold-text">Services</span></h2>
          <p className="text-white/50 max-w-xl mx-auto">Select a location to view its specific rate list and available services.</p>
          
          <div className="flex justify-center p-1 bg-zinc-900 rounded-full max-w-xs sm:max-w-md mx-auto mt-8 border border-white/10">
            {locations.map(loc => (
              <GlassButton
                key={loc.id}
                onClick={() => setActiveLocation(loc.id)}
                className={`flex-1 py-2 sm:py-3 px-4 sm:px-6 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-widest transition-all ${
                  activeLocation === loc.id ? 'gold-gradient text-black' : 'text-white/60 hover:text-white'
                }`}
              >
                {loc.name}
              </GlassButton>
            ))}
          </div>

          <div className="flex flex-wrap justify-center gap-4 mt-8">
            <GlassButton 
              onClick={() => setShowGroomModal(true)}
              className="px-6 sm:px-8 py-3 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all font-bold uppercase tracking-widest text-[10px] sm:text-xs flex items-center group"
            >
              <span className="mr-2">Groom Package</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                ✨
              </motion.div>
            </GlassButton>

            <GlassButton 
              onClick={() => setShowSpecialModal(true)}
              className="px-6 sm:px-8 py-3 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-black transition-all font-bold uppercase tracking-widest text-[10px] sm:text-xs flex items-center group"
            >
              <span className="mr-2">Special Deals & Student Packages</span>
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                🎓
              </motion.div>
            </GlassButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {currentLocation.services.map((cat, idx) => (
            <motion.div
              key={cat.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="glass-card p-6 md:p-8 rounded-3xl space-y-6"
            >
              <h3 className="text-2xl font-serif font-bold text-gold border-b border-gold/20 pb-4">{cat.category}</h3>
              <div className="space-y-4">
                {cat.items.map(item => (
                  <div key={item.id} className="flex justify-between items-start group">
                    <div className="space-y-1">
                      <p className="font-medium group-hover:text-gold transition-colors">{item.name}</p>
                      {item.description && (
                        <p className="text-xs text-white/40 leading-relaxed">{item.description}</p>
                      )}
                    </div>
                    <div className="text-gold font-bold whitespace-nowrap ml-4">
                      Rs. {item.price}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {showGroomModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowGroomModal(false)}
              className="absolute inset-0 bg-black/90"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl glass-card rounded-3xl overflow-hidden p-8 md:p-12"
            >
              <GlassButton 
                onClick={() => setShowGroomModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </GlassButton>

              <div className="text-center space-y-2 mb-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold gold-text">Groom Packages</h2>
                <p className="text-sm text-white/60">Exclusive packages for your special day at {currentLocation.name}</p>
              </div>

              <div className="space-y-8 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {currentLocation.groomPackages.map((pkg, idx) => (
                  <motion.div 
                    key={pkg.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="space-y-3"
                  >
                    <div className="flex justify-between items-center border-b border-gold/20 pb-2">
                      <h3 className="text-xl font-bold text-gold">{pkg.name}</h3>
                      <span className="text-gold font-bold">Rs. {pkg.price}</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {pkg.description.split(', ').map((item, i) => (
                        <span key={i} className="text-[10px] uppercase tracking-widest bg-white/5 px-2 py-1 rounded border border-white/10 text-white/70">
                          {item}
                        </span>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-12 text-center">
                <GlassButton 
                  onClick={() => {
                    setShowGroomModal(false);
                    window.dispatchEvent(new CustomEvent('open-booking'));
                  }}
                  className="px-10 py-4 gold-gradient text-black font-bold uppercase tracking-widest text-xs rounded-full"
                >
                  Book Now
                </GlassButton>
              </div>
            </motion.div>
          </div>
        )}

        {showSpecialModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSpecialModal(false)}
              className="absolute inset-0 bg-black/90"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-2xl glass-card rounded-3xl overflow-hidden p-8 md:p-12"
            >
              <GlassButton 
                onClick={() => setShowSpecialModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} />
              </GlassButton>

              <div className="text-center space-y-2 mb-10">
                <h2 className="text-3xl md:text-4xl font-serif font-bold gold-text">Special Deals & Student Packages</h2>
                <p className="text-sm text-white/60">Exclusive offers available at {currentLocation.name}</p>
              </div>

              <div className="space-y-6 max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                {currentLocation.services
                  .find(s => s.category === "Special Deals & Student Packages")
                  ?.items.map((item, idx) => (
                    <motion.div 
                      key={item.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="p-4 rounded-2xl bg-white/5 border border-white/10 hover:border-gold/30 transition-colors group"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold group-hover:text-gold transition-colors">{item.name}</h3>
                        <span className="text-gold font-bold">Rs. {item.price}</span>
                      </div>
                      <p className="text-xs text-white/50 leading-relaxed">{item.description}</p>
                    </motion.div>
                  ))}
              </div>

              <div className="mt-12 text-center">
                <GlassButton 
                  onClick={() => {
                    setShowSpecialModal(false);
                    window.dispatchEvent(new CustomEvent('open-booking'));
                  }}
                  className="px-10 py-4 gold-gradient text-black font-bold uppercase tracking-widest text-xs rounded-full"
                >
                  Book Now
                </GlassButton>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
