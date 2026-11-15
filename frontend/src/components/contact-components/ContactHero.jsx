import React from 'react';
import { Link } from 'react-router-dom';

const ContactHero = () => {
  return (
    <section className="contact-hero">
      <div className="contact-hero-overlay" />
      <div className="contact-hero-content">
        <h1>Contact Us</h1>
        <p>We'd love to hear from you — reach out anytime!</p>
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
