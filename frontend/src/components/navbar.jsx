import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useAuth } from '../context/useAuth';
import '../styles/navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const { itemCount } = useCart();
  const { user, isAdmin, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

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
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
