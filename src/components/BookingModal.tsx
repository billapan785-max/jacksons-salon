import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { X, Check, ArrowRight, MessageCircle } from 'lucide-react';
import { Location, Service } from '../constants';
import { GlassButton } from './GlassButton';
import { useData } from '../DataContext';

export const BookingModal = () => {
  const { locations } = useData();
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [selectedServices, setSelectedServices] = useState<Service[]>([]);

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true);
      setStep(1);
      setSelectedLocation(null);
      setSelectedServices([]);
    };
    window.addEventListener('open-booking', handleOpen);
    return () => window.removeEventListener('open-booking', handleOpen);
  }, []);

  const toggleService = (service: Service) => {
    setSelectedServices(prev => 
      prev.find(s => s.id === service.id) 
        ? prev.filter(s => s.id !== service.id)
        : [...prev, service]
    );
  };

  const calculateTotal = () => {
    return selectedServices.reduce((acc, curr) => {
      const price = typeof curr.price === 'number' ? curr.price : 0;
      return acc + price;
    }, 0);
  };

  const handleConfirm = () => {
    if (!selectedLocation) return;
    
    const serviceList = selectedServices.map(s => `${s.name} (Rs. ${s.price})`).join(', ');
    const total = calculateTotal();
    const message = `Hello Jackson's Salon! I want to book an appointment at ${selectedLocation.name}. %0A%0ASelected Services: ${serviceList}. %0A%0ATotal Estimate: Rs. ${total}`;
    
    window.open(`https://wa.me/${selectedLocation.whatsapp}?text=${message}`, '_blank');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-black/90"
      />
      
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        className="relative w-full max-w-2xl glass-card rounded-3xl overflow-hidden"
      >
        <GlassButton 
          onClick={() => setIsOpen(false)}
          className="absolute top-6 right-6 p-2 hover:bg-white/10 rounded-full transition-colors z-50"
        >
          <X size={24} />
        </GlassButton>

        <div className="p-6 md:p-12">
          {step === 1 ? (
            <div className="space-y-6 md:space-y-8">
              <div className="text-center space-y-2">
                <h2 className="text-2xl md:text-3xl font-serif font-bold gold-text">Choose Location</h2>
                <p className="text-sm text-white/60">Select the branch you would like to visit</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                {locations.map(loc => (
                  <GlassButton
                    key={loc.id}
                    onClick={() => {
                      setSelectedLocation(loc);
                      setStep(2);
                    }}
                    className="p-4 md:p-6 text-left glass-card hover:border-gold/50 transition-all group"
                  >
                    <h3 className="text-lg md:text-xl font-serif font-bold group-hover:text-gold transition-colors">{loc.name}</h3>
                    <p className="text-xs md:text-sm text-white/50 mt-1 md:mt-2 line-clamp-2">{loc.address}</p>
                    <div className="mt-3 md:mt-4 flex items-center text-gold text-[10px] md:text-xs font-bold uppercase tracking-widest">
                      Select Branch <ArrowRight size={12} className="ml-2" />
                    </div>
                  </GlassButton>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-6 md:space-y-8">
              <div className="flex items-center space-x-3 md:space-x-4">
                <GlassButton onClick={() => setStep(1)} className="text-white/50 hover:text-white p-1">
                  <ArrowRight size={18} className="rotate-180" />
                </GlassButton>
                <div>
                  <h2 className="text-xl md:text-2xl font-serif font-bold gold-text leading-tight">Select Services</h2>
                  <p className="text-xs text-white/50 line-clamp-1">{selectedLocation?.name}</p>
                </div>
              </div>

              <div className="max-h-[45vh] md:max-h-[50vh] overflow-y-auto pr-2 space-y-6 custom-scrollbar">
                {/* Groom Packages Section */}
                {selectedLocation?.groomPackages && selectedLocation.groomPackages.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold/80 border-b border-gold/20 pb-1">
                      Groom Packages
                    </h3>
                    <div className="space-y-2">
                      {selectedLocation.groomPackages.map(pkg => (
                        <label 
                          key={pkg.id}
                          className={`flex items-center justify-between p-3 md:p-4 rounded-xl cursor-pointer transition-all ${
                            selectedServices.find(s => s.id === pkg.id) 
                              ? 'bg-gold/10 border border-gold/30' 
                              : 'bg-white/5 border border-transparent hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 md:w-5 md:h-5 rounded border flex items-center justify-center transition-all ${
                              selectedServices.find(s => s.id === pkg.id)
                                ? 'bg-gold border-gold'
                                : 'border-white/30'
                            }`}>
                              {selectedServices.find(s => s.id === pkg.id) && <Check size={12} className="text-black" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm md:font-medium">{pkg.name}</span>
                              <span className="text-[10px] text-white/40">{pkg.description}</span>
                            </div>
                          </div>
                          <span className="text-gold font-bold text-sm">Rs. {pkg.price}</span>
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={!!selectedServices.find(s => s.id === pkg.id)}
                            onChange={() => toggleService(pkg as any)}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                {selectedLocation?.services.map(cat => (
                  <div key={cat.category} className="space-y-3">
                    <h3 className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-gold/80 border-b border-gold/20 pb-1">
                      {cat.category}
                    </h3>
                    <div className="space-y-2">
                      {cat.items.map(service => (
                        <label 
                          key={service.id}
                          className={`flex items-center justify-between p-3 md:p-4 rounded-xl cursor-pointer transition-all ${
                            selectedServices.find(s => s.id === service.id) 
                              ? 'bg-gold/10 border border-gold/30' 
                              : 'bg-white/5 border border-transparent hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 md:w-5 md:h-5 rounded border flex items-center justify-center transition-all ${
                              selectedServices.find(s => s.id === service.id)
                                ? 'bg-gold border-gold'
                                : 'border-white/30'
                            }`}>
                              {selectedServices.find(s => s.id === service.id) && <Check size={12} className="text-black" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm md:font-medium">{service.name}</span>
                              {service.description && (
                                <span className="text-[10px] text-white/40">{service.description}</span>
                              )}
                            </div>
                          </div>
                          <span className="text-gold font-bold text-sm">Rs. {service.price}</span>
                          <input 
                            type="checkbox" 
                            className="hidden"
                            checked={!!selectedServices.find(s => s.id === service.id)}
                            onChange={() => toggleService(service)}
                          />
                        </label>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-4 md:pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-center sm:text-left">
                  <p className="text-[10px] uppercase tracking-widest text-white/50">Estimated Total</p>
                  <p className="text-xl md:text-2xl font-serif font-bold text-gold">Rs. {calculateTotal()}</p>
                </div>
                <GlassButton 
                  onClick={handleConfirm}
                  disabled={selectedServices.length === 0}
                  className="w-full sm:w-auto px-6 md:px-8 py-3 md:py-4 gold-gradient text-black font-bold text-sm uppercase tracking-widest rounded-full disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                >
                  Confirm Booking <MessageCircle size={16} className="ml-2" />
                </GlassButton>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
