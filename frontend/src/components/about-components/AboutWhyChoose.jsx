import React from 'react';

const whyChooseUs = [
  { icon: '🌿', title: 'Always Fresh',       desc: 'We source our products directly from trusted farms and suppliers to ensure freshness every day.' },
  { icon: '💰', title: 'Best Prices',         desc: 'We offer the most competitive prices in town — quality products without burning your pocket.' },
  { icon: '🚚', title: 'Fast Delivery',       desc: 'Free home delivery on orders above ₹500. We deliver right to your doorstep within hours.' },
  { icon: '🤝', title: 'Trusted Since 1995',  desc: 'Serving families in this community for over 28 years with honesty and dedication.' },
  { icon: '🛡️', title: 'Quality Assured',    desc: 'Every product is carefully checked for quality before it reaches your hands.' },
  { icon: '🎧', title: '24/7 Support',        desc: 'Our friendly team is always available to help you with orders, queries and returns.' },
];

const AboutWhyChoose = () => {
  return (
    <section className="about-section why-section">
      <div className="about-container">

        <div className="section-heading">
          <span className="section-tag">Why Us</span>
          <h2>Why Choose Ram Kirana Store?</h2>
          <p>Here's what makes us different from the rest.</p>
        </div>

        <div className="why-grid">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="why-card">
              <div className="why-icon">{item.icon}</div>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default AboutWhyChoose;
