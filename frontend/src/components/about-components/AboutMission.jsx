import React from 'react';

const pillars = [
  { icon: '🌱', title: 'Fresh',       desc: 'Sourced fresh daily from trusted local farms and suppliers.' },
  { icon: '🏷️', title: 'Affordable', desc: 'Fair pricing for every household — no hidden charges, ever.' },
  { icon: '❤️', title: 'Community',  desc: 'Building a healthier, happier neighbourhood — one family at a time.' },
];

const AboutMission = () => {
  return (
    <section className="about-section mission-section">
      <div className="about-container">
        <div className="mission-inner">

          <div className="mission-icon">🎯</div>
          <span className="section-tag light">Our Mission</span>
          <h2>Our Mission</h2>
          <p>
            To make fresh, quality groceries accessible and affordable to every family in our
            community — delivered with warmth, honesty, and a smile.
          </p>

          <div className="mission-pillars">
            {pillars.map((p) => (
              <div key={p.title} className="pillar">
                <span>{p.icon}</span>
                <strong>{p.title}</strong>
                <p>{p.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutMission;
