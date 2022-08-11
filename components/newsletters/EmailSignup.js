import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PageContext from '../PageContext';

const EmailSignup = (props) => {
  const { customParams } = props;
  const ctx = useContext(PageContext);

  const defaultParams = {
    title: 'The i newsletter <span>latest news and analysis</span>',
    className: '',
    list: 'the-i',
    sailThruName: 'The i',
  };

  const listParams = Object.assign(defaultParams, customParams);

  // Build the hidden field for `source` that is populated in Sailthru as a referrer
  // @example "website:news:politics:991882"
  let trackingSource = ['website'];
  if (ctx.post && ctx.post.id) {
    if (ctx.post.breadcrumbs?.[0]) {
      const breadcrumbs = ctx.post.breadcrumbs.map((breadrumb) => breadrumb.name.toLowerCase());
      trackingSource = trackingSource.concat(breadcrumbs);
    }
    trackingSource.push(ctx.post.id);
  }
  trackingSource = trackingSource.join(':');

  return (
    <div id="inews__email-signup" className={`inews__email-signup inews__email-signup-${listParams.className}`} data-source={trackingSource} />
  );
};

EmailSignup.propTypes = {
  customParams: PropTypes.objectOf(PropTypes.any),
};

EmailSignup.defaultProps = {
  customParams: {},
};

export default EmailSignup;
