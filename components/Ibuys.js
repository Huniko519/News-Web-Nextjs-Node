import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from '../src/styles/partials/_ibuys.scss';

const Ibuys = (props) => {
  const { items } = props;
  /* eslint-disable react/no-array-index-key *//* @TODO @markparolis to review index key usage */
  return (
    <>
      <style global jsx>{stylesheet}</style>
      <div className="inews__ibuys">
        {items.map((item, i) => (
          <div key={`ibuys-listItem-${i}`}>
            {item.image ? (
              <figure className="inews__ibuys_image">
                <a
                  href={item.link}
                  key={`ibuys-image-${i}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <amp-img src={item.image} height="1" width="1.5" layout="responsive" />
                  <figcaption>{item.title}</figcaption>
                </a>
              </figure>
            ) : ''}
            <div className="inews__ibuys__info">
              <h4>{item.title}</h4>
              <p>
                <span className="inews__ibuys__price">
                  <em>
                    £
                    {item.price}
                    ,
                  </em>
                </span>
                {' '}
                <a href={item.link} key={`ibuys-source-${i}`} target="_blank" rel="noopener noreferrer">
                  {item.source}
                </a>
              </p>
              <p>
                <strong>Best for:</strong>
              &nbsp;
                {item.best}
              </p>
              <a
                href={item.link}
                className="inews__ibuys__buynow"
                key={`ibuys-buynow-${i}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Buy now
              </a>
            </div>
            <div
              className="inews__ibuys__description"
              dangerouslySetInnerHTML={{
                __html: item.description,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};

Ibuys.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Ibuys;
