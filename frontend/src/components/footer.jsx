import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/footer.css';

const Footer = () => {
  const [email, setEmail] = useState('');

  return (
    <footer className="footer">
      <div className="footer-main">
        <div className="footer-container">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              <span className="footer-logo-icon">🛒</span>
              <div>
                <span className="footer-logo-name">
                  Ram <span className="footer-highlight">Kirana</span> Store
                </span>
                <p className="footer-tagline">Freshness at Your Doorstep</p>
              </div>
            </Link>
            <p className="footer-desc">
              Your one-stop destination for all your grocery needs.
            </p>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" className="social-icon">📘</a>
              <a href="#" aria-label="Instagram" className="social-icon">📸</a>
              <a href="#" aria-label="YouTube" className="social-icon">▶️</a>
              <a href="#" aria-label="WhatsApp" className="social-icon">💬</a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="/">Home</Link></li>
              <li><Link to="/categories">Categories</Link></li>
              <li><Link to="/offers">Offers</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="footer-col">
            <h3>Our Contact</h3>
            <ul className="contact-list">
              <li>📞 +91 98765 43210</li>
              <li>💬 WhatsApp Us</li>
              <li>📍 123 Main Street,<br />Your City - 560001</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="footer-col">
            <h3>Subscribe to Our Newsletter</h3>
            <p className="newsletter-desc">Get latest offers and updates!</p>
            <div className="newsletter-form">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-label="Email for newsletter"
              />
              <button type="button">Subscribe</button>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer-bottom">
        <div className="footer-bottom-container">
          <p>© 2025 Ram Kirana Store. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <span>|</span>
            <a href="#">Terms &amp; Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
