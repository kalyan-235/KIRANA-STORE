import React from 'react';

const features = [
  { icon: '✅', title: 'Quality Products', sub: 'Always Fresh' },
  { icon: '₹',  title: 'Best Prices',      sub: 'Guaranteed' },
  { icon: '🚚', title: 'Fast Delivery',    sub: 'at Your Doorstep' },
  { icon: '🎧', title: '24/7 Customer',    sub: 'Support' },
];

const WhyChooseSection = () => {
  return (
    <section className="section why-section">
      <div className="section-container">

        <div className="section-title">
          <span className="line" />
          <h2>Why Choose Ram Kirana Store?</h2>
          <span className="line" />
        </div>

        <div className="features-grid">
          {features.map((f) => (
            <div key={f.title} className="feature-card">
              <div className="feature-icon">{f.icon}</div>
              <div>
                <p className="feature-title">{f.title}</p>
                <p className="feature-sub">{f.sub}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseSection;
