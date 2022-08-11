import React from 'react';
import PropTypes from 'prop-types';
import PostItemMedia from './PostItemMedia';
import PostItemTitle from './PostItemTitle';
import PostItemLabel from './PostItemLabel';

/**
 * Display a large image with the headline and exerpt
 * ╔══════════╤══════════════╗
 * ║ Headline │              ║
 * ║          │    Image     ║
 * ║ Excerpt  │              ║
 * ╚══════════╧══════════════╝
 * @param {post: {...postData}} props
 */
const PostSuperHero = (props) => {
  const { post } = props;
  const isSponsored = post.type === 'post_sponsored';

  return (
    <div className="inews__post inews__post-superhero" key={post.id} data-post-id={post.id}>
      <div className="inews__post-superhero__content">
        <PostItemTitle post={post} />
        <PostItemLabel post={post} />
        {isSponsored && (
          <span className="inews__post__sponsored-label">
            Promoted Content
          </span>
        )}
        <p
          dangerouslySetInnerHTML={{
            __html: post.excerpt.rendered,
          }}
        />
      </div>
      <div>
        {/* div is needed for positioning context for video icon to prevent edge cases with grid */}
        <PostItemMedia
          className="inews__post-superhero__media inews__post-superhero__media--1-1"
          imageSize="medium-1:1"
          width={1}
          height={1}
          layout="responsive"
          placeholder="/static/images/placeholder/placeholder-84x84.png"
          post={post}
        />
        <PostItemMedia
          className="inews__post-superhero__media inews__post-superhero__media--16-9"
          imageSize="medium-16:9"
          width={16}
          height={9}
          layout="responsive"
          placeholder="/static/images/placeholder/placeholder-640x360.png"
          post={post}
        />
      </div>
    </div>
  );
};

/* istanbul ignore next */
PostSuperHero.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostSuperHero;
