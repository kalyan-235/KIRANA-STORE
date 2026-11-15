import React from 'react';

/**
 * PDImageGallery — Left column: main image + thumbnails.
 *
 * Props:
 *  images         — array of image URLs
 *  activeImg      — current active index
 *  onThumbClick   — fn(index)
 *  discount       — discount % (for badge)
 *  productName    — for alt text
 */
const PDImageGallery = ({ images, activeImg, onThumbClick, discount, productName }) => {
  return (
    <div className="pd-images">

      {/* Discount badge */}
      {discount > 0 && (
        <div className="pd-img-badge">{discount}% OFF</div>
      )}

      {/* Main image */}
      <div className="pd-main-img">
        <img
          src={images[activeImg]}
          alt={productName}
          className="pd-main-img-el"
        />
      </div>

      {/* Thumbnails */}
      <div className="pd-thumbs">
        {images.map((img, i) => (
          <button
            key={i}
            type="button"
            className={`pd-thumb${activeImg === i ? ' active' : ''}`}
            onClick={() => onThumbClick(i)}
            aria-label={`View image ${i + 1}`}
          >
            <img src={img} alt={`${productName} view ${i + 1}`} />
          </button>
        ))}
      </div>

    </div>
  );
};

export default PDImageGallery;
