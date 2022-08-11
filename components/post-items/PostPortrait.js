import React from 'react';
import PropTypes from 'prop-types';
import PostItemMedia from './PostItemMedia';

/**
 *
 * ╔═════════╗
 * ║  Image  ║
 * ║         ║
 * ║  Author ║
 * ╚═════════╝
 *
 * @param {post: {...postData}} props
 */
const PostPortrait = (props) => {
  const { post } = props;
  const isOpinionTemplate = post.template === 'opinion';

  return (
    <div
      className={`inews__post inews__post-portrait show-author ${post.template ? post.template : ''}`}
      key={post.id}
      data-post-id={post.id}
    >

      <div className="inews__post-portrait__media_default">
        <PostItemMedia
          className="inews__post-portrait__media"
          imageSize={isOpinionTemplate ? 'small-16:9' : 'medium-1:1'}
          width={230}
          height={isOpinionTemplate ? 130 : 230}
          layout="fixed"
          showAuthor
          placeholder="/static/images/placeholder/placeholder-84x84.png"
          post={post}
          linkToAuthor
        />
      </div>

      {isOpinionTemplate && (
        <div className="inews__post-portrait__media_mobile">
          <PostItemMedia
            className="inews__post-portrait__media"
            imageSize="small-1:1"
            width={175}
            height={175}
            layout="fixed"
            showAuthor
            placeholder="/static/images/placeholder/placeholder-84x84.png"
            post={post}
            linkToAuthor
          />
        </div>
      )}

      <a
        className="inews__post-portrait__author"
        href={post['co-authors'][0].link}
        title={post['co-authors'][0].display_name}
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{
          __html: post['co-authors'][0].display_name.toUpperCase(),
        }}
      />
    </div>
  );
};

/* istanbul ignore next */
PostPortrait.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostPortrait;
