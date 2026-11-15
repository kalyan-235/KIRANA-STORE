import React from 'react';
import { imageUrl } from '../../services/imageUrl';

const shopPhotos = [
  { img: '/kirana-image1.png',         alt: 'Ram Kirana Store Front' },
  { img: '/kirana-shop2.png',          alt: 'Inside the Store' },
  { img: '/rice-dals-image.jpeg',      alt: 'Rice & Dals Section' },
  { img: '/vegetables-image.jpeg',     alt: 'Fresh Vegetables' },
  { img: '/spices-masala-image.jpeg',  alt: 'Spices & Masalas' },
  { img: '/dairy-products-image.jpeg', alt: 'Dairy Section' },
];

const AboutPhotos = () => {
  return (
    <section className="about-section photos-section">
      <div className="about-container">

        <div className="section-heading">
          <span className="section-tag">Gallery</span>
          <h2>Shop Photos</h2>
          <p>A glimpse inside Ram Kirana Store.</p>
        </div>

        <div className="photos-grid">
          {shopPhotos.map((photo, i) => (
            <div key={i} className={`photo-item${i === 0 ? ' wide' : ''}`}>
              <img src={imageUrl(photo.img)} alt={photo.alt} loading="lazy" />
              <div className="photo-overlay">
                <span>{photo.alt}</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutPhotos;
