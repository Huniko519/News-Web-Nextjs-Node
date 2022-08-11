import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WP, NextWP } from '../utils/wpapi';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import PostPuff from '../components/post-items/PostPuff';
import PostSectionWrapper from '../components/post-sections/PostSectionWrapper';
import { postItemWPAPIFields } from '../utils/post';
import stylesheet from '../src/styles/pages/year.scss';

const perPage = 9;

class Year extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    let showPostList = false;
    const year = slug;

    const posts = await WP
      .posts()
      .perPage(perPage)
      .param('after', `${year}-01-01T00:00:00`)
      .param('before', `${parseInt(year, 10) + 1}-01-01T00:00:00`)
      .param('_fields', postItemWPAPIFields.join(','))
      .param('_embed', 'wp:featuredmedia')
      .param('_prune_media_sizes', 'small-1:1')
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP.posts().perPage(perPage)
            .param('after', `${year}-01-01T00:00:00`)
            .param('before', `${parseInt(year, 10) + 1}-01-01T00:00:00`)
            .param('_prune_media_sizes', 'small-1:1')
            .param('_fields', postItemWPAPIFields.join(','))
            .param('_embed', 'wp:featuredmedia')
            .toString(),
          message: err,
        },
      }));

    if (posts?.error) {
      return { error: posts.error };
    }

    // Is there enough posts to warrant a PostList component
    if (posts?._paging?.total > (perPage + 3)) {
      showPostList = true;
    }

    const yoastHead = `<title>HTML Sitemap for Year ${year} on iNews.co.uk</title><meta name="description" content="HTML Sitemap for Year ${year} on iNews.co.uk"/>`;

    return {
      posts: Array.from(posts), showPostList, year, yoastHead,
    };
  }

  render() {
    const {
      posts, showPostList, year,
    } = this.props;

    return (
      <Layout {...this.props}>
        <style global jsx>{stylesheet}</style>
        <h1>
          Archive for Year:
          {year}
        </h1>
        {posts.length > 0
          && (
            <PostSectionWrapper type="PostSection9xPuff">
              <div className="inews__post-section__body">
                {posts.map((post) => <PostPuff scoped key={post.id} post={post} />)}
              </div>
            </PostSectionWrapper>
          )}

        {showPostList && (
          <PostList
            offset={perPage}
            perPage={9}
            next={NextWP
              .posts()
              .param('after', `${year}-01-01T00:00:00`)
              .param('before', `${parseInt(year, 10) + 1}-01-01T00:00:00`)
              .param('amp-list', 1)
              .param('_prune_media_sizes', 'small-1:1')
              .param('_embed', 'wp:featuredmedia')
              .param('_fields', postItemWPAPIFields.join(','))
              .toString()}
          />
        )}
      </Layout>
    );
  }
}

Year.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object),
  showPostList: PropTypes.bool,
  year: PropTypes.number,
  yoastHead: PropTypes.string,
};

Year.defaultProps = {
  posts: [],
  showPostList: false,
  year: 1970,
  yoastHead: '',
};

export const config = { amp: true };
export default Year;
