import React from 'react';

const contactInfo = [
  { icon: '📍', label: 'Shop Address', value: '123 Main Street, Gandhi Nagar,\nYour City – 560001, Karnataka', link: null },
  { icon: '📞', label: 'Phone Number', value: '+91 98765 43210', link: 'tel:+919876543210' },
  { icon: '💬', label: 'WhatsApp',     value: '+91 98765 43210', link: 'https://wa.me/919876543210' },
  { icon: '📧', label: 'Email',        value: 'ramkiranastore@gmail.com', link: 'mailto:ramkiranastore@gmail.com' },
];

const ContactInfoCards = () => {
  return (
    <section className="contact-cards-section">
      <div className="contact-container">
        <div className="contact-cards-grid">
          {contactInfo.map((info) => (
            <div key={info.label} className="contact-info-card">
              <div className="ci-icon">{info.icon}</div>
              <div className="ci-text">
                <span className="ci-label">{info.label}</span>
                {info.link ? (
                  <a href={info.link} className="ci-value link" target="_blank" rel="noreferrer">
                    {info.value}
                  </a>
                ) : (
                  <span className="ci-value" style={{ whiteSpace: 'pre-line' }}>{info.value}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactInfoCards;
