import React from 'react';
import PropTypes from 'prop-types';

/**
 * Wrapper for PostSections
 *
 * @param {*} props
 */
const PostSectionWrapper = (props) => {
  const {
    className, type, teaserPosition, children,
  } = props;
  const attrs = {
    className,
    'data-type': type,
  };

  attrs.className = `inews__post-section${` ${attrs.className}`}`;
  if (teaserPosition) {
    attrs['data-teaser-position'] = teaserPosition;
  }

  return (
    <div {...attrs}>
      {children}
    </div>
  );
};

/* istanbul ignore next */
PostSectionWrapper.propTypes = {
  type: PropTypes.string.isRequired,
  className: PropTypes.string,
  teaserPosition: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

/* istanbul ignore next */
PostSectionWrapper.defaultProps = {
  className: '',
  teaserPosition: '',
};

export default PostSectionWrapper;
