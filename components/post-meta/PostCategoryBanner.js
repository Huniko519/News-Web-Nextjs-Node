import React from 'react';
import PropTypes from 'prop-types';
import ScopedColorContext from '../ScopedColorContext';

/**
 * Display the top-level category for the post
 * @param {*} props
 */
const PostCategoryBanner = (props) => {
  const { post } = props;
  const colorKeys = post.breadcrumbs.map((breadcrumb) => breadcrumb.slug).reverse();
  const catName = post.breadcrumbs[post.breadcrumbs.length - 1]?.name;
  return (
    catName
      ? (
        <ScopedColorContext colorKeys={colorKeys}>
          <div className="inews__post__category-banner">
            <div
              className="i__post__cat-ban__in"
              dangerouslySetInnerHTML={{
                __html: catName,
              }}
            />
          </div>
        </ScopedColorContext>
      )
      : null
  );
};

PostCategoryBanner.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default PostCategoryBanner;
