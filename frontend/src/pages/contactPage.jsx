import React from 'react';
import ContactHero      from '../components/contact-components/ContactHero';
import ContactInfoCards from '../components/contact-components/ContactInfoCards';
import ContactMap       from '../components/contact-components/ContactMap';
import ContactHours     from '../components/contact-components/ContactHours';
import ContactForm      from '../components/contact-components/ContactForm';
import '../styles/contactpage.css';

const ContactPage = () => {
  return (
    <main className="contact-page">

      <ContactHero />

      <ContactInfoCards />

      {/* Map + Hours (left) | Form (right) */}
      <section className="contact-body">
        <div className="contact-container">
          <div className="contact-layout">

            <div className="contact-left">
              <ContactMap />
              <ContactHours />
            </div>

            <ContactForm />

          </div>
        </div>
      </section>

    </main>
  );
};

export default ContactPage;
