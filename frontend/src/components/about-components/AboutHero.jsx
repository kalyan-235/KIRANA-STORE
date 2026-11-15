import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../services/imageUrl';

const AboutHero = () => {
  return (
    <section className="about-hero">
      <img src={imageUrl('/kirana-image1.png')} alt="Ram Kirana Store" className="about-hero-bg" />
      <div className="about-hero-overlay" />
      <div className="about-hero-content">
        <h1>About Ram Kirana Store</h1>
        <p>Your Neighbourhood Grocery Store — Freshness at Your Doorstep</p>
        <div className="about-hero-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>About Us</span>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
