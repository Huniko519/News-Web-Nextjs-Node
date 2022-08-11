import React from 'react';
import PropTypes from 'prop-types';

const NewsletterSplash = ({ posts }) => (
  <div
    dangerouslySetInnerHTML={{
      __html: posts,
    }}
  />
);

NewsletterSplash.propTypes = {
  posts: PropTypes.string,
};

NewsletterSplash.defaultProps = {
  posts: '',
};

export default NewsletterSplash;
