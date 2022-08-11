import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PageContext from '../PageContext';

import { getSocialTitle, getReviewRatingClassName } from '../../utils/post';

/**
 * Display the post title
 *
 * @param {*} props
 */
const PostItemTitle = (props) => {
  const { post } = props;
  const context = useContext(PageContext);

  let title = post.title.rendered;
  if (post.inews_homepage_headline && context && context?.router?.pathname === '/') {
    // On the homepage, use a homepage headline, if set
    title = post.inews_homepage_headline;
  } else if (post.inews_vertical_headline && context && context?.router?.pathname !== '/') {
    // See if the vertical headline is set
    title = post.inews_vertical_headline;
  } else if (post.inews_primary_headline) {
    // Use the primary headline if not on the homepage, and vertical headline not set
    title = post.inews_primary_headline;
  } else {
    // Fall back to the social title
    title = getSocialTitle(post);
  }

  return (
    <h2>
      <a
        className={getReviewRatingClassName(post)}
        href={post.link}
        title={post.title.raw}
        dangerouslySetInnerHTML={{ __html: title }}
      />
    </h2>
  );
};

/* istanbul ignore next */
PostItemTitle.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostItemTitle;
