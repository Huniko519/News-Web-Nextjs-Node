import React from 'react';
import PropTypes from 'prop-types';
import PostSection1xBanner4xJot from './PostSection1xBanner4xJot';

/**
 * Duplicate the other banner layout, just with black text
 *
 * @param {items: [...posts]} props
 * @see '../post-sections/PostSection1xBanner4xJot'
 */

const PostSection1xBannerBlack4xJot = (props) => <PostSection1xBanner4xJot {...props} color="black" />;

PostSection1xBannerBlack4xJot.propTypes = {
  items: PropTypes.arrayOf(PropTypes.object).isRequired,
  title: PropTypes.string,
  link: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
};

PostSection1xBannerBlack4xJot.defaultProps = {
  title: '',
  link: '',
  className: '',
  color: 'black',
};

export default PostSection1xBannerBlack4xJot;
