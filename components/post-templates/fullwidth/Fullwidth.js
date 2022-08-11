import React from 'react';
import PropTypes from 'prop-types';
import ScopedColorContext from '../../ScopedColorContext';
import Layout from '../../Layout';
import PostCategoryBanner from '../../post-meta/PostCategoryBanner';
import PostTopics from '../../post-meta/PostTopics';
import PostFeaturedMedia from '../../post-meta/PostFeaturedMedia';
import PostItemLabel from '../../post-items/PostItemLabel';
import PostByline from '../../post-meta/PostByline';
import PostDate from '../../post-meta/PostDate';
import PostShareButtons from '../../post-meta/PostShareButtons';
import Ibuys from '../../Ibuys';
import { getReviewRatingClassName, getCorePostStyles } from '../../../utils/post';
import Taboola from '../../ads/taboola/Taboola';
import PostContent from '../../PostContent';
import PostPianoLockContainer from '../../post-items/PostPianoLockContainer';
import MoreFrom from '../../MoreFrom';
import stylesheet from './style.scss';

/**
 * Full Width post template -  Outputs the title and content into a full width white box
 *
 * @param {*} props
 */
const FullWidth = (props) => {
  const { post, moreFromPosts } = props;

  // Display programmatic ads on sponsored articles
  let disableAds = false;

  // Disable ads for Money Solutions topics
  if (post.topics && post.topics.length > 0) {
    // eslint-disable-next-line no-restricted-syntax
    for (const topic of post.topics) {
      if (topic.name.toLowerCase() === 'money solutions') {
        disableAds = true;
      }
    }
  }
  return (
    <Layout {...props} disableLayoutLeaderboardAd={disableAds} disableLayoutSkyscraperAd={disableAds}>
      {getCorePostStyles(post)}
      <style global jsx>{stylesheet}</style>
      <PostCategoryBanner post={post} />
      <div className="inews__main__primary__wrapper">
        <div className="inews__main__primary inews_main__primary--fullwidth">
          <div>
            <ScopedColorContext colorKeys={post.breadcrumbs.map((breadcrumb) => breadcrumb.slug).reverse()} key={post.id}>
              <article className={`id-${post.id} post-type-${post.type}`}>
                <h1
                  className="headline"
                  dangerouslySetInnerHTML={{
                    __html: post.title.rendered,
                  }}
                />
                <PostItemLabel post={post} />
                <h2
                  className={`${getReviewRatingClassName(post)} excerpt`}
                  dangerouslySetInnerHTML={{
                    __html: post.excerpt.rendered,
                  }}
                />

                <PostFeaturedMedia post={post} />
                <PostByline post={post} />
                <PostDate post={post} />
                <PostShareButtons post={post} dataTrack="share_article-top" />
                <div className="article-content">
                  <PostContent content={post.content.rendered} />
                  {post.ibuys_data && <Ibuys items={post.ibuys_data} />}
                  <div className="article-end" />
                </div>
                <PostPianoLockContainer />
              </article>
            </ScopedColorContext>
            <PostTopics post={post} />
            <MoreFrom moreFromPosts={moreFromPosts} />
            <Taboola />
          </div>
        </div>
      </div>
    </Layout>
  );
};

FullWidth.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  moreFromPosts: PropTypes.array,
};

FullWidth.defaultProps = {
  moreFromPosts: [],
};

export default FullWidth;
