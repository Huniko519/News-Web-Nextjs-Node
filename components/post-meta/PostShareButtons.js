import React from 'react';
import PropTypes from 'prop-types';

const PostShareButtons = (props) => {
  const { post, dataTrack } = props;
  const socialTitle = post.social_title?.rendered ? post.social_title.rendered : post.title.raw;
  const dimensions = {
    width: post?.template === 'opinion' ? 20 : 28,
    height: post?.template === 'opinion' ? 20 : 28,
  };

  return (
    <>
      <div className="inews__post-share">
        <amp-social-share
          data-track={`email_${dataTrack}`}
          type="email"
          data-param-subject={socialTitle}
          data-param-body={`${post.link}?ito=email_${dataTrack}`}
          aria-label="share via email"
          {...dimensions}
        />
        <amp-social-share
          data-track={`twitter_${dataTrack}`}
          type="twitter"
          data-param-url={`${post.link}?ito=twitter_${dataTrack}`}
          data-param-text={socialTitle}
          aria-label="share via twitter"
          {...dimensions}
        />
        <amp-social-share
          data-track={`whatsapp_${dataTrack}`}
          type="whatsapp"
          data-param-text={`${socialTitle} - ${post.link}?ito=whatsapp_${dataTrack}`}
          aria-label="share via whatsapp"
          {...dimensions}
        />
        <amp-social-share
          data-track={`facebook_${dataTrack}`}
          type="facebook"
          data-param-href={`${post.link}?ito=facebook_${dataTrack}`}
          data-param-quote={socialTitle}
          aria-label="share via facebook"
          data-param-app_id="817222585498956"
          {...dimensions}
        />
      </div>
    </>
  );
};

PostShareButtons.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  dataTrack: PropTypes.string.isRequired,
};

export default PostShareButtons;
