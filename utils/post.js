import React from 'react';
import Config from '../config';
import { WP } from './wpapi';
import stylesheet from '../src/styles/pages/post.scss';

/**
 * Returns the featured video icon for display on post-item/* components.
 * Will return with an empty string if no featured video.
 *
 * @param {featured_video, ...postData} post
 */
export const getVideoIcon = (post) => {
  let videoIcon = null;

  if (post.featured_video) {
    videoIcon = (
      <span className="inews__post__video-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
          <path d="M0 0h24v24H0z" fill="none" />
        </svg>
      </span>
    );
  }

  return videoIcon;
};

/**
 * Validates that the url used to access the post is the correct one
 *
 * @param {*} context NextJS context
 * @param {*} post wp-json post object
 */
export const isValidPostUrl = (context, post) => {
  // Valid target url to match against
  const validTarget = post.link;

  // Parsed url that the post was accessed with
  const url = new URL(Config.feDomain + context.asPath);

  // Clean url to test against
  const cleanTest = `${url.protocol}//${url.host}${url.pathname}`;

  return cleanTest === validTarget;
};

/**
 * Check if the post has a given breadcrumb
 *
 * @param {*} post wp-json post object
 */
export const hasPostBreadcrumb = (post, breadcrumb) => {
  let exists = false;

  // eslint-disable-next-line no-restricted-syntax
  for (const b of post.breadcrumbs) {
    if (b.slug === breadcrumb) {
      exists = true;
      break;
    }
  }

  return exists;
};

/**
 * Returns social headline if present. Otherwise, use the canonical post.title
 */
export const getSocialTitle = (post) => ((post.social_title?.rendered) ? post.social_title.rendered : post.title.rendered);

/**
 * Returns an array of the minimum WP-API fields we need to render PostItems
 * on the FE
 */
export const postItemWPAPIFields = [
  'id',
  'type',
  'link',
  'title',
  'breadcrumbs',
  'featured_video',
  'mdt_review',
  'co-authors',
  'excerpt',
  'social_title',
  'inews_homepage_headline',
  'inews_vertical_headline',
  'labels',
  '_links.wp:featuredmedia',
];

/**
 * Returns the star rating review className.
 *
 * @param {*} post
 */
export const getReviewRatingClassName = (post) => ((post.mdt_review?.rating) ? `inews__post__review-stars__${post.mdt_review.rating}` : '');

/**
 * Used on homepage/channel pages to dedupe post lists
 *
 * @param {*} posts An array of posts
 * @param {*} count The desired number of posts
 */
export const dedupePostList = (posts, count = 10) => {
  const dedupedPosts = [];
  global.dedupedPostIDs = global.dedupedPostIDs || [];
  // eslint-disable-next-line no-restricted-syntax
  for (const post of posts) {
    // stop processing if we have max posts
    if (dedupedPosts.length >= count) {
      break;
    }

    // Add this post if it is not in the global index
    if (global.dedupedPostIDs.indexOf(post.id) === -1) {
      dedupedPosts.push(post);
      // Add this post ID to the dedupe list
      global.dedupedPostIDs.push(post.id);
    }
  }

  return dedupedPosts;
};

/**
 * Used on sidebar widgets to dedupe post lists
 *
 * @param {*} posts An array of posts
 * @param {*} count The desired number of posts
 */
export const dedupeSidebarPostList = (posts, count = 10) => {
  const dedupedPosts = [];
  global.dedupedSidebarPostIDs = global.dedupedSidebarPostIDs || [];
  // eslint-disable-next-line no-restricted-syntax
  for (const post of posts) {
    // stop processing if we have max posts
    if (dedupedPosts.length >= count) {
      break;
    }

    // Add this post if it is not in the global index
    if (global.dedupedSidebarPostIDs.indexOf(post.id) === -1) {
      dedupedPosts.push(post);
      // Add this post ID to the dedupe list
      global.dedupedSidebarPostIDs.push(post.id);
    }
  }

  return dedupedPosts;
};

/**
 * Returns an array of posts for MoreFrom.js component
 *
 * @param {}
 */
export const getMoreFromPosts = async (post) => {
  let response;
  if (post.breadcrumbs.length === 0) {
    return [];
  }
  if (process.env.INEWS_PUBLIC_API_DOMAIN !== 'https://api.inews.co.uk') {
    const categoryIDs = post.breadcrumbs.map((b) => b.term_id).join(',');
    response = await WP
      .posts()
      .categories(categoryIDs)
      .perPage(12)
      .param('_prune_media_sizes', 'medium-16:9')
      .param('_fields', postItemWPAPIFields.join(','))
      .param('_embed', 'wp:featuredmedia')
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP.posts()
            .categories(categoryIDs)
            .perPage(12)
            .param('_prune_media_sizes', 'medium-16:9')
            .param('_fields', postItemWPAPIFields.join(','))
            .param('_embed', 'wp:featuredmedia')
            .toString(),
          message: err,
        },
      }));
  } else {
    const categorySlug = post.breadcrumbs[0].slug;
    const date = new Date();
    date.setDate(date.getDate() - 5);
    date.setHours(0, 0, 0, 0);
    response = await WP
      .rtaPosts()
      .perPage(12)
      .param('after', date.toISOString())
      .param('rta_period', '1440')
      .param('rta_channel', categorySlug)
      .param('rta_referrer', 'social')
      .param('_prune_media_sizes', 'medium-16:9')
      .param('_fields', postItemWPAPIFields.join(','))
      .param('_embed', 'wp:featuredmedia')
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: 502,
          wpapi: WP.rtaPosts().perPage(12).param('after', date.toISOString())
            .param('rta_period', '1440')
            .param('rta_channel', categorySlug)
            .param('rta_referrer', 'social')
            .param('_prune_media_sizes', 'medium-16:9')
            .param('_fields', postItemWPAPIFields.join(','))
            .param('_embed', 'wp:featuredmedia')
            .toString(),
          message: err,
        },
      }));
  }

  return response.error ? [] : response;
};

/**
 * Locates the post object for (post|amp).js pages using the
 * following steps
 *
 * 1) Queries on the postID given in context.query (from url). If match return
 *    post object
 *
 * 2) If no match on postID due to 404/401 from API then query on the slug given
 *    in context.query. If match then 301 to the correct canonical url
 *
 * 3) If no direct match on slug then attempt to locate with a search on old slugs.
 *    If match is found on old slug then 301 to correct canonical url.
 *
 * 4) If no matches at all return the last error object.
 *
 * @param {object} context Next JS context - includes res object
 */
export const locatePost = async (context) => {
  const { postID, slug } = context.query;

  let error = {};
  if (postID > 0) {
    const post = await WP
      .posts()
      .id(postID)
      .param('_prune_media_sizes', 'medium-16:9,large-16:9')
      .param('_embed', 'wp:featuredmedia')
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: err?.data?.status ?? 502,
          wpapi: WP.posts().id(postID).param('_prune_media_sizes', 'medium-16:9,large-16:9').embed()
            .toString(),
          message: err,
        },
      }));

    error = post?.error;

    // return post object is there are no errors
    if (!error && typeof (post) !== 'undefined') {
      return post;
    }
  } else {
    error = { status_code: 404 };
  }

  // 401 status is returned for posts that have status != publish. Old JPi ids sometimes
  // directly match to these

  if (typeof (post) === 'undefined' || error.statusCode === 404 || error.statusCode === 401) {
    // If no post returned for given ID attempt to locate by the slug instead
    const postBySlug = await WP
      .posts()
      .slug(slug)
      .param('_fields', 'link')
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: err?.data?.status ?? 502,
          wpapi: WP.posts().slug(slug).param('_fields', 'link').toString(),
          message: err,
        },
      }));

    if (postBySlug?.[0]?.link && postBySlug?.[0]?.link !== (Config.feDomain + context.asPath)) {
      // 301 to matching post
      context.res.writeHead(301, {
        Location: `${postBySlug[0].link}`,
      });
      context.res.end();
    } else if (postBySlug?.error) {
      // server error
      error = postBySlug.error;
    } else {
      // no matching post
      error = {
        statusCode: 404,
        wpapi: WP.posts().slug(slug).param('_fields', 'link').toString(),
        message: 'No matching post',
      };
    }

    // If no post returned for current slug then attempt a search for old slugs
    const postByOldSlug = await WP
      .posts()
      .param('_fields', 'link')
      .param('old_slug', slug)
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: err?.data?.status ?? 502,
          wpapi: WP.posts().param('_fields', 'link').param('old_slug', slug).toString(),
          message: err,
        },
      }));

    if (postByOldSlug?.[0]?.link && postByOldSlug?.[0]?.link !== (Config.feDomain + context.asPath)) {
      // 301 to matching post
      context.res.writeHead(301, {
        Location: `${postByOldSlug[0].link}`,
      });
      context.res.end();
    } else if (postByOldSlug?.error) {
      // server error
      error = postByOldSlug.error;
    } else {
      // no matching post
      error = {
        statusCode: 404,
        wpapi: WP.posts().param('_fields', 'link').param('old_slug', slug).toString(),
        message: 'No matching post',
      };
    }
  }

  return error ? { error } : post;
};

/**
 * Find the correct sidebar given the Post data
 *
 * @param {*} post
 * @returns {string} The sidebar ID
 */
export const getSidebarId = (post) => {
  let sidebarId = 'post-sidebar';

  if (hasPostBreadcrumb(post, 'sport')) {
    sidebarId = 'sport-post-sidebar';
  }

  if (hasPostBreadcrumb(post, 'culture')) {
    sidebarId = 'culture-post-sidebar';
  }

  if (hasPostBreadcrumb(post, 'money')) {
    sidebarId = 'money-post-sidebar';
  }

  if (hasPostBreadcrumb(post, 'politics')) {
    sidebarId = 'politics-post-sidebar';
  }

  if (hasPostBreadcrumb(post, 'inews-lifestyle')) {
    sidebarId = 'lifestyle-post-sidebar';
  }

  if (hasPostBreadcrumb(post, 'travel')) {
    sidebarId = 'travel-post-sidebar';
  }

  if (hasPostBreadcrumb(post, 'television')) {
    sidebarId = 'television-post-sidebar';
  }

  // eslint-disable-next-line no-restricted-syntax
  for (const topic of post.topics) {
    if (topic.name.toLowerCase() === 'money solutions') {
      sidebarId = 'money-solutions-post-sidebar';
    }
  }

  if (post.type === 'post_sponsored') {
    sidebarId = 'sponsored-post-sidebar';
  }

  return sidebarId;
};

export const getCorePostStyles = () => (
  <style global jsx>{stylesheet}</style>
);
