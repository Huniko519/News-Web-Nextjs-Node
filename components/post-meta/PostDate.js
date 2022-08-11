import React from 'react';
import PropTypes from 'prop-types';

/**
 * Determines if we should show a modified date
 *
 * @param {string} pubDate Date string
 * @param {string} modDate Date string
 * @return {boolean}
 */
const displayModDate = (pubDate, modDate) => {
  let display = false;
  if (pubDate && modDate) {
    const pub = new Date(pubDate);
    const mod = new Date(modDate);
    // Only show modDate if it is in the future
    if (mod.getTime() > pub.getTime()) {
      display = true;
    }
  }
  return display;
};

/**
 * Vary the format of the mod date relative to the pub date.
 *
 * @param {*} pubDate
 * @param {*} modDate
 */
const formatModDate = (pubDate, modDate) => {
  let formattedModDate = modDate;
  const pub = new Date(pubDate);
  const mod = new Date(modDate);

  if (pub.toDateString() === mod.toDateString()) {
    formattedModDate = mod.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }).toLowerCase();
  }

  return formattedModDate;
};

const PostDate = (props) => {
  const { post } = props;
  const modDate = formatModDate(post.date_display, post.moddate_display);
  const pubDate = (post.inews_pubdate_display) ? post.inews_pubdate_display : post.date_display;
  return (
    <div className="inews__post-date">
      <span className="inews__post__pubdate">{pubDate}</span>
      {
        (displayModDate(pubDate, post.moddate_display))
        && (
          <span className="inews__post__moddate">
            (Updated
            {' '}
            {modDate}
            )
          </span>
        )
      }
    </div>
  );
};

PostDate.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostDate;
