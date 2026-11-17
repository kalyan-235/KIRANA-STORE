import React from 'react';
import AboutHero       from '../components/about-components/AboutHero';
import AboutIntro      from '../components/about-components/AboutIntro';
import AboutMission    from '../components/about-components/AboutMission';
import '../styles/aboutpage.css';

const AboutPage = () => {
  return (
    <main className="about-page">
      <AboutHero />
      <AboutIntro />
      <AboutMission />
    </main>
  );
};

export default AboutPage;
