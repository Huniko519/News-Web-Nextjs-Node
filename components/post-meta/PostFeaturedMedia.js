import React from 'react';
import PropTypes from 'prop-types';
import { getFeaturedImage } from '../../utils/image';
import { FeaturedVideo } from '../PostContent';
import FeaturedVideoMeta from './PostFeaturedVideoMeta';

const PostFeaturedMedia = (props) => {
  const { post } = props;

  // Do not show Featured Media if CMS dictates it. Always show media if this property is missing/undefined
  const hideFeaturedMedia = (typeof (post.hide_featured_media) === 'undefined') ? false : post.hide_featured_media;
  if (hideFeaturedMedia) {
    return (null);
  }

  const postTemplateFullWidth = (post.template === 'full-width');
  const postTemplateLongForm = (post.template === 'longform');
  const featuredImageSize = (postTemplateFullWidth || postTemplateLongForm) ? 'large-16:9' : 'medium-16:9';
  const featuredImage = getFeaturedImage(post, featuredImageSize);
  let featuredMedia = '';

  if (post.featured_video && featuredImage) {
    const videoMetaData = post.featured_video_meta;

    if (videoMetaData) {
      // Validation requires a description. Fallback to post excerpt.
      videoMetaData.description = videoMetaData.description || post.excerpt?.rendered;
    }

    featuredMedia = (
      <div className="featured-media">
        <figure className="featured-image video-poster">
          <amp-img
            alt={featuredImage.alt}
            className="w-100"
            src={featuredImage.src}
            height="360"
            width="640"
            layout="responsive"
          />
        </figure>
        <figure className="featured-video www">
          <FeaturedVideo content={post.featured_video} />
          { videoMetaData
                && <FeaturedVideoMeta metaData={videoMetaData} />}
        </figure>
      </div>
    );
  } else if (featuredImage) {
    featuredMedia = (
      <figure className="featured-image">
        <amp-img
          alt={featuredImage.alt}
          className="w-100"
          src={featuredImage.src}
          height="360"
          width="640"
          layout="responsive"
        />
        <figcaption dangerouslySetInnerHTML={{
          __html: featuredImage.caption,
        }}
        />
      </figure>
    );
  }

  return featuredMedia;
};

PostFeaturedMedia.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostFeaturedMedia;
