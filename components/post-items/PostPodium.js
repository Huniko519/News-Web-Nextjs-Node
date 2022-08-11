import React from 'react';
import PropTypes from 'prop-types';
import PostItemMedia from './PostItemMedia';
import PostItemBadge from './PostItemBadge';
import PostItemTitle from './PostItemTitle';
import PostItemLabel from './PostItemLabel';

/**
 *
 *
 * @param {post: {...postData}} props
 */
const PostHero = (props) => {
  const { post } = props;

  return (
    <div className="inews__post inews__post-podium show-author" key={post.id} data-post-id={post.id}>
      <PostItemBadge post={post} showAuthor />
      <div className="inews__post-podium__content">
        <PostItemMedia
          className="inews__post-podium__media"
          imageSize="small-1:1"
          post={post}
          height={155}
          width={155}
          layout="fixed"
          showAuthor
          placeholder="/static/images/placeholder/placeholder-84x84.png"
        />
        <div className="inews__post-podium__content-headline">
          <PostItemLabel post={post} />
          <PostItemTitle post={post} />
        </div>
      </div>
      <p className="inews__post-podium__excerpt" dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
    </div>
  );
};

/* istanbul ignore next */
PostHero.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostHero;
