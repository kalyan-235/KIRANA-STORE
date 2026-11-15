import React from 'react';

const openingHours = [
  { day: 'Monday',    open: '7:00 AM', close: '9:00 PM',  today: false },
  { day: 'Tuesday',   open: '7:00 AM', close: '9:00 PM',  today: false },
  { day: 'Wednesday', open: '7:00 AM', close: '9:00 PM',  today: true  },
  { day: 'Thursday',  open: '7:00 AM', close: '9:00 PM',  today: false },
  { day: 'Friday',    open: '7:00 AM', close: '9:30 PM',  today: false },
  { day: 'Saturday',  open: '6:30 AM', close: '10:00 PM', today: false },
  { day: 'Sunday',    open: '7:00 AM', close: '8:00 PM',  today: false },
];

const ContactHours = () => {
  return (
    <div className="hours-block">
      <h2 className="block-title">🕐 Opening Hours</h2>

      <div className="hours-list">
        {openingHours.map((h) => (
          <div key={h.day} className={`hours-row${h.today ? ' today' : ''}`}>
            <span className="hours-day">
              {h.day}
              {h.today && <span className="today-tag">Today</span>}
            </span>
            <span className="hours-time">{h.open} – {h.close}</span>
          </div>
        ))}
      </div>

      <div className="hours-note">
        <span>✅</span>
        <p>We are open on all public holidays. Call us to confirm timings.</p>
      </div>
    </div>
  );
};

export default ContactHours;
