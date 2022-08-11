import React from 'react';
import PropTypes from 'prop-types';

/**
 * A post published date for a Post Item
 *
 * @param {post: {...postData}} props
 */
const PostItemPubDate = (props) => {
  const { post, showPubDate } = props;
  const dateObj = new Date(post.date);
  let pubDate = null;

  if (dateObj.toString() === 'Invalid Date') {
    return pubDate;
  }

  const weekday = dateObj.toLocaleString('default', { weekday: 'long' });
  const dayOfMonth = dateObj.getDate();
  const month = dateObj.toLocaleString('default', { month: 'long' });
  const dateString = `${weekday}, ${dayOfMonth} ${month}`.toUpperCase();

  if (showPubDate) {
    pubDate = (
      <span className="inews__post__pub_date">
        <p
          dangerouslySetInnerHTML={{
            __html: `${dateString}`,
          }}
        />
      </span>
    );
  }

  return pubDate;
};

/* istanbul ignore next */
PostItemPubDate.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  showPubDate: PropTypes.bool,
};

export default PostItemPubDate;
