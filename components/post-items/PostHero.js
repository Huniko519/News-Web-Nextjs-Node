import React from 'react';
import PropTypes from 'prop-types';
import PostItemMedia from './PostItemMedia';
import PostItemBadge from './PostItemBadge';
import PostItemTitle from './PostItemTitle';
import PostItemLabel from './PostItemLabel';
import Qoute from '../../utils/Qoute';

/**
 *
 * ╔══════════════════╗
 * ║                  ║
 * ║      Image       ║
 * ║                  ║
 * ╟──────────────────╢
 * ║     Category     ║
 * ║     Headline     ║
 * ║     Excerpt      ║
 * ╚══════════════════╝
 *
 * @param {post: {...postData}} props
 */
const PostHero = (props) => {
  const { post } = props;
  const isSponsored = post.type === 'post_sponsored';

  return (
    <div
      className={`inews__post inews__post-hero ${post.template ? post.template : ''}`}
      key={post.id}
      data-post-id={post.id}
    >

      <PostItemMedia
        className="inews__post-hero__media"
        imageSize="medium-16:9"
        width={16}
        height={9}
        layout="responsive"
        placeholder="/static/images/placeholder/placeholder-640x360.png"
        post={post}
      />
      <div className="inews__post-hero__content">
        <PostItemBadge post={post} showAuthor={post.template === 'opinion'} />
        <div className="inews__post-hero__headline">
          {post.template === 'opinion' && <Qoute size="medium" />}
          <PostItemLabel post={post} />
          <PostItemTitle post={post} />
          {isSponsored && (
            <span className="inews__post__sponsored-label">
              Promoted Content
            </span>
          )}
          <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </div>
      </div>
    </div>
  );
};

/* istanbul ignore next */
PostHero.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostHero;
