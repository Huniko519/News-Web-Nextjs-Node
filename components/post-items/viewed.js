import { getCurrentEdition, getNextEditionStart } from '../masthead';

const storageKey = 'inews-viewed-posts';

/**
 * returns the a timestamp to use a the expiration time based on the next
 * edition time
 *
 * @return {*} timestamp
 */
const getNextExpirationTime = () => {
  const londonDate = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });
  const now = new Date(londonDate);

  const currentEdition = getCurrentEdition();
  const nextEditionStartTime = getNextEditionStart(currentEdition);
  const nextTime = parseInt(nextEditionStartTime, 10) / 60;

  // Bump date to tomorrow if next edition time is at midnight
  if (nextTime === 0) {
    now.setDate(now.getDate() + 1);
  }

  const nextExpiration = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    nextTime,
    0,
    0,
  );
  return nextExpiration.getTime();
};

/**
 * Handles the visibility change and adds the post ID to the viewed array
 * now that the document is visible.
 */
const visibilityChangeHandler = () => {
  if (document.visibilityState === 'visible') {
    /* eslint-disable no-use-before-define */
    if (window.inewsAddPostIdtoViewed) {
      addPostIdtoViewed(window.inewsAddPostIdtoViewed);
      delete window.inewsAddPostIdtoViewed;
    }
    /* eslint-enable no-use-before-define */
    document.removeEventListener('visibilitychange', visibilityChangeHandler, false);
  }
};

/**
 * Pushes the viewed post id to the inews-viewed-posts date in localStoage
 *
 * @param {*} postId
 */
const addPostIdtoViewed = (postId) => {
  /* if the document isn't visible we wait until it is before adding the post ID to viewed
   * this is to prevent overwriting of the local storage when multiple tabs are opened
   */
  if (document.visibilityState !== 'visible') {
    window.inewsAddPostIdtoViewed = postId;
    document.addEventListener('visibilitychange', visibilityChangeHandler, false);
    return;
  }

  if (!localStorage.getItem(storageKey)) {
    localStorage.setItem(storageKey, JSON.stringify({
      expiration: getNextExpirationTime(),
      posts: [postId],
    }));
  } else {
    let viewed = localStorage.getItem(storageKey);
    try {
      viewed = JSON.parse(viewed);
    } catch (e) {
      viewed = {
        expiration: getNextExpirationTime(),
        posts: [],
      };
    }

    // Do not add if we already have this post
    if (viewed.posts.indexOf(postId) === -1) {
      viewed.posts.push(postId);
    }

    localStorage.setItem(storageKey, JSON.stringify(viewed));
  }
};

/**
 * Adds the `inews__posts-viewed` class to all postItems on the page with post ids
 * within the viewed posts array
 */
const addClassNameToViewedPosts = () => {
  if (localStorage.getItem(storageKey)) {
    let viewed = localStorage.getItem(storageKey);
    try {
      viewed = JSON.parse(viewed);
    } catch (e) {
      viewed = { posts: [] };
    }

    if (viewed.posts && viewed.posts.length > 0) {
      const selectors = viewed.posts.map((p) => `.inews__post[data-post-id="${p}"]`);
      // eslint-disable-next-line no-return-assign, no-param-reassign
      document.querySelectorAll(selectors.join(', ')).forEach((el) => el.className += ' inews__post-viewed');
    }
  }
};

/**
 * Deletes the viewed posts storage if we're past the expiration time
 */
const maybeExpireViewedPosts = () => {
  if (localStorage.getItem(storageKey)) {
    let viewed = localStorage.getItem(storageKey);
    try {
      viewed = JSON.parse(viewed);
    } catch (e) {
      viewed = {};
    }

    if (viewed.expiration) {
      const londonDate = new Date().toLocaleString('en-US', { timeZone: 'Europe/London' });
      const now = new Date(londonDate);

      if (now > viewed.expiration) {
        localStorage.removeItem(storageKey);
      }
    } else {
      // should always have an expiraton, remove to prevent possible issues.
      localStorage.removeItem(storageKey);
    }
  }
};


/**
 * Check if localStorage is available
 *
 * @param {*} type
 * @return {*}
 */
const storageAvailable = (type) => {
  try {
    const storage = window[type];
    const x = '__storage_test__';
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
};

/**
 * Init method for viewed posts
 *
 */
const init = () => {
  // only progress is localStoage is available.
  if (storageAvailable('localStorage')) {
    maybeExpireViewedPosts();

    // If we're on a post add its ID to the viewed array.
    if (window?.PageContext?.router?.pathname === '/post' && window?.PageContext?.post?.id) {
      addPostIdtoViewed(window.PageContext.post.id);
    }
    // If we're on a taxonomy add classname to viewed posts
    if (['/', '/category', '/topic', '/author'].indexOf(window?.PageContext?.router?.pathname) !== -1) {
      addClassNameToViewedPosts();
    }
  }
};


export default init;
