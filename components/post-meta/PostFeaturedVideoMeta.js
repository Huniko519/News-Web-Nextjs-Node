import React from 'react';
import PropTypes from 'prop-types';

/**
 * Utility function to convert seconds to an iso8601 duration string.
 *
 * @param seconds int The number of seconds to encode.
 * @return string iso8601 formatted duration
 */
const iso8601Duration = (seconds = 0) => {
  let _seconds = seconds;

  const days = Math.floor(_seconds / 86400);
  _seconds %= 86400;

  const hours = Math.floor(_seconds / 3600);
  _seconds %= 3600;

  const minutes = Math.floor(_seconds / 60);
  _seconds %= 60;

  return `P${days}DT${hours}H${minutes}M${_seconds}S`;
};

const FeaturedVideoMeta = ({
  metaData: {
    title, description, duration, created_time, thumbnail_720_url, embed_url,
  },
}) => {
  const schemaMarkup = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    'name': title,
    description,
    'duration': iso8601Duration(duration),
    'uploadDate': new Date(created_time * 1000).toISOString(),
    'thumbnailUrl': thumbnail_720_url,
    'embedUrl': embed_url,
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaMarkup) }} />
  );
};

FeaturedVideoMeta.propTypes = {
  metaData: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    duration: PropTypes.number,
    created_time: PropTypes.number,
    thumbnail_720_url: PropTypes.string,
    embed_url: PropTypes.string,
  }),
};

FeaturedVideoMeta.defaultProps = {
  metaData: {
    title: '',
    description: '',
    duration: 0,
    created_time: 0,
    thumbnail_720_url: '',
    embed_url: '',
  },
};

export default FeaturedVideoMeta;
