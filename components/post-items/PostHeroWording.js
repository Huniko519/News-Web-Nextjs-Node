import React from 'react';
import PropTypes from 'prop-types';
import PostItemBadge from './PostItemBadge';
import PostItemTitle from './PostItemTitle';
import PostItemLabel from './PostItemLabel';
import PostItemPubDate from './PostItemPubDate';

/**
  *
  * ╔══════════════════╗
  * ║     Category     ║
  * ║     Headline     ║
  * ║     Excerpt      ║
  * ╚══════════════════╝
  *
 * @param {post: {...postData}} props
 */
const PostHeroWording = (props) => {
  const { post, showPubDate } = props;

  return (
    <div className="inews__post inews__post-herowording" key={post.id} data-post-id={post.id}>
      <div className="inews__post-herowording__content">
        <div>
          <PostItemBadge post={post} />
          <div className="inews__post-herowording__headline">
            <PostItemLabel post={post} />
            <PostItemTitle post={post} />
            <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
          </div>
        </div>
        <PostItemPubDate post={post} showPubDate={showPubDate} />
      </div>
    </div>
  );
};

/* istanbul ignore next */
PostHeroWording.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  showPubDate: PropTypes.bool,
};

/* istanbul ignore next */
PostHeroWording.defaultProps = {
  showPubDate: false,
};

export default PostHeroWording;
