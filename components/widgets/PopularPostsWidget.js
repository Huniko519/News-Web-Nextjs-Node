import React from 'react';
import PropTypes from 'prop-types';
import PostPuff from '../post-items/PostPuff';

const PopularPostsWidget = (props) => {
  const { widget } = props;

  const linkWithIco = (post) => {
    const icoParameter = '?ico=most_popular';
    return `${post.link}${icoParameter}`;
  };

  return (widget.posts_json[0]) ? (
    <div className="inews__widget__popular_posts widget box start-xs" data-id={widget.id} key={widget.id}>
      {widget.options?.title && <div className="inews__post-section__title "><h2 className="inews__widget__popular_posts__title"><a href="/#">{widget.options.title}</a></h2></div>}
      <div className="inews__widget__popular_posts__list">
        {widget.posts_json.map((post) => {
          const postData = { ...post, link: linkWithIco(post) };
          return <PostPuff scoped post={postData} key={postData.id} />;
        })}
      </div>
    </div>
  ) : null;
};

PopularPostsWidget.propTypes = {
  widget: PropTypes.objectOf(PropTypes.any).isRequired,
};

PopularPostsWidget.defaultProps = {
};

export default PopularPostsWidget;
