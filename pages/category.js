/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Config from '../config';
import { WP, NextWP } from '../utils/wpapi';
import Layout from '../components/Layout';
import PostList from '../components/PostList';
import PostSectionLayout from '../components/post-sections/PostSectionLayout';
import { postItemWPAPIFields } from '../utils/post';
import stylesheet from '../src/styles/pages/taxonomy.scss';
import ScopedColorContext from '../components/ScopedColorContext';

const perPage = 12;

class Category extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    let sidebar = null;
    let posts = [];
    let showPostList = false;

    const categories = await WP
      .categories()
      .slug(slug)
      .perPage(1)
      .param('_fields', 'id,name,link,slug,parent,yoast_head,_links.sidebar,_links.up')
      .param('_embed', 'up')
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP
            .categories()
            .slug(slug)
            .perPage(1)
            .param('_fields', 'id,name,link,slug,parent,yoast_head,_links.sidebar,_links.up')
            .param('_embed', 'up')
            .toString(),
          message: err,
        },
      }));

    // throw an error if no author or if api request threw an error
    if (categories.error || categories.length === 0) {
      return { error: categories.error ?? { statusCode: 404 } };
    }

    /*
     * Validates that the url used to access the category is the correct one.
     * If it isn't then 301 to the correct one.
     */
    const validTargetUrl = categories[0]?.link;
    const accessedUrl = new URL(Config.feDomain + context.asPath);
    const cleanTestUrl = `${accessedUrl.protocol}//${accessedUrl.host}${accessedUrl.pathname}`;

    if (cleanTestUrl !== validTargetUrl) {
      context.res.writeHead(301, {
        Location: validTargetUrl,
      });
      context.res.end();
    }

    /* eslint-disable no-underscore-dangle */
    if (categories[0]?._links?.sidebar?.[0]?.href) {
      sidebar = await WP
        .sidebar()
        .id(`category-${categories[0].id}-layout-sidebar`)
        .embed()
        .then((data) => data)
        .catch(() => null);
    }
    /* eslint-enable no-underscore-dangle */

    if (sidebar === null) {
      posts = await WP
        .posts()
        .perPage(perPage)
        .category(categories[0].id)
        .param('_prune_media_sizes', 'small-1:1,medium-16:9')
        .param('_fields', postItemWPAPIFields.join(','))
        .param('_embed', 'wp:featuredmedia')
        .then((data) => data)
        .catch((err) => ({
          error: {
            statusCode: 502,
            wpapi: WP.posts().perPage(perPage).category(categories[0].id)
              .param('_prune_media_sizes', 'small-1:1,medium-16:9')
              .param('_fields', postItemWPAPIFields.join(','))
              .toString(),
            message: err,
          },
        }));

      // throw if the api request for category posts threw an error
      if (posts?.error) {
        return { error: posts.error };
      }

      // Is there enough posts to warrant a PostList component
      if (posts?._paging?.total > (perPage + 3)) {
        showPostList = true;
      }
    }

    return {
      categories, sidebar, posts: Array.from(posts), showPostList,
    };
  }

  render() {
    const {
      categories, posts, sidebar, showPostList,
    } = this.props;

    const colorKeys = [categories[0].slug];
    if (categories[0].parent > 0) {
      // eslint-disable-next-line
      colorKeys.push(categories[0]._embedded.up[0].slug)
    }

    return (
      <Layout {...this.props}>
        <style global jsx>{stylesheet}</style>
        <ScopedColorContext colorKeys={colorKeys}>
          <div className="inews__archive__title">
            <h1
              dangerouslySetInnerHTML={{
                __html: categories[0].name,
              }}
            />
          </div>
          <PostSectionLayout sidebar={sidebar} posts={posts} injectAds />
          {sidebar === null && showPostList
            && (
              <PostList
                offset={perPage}
                perPage={9}
                next={NextWP
                  .posts()
                  .categories(categories[0].id)
                  .param('amp-list', 1)
                  .param('_prune_media_sizes', 'small-1:1')
                  .param('_embed', 'wp:featuredmedia')
                  .param('_fields', postItemWPAPIFields.join(','))
                  .toString()}
              />
            )}
        </ScopedColorContext>
      </Layout>
    );
  }
}

Category.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  sidebar: PropTypes.objectOf(PropTypes.any),
  showPostList: PropTypes.bool,
};

Category.defaultProps = {
  posts: [],
  sidebar: {},
  showPostList: false,
};

export const config = { amp: true };
export default Category;
