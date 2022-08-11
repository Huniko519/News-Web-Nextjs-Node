import React from 'react';
import PropTypes from 'prop-types';

const PostTopics = (props) => {
  const { post } = props;

  if (!post.topics || post.topics.length < 1) {
    return (null);
  }

  return (
    <nav className="inews__topic-list">
      <h4>Topics</h4>
      <ul>
        {
          post.topics && post.topics.map((term) => (
            <li key={`topics-listItem-${term.term_id}`}>
              <a href={term.link} title={term.name} key={`anchor-${term.term_id}`} dangerouslySetInnerHTML={{ __html: term.name }} />
            </li>
          ))
        }
      </ul>
    </nav>
  );
};

PostTopics.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostTopics;
