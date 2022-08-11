/* eslint-disable no-console */
import { getDeviceConfig } from '../../utils/useBreakpoint';

const breakpointName = getDeviceConfig(window.innerWidth);

function inewsHulkInit() {
  console.warn('[Hulk] init hulk');
  const scriptBase = window.location.origin === 'https://inews.co.uk'
    ? 'https://hulkprod.anm.co.uk'
    : 'https://hulkint.anm.co.uk';
  // Hulk script callback
  async function setupHulk() {
    console.warn('[Hulk] ready');
    console.warn('[Hulk prompt status]', Notification.permission);

    const Register = window.hulk && window.hulk.Register;

    if (!Register.isWebPushSupported()) {
      console.warn('[Hulk] Web push is not supported');
    } else {
      const pageData = window.PageContext && window.PageContext.pageData;
      const channels = (pageData && pageData.topCategory) ? [pageData.topCategory] : ['news'];
      const subChannels = (pageData && pageData.subCategory) ? [pageData.subCategory] : ['news'];
      const keywords = (window.PageContext && window.PageContext.post && window.PageContext.post.topics) ? window.PageContext.post.topics.map((topic) => topic.slug) : [];
      const geo = 'GB';
      let platform = 'desktop';

      // determine device type
      if (breakpointName === 'xs' || breakpointName === 'sm') {
        platform = 'mobile';
      }
      if (breakpointName === 'md') {
        platform = 'tablet';
      }

      const rtaMacro = [];
      if (window.RTA && window.RTA._ruid) {
        const ruids = await window.RTA.ruids;
        rtaMacro.push('https://rta2.inews.co.uk/s/p');
        rtaMacro.push({
          body: JSON.stringify({
            ids: ruids['rta2.inews.co.uk'],
          }),
          credentials: 'include',
          headers: {
            'content-type': 'application/json',
          },
          method: 'POST',
          mode: 'cors',
        });
      }

      const options = {
        baseEndpoint: `${scriptBase}/api/web-push-notification`,
        metadata: {
          channels,
          geo,
          keywords,
          organisation: 'inews',
          platform,
          profilingAllowed: true,
          subChannels,
          userAgent: navigator.userAgent,
          visitorIds: [],
        },
        promptFrequency: window.location.origin === 'https://inews.co.uk' ? '7d' : '5m',
        notificationMacros: {
          impression: [rtaMacro],
        },
        swUrl: '/sw.js',
      };

      // Init code for hulk
      console.warn('[Hulk] Register', options);
      window.hulkInstance = new Register(options);
      window.hulkInstance.init().then((registration) => {
        console.warn('[Hulk] instance init');
        console.warn('[Hulk] Registeraton', registration);
        window.hulkRegistration = registration;
      });

      window.hulkInstance.on('error', (args) => {
        console.warn('[Hulk] error', args);
      });

      window.hulkInstance.on('notification_click', (args) => {
        console.warn('[Hulk] notification_click', args);
        if (window.RTA) {
          window.RTA.tedEvent('push', args);
        }
        if (window.gtag) {
          window.gtag('event', 'click', {
            event_category: 'push notification',
            event_label: args.campaignId,
          });
        }
      });
      window.hulkInstance.on('prompt_click', (args) => {
        console.warn('[Hulk] prompt_click');
        if (window.RTA) {
          window.RTA.tedEvent('push', args);
        }
        if (window.gtag) {
          const permission = args.permission === 'granted' ? 'allow' : args.permission;
          window.gtag('event', 'prompt choice', {
            event_category: 'push notification',
            event_label: permission === 'default' ? 'closed' : permission,
          });
        }
      });
      window.hulkInstance.on('prompt_impression', (args) => {
        console.warn('[Hulk] prompt_impression');
        if (window.RTA) {
          window.RTA.tedEvent('push', args);
        }
        if (window.gtag) {
          window.gtag('event', 'prompt impression', {
            event_category: 'push notification',
            non_interaction: true,
          });
        }
      });
    }
  }

  // Load the hulk script
  const e = document.createElement('script');
  e.async = true;
  e.referrerPolicy = 'no-referrer-when-downgrade';
  e.src = `${scriptBase}/api/web-push-notification/v1/static/latest/mol-fe-web-push-browser-register/register.js`;
  e.onload = setupHulk;

  const s = document.getElementsByTagName('script')[0];
  s.parentNode.insertBefore(e, s);
}

inewsHulkInit();

export default () => { };
