import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PageContext from './PageContext';
import AdvertOOP from './ads/OOP';
import SkimlinksAMP from './Skimlinks';
import BackToTop from './BackToTop';

const Footer = (props) => {
  /* eslint-disable jsx-a11y/anchor-is-valid */
  const { allMenus = [], disableLayoutOOPAd = false } = props;

  const menuIndex1 = allMenus.findIndex((element) => element.name === 'Bottom Menu 1');
  const menuIndex2 = allMenus.findIndex((element) => element.name === 'Bottom Menu 2');
  return (
    <>
      <footer className="inews__footer">
        <div className="inews__footer__menus">
          <div className="inews__footer__main">
            <div className="inews__footer__menus__column">
              <h3>Essentials</h3>
              <nav>
                <ul>
                  {menuIndex1 > -1 && allMenus[menuIndex1].items.map((item) => (
                    <li key={`menu1-listItem-${item.object_id}`}>
                      <a href={item.url} title={item.title} key={`link-${item.object_id}`}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="inews__footer__menus__column">
              <h3>Useful links</h3>
              <nav>
                <ul>
                  {menuIndex2 > -1 && allMenus[menuIndex2].items.map((item) => (
                    <li key={`menu2-listItem-${item.object_id}`}>
                      <a href={item.url} title={item.title} key={`link-${item.object_id}`}>{item.title}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            <div className="inews__footer__menus__column">
              <h3>Follow us on</h3>
              <a aria-label="Visit inews on Facebook" href="https://www.facebook.com/theipaper" className="inews__footer__menus__column__social-link" target="_blank" rel="noopener noreferrer" data-track="facebook_share-footer">
                <svg width="40px" height="40px" viewBox="0 0 40 40" version="1.1" xmlns="http://www.w3.org/2000/svg" className="facebook-icon">
                  <circle fill="none" strokeWidth="2" cx="20" cy="20" r="19" />
                  <path d="M17.334,16.667 L14,16.667 L14,20 L17.334,20 L17.334,30 L22.334,30 L22.334,20 L25.367,20 L25.667,16.667 L22.334,16.667 L22.334,15.278 C22.334,14.478 22.494,14.167 23.264,14.167 L25.667,14.167 L25.667,10 L21.66,10 C18.667,10 17.334,11.32 17.334,13.847 L17.334,16.667 Z" />
                </svg>
              </a>
              <a aria-label="Visit inews on Twitter" href="https://twitter.com/theipaper" className="inews__footer__menus__column__social-link" target="_blank" rel="noopener noreferrer" data-track="twitter_share-footer">
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" className="twitter-icon">
                  <circle fill="none" strokeWidth="2" cx="20" cy="20" r="19" />
                  <path d="M30 13.9272539c-.7486172.3321097-1.5427635.5501966-2.356.647.8563525-.5135224 1.4976045-1.3199721 1.805-2.27-.8061942.4768726-1.6878453.8126913-2.607.993-1.2706884-1.3551201-3.2930593-1.6879838-4.9310323-.8116026-1.6379731.8763812-2.4832405 2.7435461-2.0609677 4.5526026-3.2984077-.165126-6.3718108-1.7221812-8.456-4.284-1.0880093 1.8757847-.5306575 4.2741927 1.273 5.478-.650919-.0213441-1.2874301-.1971815-1.857-.513-.0251661 1.9727641 1.3556495 3.6848243 3.289 4.078-.604688.1636748-1.2386917.1876123-1.854.07.5384224 1.6708568 2.0788418 2.8151225 3.834 2.848-1.7215671 1.3487091-3.9075493 1.9600217-6.079 1.7 3.6732069 2.3527772 8.35192 2.4605681 12.1295815.2794484 3.7776615-2.1811197 6.0235284-6.2869762 5.8224185-10.6444484.8043786-.5792145 1.4980781-1.2983181 2.048-2.123z" />
                </svg>
              </a>
              <a aria-label="Visit inews on Instagram" href="https://www.instagram.com/theipaper" className="inews__footer__menus__column__social-link" target="_blank" rel="noopener noreferrer" data-track="instagram_share-footer">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 33 32.999" className="instagram-icon">
                  <g data-name="Group 112" transform="translate(-807 -892)">
                    <path data-name="Subtraction 3" d="M-2001,498h-29a2,2,0,0,1-2-2V467a2,2,0,0,1,2-2h29a2,2,0,0,1,2,2v29A2,2,0,0,1-2001,498Zm-22.577-27a2.426,2.426,0,0,0-2.423,2.423v16.153a2.426,2.426,0,0,0,2.423,2.425h16.156a2.426,2.426,0,0,0,2.421-2.425V473.423a2.426,2.426,0,0,0-2.423-2.423Zm15.145,18.375h-14.134a.808.808,0,0,1-.808-.805V479.75h1.661a6.585,6.585,0,0,0-.176.85,6.171,6.171,0,0,0-.07.9,6.468,6.468,0,0,0,6.461,6.461,6.468,6.468,0,0,0,6.46-6.461,6.186,6.186,0,0,0-.071-.9,6.977,6.977,0,0,0-.176-.85h1.661v8.818A.808.808,0,0,1-2008.432,489.375Zm-7.068-3.837a4.043,4.043,0,0,1-4.039-4.038,4.043,4.043,0,0,1,4.039-4.038,4.043,4.043,0,0,1,4.039,4.038A4.043,4.043,0,0,1-2015.5,485.538Zm7.066-8.394h-1.9a.809.809,0,0,1-.807-.809v-1.9a.808.808,0,0,1,.807-.807h1.9a.809.809,0,0,1,.809.807v1.9A.81.81,0,0,1-2008.434,477.144Z" transform="translate(2839 427)" />
                  </g>
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="inews__footer__strap">
          <div className="inews__footer__main">
            <div className="inews__footer__meta">
              <p className="inews__footer__copyright">All rights reserved. © 2021 Associated Newspapers Limited.</p>
              <ul className="inews__footer__links">
                <>
                  <li><a href="#" className="cmp-settings-toggle">Cookie Settings</a></li>
                  <li><a href="#" className="cmp-settings-toggle">Don&apos;t sell my info</a></li>
                </>
                <li><a rel="noopener" href="/terms-and-conditions">Terms and Conditions</a></li>
                <li><a rel="noopener" href="/privacy-policy">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      {
       !disableLayoutOOPAd
        && (
          <>
            <AdvertOOP />
          </>
        )
      }
      <SkimlinksAMP />
      <BackToTop />
      <div id="piano-inline-footer" />
    </>
  );
};

Footer.propTypes = {
  allMenus: PropTypes.arrayOf(PropTypes.any),
  disableLayoutOOPAd: PropTypes.bool,
};

Footer.defaultProps = {
  allMenus: [],
  disableLayoutOOPAd: false,
};

export default Footer;
