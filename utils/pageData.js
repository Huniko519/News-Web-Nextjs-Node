export const getPageDataFromProps = (pageProps) => {
  // These default will be set on the Home, Topic, and Author pages
  const pageData = {
    topCategory: 'home',
    subCategory: 'home',
    type: 'home',
  };

  // For Post pages
  if (pageProps?.post && pageProps?.post?.type !== 'page') {
    pageData.type = 'article';
    const categories = pageProps.post.breadcrumbs.map((b) => b.slug);
    pageData.topCategory = categories[0] || '';
    pageData.subCategory = categories[1] || '';
  }

  // For Category pages
  if (pageProps?.categories) {
    const category = pageProps.categories[0];
    if (category.parent > 0) {
      pageData.topCategory = category._embedded.up[0].slug;
      pageData.subCategory = category.slug;
    } else {
      pageData.topCategory = category.slug;
      pageData.subCategory = category.slug;
    }
  }

  return pageData;
};

/**
 * Remove _links property from the raw API resonse. Not needed here.
 *
 * @param {*} obj
 */
export const removeApiLinks = (obj) => {
  if (typeof obj === 'object') {
    // eslint-disable-next-line no-restricted-syntax
    for (const prop in obj) {
      if (typeof prop !== 'undefined' && prop === '_links') {
        // eslint-disable-next-line no-param-reassign
        delete obj[prop];
      } else if (typeof obj[prop] === 'object') {
        removeApiLinks(obj[prop]);
      }
    }
  }
};
