import React from 'react';
import ampAdRTCConfig from './amp-ad-rtc';

/**
 * Builds the markup needed for the MPU placeholders
 *
 * @param string pos Ad position suffix i.e l1
 *
 * @return jsx
 */
export const buildMpuAd = (pos) => {
  if (!pos) {
    return null;
  }

  return (
    <>
      <div className="inews__advert" id={`mpu_${pos}`} data-pos={`mpu_${pos}`} />
      <div className="inews__advert" id={`mpu_tablet_${pos}`} data-pos={`mpu_tablet_${pos}`} />
      <div className="inews__advert" id={`mpu_mobile_${pos}`} data-pos={`mpu_mobile_${pos}`} />
    </>
  );
};

/**
 * Generates the full slot name for an amp-ad
 *
 * @param slot full Ad position identifier i.e mpu_amp_l1
 * @param object wp-json post object
 *
 * @return jsx
 */
export const generateAmpAdSlot = (slot, post) => {
  const categories = post.breadcrumbs.map((b) => b.slug);
  return `/5765/inews.amp/${categories.join('_')}/${slot}`;
};

/**
 * Generates the targeting json object for an amp-ad
 *
 * @param object wp-json post object
 *
 * @return json string
 */
export const generateAmpAdJson = (post) => {
  const json = {
    targeting: {
      article: post.id,
      rtc: 1,
    },
  };
  return JSON.stringify(json);
};

/**
 * Generates the RTC json object for an amp-ad
 *
 * @param object wp-json post object
 *
 * @return json string
 */
export const generateAmpAdRTC = (slot) => {
  const config = ampAdRTCConfig[slot];

  if (!config) {
    return {};
  }

  const rtc = {
    vendors: {
      criteo: {
        ZONE_ID: config.criteo ?? '',
        LINE_ITEM_RANGES: '0..10:0.01;10..25:0.05;25..50:0.10;50..100:0.25',
      },
      prebidappnexus: {
        PLACEMENT_ID: config.appnexus ?? '',
      },
    },
    urls: [
      `https://amp.casalemedia.com/amprtc?v=1&w=${config.primaryW || 300}&h=${config.primaryH || 250}&ow=ATTR(data-override-width)&oh=ATTR(data-override-height)&ms=ATTR(data-multi-size)&s=${config.indexexchange ?? ''}&p=CANONICAL_URL&consent_state=CONSENT_STATE&consent_string=CONSENT_STRING`,
      `https://aax.amazon-adsystem.com/e/dtb/bid?src=3065&pubid=PUB_UUID&amp=1&u=CANONICAL_URL&slots=%5B%7B%22sd%22%3A%22${slot}%22%2C%22s%22%3A%5B%22ATTR(width)xATTR(height)%22%5D%2C%22ms%22%3A%22ATTR(data-multi-size)%22%7D%5D&pj={"amp":1}&gdprc=CONSENT_STRING`,
    ],
  };

  return JSON.stringify(rtc);
};

/**
 * Builds the complete amp-ad element with all of the needed
 * attributes
 *
 * @param string pos Ad position suffix i.e l1
 * @param object wp-json post object
 *
 * @return jsx
 */
export const buildMpuAmpAd = (pos, post) => {
  if (!pos || !post?.id) {
    return null;
  }
  const adPos = `mpu_amp_${pos}`;
  const props = {
    'id': adPos,
    'layout': 'fluid',
    'height': 'fluid',
    'type': 'doubleclick',
    'json': generateAmpAdJson(post),
    'rtc-config': generateAmpAdRTC(adPos),
    'data-slot': generateAmpAdSlot(adPos, post),
    'data-multi-size': '300x250',
    'data-block-on-consent': '',
    'data-npa-on-unknown-consent': 'true',
  };

  if (adPos === 'mpu_amp_l1') {
    props['data-multi-size'] = '300x250,320x480';
    props['data-multi-size-validation'] = 'false';
  }

  return <div className="inews__advert inews__advert_amp"><amp-ad {...props} /></div>;
};

export const renderBillboardAd = (context) => {
  let render = true;

  if (context?.router?.pathname === '/category' && context?.sidebar?.['_embedded']?.widgets?.[0]) {
    render = false;
  }

  return render;
};
