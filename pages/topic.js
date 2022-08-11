import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WP, NextWP } from '../utils/wpapi';
import Layout from '../components/Layout';
import PostSection1xHero2xJot1xPuff2xJot from '../components/post-sections/PostSection1xHero2xJot1xPuff2xJot';
import PostSection4xTeaser from '../components/post-sections/PostSection4xTeaser';
import PostList from '../components/PostList';
import { postItemWPAPIFields } from '../utils/post';
import stylesheet from '../src/styles/pages/taxonomy.scss';

const perPage = 10;

class Topic extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    let showPostList = false;
    const tags = await WP
      .tags()
      .slug(slug)
      .perPage(1)
      .param('_fields', 'id,name,description,slug,yoast_head')
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP.tags().slug(slug).toString(),
          message: err,
        },
      }));

    // throw an error if no author or if api request threw an error
    if (tags.error || tags.length === 0) {
      return { error: tags.error ?? { statusCode: 404 } };
    }

    const posts = await WP
      .posts()
      .perPage(perPage)
      .tags(tags[0].id)
      .param('_prune_media_sizes', 'small-1:1,medium-16:9')
      .param('_embed', 'wp:featuredmedia')
      .param('_fields', postItemWPAPIFields.join(','))
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP.posts().perPage(perPage).tags(tags[0].id)
            .param('_prune_media_sizes', 'small-1:1,medium-16:9')
            .param('_fields', postItemWPAPIFields.join(','))
            .param('_embed', 'wp:featuredmedia')
            .toString(),
          message: err,
        },
      }));

    // throw if the api request for tag posts threw an error
    if (posts?.error) {
      return { error: posts.error };
    }

    // Is there enough posts to warrant a PostList component
    if (posts?._paging?.total > (perPage + 3)) {
      showPostList = true;
    }

    return { tags, posts: Array.from(posts), showPostList };
  }

  render() {
    const { tags, posts, showPostList } = this.props;
    return (
      <Layout {...this.props}>
        <style global jsx>{stylesheet}</style>

        <div className="inews__archive__title">
          <h1
            dangerouslySetInnerHTML={{
              __html: tags[0].name,
            }}
          />
          {tags[0].description
            && (
              <h2
                dangerouslySetInnerHTML={{
                  __html: tags[0].description,
                }}
              />
            )}
        </div>
        <PostSection1xHero2xJot1xPuff2xJot items={posts.slice(0, 6)} />
        <PostSection4xTeaser items={posts.slice(6, 11)} />

        {showPostList && (
          <PostList
            offset={perPage}
            perPage={9}
            next={
              NextWP
                .posts()
                .tags(tags[0].id)
                .param('amp-list', 1)
                .param('_prune_media_sizes', 'small-1:1')
                .param('_embed', 'wp:featuredmedia')
                .param('_fields', postItemWPAPIFields.join(','))
                .toString()
            }
          />
        )}
      </Layout>
    );
  }
}

Topic.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object).isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  showPostList: PropTypes.bool,
};

Topic.defaultProps = {
  posts: [],
  showPostList: false,
};

export const config = { amp: true };
export default Topic;
