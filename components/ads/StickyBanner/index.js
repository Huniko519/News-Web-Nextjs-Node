import React from 'react';

import styles from './styles.scss';

export const StickyBanner = () => (
  <>
    <div className="inews__advert" id="sticky_banner" data-pos="sticky_banner" />
    <style jsx>{styles}</style>
  </>
);

export const StickyBannerTop = () => (
  <div className="inews__advert" id="sticky_banner_top" data-pos="sticky_banner_top" />
);
