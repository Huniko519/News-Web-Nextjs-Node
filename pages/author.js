import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { WP, NextWP } from '../utils/wpapi';
import Layout from '../components/Layout';
import PostSection1xHero2xJot1xPuff2xJot from '../components/post-sections/PostSection1xHero2xJot1xPuff2xJot';
import PostSection4xTeaser from '../components/post-sections/PostSection4xTeaser';
import PostList from '../components/PostList';
import { postItemWPAPIFields } from '../utils/post';
import stylesheet from '../src/styles/pages/author.scss';

const perPage = 10;

class Author extends Component {
  static async getInitialProps(context) {
    const { slug } = context.query;
    let showPostList = false;

    const authors = await WP
      .authors()
      .slug(slug)
      .perPage(1)
      .param('_fields', 'id,name,slug,twitter,description,avatar_urls,yoast_head,coauthor')
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP
            .authors()
            .slug(slug)
            .perPage(1)
            .param('_fields', 'id,name,slug,twitter,description,avatar_urls,yoast_head,coauthor')
            .toString(),
          message: err,
        },
      }));

    // throw an error if no author or if api request threw an error
    if (authors.error || authors.length === 0) {
      return { error: authors.error ?? { statusCode: 404 } };
    }

    let coauthor = slug;
    if (authors[0]?.coauthor?.nicename) {
      coauthor = authors[0].coauthor.nicename;
    }

    const posts = await WP
      .posts()
      .perPage(perPage)
      .param('coauthor', coauthor)
      .param('_fields', postItemWPAPIFields.join(','))
      .param('_embed', 'wp:featuredmedia')
      .param('_prune_media_sizes', 'small-1:1,medium-16:9')
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP.posts().perPage(perPage).param('coauthor', coauthor)
            .param('_prune_media_sizes', 'small-1:1,medium-16:9')
            .param('_fields', postItemWPAPIFields.join(','))
            .param('_embed', 'wp:featuredmedia')
            .toString(),
          message: err,
        },
      }));

    // throw if the api request for author posts threw an error
    if (posts?.error) {
      return { error: posts.error };
    }

    // Is there enough posts to warrant a PostList component
    if (posts?._paging?.total > (perPage + 3)) {
      showPostList = true;
    }

    return { authors, posts: Array.from(posts), showPostList };
  }

  render() {
    const { authors, posts, showPostList } = this.props;
    const author = authors[0];
    const twitterHandle = author.twitter;
    const avatar = author?.avatar_urls?.['small-1:1'] || '/static/images/placeholder/placeholder-84x84.png';

    return (
      <Layout {...this.props}>
        <style global jsx>{stylesheet}</style>
        <div className={`id-${author.id} inews__author`}>
          <div className="inews__author__avatar">
            <amp-img
              src={avatar}
              height="1"
              width="1"
              alt="avatar image"
              layout="responsive"
            />
          </div>
          <div className="inews__author__bio">
            <h1>{author.name}</h1>
            <p>{author.description}</p>
            {twitterHandle ? (
              <span className="inews__author__twitter">
                <a href={`https://twitter.com/${twitterHandle}`}>
                  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                    <circle fill="none" strokeWidth="2" cx="20" cy="20" r="19" />
                    <path d="M30 13.9272539c-.7486172.3321097-1.5427635.5501966-2.356.647.8563525-.5135224 1.4976045-1.3199721 1.805-2.27-.8061942.4768726-1.6878453.8126913-2.607.993-1.2706884-1.3551201-3.2930593-1.6879838-4.9310323-.8116026-1.6379731.8763812-2.4832405 2.7435461-2.0609677 4.5526026-3.2984077-.165126-6.3718108-1.7221812-8.456-4.284-1.0880093 1.8757847-.5306575 4.2741927 1.273 5.478-.650919-.0213441-1.2874301-.1971815-1.857-.513-.0251661 1.9727641 1.3556495 3.6848243 3.289 4.078-.604688.1636748-1.2386917.1876123-1.854.07.5384224 1.6708568 2.0788418 2.8151225 3.834 2.848-1.7215671 1.3487091-3.9075493 1.9600217-6.079 1.7 3.6732069 2.3527772 8.35192 2.4605681 12.1295815.2794484 3.7776615-2.1811197 6.0235284-6.2869762 5.8224185-10.6444484.8043786-.5792145 1.4980781-1.2983181 2.048-2.123z" />
                  </svg>
                  {twitterHandle}
                </a>
              </span>
            ) : ''}
          </div>
        </div>
        <PostSection1xHero2xJot1xPuff2xJot items={posts.slice(0, 6)} />
        <PostSection4xTeaser items={posts.slice(6, 11)} />

        {showPostList && (
          <PostList
            offset={perPage}
            perPage={9}
            next={NextWP
              .posts()
              .param('coauthor', author.coauthor.nicename)
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

Author.propTypes = {
  authors: PropTypes.arrayOf(PropTypes.object).isRequired,
  posts: PropTypes.arrayOf(PropTypes.object),
  showPostList: PropTypes.bool,
};

Author.defaultProps = {
  posts: [],
  showPostList: false,
};

export const config = { amp: true };
export default Author;
