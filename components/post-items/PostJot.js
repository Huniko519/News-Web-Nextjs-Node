import React from 'react';
import PropTypes from 'prop-types';
import PostItemBadge from './PostItemBadge';
import PostItemTitle from './PostItemTitle';
import PostItemLabel from './PostItemLabel';
import PostItemPubDate from './PostItemPubDate';
import Qoute from '../../utils/Qoute';

/**
 * Post jots show the child category and post headline text. No images
 * Will optionally show the badge prepeneded to the headline
 *
 * ╔════════════╗
 * ║ Category   ║
 * ║            ║
 * ║ Headline   ║
 * ╚════════════╝
 *
 * @param {post: {...postData}} props
 */
const PostJot = (props) => {
  const {
    post, showAuthor, showPubDate, showCategory,
  } = props;

  const isShowAuthor = (showCategory === true) ? false : !!((showAuthor || post.template === 'opinion'));

  return (
    <div
      className={`inews__post inews__post-jot ${post.template ? post.template : ''}`}
      key={post.id}
      data-post-id={post.id}
    >

      <div className="inews__post-jot__content">
        <PostItemBadge post={post} showAuthor={isShowAuthor} />
        <div className="inews__post-jot__content-headline">
          {post.template === 'opinion' && <Qoute size="small" />}
          <PostItemLabel post={post} />
          <PostItemTitle post={post} />
        </div>
        <PostItemPubDate post={post} showPubDate={showPubDate} />
      </div>
    </div>
  );
};

/* istanbul ignore next */
PostJot.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  showAuthor: PropTypes.bool,
  showPubDate: PropTypes.bool,
  showCategory: PropTypes.bool,
};

/* istanbul ignore next */
PostJot.defaultProps = {
  showAuthor: false,
  showPubDate: false,
  showCategory: false,
};

export default PostJot;
