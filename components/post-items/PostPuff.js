import React from 'react';
import PropTypes from 'prop-types';
import PostItemBadge from './PostItemBadge';
import PostItemMedia from './PostItemMedia';
import PostItemTitle from './PostItemTitle';
import PostItemLabel from './PostItemLabel';
import PostItemPubDate from './PostItemPubDate';
import ScopedColorContext from '../ScopedColorContext';

/**
 * Post puffs feature a square image on the left with the post headline and primary category
 * to the right, these are arranged in a classic  media object layout such as below.
 *
 * ╔═══════╤══════════════╗
 * ║       │   Category   ║
 * ║ Image │              ║
 * ║       │   Headline   ║
 * ╚═══════╧══════════════╝
 *
 * @param {post: {...postData}} props
 */
const PostPuff = (props) => {
  const {
    scoped, post, showAuthor, showPubDate,
  } = props;
  const colorKeys = post.breadcrumbs.map((breadcrumb) => breadcrumb.slug).reverse();

  return (

    <div className={`inews__post inews__post-puff ${showAuthor ? 'show-author' : ''}`} key={post.id} data-post-id={post.id}>
      <PostItemMedia
        className="inews__post-puff__media"
        imageSize="small-1:1"
        post={post}
        height={155}
        width={155}
        layout="fixed"
        showAuthor={showAuthor}
        placeholder="/static/images/placeholder/placeholder-84x84.png"
      />

      <div className="inews__post-puff__content">
        <div>

          {
            scoped
              ? (
                <ScopedColorContext colorKeys={colorKeys}>
                  <PostItemBadge post={post} showAuthor={showAuthor} />
                </ScopedColorContext>
              )
              : <PostItemBadge post={post} showAuthor={showAuthor} />
          }

          <div className="inews__post-puff__content-headline">
            <PostItemLabel post={post} />
            <PostItemTitle post={post} />
          </div>
        </div>
        <PostItemPubDate post={post} showPubDate={showPubDate} />
      </div>
    </div>
  );
};

/* istanbul ignore next */
PostPuff.propTypes = {
  scoped: PropTypes.bool,
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  showAuthor: PropTypes.bool,
  showPubDate: PropTypes.bool,
};

/* istanbul ignore next */
PostPuff.defaultProps = {
  scoped: false,
  showAuthor: false,
  showPubDate: false,
};

export default PostPuff;
