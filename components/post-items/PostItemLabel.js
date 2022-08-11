import React from 'react';
import PropTypes from 'prop-types';

/**
 * Display a custom label like, "Exclusive" or "Interview" derived from the CMS settings
 *
 * @param {*} props
 */
const PostItemLabel = (props) => {
  const { post } = props;

  if (post.labels && post.labels.length > 0) {
    const labelName = post.labels[0].name;
    const labelSlug = post.labels[0].slug;
    const labelBGColor = post.labels[0].bg_color;
    const labelTextColor = post.labels[0].text_color;
    return (
      <>
        <style global jsx>
          {`
          .inews__post__label__${labelSlug}{
            color: ${labelTextColor};
            background-color: ${labelBGColor};
          }
        `}
        </style>
        <span className={`inews__post__label inews__post__label__${labelSlug}`} dangerouslySetInnerHTML={{ __html: labelName }} />
      </>
    );
  }
  return (null);
};

/* istanbul ignore next */
PostItemLabel.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostItemLabel;
