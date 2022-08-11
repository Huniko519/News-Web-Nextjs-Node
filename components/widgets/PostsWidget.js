import React from 'react';
import PropTypes from 'prop-types';
import PostPuff from '../post-items/PostPuff';
import { dedupeSidebarPostList } from '../../utils/post';

const PostsWidget = (props) => {
  const { widget, showAuthor } = props;

  const linkWithIco = (post) => {
    let icoParameter = '';
    if (widget.options.category === 12) {
      icoParameter = '?ico=best_of_opinion';
    } else if (widget.options.order === 'popular') {
      icoParameter = '?ico=most_popular';
    } else if (widget.options.zone === 'editors-picks') {
      icoParameter = '?ico=editors_picks';
    }
    return `${post.link}${icoParameter}`;
  };

  widget.posts_json = dedupeSidebarPostList(widget.posts_json, widget.options.number);

  return (widget.posts_json[0]) ? (
    <div className="inews__widget__posts widget box start-xs" data-id={widget.id} key={widget.id}>
      {widget.options?.title && <h2 className="inews__widget__posts__title">{widget.options.title}</h2>}
      <div className="inews__widget__posts__list">
        {widget.posts_json.map((post) => {
          const postData = { ...post, link: linkWithIco(post) };
          return <PostPuff scoped post={postData} key={postData.id} showAuthor={showAuthor} />;
        })}
      </div>
    </div>
  ) : null;
};

PostsWidget.propTypes = {
  widget: PropTypes.objectOf(PropTypes.any).isRequired,
  showAuthor: PropTypes.bool,
};

PostsWidget.defaultProps = {
  showAuthor: false,
};

export default PostsWidget;
