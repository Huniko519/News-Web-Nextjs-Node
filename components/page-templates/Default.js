import React from 'react';
import PropTypes from 'prop-types';
import Layout from '../Layout';

/**
 * Default page template -  Outputs the title and content into a simple
 * full-column, white box.
 *
 * @param {*} props
 */
const Default = (props) => {
  const { post } = props;

  return (
    <Layout {...props} disableLayoutLeaderboardAd disableLayoutSkyscraperAd>
      <div className="inews__main__primary">
        <article className={`id-${post.id} post-type-${post.type}`}>
          <div className="article-padding article-content">
            <h1
              dangerouslySetInnerHTML={{
                __html: post.title.rendered,
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: post.content.rendered,
              }}
            />
          </div>
        </article>
      </div>
    </Layout>
  );
};

Default.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default Default;
