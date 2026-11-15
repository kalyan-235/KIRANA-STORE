import React from 'react';
import { imageUrl } from '../../services/imageUrl';

const AboutStory = () => {
  return (
    <section className="about-section story-section">
      <div className="about-container two-col reverse">

        <div className="about-img-wrap story-img">
          <img src={imageUrl('/kirana-image1.png')} alt="Our Story" />
          <div className="story-badge">
            <span>Est.</span>
            <strong>1995</strong>
          </div>
        </div>

        <div className="about-text">
          <span className="section-tag">Our Story</span>
          <h2>From a Small Shop to a Beloved Store</h2>
          <p>
            Ram Kirana Store was founded in 1995 by <strong>Shri Ram Prasad</strong> with a
            simple dream — to provide fresh, quality groceries to families in the neighbourhood
            at honest prices.
          </p>
          <p>
            What started as a small 200 sq ft shop with just a handful of products has grown
            into a full-fledged grocery store trusted by over 5,000 families across the city.
            Through the years, we have expanded our product range, improved our supply chain,
            and now offer doorstep delivery to make your shopping even more convenient.
          </p>
          <p>
            Today, the second generation of the family continues this legacy with the same
            values of <strong>honesty, freshness, and community service</strong> that our
            founder instilled from day one.
          </p>
        </div>

      </div>
    </section>
  );
};

export default AboutStory;
