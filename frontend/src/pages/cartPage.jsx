import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';

import CartItemList from '../components/cart-components/CartItemList';
import OrderSummary from '../components/cart-components/OrderSummary';
import '../styles/cartPage.css';

const CartPage = () => {
  const { cartItems, increaseQty, decreaseQty, removeItem } = useCart();

  /* ── totalPrice for delivery bar ── */
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.qty, 0);

  /* ── Empty cart state ── */
  if (cartItems.length === 0) {
    return (
      <main className="cart-page">
        <div className="cart-empty">
          <div className="cart-empty-icon">🛒</div>
          <h2>Your Cart is Empty!</h2>
          <p>Looks like you haven't added anything yet.</p>
          <Link to="/categories" className="cart-shop-btn">
            Start Shopping →
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">

      {/* Breadcrumb */}
      <div className="cart-breadcrumb">
        <div className="cart-bc-inner">
          <Link to="/">🏠</Link>
          <span className="bc-sep">›</span>
          <span className="bc-active">My Cart</span>
        </div>
      </div>

      <div className="cart-container">
        <h1 className="cart-title">
          🛒 My Cart <span className="cart-count">({cartItems.length} items)</span>
        </h1>

        <div className="cart-layout">
          {/* LEFT — item list */}
          <CartItemList
            cartItems={cartItems}
            totalPrice={totalPrice}
            onIncrease={increaseQty}
            onDecrease={decreaseQty}
            onRemove={removeItem}
          />

          {/* RIGHT — order summary */}
          <OrderSummary cartItems={cartItems} />
        </div>
      </div>

    </main>
  );
};

export default CartPage;
