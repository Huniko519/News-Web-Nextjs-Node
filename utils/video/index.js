import { adsApiReady } from '../../components/ads/AdsSetup';
import baseConfig from '../../public/static/config.video.json';
import { getDeviceConfig } from '../useBreakpoint';

const getVideoConfig = (slot) => {
  const config = { ...baseConfig };
  const breakpointName = getDeviceConfig(window.innerWidth);

  Object.keys(baseConfig).forEach((pos) => {
    const descriptions = baseConfig[pos];

    descriptions.forEach((description) => {
      if ((description.breakpoints || ['xs', 'sm', 'md', 'lg', 'xl'])
        .includes(breakpointName)) {
        config[pos] = description;
        config[pos].pos = pos;
      }
    });
  });
  return slot ? config[slot] : config;
};

const adTagUrl = (iu, tags) => {
  // If no iu provided then assume video should be advert-less
  if (!iu) {
    return '';
  }

  const config = getVideoConfig('inews.video');

  return new Promise((resolve) => {
    adsApiReady.then(async () => {
      const url = await global.adverts.getVideoTagUrl({ ...config, tags, iu });
      resolve(url);
    });
  });
};

const updatePageContext = () => {
  if (!window.PageContext.videoPlayers) {
    Promise.all(dailymotion.getAllPlayers()).then((players) => {
      window.PageContext.videoPlayers = players;
      const videosLoadedEvent = new Event('inews:videos:loaded');
      window.dispatchEvent(videosLoadedEvent);
    });
  }
};

// Init player based on data attributes
const initPlayer = async ({
  elmId, videoId, adsparams,
}) => {
  const player = await window.dailymotion.createPlayer(elmId, {
    video: videoId,
    referrerPolicy: 'no-referrer-when-downgrade',
    params: {
      mute: true,
      customConfig: {
        'customParams': adsparams,
      },
    },
  });

  // Adding videos loaded and vide start event
  player.on(dailymotion.events.PLAYER_START, (state) => {
    // Adding videPlayers in page context if not available.
    updatePageContext();
    // Change custom config - customParams for ads on vide start
    const iu = document.getElementById(state.id).parentElement.dataset?.adsParams;
    if (iu) {
      player.on(dailymotion.events.VIDEO_START, async () => {
        window.playCount += 1;
        const params = await adTagUrl(iu, { play: window.playCount });
        player.setCustomConfig({ customParams: params });
      });
    }
  });

  // Add an event listener to the event 'PLAYER_PRESENTATIONMODECHANGE', this is sent when the player transitions to or from a Picture-in-Picture state
  player.on(dailymotion.events.PLAYER_PRESENTATIONMODECHANGE, ({ playerPipStatus, playerIsPlaying, playerIsViewable }) => {
    // Get information about the pip via the player state, if the player is closed, currently playing and no longer viewable then programmatically pause the player
    if (playerPipStatus === 'closed' && playerIsPlaying && !playerIsViewable) {
      player.pause();
    }
  });
};

// Process all dailymotion-player elemments to init player
const processCpeElements = () => {
  const playerNodes = document.getElementsByClassName('dailymotion-player');
  [...playerNodes].forEach((playerNode) => {
    const { adsparams } = playerNode.dataset;
    const playerContainer = playerNode.parentElement;
    initPlayer({
      elmId: playerNode.id,
      videoId: playerContainer.id,
      adsparams,
    });
  });
};

const processNodes = async (nodesList) => {
  const resolvedNodes = [];

  // 1) Get player containers
  [...nodesList].forEach((node) => {
    const videoId = node.id;
    const { adsParams } = node.dataset;

    // 2) Do header bidding / fetch video tags
    const playerReady = Promise.resolve(adTagUrl(adsParams, { play: window.playCount }))
      .then((url) => {
        // 3) Create / append dailymotion-player node to dom
        const div = document.createElement('div');
        div.className = 'dailymotion-player';
        div.id = `video-${videoId}`;
        div.setAttribute('data-adsparams', url);

        node.appendChild(div);
      });

    resolvedNodes.push(playerReady);
  });
  await Promise.all(resolvedNodes);
  processCpeElements();
};

// Event handler to perform pause and play action on player based on document visibility.
const visibilityChangeHandler = () => {
  if (document[window.hiddenProp]) {
    dailymotion
      .getPlayer()
      .then((player) => {
        player.getState()
          .then((state) => {
            // Only pause if inline video or pip. Ignore if native pip.
            if (state.playerPresentationMode === 'inline'
            || state.playerPresentationMode === 'pip') {
              player.pause();
            }
          });
      });
  } else {
    dailymotion
      .getPlayer()
      .then((player) => {
        player.play();
      });
  }
};

// Preparing property and visibility api event based on browser.
const prepareVisibilityProps = () => {
  const props = {};
  if (typeof document.hidden !== 'undefined') { // Opera 12.10 and Firefox 18 and later support
    props.hidden = 'hidden';
    props.visibilityChange = 'visibilitychange';
  } else if (typeof document.msHidden !== 'undefined') {
    props.hidden = 'msHidden';
    props.visibilityChange = 'msvisibilitychange';
  } else if (typeof document.webkitHidden !== 'undefined') {
    props.hidden = 'webkitHidden';
    props.visibilityChange = 'webkitvisibilitychange';
  }
  return props;
};

// Add event for visibility change event.
const addVisibilityEvent = (hidden, visibilityChange) => {
  window.hiddenProp = hidden;
  document.addEventListener(visibilityChange, visibilityChangeHandler, false);
};

export default async () => {
  const nodes = document.getElementsByClassName('dailymotion-wrapper');

  if (nodes.length === 0) {
    return;
  }

  window.playCount = 1;

  // Processing dailymotion videos on load
  window.addEventListener('load', () => {
    processNodes(nodes);

    // Pause and play video based on document visibility
    const { hidden, visibilityChange } = prepareVisibilityProps();
    if (hidden && visibilityChange) {
      addVisibilityEvent(hidden, visibilityChange);
    }
  });
};
