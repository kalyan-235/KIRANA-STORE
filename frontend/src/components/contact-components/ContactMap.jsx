import React from 'react';

const ContactMap = () => {
  return (
    <div className="map-block">
      <h2 className="block-title">📍 Find Us on Map</h2>

      <div className="map-wrap">
        <iframe
          title="Ram Kirana Store Location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.9850585367!2d77.59456031482245!3d12.971598490852687!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
          width="100%"
          height="300"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>

      <a
        href="https://maps.google.com/?q=Bengaluru,Karnataka"
        target="_blank"
        rel="noreferrer"
        className="get-directions-btn"
      >
        🗺️ Get Directions
      </a>
    </div>
  );
};

export default ContactMap;
