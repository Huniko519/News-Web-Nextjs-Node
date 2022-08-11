import React from 'react';
import PropTypes from 'prop-types';
import PostItemMedia from './PostItemMedia';
import PostItemTitle from './PostItemTitle';
import PostItemLabel from './PostItemLabel';

/**
 *
 * ╔══════════════════╗
 * ║     Headline     ║
 * ║     Excerpt      ║
 * ╟──────────────────╢
 * ║                  ║
 * ║      Image       ║
 * ║                  ║
 * ╚══════════════════╝
 *
 * @param {post: {...postData}} props
 */
const PostInvertedHero = (props) => {
  const { post } = props;

  return (
    <div className="inews__post inews__post-invertedhero" key={post.id} data-post-id={post.id}>
      <div className="inews__post-invertedhero__content">
        <div className="inews__post-invertedhero__headline">
          <PostItemTitle post={post} />
          <PostItemLabel post={post} />
          <p dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }} />
        </div>
      </div>
      <PostItemMedia
        className="inews__post-invertedhero__media"
        imageSize="wide-banner"
        width={16}
        height={6}
        layout="responsive"
        placeholder="/static/images/placeholder/placeholder-640x360.png"
        post={post}
      />
    </div>
  );
};

/* istanbul ignore next */
PostInvertedHero.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostInvertedHero;
