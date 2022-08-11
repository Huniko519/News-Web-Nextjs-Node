import React from 'react';
import PropTypes from 'prop-types';
import stylesheet from './style.scss';
import ScopedColorContext from '../../ScopedColorContext';
import Layout from '../../Layout';
import PostCategoryBanner from '../../post-meta/PostCategoryBanner';
import PostTopics from '../../post-meta/PostTopics';
import PostFeaturedMedia from '../../post-meta/PostFeaturedMedia';
import PostItemLabel from '../../post-items/PostItemLabel';
import PostDate from '../../post-meta/PostDate';
import PostShareButtons from '../../post-meta/PostShareButtons';
import Ibuys from '../../Ibuys';
import { getReviewRatingClassName, getCorePostStyles } from '../../../utils/post';
import Taboola from '../../ads/taboola/Taboola';
import PostContent from '../../PostContent';
import PostPianoLockContainer from '../../post-items/PostPianoLockContainer';
import MoreFrom from '../../MoreFrom';
import PostByline from '../../post-meta/PostByline';

/* eslint-disable max-len */

/**
 * Long Form post template
 *
 * @param {*} props
 */
const LongForm = (props) => {
  const { post, moreFromPosts } = props;
  return (
    <>
      <Layout {...props} isLongForm disableLayoutLeaderboardAd disableLayoutSkyscraperAd disableLayoutOOPAd>
        {getCorePostStyles(post)}
        <style global jsx>{stylesheet}</style>
        <PostCategoryBanner post={post} />
        <PostFeaturedMedia post={post} />
        <div className="inews__main__primary__wrapper">
          <div className="inews__main__primary">
            <div className="inews__main__layout">

              <div className="inews__main__body">
                <article className={`id-${post.id} post-type-${post.type}`}>
                  <ScopedColorContext colorKeys={post.breadcrumbs.map((breadcrumb) => breadcrumb.slug).reverse()} key={post.id}>

                    <div className="i__m__head-cont">
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
                    </div>

                    <div className="article-content">
                      <div className="right-col">
                        <PostByline post={post} />
                        <PostDate post={post} />
                        <PostShareButtons post={post} dataTrack="share_article-top" />
                      </div>
                      <PostContent content={post.content.rendered} />
                      {post.ibuys_data && <Ibuys items={post.ibuys_data} />}
                      <div className="article-end" />
                    </div>
                  </ScopedColorContext>
                  <PostPianoLockContainer />
                </article>
                <div className="inews__main__maxwidth">
                  <PostTopics post={post} />
                  <MoreFrom moreFromPosts={moreFromPosts} />
                  <Taboola />
                </div>
              </div>

            </div>
          </div>
        </div>
      </Layout>
    </>

  );
};

LongForm.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  sidebar: PropTypes.objectOf(PropTypes.any),
  // eslint-disable-next-line react/forbid-prop-types
  moreFromPosts: PropTypes.array,
};

LongForm.defaultProps = {
  sidebar: {},
  moreFromPosts: [],
};

export default LongForm;
