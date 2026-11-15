import React, { useState } from 'react';

/**
 * ContactForm — Contact form with validation, success state + WhatsApp CTA.
 * Has its own local state (form values, errors, submitted).
 */
const ContactForm = () => {
  const [form, setForm] = useState({
    name: '', phone: '', email: '', subject: '', message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors,    setErrors]    = useState({});

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!form.name.trim())    e.name    = 'Name is required';
    if (!form.phone.trim())   e.phone   = 'Phone number is required';
    if (!form.message.trim()) e.message = 'Message is required';
    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      e.email = 'Enter a valid email';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setSubmitted(true);
    setForm({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="contact-right">

      {/* ── Contact Form block ── */}
      <div className="contact-form-block">
        <h2 className="block-title">✉️ Send Us a Message</h2>
        <p className="form-subtitle">
          Fill out the form and we'll get back to you within 24 hours.
        </p>

        {submitted ? (
          /* Success state */
          <div className="form-success">
            <span>🎉</span>
            <h3>Message Sent Successfully!</h3>
            <p>Thank you for reaching out. Our team will contact you shortly.</p>
            <button
              type="button"
              className="form-reset-btn"
              onClick={() => setSubmitted(false)}
            >
              Send Another Message
            </button>
          </div>
        ) : (
          /* Form */
          <form className="contact-form" onSubmit={handleSubmit} noValidate>

            {/* Name */}
            <div className={`form-group${errors.name ? ' error' : ''}`}>
              <label htmlFor="name">Full Name <span className="req">*</span></label>
              <input
                id="name" name="name" type="text"
                placeholder="Enter your full name"
                value={form.name} onChange={handleChange} autoComplete="name"
              />
              {errors.name && <span className="form-error">{errors.name}</span>}
            </div>

            {/* Phone + Email row */}
            <div className="form-row">
              <div className={`form-group${errors.phone ? ' error' : ''}`}>
                <label htmlFor="phone">Phone Number <span className="req">*</span></label>
                <input
                  id="phone" name="phone" type="tel"
                  placeholder="+91 XXXXX XXXXX"
                  value={form.phone} onChange={handleChange} autoComplete="tel"
                />
                {errors.phone && <span className="form-error">{errors.phone}</span>}
              </div>
              <div className={`form-group${errors.email ? ' error' : ''}`}>
                <label htmlFor="email">Email <span className="optional">(optional)</span></label>
                <input
                  id="email" name="email" type="email"
                  placeholder="you@email.com"
                  value={form.email} onChange={handleChange} autoComplete="email"
                />
                {errors.email && <span className="form-error">{errors.email}</span>}
              </div>
            </div>

            {/* Subject */}
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <select id="subject" name="subject" value={form.subject} onChange={handleChange}>
                <option value="">Select a subject</option>
                <option value="order">Order Enquiry</option>
                <option value="delivery">Delivery Issue</option>
                <option value="product">Product Availability</option>
                <option value="complaint">Complaint</option>
                <option value="feedback">Feedback</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* Message */}
            <div className={`form-group${errors.message ? ' error' : ''}`}>
              <label htmlFor="message">Message <span className="req">*</span></label>
              <textarea
                id="message" name="message" rows={5}
                placeholder="Write your message here..."
                value={form.message} onChange={handleChange}
              />
              {errors.message && <span className="form-error">{errors.message}</span>}
            </div>

            <button type="submit" className="form-submit-btn">
              📨 Send Message
            </button>

          </form>
        )}
      </div>

      {/* ── WhatsApp CTA ── */}
      <a
        href="https://wa.me/919876543210"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-cta"
      >
        <span className="wa-icon">💬</span>
        <div>
          <strong>Chat on WhatsApp</strong>
          <p>Quick replies — usually within minutes!</p>
        </div>
        <span className="wa-arrow">→</span>
      </a>

    </div>
  );
};

export default ContactForm;
