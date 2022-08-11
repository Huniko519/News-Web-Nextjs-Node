import { adsApiReady } from '../../ads/AdsSetup';

/**
 *
 * @see https://sb.scorecardresearch.com/b?c1=2&c2=18704174&ns__t=1585755104132&ns_c=UTF-8&cv=3.5m&c8=Boris%20Johnson%20joins%20Angela%20Merkel%20and%20Emmanuel%20Macron%20in%20calling%20for%20restraint%20from%20US%20and%20Iran%20over%20Qassem%20Soleimani%20killing%20%7C%20inews&amp-q_PYXkq3zZh0y6Yo4-O6hQ&c7=https%3A%2F%2Finews.co.uk%2Fnews%2Fpolitics%2Fboris-johnson-iran-news-latest-us-qassem-soleimani-killing-reaction-angela-merkel-emmanuel-macron-1356221&c9=
 *
 */

/* eslint-disable */
const init = async () => {
  // Load comscore after we have an initialised / stubbed CMP API
  await adsApiReady

  window._comscore = window._comscore || [];
  window._comscore.push({
    c1: '2',
    c2: '6034964'
  });
  (function () {
    var s = document.createElement('script');
    var el = document.getElementsByTagName('script')[0];
    var srcURL = '';
    if (document.location.protocol == 'https:') {
      srcURL += 'https://sb';
    } else {
      srcURL += 'http://b';
    }
    srcURL += '.scorecardresearch.com/cs/6034964/beacon.js';

    s.async = true;
    s.src = srcURL;

    el.parentNode.insertBefore(s, el);
  }());
}
/* eslint-enable */

export default init;
