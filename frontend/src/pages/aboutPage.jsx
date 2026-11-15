import React from 'react';
import AboutHero       from '../components/about-components/AboutHero';
import AboutStats      from '../components/about-components/AboutStats';
import AboutIntro      from '../components/about-components/AboutIntro';
import AboutStory      from '../components/about-components/AboutStory';
import AboutMission    from '../components/about-components/AboutMission';
import AboutWhyChoose  from '../components/about-components/AboutWhyChoose';
import AboutPhotos     from '../components/about-components/AboutPhotos';
import AboutCTABanner  from '../components/about-components/AboutCTABanner';
import '../styles/aboutpage.css';

const AboutPage = () => {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutStats />
      <AboutIntro />
      <AboutStory />
      <AboutMission />
      <AboutWhyChoose />
      <AboutPhotos />
      <AboutCTABanner />
    </main>
  );
};

export default AboutPage;
