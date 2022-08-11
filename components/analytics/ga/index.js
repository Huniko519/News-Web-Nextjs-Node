import { getUAID, getCustomDimensions } from './Utils';

const UAID = getUAID();
const externalReferrerKey = 'external_ref';

const getSessionReferrerUrl = () => {
  let referrerUrl = '';

  // Set referrer from localstorage if available
  // else if document.referrer is empty remove localstorage
  if ((localStorage.getItem(externalReferrerKey) && document.referrer !== '')) {
    referrerUrl = localStorage.getItem(externalReferrerKey);
  } else {
    localStorage.removeItem(externalReferrerKey);
  }

  // Storing new referrer value in localStorage if document.referrer is external
  // and do not match with existing localStorage value
  if (document.referrer !== ''
    && document.referrer.indexOf(window.location.origin) === -1
    && document.referrer !== referrerUrl) {
    window.localStorage.setItem(externalReferrerKey, document.referrer);
    referrerUrl = document.referrer;
  }

  // If referrer not found then using current referrer or 'undefined'
  if (referrerUrl === '') {
    referrerUrl = document.referrer || 'undefined';
  }
  return referrerUrl;
};

const getCurrentReferrerUrl = () => {
  let referrerUrl = 'undefined';

  // Trim any query vars per Sham Amin's request
  if (document.referrer !== '') {
    /* eslint-disable prefer-destructuring */
    referrerUrl = document.referrer.split('?')[0];
  }

  return referrerUrl;
};

// Get referrer host
const getReferrerHost = () => {
  const referrer = getSessionReferrerUrl();
  if (referrer === 'undefined') {
    return referrer;
  }
  return new URL(referrer).hostname;
};

// Load the GA gtag script
const script = document.createElement('script');
script.src = `https://www.googletagmanager.com/gtag/js?id=${UAID}`;
script.async = true;
document.head.appendChild(script);

window.dataLayer = window.dataLayer || [];
/* eslint-disable prefer-rest-params */
window.gtag = function gtag() { dataLayer.push(arguments); };
gtag('js', new Date());

const customDimensions = getCustomDimensions(window.PageContext);

// push notification status dimension49:denied|eligible|subscribed
let notificationStatus = 'not_supported';
if ('PushManager' in window && 'Notification' in window) {
  switch (window.Notification.permission) {
    case 'default': {
      notificationStatus = 'eligible';
      break;
    }
    case 'denied': {
      notificationStatus = 'denied';
      break;
    }
    case 'granted': {
      notificationStatus = 'subscribed';
      break;
    }
    default: {
      notificationStatus = 'not_supported';
    }
  }
}
customDimensions.cd49 = notificationStatus;

let contentGroup = 'archive';
if (window.PageContext.post) {
  contentGroup = 'article';
} if (window.PageContext.post && window.PageContext.post.type === 'page') {
  contentGroup = 'page';
} else if (window.PageContext.categories) {
  contentGroup = 'category';
} else if (window.PageContext.tags) {
  contentGroup = 'topic';
} else if (window.PageContext.authors) {
  contentGroup = 'author';
}
gtag('set', 'content_group1', contentGroup);

const urlParams = new URLSearchParams(document.location.search);
let ico = urlParams.get('ico');
// Clean up junk that can get appened to ICO params
const icoRegex = /[^a-zA-Z0-9_-]+/g;
const regexMatch = ico?.match(icoRegex);
ico = (regexMatch) ? ico.split(regexMatch)[0] : ico;

customDimensions.cd25 = ico || 'undefined';
customDimensions.cd26 = ico || 'undefined';
const ito = urlParams.get('ito');
customDimensions.cd40 = ito || 'undefined';
customDimensions.cd41 = ito || 'undefined';

customDimensions.cd24 = getCurrentReferrerUrl();
customDimensions.cd46 = getSessionReferrerUrl();
customDimensions.cd98 = getReferrerHost();

/**
 * Set all of the custom dimensions.
 * The str replace of cd->dimension is because AMP and WWW handle this key name differently
 * and we just standardize on `cd{number}` because it's shorter and that's what the URL param to GA actually is
 */
Object.keys(customDimensions).forEach((property) => {
  gtag('set', property.replace('cd', 'dimension'), customDimensions[property]);
});

/**
 * Initiating page view event request for gTag with client id
 */
const sendPageView = () => {
  // Get client id from gTag dataStore and send page view event in callback
  gtag('get', UAID, 'client_id', (clientId) => {
    gtag('config', UAID, {
      'dimension38': clientId,
    });
  });
};

/**
 * Wait for Piano auth and then setup some CDs and fire the initial PV tracker
 */
tp = window.tp || [];
tp.push(['init', () => {
  if (tp.pianoId.isUserValid()) {
    gtag('set', 'dimension2', 'loggedIn');

    const subscriptionsList = ['1 - registered_user'];

    let pianoRID = 'BR3GN1WU';
    if (window.adverts?.config?.piano?.rid) {
      pianoRID = window.adverts.config.piano.rid;
    }
    // check for paying subscriber info
    window.tp.api.callApi('/access/list', {}, ({ data }) => {
      data.forEach((sub) => {
        if (sub.resource.rid === pianoRID) {
          subscriptionsList.push('2 - digital_subscription');
          let expirationDate = '';
          let startDate = '';

          if (sub.expire_date) {
            expirationDate = parseDate(sub.expire_date);
          }
          if (sub.start_date) {
            startDate = parseDate(sub.start_date);
          }

          const subscriptionInterval = getSubscriptionInterval(sub);

          gtag('set', 'dimension121', `2 - ${startDate}`);
          gtag('set', 'dimension122', `2 - ${expirationDate}`);
          gtag('set', 'dimension123', `2 - ${subscriptionInterval}`);
        }
      });

      gtag('set', 'dimension52', subscriptionsList.join(','));
      sendPageView();
    });
  } else {
    gtag('set', 'dimension2', 'not set');
    gtag('set', 'dimension52', 'not set');
    sendPageView();
  }
}]);

/**
 * Listener for social share clicks
 *
 * Each share button element has a data-track value like
 * facebook_share_article-top
 * which is used to populate the event data.
 */
document.querySelectorAll('amp-social-share').forEach((item) => {
  item.addEventListener('click', (event) => {
    const trackValue = event.target.dataset.track;
    const socialNetwork = trackValue.split('_')[0];
    const position = trackValue.split('-')[1];
    gtag('event', `${socialNetwork} share`, {
      event_category: 'social',
      event_label: `in article - ${position}`,
    });
  });
});

/**
 * Trigger events on post section clicks (including Skylines)
 */
const skylineAnchors = document.querySelectorAll('.inews__post-section a.skyline__slide');
if (skylineAnchors) {
  /* eslint-disable no-restricted-syntax */
  for (const slabAnchor of skylineAnchors) {
    // eslint-disable-next-line no-loop-func
    slabAnchor.addEventListener('click', (e) => {
      let elIndex = 0;
      const anchorElement = e.currentTarget;
      const slabDestination = anchorElement.href;

      // Only track clicks on elemnts with a valid href
      if (slabDestination && slabDestination.length < 1) {
        return;
      }

      // get parent element so that we can check the index
      elIndex = Array.prototype.slice.call(anchorElement.parentElement.children).indexOf(anchorElement);

      gtag('event', `position_${elIndex + 1}_click`, {
        event_category: 'slab_skylines',
        event_label: slabDestination,
      });
    });
  }
}

/**
 * Listeners for video players
 * Custom events are fired off of the Daily Motion player
 */
window.addEventListener('inews:videos:loaded', () => {
  if (window.PageContext.videoPlayers) {
    // Each event name we want to track
    const videoEvents = [
      'start',
      'ad_start',
      'ad_end',
      'video_start',
      'video_end',
      'pause',
    ];

    // Find all video players on the page and bind a callback to each player+event uniquely
    window.PageContext.videoPlayers.forEach((player) => {
      videoEvents.forEach((playerEvent) => {
        player.on(playerEvent, () => {
          gtag('event', playerEvent, {
            event_category: 'dailymotion_video',
            event_label: `${player.getSettings().id} - article_embed`,
          });
        });
      });
    });
  }
});

/**
 * Trigger new pageviews when someone clicks "Show More" on archive pages
 */
const showMoreButton = document.getElementById('inews__post-list__more');
if (showMoreButton) {
  let pageNumber = 1;
  showMoreButton.addEventListener('click', () => {
    gtag('config', UAID, { 'page_path': `${window.location.pathname}/page/${pageNumber}` });
    pageNumber += 1;
  });
}

/**
 * Trigger when someone opens or closes the Puzzle modal
 */
const puzzleOpenButton = document.getElementById('btn-open-puzzle-lightbox');
const puzzleCloseButton = document.getElementById('btn-close-puzzle-lightbox');

// Hooking the Puzzle open Event Handler
if (puzzleOpenButton) {
  puzzleOpenButton.addEventListener('click', () => {
    gtag('event', 'open', {
      event_category: 'puzzles_modal',
    });
  }, false);
}

// Hooking the Puzzle close Event Handler
if (puzzleCloseButton) {
  puzzleCloseButton.addEventListener('click', () => {
    gtag('event', 'closed', {
      event_category: 'puzzles_modal',
    });
  }, false);
}

// Hooking the Puzzle close Event Handler with the `esc` key
document.onkeydown = (e) => {
  const lightbox = document.getElementById('puzzle-lightbox');
  if (lightbox && lightbox.style.display !== 'none') {
    const evt = e || window.event;
    let isEscape = false;
    if ('key' in evt) {
      isEscape = (evt.key === 'Escape' || evt.key === 'Esc');
    } else {
      isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
      gtag('event', 'closed', {
        event_category: 'puzzles_modal',
      });
    }
  }
};

// Events for puzzles
window.addEventListener('message', (event) => {
  if (event.data.event && event.data.event === 'PuzzleCompleted') {
    if (gtag) {
      let puzzleName = event.data.genre;
      if (window.location.pathname.includes('/puzzles/')) {
        /* eslint-disable prefer-destructuring */
        puzzleName = window.location.pathname.split('/')[2];
      }
      gtag('event', 'complete', {
        event_category: 'puzzle',
        event_label: puzzleName,
      });
    }
  }
  if (event.data.event && event.data.event === 'PuzzleLoaded') {
    if (gtag) {
      let puzzleName = event.data.genre;
      if (window.location.pathname.includes('/puzzles/')) {
        /* eslint-disable prefer-destructuring */
        puzzleName = window.location.pathname.split('/')[2];
      }
      gtag('event', 'start', {
        event_category: 'puzzle',
        event_label: puzzleName,
      });
    }
  }
}, false);

// GA event for header subscribe button.
const subscribeButtonheader = document.querySelectorAll('.i__header__account_register');
if (subscribeButtonheader && subscribeButtonheader.length > 0) {
  subscribeButtonheader.forEach((button) => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      gtag('event', 'header click', {
        event_category: 'button_header',
        event_label: 'subscribe',
      });
      window.location.href = e.target.href;
    });
  });
}

/**
 * Track newsletter form signup
 */

const triggerNewsLetterGAEvent = (action, label, eventCategory) => {
  gtag('event', action, {
    event_category: eventCategory,
    event_label: label,
  });
};

/**
 * Event for in-article and Splash Newsletter Signup
 * Listening for a custom event which will be triggered when in-article piano form is submitted
 */
window.addEventListener('pn-newsletter-submit-button', (e) => {
  const { email, sailthruName, isSplash } = e.detail;
  const url = `${window.PageContext.publicApiUrl}/newsletter/subscriber/?email=${email}`;
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const sailthruResponse = JSON.parse(xhr.responseText);
      const eventCategory = (sailthruResponse.success === true)
        ? 'newsletter_topic-addition' : 'newsletter_new-subscription';
      if (sailthruName) {
        triggerNewsLetterGAEvent((isSplash) ? 'signup_in-splash' : 'signup_in-article', sailthruName, eventCategory);
      }
    }
  };
  xhr.open('GET', url);
  xhr.send();
});

// Custom event to capture article scroll end event.
window.addEventListener('event-article-scroll-end', () => {
  gtag('event', 'article', {
    event_category: 'scroll depth tracking',
    event_label: 'end of article text',
  });
});

export default () => { };
