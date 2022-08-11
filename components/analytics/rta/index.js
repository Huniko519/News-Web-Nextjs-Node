import Utils from './Utils';

const script = document.createElement('script');
// @TODO I'm not sure if we want to parameterize the version
// We don't have a config mgmt tool like on MOL or Metro.
// So, we aren't getting around a code deploy for this change, one way or another
script.src = 'https://inews.co.uk/rta2/v2-inews-3.min.js';
script.dataset.hosts = 'rta2.inews.co.uk';
document.head.appendChild(script);

window.addEventListener('load', () => {
  let rtaParams = {
    rp: (window.innerWidth >= 1024) ? 'desktop' : 'mobile',
  };

  let eventType = 'cview';

  if (window.PageContext.post) {
    eventType = 'view';
    const postParams = Utils.postParams(window.PageContext.post);
    rtaParams = Object.assign(rtaParams, postParams);
  }
  if ('RTA' in window) {
    window.RTA.tedEvent(eventType, rtaParams);
  }
});

// listeners for video players
window.addEventListener('inews:videos:loaded', () => {
  if (window.PageContext.videoPlayers) {
    // These are the "static" events that we don't need to compute any values against
    const videoEvents = {
      start: 'video.stream-started',
      ad_start: 'video.ad-started',
      ad_end: 'video.ad-ended',
      video_start: 'video.content-started',
      video_end: 'video.content-ended',
      pause: 'video.content-paused',
    };
    window.PageContext.videoPlayers.forEach((player) => {
      // Track the static events
      // eslint-disable-next-line no-restricted-syntax
      for (const [eventName, eventID] of Object.entries(videoEvents)) {
        /* eslint-disable no-param-reassign */
        player.videoIndex = 0;
        player.on(eventName, () => {
          player.getState().then((state) => {
            const { videoDuration, videoTitle, videoTime } = state;
            const duration = Math.ceil(videoDuration);
            const rtaParams = {
              action: eventID,
              id: player.getSettings().videoId,
              title: videoTitle.replace(/\+/g, ' '),
              module: 'inews.dailymotion',
              initial: (player.videoIndex === 0),
              percent: (videoTime / duration) * 100,
              duration,
            };
            if ('RTA' in window) {
              window.RTA.tedEvent('video-event', rtaParams);
            }

            if (eventName === 'video_start') {
              player.videoIndex += 1;
            }
          });
        });
      }
    });
  }
});

export default () => { };
