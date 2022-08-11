import React from 'react';
import PropTypes from 'prop-types';
import { WP } from '../utils/wpapi';
import Page from './page';
import Post from './post';
import stylesheet from '../src/styles/pages/preview.scss';

const queryMap = {
  page: () => WP.pages(),
  post_sponsored: () => WP.posts(),
  post: () => WP.posts(),
};

const pageMap = {
  page: Page,
  post_sponsored: Post,
  post: Post,
};

const Preview = (props) => {
  const { post } = props;
  const Component = pageMap[post.type];

  return Component ? (
    <>
      <Component post={post} {...props} />
      <style global jsx>{stylesheet}</style>
      <div className="inews__preview__banner">
        <h2>This is only a preview</h2>
      </div>
    </>
  ) : null;
};

Preview.getInitialProps = async (context) => {
  const {
    id, type, token, revision = null,
  } = context.query;

  // bail early if no token
  if (!token) {
    return { error: { statusCode: 403 } };
  }

  // If preview doesn't exist for this type error with a 404
  if (!Object.keys(queryMap).includes(type)) {
    return { error: { statusCode: 404 } };
  }

  let revisionQuery = {};

  // Perform an authenticated query for the post preview
  const previewQuery = await queryMap[type]()
    .id(id)
    .embed()
    .param('access_token', token)
    .then((data) => data)
    .catch((err) => ({
      error: {
        statusCode: err?.data?.status ?? 403,
        wpapi: queryMap[type]().id(id).embed().toString(),
        message: err,
      },
    }));

  // if a revision id is defined query for that information
  if (revision !== null && !previewQuery.error) {
    // Perform an authenticated query for the post revision

    revisionQuery = await queryMap[type]()
      .id(id)
      .revisions(revision)
      .param('access_token', token)
      .then((data) => data)
      .catch((err) => ({
        error: {
          statusCode: err?.data?.status ?? 403,
          wpapi: queryMap[type]().id(id).revisions(revision).toString(),
          message: err,
        },
      }));
  }

  // Merge the revision query into the preview query
  const preview = { ...previewQuery, ...revisionQuery };

  // Throw an error if the preview request failed for any reason
  if (preview.error) {
    return { error: preview.error };
  }

  // Override the yoast_head property
  preview.yoast_head = `
    <title>Preview - ${type}: ${id} ${revision !== null ? `- revision: ${revision}` : ''}</title>
    <meta name="robots" content="noindex">
  `;

  // Query for sidebar data if needed
  if (type === 'post' || type === 'post_sponsored') {
    const sidebarId = type !== 'post_sponsored' ? 'post-sidebar' : 'sponsored-post-sidebar';
    const sidebar = await WP
      .sidebar()
      .id(sidebarId)
      .embed()
      .then((data) => data)
      .catch(() => {});

    return { post: preview, sidebar };
  }

  return { post: preview };
};

Preview.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  sidebar: PropTypes.objectOf(PropTypes.any),
};

Preview.defaultProps = {
  sidebar: {},
};

export const config = { amp: true };
export default Preview;
