import React from 'react';
import PropTypes from 'prop-types';

/**
 * A badge for a Post Item that will either contain the category, author, story panel label or Sponsored label
 *
 * @param {post: {...postData}} props
 */
const PostItemBadge = (props) => {
  const {
    post,
    showAuthor,
    panelLabel,
    panelLabelLink,
  } = props;
  const isSponsored = post.type === 'post_sponsored';

  let badge = null;

  if (showAuthor && post['co-authors']?.[0]?.display_name && !isSponsored) {
    badge = (
      <span className="inews__post__category inews__post__badge">
        <a
          href={post['co-authors'][0].link}
          title={post['co-authors'][0].display_name}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: post['co-authors'][0].display_name,
          }}
        />
      </span>
    );
  }

  if (!showAuthor && post.breadcrumbs?.[0] && !isSponsored) {
    let category = post.breadcrumbs.slice(-1).pop();

    // if there is an override of the category display
    if (post.display_term_override) {
      category = post.display_term_override;
      category.link = `/topic/${category.slug}`;
    }

    badge = (
      <span className="inews__post__category inews__post__badge" data-category={category.slug}>
        <a
          href={panelLabelLink || category.link}
          title={panelLabel || category.name}
          dangerouslySetInnerHTML={{
            __html: panelLabel || category.name,
          }}
        />
      </span>
    );
  }

  if (isSponsored) {
    badge = <span className="inews__post__sponsored-label inews__post__badge"><span>Promoted Content</span></span>;
  }

  return badge;
};

/* istanbul ignore next */
PostItemBadge.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  showAuthor: PropTypes.bool,
  panelLabel: PropTypes.string,
  panelLabelLink: PropTypes.string,
};

export default PostItemBadge;
