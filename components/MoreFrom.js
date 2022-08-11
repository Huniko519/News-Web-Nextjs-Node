import React from 'react';
import PropTypes from 'prop-types';
import PostTeaser from './post-items/PostTeaser';
import PostJot from './post-items/PostJot';
import { dedupePostList } from '../utils/post';
import ScopedColorContext from './ScopedColorContext';

const MoreFrom = (props) => {
  const { moreFromPosts } = props;
  if (moreFromPosts.length === 0) {
    return null;
  }

  const title = moreFromPosts[0].breadcrumbs[0].name;
  const posts = dedupePostList(moreFromPosts, 6);
  const showAuthor = moreFromPosts[0].breadcrumbs[0].name === 'Opinion';

  return (
    <div className="inews__more-from">
      <h2 className="inews__more-from__title">
        More from
        {' '}
        {title}
      </h2>
      <div className="inews__more-from__posts">
        {
          posts.slice(0, 2).map((post) => (
            <ScopedColorContext colorKeys={post.breadcrumbs.map((breadcrumb) => breadcrumb.slug).reverse()} key={post.id}>
              <PostTeaser
                post={{
                  ...post,
                  link: `${post.link}?ico=more_from_${title}`,
                }}
                showAuthor={showAuthor}
              />
            </ScopedColorContext>
          ))
        }
        {
          posts.slice(2, 6).map((post) => (
            <ScopedColorContext colorKeys={post.breadcrumbs.map((breadcrumb) => breadcrumb.slug).reverse()} key={post.id}>
              <PostJot post={{
                ...post,
                link: `${post.link}?ico=more_from_${title}`,
              }}
              />
            </ScopedColorContext>
          ))
        }
      </div>
    </div>
  );
};

MoreFrom.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  moreFromPosts: PropTypes.array.isRequired,
};

MoreFrom.defaultProps = {
};

export default MoreFrom;
