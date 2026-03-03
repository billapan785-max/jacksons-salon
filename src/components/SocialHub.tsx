import React from 'react';
import { Instagram, Facebook } from 'lucide-react';

export const SocialHub = () => {
  return (
    <section className="py-16 md:py-24 bg-[#080808]">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center space-y-4 mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold">Social <span className="gold-text">Hub</span></h2>
          <p className="text-white/50">Follow our journey and see our latest transformations.</p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 pt-4">
            <a 
              href="https://www.instagram.com/jacksonssalon/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group"
            >
              <Instagram size={20} className="group-hover:text-white" />
              <span className="text-sm font-bold uppercase tracking-widest">Instagram</span>
            </a>
            <a 
              href="https://web.facebook.com/p/Jacksons-salon-100039597536552/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full sm:w-auto flex items-center justify-center space-x-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 transition-all group"
            >
              <Facebook size={20} className="group-hover:text-white" />
              <span className="text-sm font-bold uppercase tracking-widest">Facebook</span>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            'DQmIJ_HDLZF',
            'DLrl2Sri7fx',
            'DPERJWyDGxa',
            'DK4FP6gi_JP'
          ].map(id => (
            <div key={id} className="aspect-[9/16] rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl">
              <iframe 
                src={`https://www.instagram.com/reel/${id}/embed`}
                className="w-full h-full border-0"
                allowtransparency="true"
                allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
