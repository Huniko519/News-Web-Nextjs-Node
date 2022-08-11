import React from 'react';
import PropTypes from 'prop-types';
import Slide from './Slide';

const RightArrow = () => (
  <>
    <svg viewBox="0 0 17 28" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(17 .105) rotate(90)" fill="#fff" data-name="Group 10475">
        <path transform="translate(13.798) rotate(45)" d="M0,0,19.91.125l.025,3.982L.025,3.982Z" data-name="Path 2769" />
        <path transform="translate(-.106 14.096) rotate(-45)" d="M.025.125,19.935,0,19.91,3.982,0,4.107Z" data-name="Path 2770" />
      </g>
    </svg>
  </>
);

const LeftArrow = () => (
  <>
    <svg viewBox="0 0 16.821 28.021" xmlns="http://www.w3.org/2000/svg">
      <g transform="translate(2444 19967)" fill="#fff" data-name="Group 10475">
        <path transform="translate(-2444 -19953) rotate(-45)" d="M0,0,19.8.116l.024,3.849L.024,3.849Z" data-name="Path 2769" />
        <path transform="translate(-2430 -19939) rotate(225)" d="M.024.116,19.824,0,19.8,3.849,0,3.965Z" data-name="Path 2770" />
      </g>
    </svg>
  </>
);

// eslint-disable-next-line react/prop-types
const SlideControl = ({ right }) => (
  <div className={`slide-control ${right ? 'right' : 'left'}`}>
    <span className="slide-control__btn">
      {right ? <RightArrow /> : <LeftArrow />}
    </span>
  </div>
);

const Slider = ({ items, itemsLimitForArrow, carouselName }) => (
  <div className={`slider-container ${items.length <= itemsLimitForArrow ? 'no-arrow' : ''}`}>
    <SlideControl right={false} />
    <div className="scrollable">
      {items && items.map((slide) => <Slide key={slide.link} {...slide} carouselName={carouselName} />)}
    </div>
    <SlideControl right />
  </div>
);

Slider.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    link: PropTypes.string,
    image: PropTypes.string,
    title: PropTypes.string,
  })),
  // Items limit to disable control arrows.
  itemsLimitForArrow: PropTypes.number,
  carouselName: PropTypes.string,
};

Slider.defaultProps = {
  items: [],
  itemsLimitForArrow: 6, // Default value
  carouselName: '',
};

export default Slider;
