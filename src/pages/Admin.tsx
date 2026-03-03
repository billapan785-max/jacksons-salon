import React, { useState, useEffect } from 'react';
import { useData } from '../DataContext';
import { GlassButton } from '../components/GlassButton';
import { Location, Service, GroomPackage, LOCATIONS } from '../constants';
import { Trash2, Plus, Save, Database, X } from 'lucide-react';
import { db } from '../firebase';
import { doc, setDoc, deleteDoc, collection, getDocs, writeBatch } from 'firebase/firestore';

const VIBE_IMAGES = [
  { id: 1, url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772126902/Jackson_s_Salon_Style_12_ktoaab.jpg', alt: 'Jackson\'s Salon Style 1' },
  { id: 2, url: 'https://i.postimg.cc/cLHsVWGF/Whats_App_Image_2026_02_28_at_6_00_25_PM.jpg', alt: 'Jackson\'s Salon Style 2' },
  { id: 3, url: 'https://i.postimg.cc/nhPHxWnq/Whats_App_Image_2026_02_28_at_6_00_29_PM.jpg', alt: 'Jackson\'s Salon Style 3' },
  { id: 4, url: 'https://i.postimg.cc/K8zZdbh9/Whats_App_Image_2026_02_28_at_6_00_30_PM.jpg', alt: 'Jackson\'s Salon Style 4' },
  { id: 5, url: 'https://i.postimg.cc/mg5b4nTY/Whats_App_Image_2026_02_28_at_6_00_32_PM.jpg', alt: 'Jackson\'s Salon Style 5' },
  { id: 6, url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127047/Jackson_s_Salon_Style_3_kzcqbm.jpg', alt: 'Jackson\'s Salon Style 6' },
  { id: 7, url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127047/Jackson_s_Salon_Style_7_sv6nup.jpg', alt: 'Jackson\'s Salon Style 7' },
  { id: 8, url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127045/Jackson_s_Salon_Style_9_jc5xxu.jpg', alt: 'Jackson\'s Salon Style 8' },
  { id: 9, url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127046/Jackson_s_Salon_Style_8_mjjnc1.jpg', alt: 'Jackson\'s Salon Style 9' },
  { id: 10, url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127046/Jackson_s_Salon_Style_6_qvbjj2.jpg', alt: 'Jackson\'s Salon Style 10' },
  { id: 11, url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127045/Jackson_s_Salon_Style_10_fx90ig.jpg', alt: 'Jackson\'s Salon Style 11' },
  { id: 12, url: 'https://res.cloudinary.com/djyhobv6h/image/upload/v1772127045/Jackson_s_Salon_Style_11_uorcq1.jpg', alt: 'Jackson\'s Salon Style 12' },
];

export const Admin = () => {
  const { locations, vibes, refreshData, loading } = useData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  
  const [editedLocations, setEditedLocations] = useState<Location[]>([]);
  const [editedVibes, setEditedVibes] = useState<{ id: number, url: string, alt: string }[]>([]);
  const [activeTab, setActiveTab] = useState<'menu' | 'vibes'>('menu');
  const [notification, setNotification] = useState<{type: 'success'|'error', text: string} | null>(null);
  const [showSeedConfirm, setShowSeedConfirm] = useState(false);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => setNotification(null), 5000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  useEffect(() => {
    if (locations.length > 0) {
      setEditedLocations(JSON.parse(JSON.stringify(locations)));
    }
    if (vibes.length > 0) {
      setEditedVibes(JSON.parse(JSON.stringify(vibes)));
    }
  }, [locations, vibes]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'admin123') { // Simple hardcoded password for now
      setIsAuthenticated(true);
      setNotification(null);
    } else {
      setNotification({ type: 'error', text: 'Incorrect password' });
    }
  };

  const handleSaveMenu = async () => {
    try {
      const batch = writeBatch(db);
      
      // Delete existing locations
      const locSnapshot = await getDocs(collection(db, 'locations'));
      locSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Add new locations
      editedLocations.forEach((loc) => {
        const docRef = doc(db, 'locations', loc.id);
        batch.set(docRef, loc);
      });

      await batch.commit();
      setNotification({ type: 'success', text: 'Menu saved successfully!' });
      refreshData();
    } catch (error: any) {
      console.error(error);
      if (error.code === 'permission-denied') {
        setNotification({ type: 'error', text: 'Permission Denied: Your Firebase Firestore rules are blocking writes. Please update your Firestore Security Rules to allow read/write access.' });
      } else {
        setNotification({ type: 'error', text: 'Failed to save menu: ' + error.message });
      }
    }
  };

  const handleSaveVibes = async () => {
    try {
      const batch = writeBatch(db);
      
      // Delete existing vibes
      const vibesSnapshot = await getDocs(collection(db, 'vibes'));
      vibesSnapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      // Add new vibes
      editedVibes.forEach((vibe) => {
        const docRef = doc(db, 'vibes', vibe.id.toString());
        batch.set(docRef, vibe);
      });

      await batch.commit();
      setNotification({ type: 'success', text: 'Vibes saved successfully!' });
      refreshData();
    } catch (error: any) {
      console.error(error);
      if (error.code === 'permission-denied') {
        setNotification({ type: 'error', text: 'Permission Denied: Your Firebase Firestore rules are blocking writes. Please update your Firestore Security Rules to allow read/write access.' });
      } else {
        setNotification({ type: 'error', text: 'Failed to save vibes: ' + error.message });
      }
    }
  };

  const handleSeedDatabase = () => {
    setShowSeedConfirm(true);
  };

  const executeSeed = async () => {
    setShowSeedConfirm(false);
    try {
      const batch = writeBatch(db);
      
      // Seed Locations
      const locSnapshot = await getDocs(collection(db, 'locations'));
      locSnapshot.docs.forEach((doc) => batch.delete(doc.ref));
      
      LOCATIONS.forEach((loc) => {
        const docRef = doc(db, 'locations', loc.id);
        batch.set(docRef, loc);
      });

      // Seed Vibes
      const vibesSnapshot = await getDocs(collection(db, 'vibes'));
      vibesSnapshot.docs.forEach((doc) => batch.delete(doc.ref));
      
      VIBE_IMAGES.forEach((vibe) => {
        const docRef = doc(db, 'vibes', vibe.id.toString());
        batch.set(docRef, vibe);
      });

      await batch.commit();
      setNotification({ type: 'success', text: 'Database seeded successfully!' });
      refreshData();
    } catch (error: any) {
      console.error(error);
      if (error.code === 'permission-denied') {
        setNotification({ type: 'error', text: 'Permission Denied: Your Firebase Firestore rules are blocking writes. Please update your Firestore Security Rules to allow read/write access.' });
      } else {
        setNotification({ type: 'error', text: 'Failed to seed database: ' + error.message });
      }
    }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center text-white">Loading...</div>;

  return (
    <>
      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-24 right-4 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 ${notification.type === 'success' ? 'bg-green-500/90' : 'bg-red-500/90'} text-white max-w-md`}>
          <span>{notification.text}</span>
          <button onClick={() => setNotification(null)}><X size={16} /></button>
        </div>
      )}

      {/* Seed Confirmation Modal */}
      {showSeedConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
          <div className="glass-card p-6 rounded-2xl max-w-md w-full space-y-6 border border-white/10">
            <h3 className="text-xl font-bold text-white">Confirm Seed Database</h3>
            <p className="text-gray-300">This will overwrite your current database with the default data. Are you sure?</p>
            <div className="flex justify-end space-x-4">
              <GlassButton onClick={() => setShowSeedConfirm(false)} className="bg-gray-500/20 text-gray-300 hover:bg-gray-500/30">Cancel</GlassButton>
              <GlassButton onClick={executeSeed} className="bg-red-500/20 text-red-400 hover:bg-red-500/30">Yes, Overwrite</GlassButton>
            </div>
          </div>
        </div>
      )}

      {!isAuthenticated ? (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 pt-24">
          <form onSubmit={handleLogin} className="glass-card p-8 rounded-2xl max-w-md w-full space-y-6">
            <h2 className="text-2xl font-serif font-bold text-center gold-text">Admin Login</h2>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter Password"
              className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-gold"
            />
            <GlassButton type="submit" className="w-full py-3 text-center justify-center">Login</GlassButton>
          </form>
        </div>
      ) : (
        <div className="min-h-screen bg-[#050505] pt-24 pb-12 px-4 md:px-6">
          <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h1 className="text-3xl font-serif font-bold text-white">Admin <span className="gold-text">Panel</span></h1>
          <div className="flex space-x-4">
            <GlassButton 
              onClick={handleSeedDatabase}
              className="px-6 py-2 bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 flex items-center space-x-2"
            >
              <Database size={18} /> <span>Seed Database</span>
            </GlassButton>
            <GlassButton 
              onClick={() => setActiveTab('menu')}
              className={`px-6 py-2 ${activeTab === 'menu' ? 'gold-gradient text-black' : ''}`}
            >
              Menu
            </GlassButton>
            <GlassButton 
              onClick={() => setActiveTab('vibes')}
              className={`px-6 py-2 ${activeTab === 'vibes' ? 'gold-gradient text-black' : ''}`}
            >
              Vibes
            </GlassButton>
          </div>
        </div>

        {activeTab === 'menu' && (
          <div className="space-y-8">
            <div className="flex justify-end">
              <GlassButton onClick={handleSaveMenu} className="flex items-center space-x-2 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                <Save size={18} /> <span>Save Menu Changes</span>
              </GlassButton>
            </div>
            
            {editedLocations.map((loc, locIndex) => (
              <div key={loc.id} className="glass-card p-6 rounded-2xl space-y-6">
                <h2 className="text-2xl font-bold text-white">{loc.name}</h2>
                
                {/* Services Categories */}
                <div className="space-y-8">
                  <h3 className="text-xl font-serif gold-text border-b border-white/10 pb-2">Services</h3>
                  {loc.services.map((category, catIndex) => (
                    <div key={catIndex} className="space-y-4 bg-black/30 p-4 rounded-xl border border-white/5">
                      <input 
                        value={category.category}
                        onChange={(e) => {
                          const newLocs = [...editedLocations];
                          newLocs[locIndex].services[catIndex].category = e.target.value;
                          setEditedLocations(newLocs);
                        }}
                        className="w-full bg-transparent text-lg font-bold text-white mb-2 focus:outline-none focus:border-b border-gold"
                      />
                      
                      <div className="space-y-3">
                        {category.items.map((item, itemIndex) => (
                          <div key={item.id} className="flex flex-col md:flex-row gap-3 items-start md:items-center">
                            <input
                              value={item.name}
                              onChange={(e) => {
                                const newLocs = [...editedLocations];
                                newLocs[locIndex].services[catIndex].items[itemIndex].name = e.target.value;
                                setEditedLocations(newLocs);
                              }}
                              className="flex-1 bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-gold outline-none"
                              placeholder="Service Name"
                            />
                            <input
                              value={item.price}
                              onChange={(e) => {
                                const newLocs = [...editedLocations];
                                newLocs[locIndex].services[catIndex].items[itemIndex].price = e.target.value;
                                setEditedLocations(newLocs);
                              }}
                              className="w-full md:w-32 bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-gold outline-none"
                              placeholder="Price"
                            />
                            <button 
                              onClick={() => {
                                const newLocs = [...editedLocations];
                                newLocs[locIndex].services[catIndex].items.splice(itemIndex, 1);
                                setEditedLocations(newLocs);
                              }}
                              className="p-2 text-red-400 hover:bg-red-400/10 rounded"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        ))}
                        <button
                          onClick={() => {
                            const newLocs = [...editedLocations];
                            newLocs[locIndex].services[catIndex].items.push({
                              id: `new-${Date.now()}`,
                              name: 'New Service',
                              price: 0
                            });
                            setEditedLocations(newLocs);
                          }}
                          className="text-sm text-gold hover:text-white flex items-center space-x-1 mt-2"
                        >
                          <Plus size={14} /> <span>Add Service</span>
                        </button>
                      </div>
                    </div>
                  ))}
                  
                  <button
                    onClick={() => {
                      const newLocs = [...editedLocations];
                      newLocs[locIndex].services.push({
                        category: 'New Category',
                        items: []
                      });
                      setEditedLocations(newLocs);
                    }}
                    className="text-sm text-gold hover:text-white flex items-center space-x-1"
                  >
                    <Plus size={14} /> <span>Add Category</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'vibes' && (
          <div className="space-y-8">
            <div className="flex justify-end">
              <GlassButton onClick={handleSaveVibes} className="flex items-center space-x-2 bg-green-500/20 text-green-400 hover:bg-green-500/30">
                <Save size={18} /> <span>Save Vibes Changes</span>
              </GlassButton>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {editedVibes.map((vibe, index) => (
                <div key={vibe.id || index} className="glass-card p-4 rounded-xl space-y-4">
                  <img src={vibe.url || undefined} alt={vibe.alt} className="w-full h-48 object-cover rounded-lg" />
                  <input
                    value={vibe.url}
                    onChange={(e) => {
                      const newVibes = [...editedVibes];
                      newVibes[index].url = e.target.value;
                      setEditedVibes(newVibes);
                    }}
                    className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-gold outline-none"
                    placeholder="Image URL"
                  />
                  <input
                    value={vibe.alt}
                    onChange={(e) => {
                      const newVibes = [...editedVibes];
                      newVibes[index].alt = e.target.value;
                      setEditedVibes(newVibes);
                    }}
                    className="w-full bg-black/50 border border-white/10 rounded px-3 py-2 text-sm text-white focus:border-gold outline-none"
                    placeholder="Alt Text"
                  />
                  <button 
                    onClick={() => {
                      const newVibes = [...editedVibes];
                      newVibes.splice(index, 1);
                      setEditedVibes(newVibes);
                    }}
                    className="w-full py-2 flex items-center justify-center space-x-2 text-red-400 hover:bg-red-400/10 rounded"
                  >
                    <Trash2 size={16} /> <span>Remove Image</span>
                  </button>
                </div>
              ))}
              
              <div className="glass-card p-4 rounded-xl border-dashed border-2 border-white/20 flex flex-col items-center justify-center min-h-[300px] cursor-pointer hover:border-gold/50 transition-colors"
                onClick={() => {
                  setEditedVibes([...editedVibes, { id: Date.now(), url: '', alt: 'New Image' }]);
                }}
              >
                <Plus size={48} className="text-white/30 mb-4" />
                <span className="text-white/50 font-bold uppercase tracking-widest text-sm">Add New Image</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
      )}
    </>
  );
};
