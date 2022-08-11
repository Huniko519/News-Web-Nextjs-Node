/* Defaults are needed for `next build` to functon as expected.
 * Not the biggest fan of this as it's one step back.
 *
 * Defaults are nonsense to a) easily spot an issue on int and b)
 * because the real vars are passed in during docker build steps
 * or in local start commands.
 *
 * @todo: Remove with the defaults
 */
const Config = {
  feDomain: process.env.INEWS_FE_DOMAIN || 'http://localhost',
  privateApiUrl: 'https://inews-preprod.go-vip.net/wp-json',
  publicApiUrl: 'https://inews-preprod.go-vip.net/wp-json',
};

// Pass in a static domain override if it exists
if (process.env.INEWS_STATIC_DOMAIN) {
  Config.staticDomain = process.env.INEWS_STATIC_DOMAIN;
}

// Pass in standalone FE variables if we're not on production
if (
  process.env.NODE_ENV !== 'production'
  && process.env.INEWS_FE_STANDALONE
  && process.env.INEWS_FE_STANDALONE === '1'
  && process.env.INEWS_FE_DOMAIN_REGEX_REPLACE
) {
  Config.feStandalone = true;
  Config.feDomainRegexReplace = process.env.INEWS_FE_DOMAIN_REGEX_REPLACE;
}

module.exports = Config;
