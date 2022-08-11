import React from 'react';
import { getSVG as getLogoSVG } from '../../utils/logo';

/**
 * Output the logo and edition banner on the homepage
 */
const Masthead = () => {
  const today = new Date();
  const dayName = today.toLocaleString('en-GB', { weekday: 'short', timeZone: 'Europe/London' });
  const day = today.toLocaleString('en-GB', { day: 'numeric', timeZone: 'Europe/London' });
  const month = today.toLocaleString('en-GB', { month: 'short', timeZone: 'Europe/London' });
  const date = `${day} ${month} ${today.getFullYear()}`;

  return (
    <>
      <div className="inews__masthead" id="masthead">
        <p className="inews__masthead__current-edition">&nbsp;</p>
        <p className="inews__masthead__date">
          {dayName}
          {' '}
          {date}
        </p>
        <p className="inews__masthead__next-edition">&nbsp;</p>
        <div className="inews__masthead__logo">
          {getLogoSVG(true)}
        </div>
        <h1>The essential briefing</h1>
        <p className="inews__masthead__contact">
          <a href="/contact-us">
            <span className="inews__masthead__contact__icon">@</span>
            {' '}
            Contact us
          </a>
        </p>
        <p className="inews__masthead__newsletter">
          <a href="/my-account?ico=signup_masthead" title="newsletter preferences">
            <span className="inews__masthead__newsletter__icon">
              <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 20.967 20.967"><g><path style={{ fill: '#e33a11' }} d="M20.966,4.305c0-0.467-0.38-0.847-0.848-0.847H0.848C0.381,3.458,0,3.838,0,4.305v1.052   c0,0.042,0.004,0.081,0.009,0.115C0.004,5.505,0,5.538,0,5.572v11.09c0,0.467,0.38,0.846,0.848,0.846h19.271   c0.468,0,0.848-0.379,0.848-0.846V5.572c0-0.044-0.005-0.084-0.011-0.121c0.007-0.045,0.011-0.091,0.011-0.136L20.966,4.305   L20.966,4.305z M2.013,5.152h16.888l-8.419,6.1L2.013,5.152z M19.272,7.217v8.598H1.694V7.217l8.297,5.914   c0.289,0.207,0.697,0.205,0.984,0.002L19.272,7.217z" /></g></svg>
            </span>
            Your newsletters
          </a>
        </p>
      </div>
    </>
  );
};

export default Masthead;
