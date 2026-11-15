import React from 'react';
import { Link } from 'react-router-dom';

const AboutCTABanner = () => {
  return (
    <section className="about-cta-banner">
      <div className="about-container">
        <h2>Ready to Shop Fresh?</h2>
        <p>Browse our wide range of products and get them delivered to your doorstep.</p>
        <div className="cta-btn-group">
          <Link to="/categories" className="cta-primary">Shop Now →</Link>
          <Link to="/contact"    className="cta-secondary">Contact Us</Link>
        </div>
      </div>
    </section>
  );
};

export default AboutCTABanner;
