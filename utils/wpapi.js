import WPAPI from 'wpapi';
import NodeCache from 'node-cache';
import Config from '../config';
import { getRelativePublicApiUrl } from './URL';

global.WPAPICache = global.WPAPICache || new NodeCache({ stdTTL: 60, checkperiod: 1 });

const cacheConfigs = [
  {
    route: `${Config.privateApiUrl}/menus/v1/menus/all`,
    ttl: 900,
  },
  {
    route: `${Config.privateApiUrl}/wp/v2/sidebar/post-sidebar`,
    ttl: 900,
  },
  {
    route: `${Config.privateApiUrl}/wp/v2/sidebar/sponsored-post-sidebar`,
    ttl: 900,
  },
  {
    route: `${Config.privateApiUrl}/wp/v2/sidebar/sport-post-sidebar`,
    ttl: 900,
  },
  {
    route: `${Config.privateApiUrl}/wp/v2/sidebar/culture-post-sidebar`,
    ttl: 900,
  },
  {
    route: `${Config.privateApiUrl}/wp/v2/sidebar/money-post-sidebar`,
    ttl: 900,
  },
  {
    route: `${Config.privateApiUrl}/wp/v2/sidebar/opinion-post-sidebar`,
    ttl: 3600,
  },
  {
    route: `${Config.privateApiUrl}/wp/v2/authors`,
    ttl: 3600,
  },
  {
    route: `${Config.privateApiUrl}/wp/v2/tags`,
    ttl: 3600,
  },
  {
    route: `${Config.privateApiUrl}/wp/v2/categories`,
    ttl: 3600,
  },
  {
    route: `${Config.privateApiUrl}/wp/v2/posts/rta`,
    ttl: 3600,
  },
  {
    route: `${Config.privateApiUrl}/adverts/config`,
    ttl: 3600,
  },
  {
    route: `${Config.privateApiUrl}/newsletter/subscirber?email="dummysailthrusubscriber@inews.co.uk"`,
    ttl: 3600,
  },
];

export const WP = new WPAPI({
  endpoint: Config.privateApiUrl,
  transport: {
    get(wpreq) {
      const route = wpreq.toString();
      const cacheConfig = cacheConfigs.find((config) => route.startsWith(config.route));

      if (cacheConfig) {
        const result = WPAPICache.get(route);
        if (result) {
          return Promise.resolve(result);
        }
      }

      return WPAPI.transport.get(wpreq).then((result) => {
        let filteredResult = result;
        if (Config.feStandalone && Config.feDomainRegexReplace) {
          const regex = new RegExp(Config.feDomainRegexReplace, 'g');
          const paging = filteredResult._paging ?? null;
          filteredResult = JSON.parse(JSON.stringify(result).replace(regex, Config.feDomain));
          if (paging && !filteredResult._paging) {
            filteredResult._paging = paging;
          }
        }

        if (cacheConfig && !result.error) {
          WPAPICache.set(route, filteredResult, cacheConfig.ttl);
        }
        return filteredResult;
      });
    },
  },
});

WP.menus = WP.registerRoute('menus/v1', '/menus/(?P<id>[a-zA-Z(-]+)');
WP.sidebar = WP.registerRoute('wp/v2', '/sidebar/(?P<id>[a-zA-Z0-9(-]+)');
WP.yoast = WP.registerRoute('yoast/v1', '/get_home_head');
WP.authors = WP.registerRoute('wp/v2', '/authors/');
WP.newsletterSubscriber = WP.registerRoute('newsletter', 'subscriber');
WP.rtaPosts = WP.registerRoute('wp/v2/posts', '/rta', {
  params: ['before', 'after', 'category', 'post'],
});
WP.adverts = WP.registerRoute('adverts', 'config');

export const NextWP = new WPAPI({ endpoint: getRelativePublicApiUrl() });
