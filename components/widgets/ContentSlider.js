import React from 'react';
import PropTypes from 'prop-types';
import Slider from '../../utils/slider';

const ContentSlider = ({ authorInfo }) => {
  const prepareSlides = () => {
    const { carousel } = authorInfo;
    return Object.keys(carousel).map((key) => {
      const { slider_text, destination_url, slider_image } = carousel[key];
      return {
        link: destination_url,
        image: slider_image,
        title: slider_text,
        classname: 'content-author-slide',
      };
    });
  };

  return (
    <div className="author-slider-container">
      <h2 className="author-header">{authorInfo.title.raw}</h2>
      <div className="slider">
        <div className="slider-shadow-right" />
        <Slider items={prepareSlides()} carouselName={authorInfo.title.raw} />
      </div>
    </div>
  );
};

ContentSlider.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  authorInfo: PropTypes.object,
};

ContentSlider.defaultProps = {
  authorInfo: {},
};

export default ContentSlider;
