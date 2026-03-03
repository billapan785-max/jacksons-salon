import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { Camera, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { GlassButton } from './GlassButton';
import { useData } from '../DataContext';

export const VibesSection = () => {
  const { vibes } = useData();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <section id="vibes" className="py-24 md:py-32 bg-[#050505] min-h-screen">
      <div className="container mx-auto px-4 md:px-6">
        <GlassButton 
          as={Link}
          to="/" 
          className="inline-flex items-center space-x-2 text-white/40 hover:text-white transition-colors mb-12 group px-4 py-2 rounded-full border border-white/10"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm uppercase tracking-widest font-bold">Back to Home</span>
        </GlassButton>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Our <span className="text-white">Vibes</span></h2>
            <p className="text-white/50 max-w-lg">A glimpse into the artistry and atmosphere at Jackson's Salon f11. Every cut is a masterpiece.</p>
          </div>
          <div className="hidden md:flex items-center space-x-2 text-white/30 uppercase tracking-[0.3em] text-[10px] font-bold">
            <Camera size={16} />
            <span>Gallery Experience</span>
          </div>
        </div>

        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
          {vibes.map((image, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              viewport={{ once: true }}
              className="relative group overflow-hidden rounded-2xl break-inside-avoid"
            >
              <img
                src={image.url || undefined}
                alt={image.alt}
                className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-110"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <div className="p-4 border border-white/20 bg-black/50 rounded-full">
                  <Camera size={20} className="text-white" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
