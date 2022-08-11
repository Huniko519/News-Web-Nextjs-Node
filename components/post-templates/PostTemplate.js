import React from 'react';
import PropTypes from 'prop-types';
import Default from './default/Default';
import Fullwidth from './fullwidth/Fullwidth';
import LongForm from './longform/LongForm';
import Opinion from './opinion/Opinion';

/**
* Maps the template string names to the matching react components
*/
const templateMap = {
  'default': Default,
  'full-width': Fullwidth,
  'longform': LongForm,
  'opinion': Opinion,
};

/**
 * Returns the correct post template component for the post being rendered
 *
 * @param {*} props
 */
const PageTemplate = (props) => {
  const { post } = props;

  let Component = Default;
  if (templateMap?.[post?.template]) {
    Component = templateMap[post.template];
  }

  return <Component {...props} />;
};

PageTemplate.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PageTemplate;
