import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import PageContext from './PageContext';

/**
 * Generates a list of classNames for the body based on the
 * app context.
 *
 * @param {object} context React context for the app
 * @return {string} string of space seperated class anmes
 */
const getClassNames = (context) => {
  const classNames = [];

  if (context?.isError) {
    classNames.push('is-error');
  }

  if (context?.isPreview) {
    classNames.push('is-preview');
  }

  classNames.push('dirty-amp');

  if (context?.router?.pathname === '/') {
    classNames.push('is-home');
  }

  if (context?.router?.pathname === '/search') {
    classNames.push('is-search');
  }

  if (context?.router?.pathname === '/category') {
    classNames.push('is-category');
    if (context?.categories?.[0]) {
      classNames.push(`is-category-${context.categories[0].parent > 0 ? 'child' : 'parent'}`);
      classNames.push(`is-category-id-${context.categories[0].id}`);
      classNames.push(`is-category-slug-${context.categories[0].slug}`);
      if (context.categories[0].parent > 0 && context.categories[0]?._embedded?.up[0]) {
        classNames.push(`has-category-parent-id-${context.categories[0]._embedded.up[0].id}`);
        classNames.push(`has-category-parent-slug-${context.categories[0]._embedded.up[0].slug}`);
      }
    }
  }

  if (context?.router?.pathname === '/topic') {
    classNames.push('is-topic');
    if (context?.tags?.[0]) {
      classNames.push(`is-topic-id-${context.tags[0].id}`);
      classNames.push(`is-topic-slug-${context.tags[0].slug}`);
    }
  }

  if (
    context?.router?.pathname === '/post'
    || (context?.isPreview && context?.post && ['post', 'post_sponsored'].includes(context.post.type))
  ) {
    classNames.push('is-post');
    if (context?.post) {
      classNames.push(`is-post-id-${context.post.id}`);
      if (context.post.type === 'post_sponsored') {
        classNames.push('is-sponsored-post');
      }
      if (context.post?.breadcrumbs) {
        const categories = context.post.breadcrumbs.map((b) => b.slug);
        categories.forEach((el) => {
          classNames.push(`has-category-${el}`);
        });
      }
      if (context.post?.topics) {
        const categories = context.post.topics.map((b) => b.slug);
        categories.forEach((el) => classNames.push(`has-topic-${el}`));
      }
      if (context.post?.template) {
        classNames.push(`is-post-template-${context.post.template}`);
      }
    }
  }

  if (
      context?.router?.pathname === '/page'
      || (context?.isPreview && context?.post && context.post.type === 'page')
  ) {
    classNames.push('is-page');
    if (context?.post) {
      classNames.push(`is-page-id-${context.post.id}`);
    }
  }

  if (context?.router?.pathname === '/author') {
    classNames.push('is-author');
    if (context?.authors?.[0]) {
      classNames.push(`is-author-id-${context.authors[0].id}`);
      classNames.push(`is-author-slug-${context.authors[0].slug}`);
    }
  }

  return classNames.join(' ');
};

/**
 * Body component with contextual class names
 *
 * @param {*} props
 * @return {*}
 */
const Body = (props) => {
  const { children } = props;
  const context = useContext(PageContext);

  return <body className={getClassNames(context)}>{children}</body>;
};

Body.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Body;
