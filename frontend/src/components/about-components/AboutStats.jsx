import React from 'react';

const stats = [
  { number: '28+',   label: 'Years in Business' },
  { number: '5000+', label: 'Happy Customers' },
  { number: '1200+', label: 'Products Available' },
  { number: '4.8★',  label: 'Customer Rating' },
];

const AboutStats = () => {
  return (
    <section className="about-stats">
      <div className="about-container">
        <div className="stats-grid">
          {stats.map((s) => (
            <div key={s.label} className="stat-card">
              <span className="stat-number">{s.number}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutStats;
