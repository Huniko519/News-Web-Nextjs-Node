import React from 'react';
import PropTypes from 'prop-types';
import PostItemMedia from './PostItemMedia';
import PostItemTitle from './PostItemTitle';
import PostItemLabel from './PostItemLabel';
import Qoute from '../../utils/Qoute';

/**
 * Display a large image with the headline and exerpt
 * ╔══════════╤══════════════╗
 * ║ Headline │              ║
 * ║          │    Image     ║
 * ║ Excerpt  │              ║
 * ╚══════════╧══════════════╝
 * @param {post: {...postData}} props
 */
const PostHeroBox = (props) => {
  const { post, showAuthor, showQuote } = props;
  const isSponsored = post.type === 'post_sponsored';
  return (
    <div className="inews__post inews__post-herobox" key={post.id} data-post-id={post.id}>
      <div className={`inews__post-herobox__content ${(showAuthor && post.template === 'opinion') ? 'inews__post-herobox_space' : ''}`}>
        <div>
          {post.template === 'opinion' && showQuote && <Qoute size="medium" />}
          <PostItemTitle post={post} />
          <PostItemLabel post={post} />
          {isSponsored && (
            <span className="inews__post__sponsored-label">
              Promoted Content
            </span>
          )}
        </div>
        <div>
          {showAuthor && post.template === 'opinion' && (
            <div className="inews__post-herobox_author">
              <PostItemMedia
                className="inews__post-herobox_author__media"
                imageSize="small-16:9"
                width={230}
                height={130}
                layout="fixed"
                showAuthor
                placeholder="/static/images/placeholder/placeholder-84x84.png"
                post={post}
                linkToAuthor
              />
              <p className="inews__post__badge">
                <a href={post['co-authors'][0].link}>
                  {post['co-authors'][0].display_name}
                </a>
              </p>
            </div>
          )}
          <p
            className={`inews__post-herobox_description ${(post.template === 'opinion') ? 'hidden' : ''}`}
            dangerouslySetInnerHTML={{
              __html: post.excerpt.rendered,
            }}
          />
        </div>
      </div>
      <div>
        {/* div is needed for positioning context for video icon to prevent edge cases with grid */}
        <PostItemMedia
          className="inews__post-herobox__media inews__post-herobox__media--1-1"
          imageSize="medium-1:1"
          width={1}
          height={1}
          layout="responsive"
          placeholder="/static/images/placeholder/placeholder-84x84.png"
          post={post}
        />
        <PostItemMedia
          className="inews__post-herobox__media inews__post-herobox__media--16-9"
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
PostHeroBox.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  showAuthor: PropTypes.bool,
  showQuote: PropTypes.bool,
};
PostHeroBox.defaultProps = {
  showAuthor: false,
  showQuote: false,
};

export default PostHeroBox;
