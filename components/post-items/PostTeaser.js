import React from 'react';
import PropTypes from 'prop-types';
import PostItemBadge from './PostItemBadge';
import PostItemMedia from './PostItemMedia';
import PostItemTitle from './PostItemTitle';
import PostItemLabel from './PostItemLabel';
import PostItemPubDate from './PostItemPubDate';
import Qoute from '../../utils/Qoute';

/**
 * Post Teasers feature a full(component)width image stacked on top of the post headline and primary
 * category.
 *
 * ╔══════════╗
 * ║          ║
 * ║  Image   ║
 * ║          ║
 * ╟──────────╢
 * ║ Category ║
 * ║          ║
 * ║ Headline ║
 * ╚══════════╝
 *
 * @param {post: {...postData}} props
 */
const PostTeaser = (props) => {
  const { post, showAuthor, showPubDate } = props;

  return (
    <div
      className={`inews__post inews__post-teaser ${showAuthor ? 'show-author' : ''} ${post.template ? post.template : ''}`}
      key={post.id}
      data-post-id={post.id}
    >

      <PostItemMedia
        className="inews__post-teaser__media"
        imageSize={!showAuthor ? 'medium-16:9' : 'small-1:1'}
        width={!showAuthor ? 16 : 155}
        height={!showAuthor ? 9 : 155}
        layout={!showAuthor ? 'responsive' : 'fixed'}
        showAuthor={showAuthor}
        postItemType="teaser"
        placeholder={`/static/images/placeholder/${!showAuthor ? 'placeholder-640x360.png' : 'placeholder-84x84.png'}`}
        post={post}
      />
      <div className="inews__post-teaser__content">
        <div>
          <PostItemBadge post={post} showAuthor={showAuthor || post.template === 'opinion'} />
          <span className="inews__post-teaser__content__headline">
            {post.template === 'opinion' && <Qoute size="small" />}
            <PostItemLabel post={post} />
            <PostItemTitle post={post} />
          </span>
        </div>
        <PostItemPubDate post={post} showPubDate={showPubDate} />
      </div>
    </div>
  );
};

/* istanbul ignore next */
PostTeaser.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  showAuthor: PropTypes.bool,
  showPubDate: PropTypes.bool,
};

/* istanbul ignore next */
PostTeaser.defaultProps = {
  showAuthor: false,
  showPubDate: false,
};

export default PostTeaser;
