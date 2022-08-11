import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WP } from '../utils/wpapi';

import {
  isValidPostUrl, locatePost, hasPostBreadcrumb, getSidebarId, getMoreFromPosts,
} from '../utils/post';
import PostTemplate from '../components/post-templates/PostTemplate';

class Post extends Component {
  static async getInitialProps(context) {
    const post = await locatePost(context);

    if (post.error) {
      return { error: post.error };
    }

    // redirect to correct url for post
    if (!isValidPostUrl(context, post)) {
      context.res.writeHead(301, {
        Location: post.link,
      });
      context.res.end();
    }

    const sidebarId = getSidebarId(post);
    const moreFromPosts = await getMoreFromPosts(post);

    // Show opinion post sidebar only if post category === opinion and post has only one author
    const isOpinion = hasPostBreadcrumb(post, 'opinion');
    const numberOfAuthors = post['co-authors'] ? post['co-authors'].length : 0;
    let sidebar;
    if (isOpinion && numberOfAuthors === 1) {
      sidebar = await WP
        .sidebar()
        .id('opinion-post-sidebar')
        .param('coauthor', post['co-authors'][0].user_nicename)
        .embed()
        .then((data) => data)
        .catch(() => { });
    } else {
      sidebar = await WP
        .sidebar()
        .id(sidebarId)
        .embed()
        .then((data) => data)
        .catch(() => { });
    }
    return {
      post, sidebar, yoast_head: post.yoast_head, moreFromPosts,
    };
  }

  render() {
    return <PostTemplate {...this.props} />;
  }
}

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  sidebar: PropTypes.objectOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  moreFromPosts: PropTypes.array,
};

Post.defaultProps = {
  sidebar: {},
  moreFromPosts: [],
};

export const config = { amp: true };
export default Post;
