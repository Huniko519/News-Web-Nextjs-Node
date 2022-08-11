import React, { Component } from 'react';
import { WP } from '../utils/wpapi';
import PageTemplate from '../components/page-templates/PageTemplate';
import stylesheet from '../src/styles/pages/post.scss';

class Post extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;

    const post = await WP.pages()
      .slug(slug)
      .embed()
      .then((data) => data[0])
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP.pages().slug(slug).embed().toString(),
          message: err,
        },
      }));

    // throw an error if no matching page or if api request threw an error
    if (typeof (post) === 'undefined' || post.error) {
      return { error: post?.error ?? { statusCode: 404 } };
    }

    return { post };
  }

  render() {
    return (
      <>
        <style global jsx>{stylesheet}</style>
        <PageTemplate {...this.props} disableLayoutLeaderboardAd disableLayoutSkyscraperAd disableLayoutOOPAd />
      </>
    );
  }
}

export const config = { amp: true };
export default Post;
