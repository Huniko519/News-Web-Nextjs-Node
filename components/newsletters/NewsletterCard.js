import React from 'react';
import PropTypes from 'prop-types';
import ScopedColorContext from '../ScopedColorContext';
import { getSVG as getLogoSVG } from '../../utils/logo';

/**
 * Newsletter card on my account page
 *
 * @param {item: {...itemData}} props
 */
const NewsletterCard = (props) => {
  const { item } = props;

  let className = 'newsletter-management-cards_item';

  if (item.subscriptionRequired) {
    className += ' subscriptionRequired';
  }
  return (
    <div className={className}>
      <ScopedColorContext colorKeys={[item.className]}>
        <div className="newsletter-management-card">
          <div className="newsletter-management-card__header">
            <div className="newsletter-management-card__title">
              <div>
                {item.hasLogo && (
                  <div className="newsletter-management-card__header__icon">
                    <span className="newsletter-management-card__header__logo">
                      {getLogoSVG(true)}
                    </span>
                  </div>
                )}
                {item.list}
              </div>
              <div className="frequency">{item.frequency}</div>
            </div>
          </div>
          <div className="newsletter-management-card__content">
            <p className="newsletter-management-card__description">
              {item.isNew && <i className="newsletter-management-card__new_icon">NEW</i>}
              {' '}
              {item.desc}
            </p>
          </div>
          <div className="newsletter-management-card__footer">
            <div className="newsletter-management-card__tick">
              <input type="hidden" value="0" name={`list[${item.sailThruName}]`} />
              <label htmlFor={item.list} className="checkbox-container">
                <input
                  type="checkbox"
                  id={item.list}
                  name={`list[${item.sailThruName}]`}
                  className="newsletter-management__list-checkbox"
                  value="1"
                />
                <span className="checkmark" />
              </label>
            </div>
            <div className="newsletter-management-card__see-latest">
              {item.sample
                && (
                <a
                  href={`${item.sample}`}
                  className={`list[${item.sailThruName}]`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  See Latest
                </a>
                )}
            </div>
          </div>
          {item.subscriptionRequired
          && (
          <a
            className="newsletter-management-card__subscribe"
            href={`/subscribe?ico=subscriber_newsletters_${item.sailThruName}`}
            data-name={`list[${item.sailThruName}]`}
            data-label={item.list}
          >
            <span>Subscribe now</span>
          </a>
          )}
        </div>
      </ScopedColorContext>
    </div>
  );
};

NewsletterCard.propTypes = {
  item: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default NewsletterCard;
