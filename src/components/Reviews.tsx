import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Star, Scissors, Loader2 } from 'lucide-react';
import { REVIEWS as MOCK_REVIEWS } from '../constants';
import { GlassButton } from './GlassButton';

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  relative_time_description: string;
  profile_photo_url: string;
}

export const ReviewsSection = () => {
  const [reviews, setReviews] = useState<any[]>(MOCK_REVIEWS);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const placeId = import.meta.env.VITE_GOOGLE_PLACE_ID_I8; // Defaulting to I-8 for reviews

  useEffect(() => {
    // Only attempt to fetch if we have a valid-looking key and place ID
    const isValidKey = apiKey && apiKey.trim() !== "" && !apiKey.includes("YOUR_") && !apiKey.includes("MY_");
    const isValidPlaceId = placeId && placeId.trim() !== "" && !placeId.includes("YOUR_") && !placeId.includes("MY_");

    if (!isValidKey || !isValidPlaceId) {
      console.log("Google Maps API Key or Place ID not configured or using placeholders. Showing curated reviews.");
      return;
    }

    const SCRIPT_ID = 'google-maps-api-script';

    const fetchGoogleReviews = async () => {
      setLoading(true);
      try {
        // Check if google object already exists
        if ((window as any).google && (window as any).google.maps && (window as any).google.maps.places) {
          getPlacesData();
          return;
        }

        // Check if script is already being loaded
        if (document.getElementById(SCRIPT_ID)) {
          // Script is already in the DOM, wait for it to load if google isn't ready
          const checkGoogle = setInterval(() => {
            if ((window as any).google && (window as any).google.maps && (window as any).google.maps.places) {
              clearInterval(checkGoogle);
              getPlacesData();
            }
          }, 100);
          return;
        }

        // Load the script
        const script = document.createElement('script');
        script.id = SCRIPT_ID;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        
        script.onload = () => {
          getPlacesData();
        };

        script.onerror = () => {
          console.error("Failed to load Google Maps script");
          setError("Failed to load reviews");
          setLoading(false);
        };

        document.head.appendChild(script);
      } catch (err) {
        console.error("Error in fetchGoogleReviews:", err);
        setError("An unexpected error occurred");
        setLoading(false);
      }
    };

    const getPlacesData = () => {
      const service = new (window as any).google.maps.places.PlacesService(document.createElement('div'));
      service.getDetails(
        {
          placeId: placeId,
          fields: ['reviews', 'rating', 'user_ratings_total'],
        },
        (place: any, status: any) => {
          if (status === (window as any).google.maps.places.PlacesServiceStatus.OK && place.reviews) {
            const formattedReviews = place.reviews.map((rev: any) => ({
              name: rev.author_name,
              rating: rev.rating,
              text: rev.text,
              date: rev.relative_time_description,
              image: rev.profile_photo_url
            }));
            setReviews(formattedReviews);
          } else {
            console.error("Places Service failed:", status);
          }
          setLoading(false);
        }
      );
    };

    fetchGoogleReviews();
  }, [apiKey, placeId]);

  return (
    <section id="reviews" className="py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6 md:gap-8">
          <div className="space-y-4">
            <h2 className="text-4xl md:text-5xl font-serif font-bold">Client <span className="gold-text">Reviews</span></h2>
            <p className="text-white/50">Real feedback from our Google Maps profile.</p>
          </div>
          
          <div className="flex items-center space-x-4 glass-card px-6 py-4 rounded-2xl">
            <div className="text-4xl font-serif font-bold text-gold">4.9</div>
            <div className="space-y-1">
              <div className="flex text-gold">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <div className="text-xs text-white/40 uppercase tracking-widest">Google Rating</div>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="text-gold animate-spin" size={48} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {reviews.map((rev, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="glass-card glass-card-hover p-6 md:p-8 rounded-3xl space-y-4 relative overflow-hidden flex flex-col h-full"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <Scissors size={40} className="text-gold" />
                </div>
                
                <div className="flex items-center space-x-3 mb-2">
                  {rev.image ? (
                    <img src={rev.image || undefined} alt={rev.name} className="w-10 h-10 rounded-full border border-gold/30" referrerPolicy="no-referrer" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">
                      {rev.name.charAt(0)}
                    </div>
                  )}
                  <div className="flex text-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={12} 
                        fill={i < rev.rating ? "currentColor" : "none"} 
                        className={i < rev.rating ? "" : "text-white/20"}
                      />
                    ))}
                  </div>
                </div>

                <p className="text-white/80 italic leading-relaxed flex-grow">
                  {rev.text.length > 200 ? `"${rev.text.substring(0, 200)}..."` : `"${rev.text}"`}
                </p>
                
                <div className="pt-4 border-t border-white/10 flex justify-between items-center mt-auto">
                  <span className="font-serif font-bold text-sm">{rev.name}</span>
                  <span className="text-[10px] text-white/30 uppercase tracking-wider">{rev.date}</span>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <div className="mt-12 text-center">
          <GlassButton 
            as="a"
            href="https://maps.app.goo.gl/iL2UssPYjKrrgMsp7" 
            target="_blank" 
            className="inline-flex items-center space-x-2 text-gold hover:text-gold-light transition-colors text-sm font-bold uppercase tracking-widest px-8 py-3 rounded-full border border-gold/20"
          >
            <span>Write a Review on Google</span>
            <Star size={14} />
          </GlassButton>
        </div>
      </div>
    </section>
  );
};
