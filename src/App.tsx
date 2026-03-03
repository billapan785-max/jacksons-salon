/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { motion } from 'motion/react';
import { MessageCircle } from 'lucide-react';
import { Navbar } from './components/Navbar';
import { Home } from './pages/Home';
import { VibesSection } from './components/Vibes';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { DataProvider } from './DataContext';
import { Admin } from './pages/Admin';

import { GlassButton } from './components/GlassButton';

export default function App() {
  return (
    <DataProvider>
      <Router>
        <div className="min-h-screen font-sans selection:bg-white selection:text-black">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/vibes" element={<VibesSection />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
          <BookingModal />
        
        {/* Floating WhatsApp Button */}
        <div className="fixed bottom-4 right-4 md:bottom-6 md:right-6 z-[90] flex items-center pointer-events-none">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8, x: 20 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              x: 0,
              y: [0, -5, 0]
            }}
            transition={{ 
              opacity: { delay: 1.5, duration: 0.5 },
              scale: { delay: 1.5, duration: 0.5 },
              x: { delay: 1.5, duration: 0.5 },
              y: { repeat: Infinity, duration: 3, ease: "easeInOut" }
            }}
            className="mr-3 relative bg-zinc-900 border border-white/20 px-3 py-2 md:px-4 md:py-2 rounded-2xl shadow-2xl hidden sm:block"
          >
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-widest text-white whitespace-nowrap">Need help?</span>
            {/* Triangle for speech bubble */}
            <div className="absolute right-[-6px] top-1/2 -translate-y-1/2 w-0 h-0 border-t-[6px] border-t-transparent border-b-[6px] border-b-transparent border-l-[6px] border-l-white/20" />
          </motion.div>
          
          <GlassButton 
            as="a"
            href="https://wa.me/923335229528" 
            target="_blank"
            className="w-12 h-12 md:w-14 md:h-14 bg-[#25D366] text-white rounded-full shadow-[0_0_30px_rgba(37,211,102,0.3)] flex items-center justify-center group pointer-events-auto"
          >
            <MessageCircle size={24} className="md:w-7 md:h-7" />
          </GlassButton>
        </div>
        </div>
      </Router>
    </DataProvider>
  );
}
