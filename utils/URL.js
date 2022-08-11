import Config from '../config';

export const queryParams = () => {
  const params = {};
  window.location.search.substr(1).split('&').filter((a) => a).forEach((searchParam) => {
    const keyval = searchParam.split('=');
    if (keyval[0]) {
      params[(decodeURIComponent(keyval[0]))] = keyval[1] && decodeURIComponent(keyval[1]);
    }
  });
  return params;
};


export const getStaticDomain = () => {
  let staticDomain = 'http://localhost:3333/static';

  // Allow for manual setting of the domain
  if (Config.staticDomain) {
    staticDomain = Config.staticDomain;
    // Or just assume it is a subdomain named, static
  } else if (Config.feDomain && Config.feDomain !== 'http://localhost:3333') {
    const url = new URL(Config.feDomain);
    staticDomain = `${url.protocol}//static.${url.host}`;
  }

  return staticDomain;
};

export const getRelativePublicApiUrl = () => Config.publicApiUrl.match(/https?:(\/\/.+)/)[1];
