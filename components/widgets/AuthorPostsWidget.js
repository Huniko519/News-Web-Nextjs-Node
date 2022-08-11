import React from 'react';
import PropTypes from 'prop-types';
import PostJot from '../post-items/PostJot';

const AuthorPostsWidget = (props) => {
  const { widget } = props;

  return (widget.posts_json[0]) ? (

    <div className="inews__widget__posts inews__widget__author_posts widget box start-xs" key={widget.id}>
      { widget.options?.title && <h2 className="inews__widget__posts__title">{widget.options.title}</h2>}
      <div className="inews__widget__posts__list">
        {widget.posts_json.map((post) => {
          const postData = { ...post, link: `${post.link}?ico=more_from_this_author` };
          return <PostJot post={postData} key={postData.id} showAuthor />;
        })}
      </div>
    </div>

  ) : null;
};

AuthorPostsWidget.propTypes = {
  widget: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AuthorPostsWidget;
