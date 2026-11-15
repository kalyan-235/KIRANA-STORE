import React from 'react';
import { Link } from 'react-router-dom';
import { imageUrl } from '../../services/imageUrl';

const AboutIntro = () => {
  return (
    <section className="about-section intro-section">
      <div className="about-container two-col">

        <div className="about-text">
          <span className="section-tag">Who We Are</span>
          <h2>Welcome to Ram Kirana Store</h2>
          <p>
            Ram Kirana Store is your trusted neighbourhood grocery shop located in the heart of
            the community. We are a one-stop destination for all your daily grocery needs —
            from fresh vegetables and fruits to packaged staples, dairy, snacks, spices,
            and household essentials.
          </p>
          <p>
            We believe every family deserves access to fresh, quality products at affordable
            prices. Our shelves are stocked daily to ensure you always find what you need,
            exactly when you need it.
          </p>
          <Link to="/categories" className="about-cta-btn">
            Explore Products →
          </Link>
        </div>

        <div className="about-img-wrap">
          <img src={imageUrl('/kirana-shop2.png')} alt="Ram Kirana Store" />
        </div>

      </div>
    </section>
  );
};

export default AboutIntro;
