import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../services/imageUrl';

const ContactHero = () => {
  return (
    <section className="contact-hero">
      <img
        src={imageUrl('/kirana-image1.png')}
        alt=""
        className="contact-hero-bg"
      />
      <div className="contact-hero-overlay" />
      <div className="contact-hero-content">
        <h1>Contact Us</h1>
        <p>We're here to help!</p>
        <div className="contact-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <span>Contact Us</span>
        </div>
      </div>
    </section>
  );
};

export default ContactHero;
