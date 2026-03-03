import React, { createContext, useContext, useState, useEffect } from 'react';
import { Location, LOCATIONS } from './constants';
import { db } from './firebase';
import { collection, getDocs } from 'firebase/firestore';

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

interface DataContextType {
  locations: Location[];
  vibes: { id: number, url: string, alt: string }[];
  refreshData: () => Promise<void>;
  loading: boolean;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locations, setLocations] = useState<Location[]>([]);
  const [vibes, setVibes] = useState<{ id: number, url: string, alt: string }[]>([]);
  const [loading, setLoading] = useState(true);

  const refreshData = async () => {
    setLoading(true);
    try {
      const locSnapshot = await getDocs(collection(db, 'locations'));
      const locData = locSnapshot.docs.map(doc => doc.data() as Location);
      
      const vibesSnapshot = await getDocs(collection(db, 'vibes'));
      const vibesData = vibesSnapshot.docs.map(doc => ({ id: Number(doc.id), ...doc.data() } as { id: number, url: string, alt: string }));

      setLocations(locData.length > 0 ? locData : LOCATIONS);
      setVibes(vibesData.length > 0 ? vibesData.sort((a, b) => a.id - b.id) : VIBE_IMAGES);
    } catch (error) {
      console.error("Failed to fetch data from Firebase", error);
      setLocations(LOCATIONS);
      setVibes(VIBE_IMAGES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refreshData();
  }, []);

  return (
    <DataContext.Provider value={{ locations, vibes, refreshData, loading }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
