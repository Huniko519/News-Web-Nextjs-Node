import React from 'react';
import PropTypes from 'prop-types';

/**
 * Outputs the hyperlinked (if supplied) section title for a PostSection block.
 *
 * @param {*} props
 */
const PostSectionTitle = (props) => {
  const { title, link } = props;

  return (
    <div className="inews__post-section__title">
      { title
          && (
          <h2 data-text={title}>
            {link ? (<a href={link} title={title}>{title}</a>) : (<span>{title}</span>)}
          </h2>
          )}
    </div>
  );
};

/* istanbul ignore next */
PostSectionTitle.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string,
};

/* istanbul ignore next */
PostSectionTitle.defaultProps = {
  link: '',
};

export default PostSectionTitle;
