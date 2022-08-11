import React from 'react';
import PropTypes from 'prop-types';
import { getFeaturedImage, getCoAuthorImage } from '../../utils/image';
import { getVideoIcon } from '../../utils/post';

/**
 * Output a featured image
 *
 * @param {*} props
 */
const PostItemMedia = (props) => {
  const {
    post, imageSize, className, placeholder, showAuthor, width, height, layout, postItemType, linkToAuthor,
  } = props;
  let featuredImage = getFeaturedImage(post, imageSize, placeholder);
  const videoIcon = getVideoIcon(post);

  // The featured image can be overriden by a setting to show the author avatar instead
  if (post['co-authors']?.[0]?.display_name && showAuthor) {
    featuredImage = getCoAuthorImage(post['co-authors'][0],
      post.template === 'opinion' ? imageSize : 'medium-1:1',
      placeholder,
      post.template === 'opinion');
  }

  // preparing common attributes for image tag
  const getImageAttributes = () => {
    const altText = featuredImage.alt ? `: ${featuredImage.alt}` : '';
    return {
      width,
      height,
      layout,
      alt: `Article thumbnail${altText}`,
    };
  };

  return (
    <div className={className}>
      {featuredImage && (
        <>
          <a href={linkToAuthor ? post['co-authors'][0].link : post.link} title={post.title.raw}>
            <div className={`${className}__default`}>
              <amp-img
                src={featuredImage.src}
                {...getImageAttributes()}
              />
            </div>

            {postItemType === 'teaser' && !showAuthor
            && (
              <div className={`${className}__mobile`}>
                <amp-img
                  {...getImageAttributes()}
                  src={getFeaturedImage(post, 'small-1:1', placeholder).src}
                />
              </div>

            )}
          </a>
          {videoIcon && videoIcon}
        </>
      )}
    </div>
  );
};

/* istanbul ignore next */
PostItemMedia.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  className: PropTypes.string,
  imageSize: PropTypes.string,
  placeholder: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.number,
  layout: PropTypes.string,
  showAuthor: PropTypes.bool,
  postItemType: PropTypes.string,
  linkToAuthor: PropTypes.bool,
};

/* istanbul ignore next */
PostItemMedia.defaultProps = {
  className: '',
  placeholder: '/static/images/placeholder/placeholder-84x84.png',
  width: 84,
  height: 84,
  layout: 'fixed',
  imageSize: 'full',
  showAuthor: false,
  postItemType: '',
  linkToAuthor: false,
};

export default PostItemMedia;
