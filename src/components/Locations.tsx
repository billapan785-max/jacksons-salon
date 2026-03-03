import React from 'react';
import { MapPin, Phone, Clock } from 'lucide-react';
import { GlassButton } from './GlassButton';
import { useData } from '../DataContext';

export const LocationsSection = () => {
  const { locations } = useData();
  return (
    <section id="locations" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Our <span className="gold-text">Locations</span></h2>
          <p className="text-white/50">Visit us at our conveniently located branches in Islamabad.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {locations.map(loc => (
            <div key={loc.id} className="glass-card glass-card-hover rounded-3xl overflow-hidden flex flex-col">
              <div className="h-64 w-full">
                <iframe 
                  src={loc.mapEmbed} 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>
              <div className="p-6 md:p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <h3 className="text-2xl md:text-3xl font-serif font-bold gold-text">{loc.name}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3 text-white/70">
                      <MapPin size={20} className="text-gold shrink-0 mt-1" />
                      <span>{loc.address}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-white/70">
                      <Phone size={20} className="text-gold shrink-0" />
                      <span>{loc.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3 text-white/70">
                      <Clock size={20} className="text-gold shrink-0" />
                      <span>Mon - Sun: 11:00 AM - 10:00 PM</span>
                    </div>
                  </div>
                </div>
                <div className="pt-6 flex flex-col sm:flex-row gap-3 md:gap-4">
                  <GlassButton 
                    onClick={() => window.dispatchEvent(new CustomEvent('open-booking'))}
                    className="flex-1 py-3 md:py-4 gold-gradient text-black font-bold text-sm uppercase tracking-widest rounded-xl"
                  >
                    Book Here
                  </GlassButton>
                  <GlassButton 
                    as="a"
                    href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(loc.address)}`}
                    target="_blank"
                    className="py-3 md:py-4 px-6 border border-white/20 hover:bg-white/5 rounded-xl transition-colors flex items-center justify-center"
                  >
                    <span className="sm:hidden mr-2 text-xs font-bold uppercase tracking-widest">Directions</span>
                    <MapPin size={20} />
                  </GlassButton>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
