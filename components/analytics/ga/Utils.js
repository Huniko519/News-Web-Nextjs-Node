export const getUAID = () => 'UA-128755582-162';

/**
 * Pass a data object from each page to generate its custom dimensions
 *
 * @param {*} pageContext
 * @returns {} Object of the GA custom dimensions
 */
export const getCustomDimensions = (pageContext = {}) => {
  const defaultCustomDimensions = {
    cd1: 'WEB',
    cd4: 'home',
    cd9: 'INEW',
  };

  let customDimensions = {};

  // Posts route. Can be passed as the WWW pageContext or just the post data itself
  if (pageContext.post || pageContext.id) {
    const post = pageContext.post || pageContext;
    let channel = '';
    let subChannel = '';
    let breadcrumbs = '';
    let tags = '';
    let author = '';
    let type = 'article';

    if (post.breadcrumbs && post.breadcrumbs?.[0]) {
      breadcrumbs = post.breadcrumbs.map((breadrumb) => breadrumb.name.toLowerCase()).join('>');
      channel = post.breadcrumbs[post.breadcrumbs.length - 1].name.toLowerCase();
      if (post.breadcrumbs.length > 1) {
        subChannel = post.breadcrumbs[post.breadcrumbs.length - 2].name.toLowerCase();
      }
    }

    if (post.topics) {
      tags = post.topics.map((term) => term.name.toLowerCase()).join(',');
    }

    if (post['co-authors'] && post['co-authors']?.[0]) {
      author = post['co-authors'].map((coAuthor) => (coAuthor.display_name || '').toLowerCase()).join('|');
    }

    if (post.type === 'page') {
      type = 'page';
    }

    const wordCount = post.content.rendered.replace(/<[^>]*>?/gm, '').split(' ').length;
    const imageCount = ((post.content.rendered || '').match(/<\/amp-img>/g) || []).length;
    const sponsorName = (post.sponsor_data?.name) ? post.sponsor_data.name.toLowerCase() : '';
    const hasVideo = (post.featured_video?.length > 0);
    const cd15 = (post.breadcrumbs && post.breadcrumbs.length === 3) ? post.breadcrumbs.reverse().map((breadcrumb) => (breadcrumb.name || '').toLowerCase()).join('/') : 'not set';

    if (post?.template === 'longform') {
      type = 'longform article';
    }
    if (post?.template === 'opinion') {
      type = 'opinion article';
    }

    customDimensions = {
      cd3: author,
      cd4: type,
      cd5: post.id,
      cd6: channel,
      cd7: post.title.rendered,
      cd8: post.date,
      cd10: sponsorName,
      cd11: author,
      cd12: wordCount,
      cd13: imageCount,
      cd14: `${channel}/${subChannel}`,
      cd15,
      cd16: subChannel,
      cd20: tags,
      cd21: breadcrumbs.replace('>', '|'),
      cd22: post.breadcrumbs?.length,
      cd39: hasVideo,
    };
  } else if (pageContext.categories) {
    // Category route
    customDimensions = {
      cd4: 'category',
      cd15: pageContext.pageData.topCategory,
      cd16: pageContext.pageData.subCategory,
    };
  } else if (pageContext.tags) {
    // Tags/Topics route
    customDimensions = {
      cd4: 'category',
      cd20: pageContext.tags[0].name.toLowerCase(),
    };
  } else if (pageContext.authors) {
    // Author route
    customDimensions = {
      cd4: 'category',
      cd11: pageContext.authors[0].name.toLowerCase(),
    };
  } else if (pageContext.router.pathname === '/search') {
    customDimensions = {
      cd4: 'search',
    };
  } else if (pageContext.router.pathname === '/my-account') {
    customDimensions = {
      cd4: 'my-account',
    };
  }

  customDimensions = Object.assign(defaultCustomDimensions, customDimensions);

  return customDimensions;
};
