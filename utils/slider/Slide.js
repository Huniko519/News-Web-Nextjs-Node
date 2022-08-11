import React from 'react';
import PropTypes from 'prop-types';

const Slide = ({
  link, image, title, classname, carouselName,
}) => {
  const getLink = () => {
    if (link) {
      if (carouselName && carouselName !== '') {
        const cName = carouselName.replace(/ /g, '-').toLowerCase();
        const itemName = title.replace(/ /g, '-').toLowerCase();
        return `${link}?ico=${encodeURIComponent(`carousel_-_${cName}_-_${itemName}`)}`;
      }
      return link;
    }
    return '';
  };

  return (
    <div className={`item ${classname}`}>
      <a href={getLink()}>
        <img src={image} alt={title || link} />
      </a>
      {title && <p className="item__text">{title}</p>}
    </div>
  );
};

Slide.propTypes = {
  link: PropTypes.string,
  image: PropTypes.string,
  classname: PropTypes.string,
  title: PropTypes.string,
  carouselName: PropTypes.string,
};

Slide.defaultProps = {
  link: '',
  image: '',
  classname: '',
  title: undefined,
  carouselName: '',
};

export default Slide;
