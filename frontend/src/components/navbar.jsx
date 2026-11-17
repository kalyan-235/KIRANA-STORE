import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import '../styles/navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { itemCount } = useCart();
  const { user, isAdmin, logout } = useAuth();

  const isActive = (path) => location.pathname === path;
  const isProductPage = location.pathname.startsWith('/product/');

  const handleMobileToggle = () => {
    if (isProductPage) {
      const historyIndex = window.history.state?.idx;
      navigate(Number.isInteger(historyIndex) && historyIndex > 0 ? -1 : '/categories');
      return;
    }

    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      {/* Main navbar */}
      <nav className="navbar">
        <div className="nav-container">
          {/* Logo */}
          <Link to="/" className="logo">
            <div className="logo-icon">🛒</div>
            <div className="logo-text">
              <span className="logo-name">
                Ram <span className="logo-highlight">Kirana</span> Store
              </span>
              <span className="logo-tagline">Freshness at Your Doorstep</span>
            </div>
          </Link>

          {/* Nav links */}
          <div className={`nav-links${menuOpen ? ' open' : ''}`}>
            <ul>
              <li>
                <Link to="/" className={isActive('/') ? 'active' : ''}>
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className={isActive('/categories') ? 'active' : ''}
                >
                  Categories ▾
                </Link>
              </li>
              <li>
                <Link to="/all-products" className={isActive('/all-products') ? 'active' : ''}>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/about" className={isActive('/about') ? 'active' : ''}>
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className={isActive('/contact') ? 'active' : ''}
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          <div className="nav-actions">
            {/* Cart icon */}
            <Link to="/cart" className="cart-icon">
              <span className="cart-emoji">🛒</span>
              <span className="cart-badge">{itemCount}</span>
            </Link>

            <div className="nav-auth">
              {user ? (
                <>
                  {isAdmin && <Link to="/admin">Admin</Link>}
                  <span>👤 {user.name}</span>
                  <button type="button" className="nav-logout" onClick={logout}>Sign out</button>
                </>
              ) : <Link to="/login">👤 Login / Register</Link>}
            </div>
          </div>

          {/* Mobile menu toggle */}
          <button
            className="menu-toggle"
            onClick={handleMobileToggle}
            aria-label={isProductPage ? 'Go back' : 'Toggle menu'}
            aria-expanded={!isProductPage && menuOpen}
          >
            {isProductPage ? '←' : '☰'}
          </button>
        </div>
      </nav>
      <nav className="mobile-bottom-nav" aria-label="Mobile navigation">
        <Link to="/" className={isActive('/') ? 'active' : ''}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-7H9v7H4a1 1 0 0 1-1-1z" /></svg>
          <span>Home</span>
        </Link>
        <Link to="/categories" className={location.pathname.startsWith('/categories') ? 'active' : ''}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" /><rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" /></svg>
          <span>Categories</span>
        </Link>
        <Link to="/cart" className={isActive('/cart') ? 'active' : ''}>
          <span className="mobile-cart-icon">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 4h2l2.2 11.2a2 2 0 0 0 2 1.6h8.5a2 2 0 0 0 1.9-1.4L22 8H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></svg>
            {itemCount > 0 && <span className="mobile-cart-badge">{itemCount}</span>}
          </span>
          <span>Cart</span>
        </Link>
        <Link to="/login" className={['/login', '/register', '/admin'].some((path) => location.pathname.startsWith(path)) ? 'active' : ''}>
          <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="8" r="4" /><path d="M4 21a8 8 0 0 1 16 0" /></svg>
          <span>Account</span>
        </Link>
      </nav>
    </header>
  );
};

export default Navbar;
