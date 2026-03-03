import React from 'react';
import { Hero } from '../components/Hero';
import { ServicesSection } from '../components/Services';
import { SocialHub } from '../components/SocialHub';
import { ReviewsSection } from '../components/Reviews';
import { LocationsSection } from '../components/Locations';

export const Home = () => {
  return (
    <>
      <Hero />
      <ServicesSection />
      <SocialHub />
      <ReviewsSection />
      <LocationsSection />
    </>
  );
};
