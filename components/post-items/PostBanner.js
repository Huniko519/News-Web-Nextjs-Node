import React from 'react';
import PropTypes from 'prop-types';
import PostItemMedia from './PostItemMedia';
import PostItemTitle from './PostItemTitle';
import PostItemLabel from './PostItemLabel';
import PostItemBadge from './PostItemBadge';

/**
 * Display a large image with the headline and exerpt
 * ╔════════════════════════╗
 * ║ Headline               ║
 * ║              Image     ║
 * ║ Excerpt                ║
 * ╚════════════════════════╝
 * @param {post: {...postData}} props
 */

const PostBanner = (props) => {
  const { post, color } = props;
  const isSponsored = post.type === 'post_sponsored';
  const colorClass = `inews__post-banner__color-${color}`;
  return (
    <div className="inews__post inews__post-banner" key={post.id} data-post-id={post.id}>
      <div className={`inews__post-banner__content ${colorClass}`}>
        <PostItemBadge post={post} />
        <PostItemTitle post={post} />
        <PostItemLabel post={post} />
        {isSponsored && (
          <span className="inews__post__sponsored-label">
            Promoted Content
          </span>
        )}
        <p>
          <a
            href={post.link}
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </p>
      </div>
      <div>
        {/* div is needed for positioning context for video icon to prevent edge cases with grid */}
        <PostItemMedia
          className="inews__post-banner__media inews__post-banner__media--1-1"
          imageSize="medium-1:1"
          width={1}
          height={1}
          layout="responsive"
          placeholder="/static/images/placeholder/placeholder-84x84.png"
          post={post}
        />
        <PostItemMedia
          className="inews__post-banner__media inews__post-banner__media--wide-banner"
          imageSize="wide-banner"
          width={16}
          height={6}
          layout="responsive"
          placeholder="/static/images/placeholder/placeholder-640x360.png"
          post={post}
        />
      </div>
    </div>
  );
};

/* istanbul ignore next */
PostBanner.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  color: PropTypes.string.isRequired,
};

export default PostBanner;
