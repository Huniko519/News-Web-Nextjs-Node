import React from 'react';
import PropTypes from 'prop-types';
import Default from './Default';
import AppTemplate from './app/Template';
import SubscribeTemplate from './subscribe/Template';
import MoneySolutionsTemplate from './money-solutions/Template';
import StudentSubscribeTemplate from './student-subscribe/Template';

/**
* Maps the template string names to the matching react components
*/
const templateMap = {
  'default': Default,
  'app': AppTemplate,
  'subscribe': SubscribeTemplate,
  'money-solutions': MoneySolutionsTemplate,
  'student-subscribe': StudentSubscribeTemplate,
};

/**
 * Returns the correct page template component for the page being rendered
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
