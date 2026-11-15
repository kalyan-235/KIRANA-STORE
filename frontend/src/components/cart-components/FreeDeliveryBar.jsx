import React from 'react';

const FREE_DELIVERY_THRESHOLD = 500;

/**
 * FreeDeliveryBar
 * Shows delivery progress bar or success message.
 *
 * Props:
 *  totalPrice — current cart total (after discounts)
 */
const FreeDeliveryBar = ({ totalPrice }) => {
  const achieved  = totalPrice >= FREE_DELIVERY_THRESHOLD;
  const amountLeft = FREE_DELIVERY_THRESHOLD - totalPrice;
  const percent   = Math.min((totalPrice / FREE_DELIVERY_THRESHOLD) * 100, 100);

  if (achieved) {
    return (
      <div className="free-delivery-bar achieved">
        <span>🎉</span>
        <p>You've unlocked <strong>FREE Delivery!</strong></p>
      </div>
    );
  }

  return (
    <div className="free-delivery-bar">
      <span>🚚</span>
      <div className="fd-bar-wrap">
        <p>
          Add <strong>₹{amountLeft}</strong> more for{' '}
          <strong>FREE Delivery!</strong>
        </p>
        <div className="fd-progress-track">
          <div
            className="fd-progress-fill"
            style={{ width: `${percent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default FreeDeliveryBar;
