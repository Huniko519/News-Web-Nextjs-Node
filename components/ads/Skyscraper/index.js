import React from 'react';
import styles from './styles.scss';

const Skyscraper = () => (
  <>
    <div className="inews__skyscraper_right">
      <div className="inews__advert" id="sky_right_top" data-pos="sky_right_top" />
    </div>

    <div className="inews__skyscraper_left">
      <div className="inews__advert" id="sky_left_top" data-pos="sky_left_top" />
    </div>
    <style global jsx>{styles}</style>
  </>
);

export default Skyscraper;
