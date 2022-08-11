import React from 'react';
import ReactDOM from 'react-dom';
import Advert, { getAdUnitPath } from './Advert';
import { queryParams } from '../../utils/URL';
import { version } from '../../package.json';
import { getDeviceConfig } from '../../utils/useBreakpoint';

/**
 * Update config with which ad slots
 * to prepare for first render based on screen size
 * @return object ad descriptions
 */
const setInitialDescriptions = (config) => {
  const updatedConfig = { ...config };
  const breakpointName = getDeviceConfig(window.innerWidth);

  // Choose the most relevant ads description for this breakpoint
  Object.keys(config.adsDescriptions).forEach((pos) => {
    const descriptions = config.adsDescriptions[pos].length
      ? config.adsDescriptions[pos]
      : [config.adsDescriptions[pos]];

    descriptions.forEach((description) => {
      if ((description.breakpoints || ['xs', 'sm', 'md', 'lg', 'xl'])
        .includes(breakpointName)) {
        updatedConfig.adsDescriptions[pos] = description;
        updatedConfig.adsDescriptions[pos].initial = true;
        updatedConfig.adsDescriptions[pos].pos = pos;
      }
    });
  });

  if (global.PageContext.pageData.type === 'article') {
    const { mpu_tablet_r1, mpu_tablet_r2, mpu_tablet_r3 } = updatedConfig.adsDescriptions;

    if (mpu_tablet_r1?.initial) mpu_tablet_r1.initial = false;
    if (mpu_tablet_r2?.initial) mpu_tablet_r2.initial = false;
    if (mpu_tablet_r3?.initial) mpu_tablet_r3.initial = false;
  }

  return updatedConfig;
};

let resolver;
// eslint-disable-next-line no-return-assign
export const adsApiReady = new Promise((resolve) => resolver = resolve);

/**
 * Ads Setup
 *
 * @constructor
 */
const AdsSetup = () => {
  const params = queryParams();

  const baseConfig = global.adverts?.config || {};

  const config = setInitialDescriptions(baseConfig);

  let enabledSlots = Object.keys(config.adsDescriptions);

  if (global.PageContext.pageData.type === 'article') {
    enabledSlots = enabledSlots.filter((pos) => (
      !['mpu_tablet_r1', 'mpu_tablet_r2', 'mpu_tablet_r3'].includes(pos)
    ));
  }

  global.adverts = {
    ...global.adverts,
    api: { ready: resolver },
    config,
  };

  // Use either from static dubdomain, /static path, or via url param.
  const { hostname } = global.location;
  const useStatic = ['inews.co.uk', 'inewsint.co.uk']
    .includes(hostname);

  let abl = '/static';

  if (useStatic) {
    abl = `//static.${hostname}`;
  }

  if (params.abl && params.abl.match(/^https:\/\/localhost:\d+(\/.*$|$)/)) {
    abl = params.abl;
  }

  if (hostname === 'inews.co.uk') {
    config.tcfv2.backendUrl = '//cmp.dmgmediaprivacy.co.uk/gdpr/consent/persist';
  }

  const tag = document.createElement('script');
  tag.async = true;
  tag.src = `${abl}/inews-adverts.js?version=${version}`;
  document.body.appendChild(tag);

  // Mount ad components
  adsApiReady.then(() => {
    // Broadcast appstate
    window.adverts.cmd.push(
      {
        scope: 'appstate',
        data: {
          state: getAdUnitPath(),
        },
      },
    );

    // eslint-disable-next-line no-restricted-syntax
    for (const node of document.getElementsByClassName('inews__advert')) {
      const { pos } = node.dataset;

      if (config.adsDescriptions[pos] && enabledSlots.includes(pos)) {
        const breakpoints = config.adsDescriptions[pos].breakpoints || [];
        node.classList.add(...breakpoints);

        ReactDOM.render(<Advert pos={pos} />, node);
      }
    }
  });
  return null;
};

export default AdsSetup;
