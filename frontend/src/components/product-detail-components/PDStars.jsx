import React from 'react';

/**
 * PDStars — renders 5 star rating icons.
 * Props:  rating (number)
 */
const PDStars = ({ rating }) => {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;

  return (
    <span className="stars" aria-label={`${rating} out of 5`}>
      {Array.from({ length: 5 }, (_, i) => {
        if (i < full)              return <span key={i} className="star full">★</span>;
        if (i === full && half)    return <span key={i} className="star half">★</span>;
        return                            <span key={i} className="star empty">★</span>;
      })}
    </span>
  );
};

export default PDStars;
