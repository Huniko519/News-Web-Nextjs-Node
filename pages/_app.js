import React from 'react';
import PropTypes from 'prop-types';
import NextApp from 'next/app';
import NextHead from 'next/head';
import Body from '../components/Body';
import { WP } from '../utils/wpapi';
import ErrorPage from './_error';
import Config from '../config';
import PageContext from '../components/PageContext';
import NewrelicBrowserScript from '../components/analytics/newrelic/NewrelicBrowserScript';
import { getPageDataFromProps, removeApiLinks } from '../utils/pageData';
import { version } from '../package.json';
import { getStaticDomain } from '../utils/URL';
import { newsletterLists, getEmailList, getEmailListByClassName } from '../components/newsletters/EmailUtils';
import RakutenGlobalScript from '../components/rakuten/RakutenGlobalScript';

const dev = process.env.NODE_ENV === 'development';

const App = ({ Component, pageProps }) => {
  // Reset the global deduping
  global.dedupedPostIDs = [];
  global.dedupedSidebarPostIDs = [];

  // Generate pageData object used for Ads
  const pageData = getPageDataFromProps(pageProps);

  // Define the base props we'll output as window.PageContext on the client side
  const windowProps = {
    publicApiUrl: Config.publicApiUrl,
    router: pageProps.router,
    pageData,
  };

  // Add contexual props to window.PageContext for each route
  if (!pageProps.isError) {
    switch (pageProps.router.pathname) {
      case '/post':
      case '/page':
        windowProps.post = { ...pageProps.post };
        removeApiLinks(windowProps.post);
        delete windowProps.post.yoast_head;
        break;
      case '/category':
        windowProps.categories = [];
        windowProps.categories.push({ ...pageProps.categories[0] });
        removeApiLinks(windowProps.categories[0]);
        delete windowProps.categories[0].yoast_head;
        break;
      case '/topic':
        windowProps.tags = [];
        windowProps.tags.push({ ...pageProps.tags[0] });
        removeApiLinks(windowProps.tags[0]);
        delete windowProps.tags[0].yoast_head;
        break;
      case '/author':
        windowProps.authors = [];
        windowProps.authors.push({ ...pageProps.authors[0] });
        removeApiLinks(windowProps.authors[0]);
        delete windowProps.authors[0].yoast_head;
        break;
      default:
    }
  }

  if (pageProps.isError) {
    if (dev) {
      windowProps.error = pageProps.error;
    } else {
      // Output a reduced/redacted version of the error object if we're not on dev
      const apiRoute = pageProps.error.wpapi ? pageProps.error.wpapi.replace(Config.privateApiUrl, '') : '';
      windowProps.error = { statusCode: pageProps.error?.statusCode, wpapi: apiRoute };
    }
  }

  const staticDomain = getStaticDomain();

  return (
    <PageContext.Provider value={{ ...pageProps, pageData }}>

      <Body>

        <NextHead>
          <NewrelicBrowserScript />
          <script
            type="application/javascript"
            dangerouslySetInnerHTML={{
              __html: `
                    window.PageContext=${JSON.stringify(windowProps)};
                    window.adverts = window.adverts || { config: ${JSON.stringify(pageProps.adsConfig || {})} };
                    window.newsletterLists = ${JSON.stringify(newsletterLists)};
                    window.getEmailList = ${getEmailList.toString()}
                    window.getEmailListByClassName = ${getEmailListByClassName.toString()}
                  `,
            }}
          />

          <RakutenGlobalScript />
        </NextHead>

        {pageProps?.error?.statusCode
          ? <ErrorPage {...pageProps} />
          : <Component {...pageProps} />}

        {/* Loading dailymotion player libs if not amp and post contains video */}
        {(pageProps.post && pageProps.post.featured_video) && (
          <><script type="text/javascript" async src="https://geo.dailymotion.com/libs/player/x7hlp.js" /></>
        )}

        <>
          <script type="text/javascript" async src={`${staticDomain}/cookies-util.js?version=${version}`} />
          <script type="text/javascript" async src={`${staticDomain}/newsletter-utils.js?version=${version}`} />
          <script type="text/javascript" async src={`${staticDomain}/inews-piano.js?version=${version}`} />
          <script
            async
            src={
                  dev ? `/dev/client.js?${Date.now()}`
                    : `${staticDomain}/client.js?version=${version}`
                }
          />
          <script
            dangerouslySetInnerHTML={{
              __html:
                    `
                  if ('serviceWorker' in navigator) {
                    window.addEventListener('load', function () {
                      navigator.serviceWorker.register('/sw.js').then(function (registration) {
                      }, function (err) {
                        console.log('ServiceWorker registration failed: ', err);
                      });
                    });
                  }
                `,
            }}
          />
        </>

      </Body>
    </PageContext.Provider>
  );
};

App.getInitialProps = async (appContext) => {
  // Fetching child InitialProps
  const appProps = await NextApp.getInitialProps(appContext);
  appProps.pageProps = {
    ...appProps.pageProps,
    dirtyAmp: true,
    isPreview: appContext.router.pathname === '/preview',
    isError: false,
    router: {
      query: appContext.router.query,
      pathname: appContext.router.pathname,
      asPath: appContext.router.asPath,
    },
  };

  // Querying for wp-json/adverts/config
  const adsConfig = await WP
    .adverts()
    .then((data) => data)
    .catch((err) => ({
      error: {
        statusCode: 502,
        message: err,
      },
    }));

  // Check for ads config error and pass to new relic
  if (adsConfig.error) {
    const message = `${adsConfig.error?.message || 'Unknown API Error'} - wp-json/adverts/config`;

    const errorData = new Error(message);
    errorData.name = 'InternalApiError';

    global.newrelic.noticeError(errorData);

    appProps.pageProps.error = adsConfig.error;
  } else {
    appProps.pageProps.adsConfig = adsConfig;
  }

  // If post contains ads_control=true then unset slot definitions
  if (appProps.pageProps?.post?.ads_control) {
    adsConfig.adsDescriptions = {};
  }

  // Querying for menu data
  const allMenus = await WP
    .menus()
    .id('all')
    .then((data) => data)
    .catch((err) => ({
      error: {
        statusCode: 502,
        wpapi: WP.menus().id('all').toString(),
        message: err,
      },
    }));

  // Adding menu data or error from menu query to pageProps
  if (allMenus.error) {
    appProps.pageProps.error = allMenus.error;
  } else {
    appProps.pageProps.allMenus = allMenus;
  }

  // If there's a user error with a statusCode set it as the response statusCode
  if (appProps?.pageProps?.error?.statusCode && appContext.ctx.res) {
    appProps.pageProps.isError = true;

    // eslint-disable-next-line no-param-reassign
    appContext.ctx.res.statusCode = appProps.pageProps.error.statusCode;

    let errorInitialProps = {};

    // process initialProps for ErrorPage to ensure our user error is passed into the page template accordingly.
    if (ErrorPage.getInitialProps) {
      errorInitialProps = await ErrorPage.getInitialProps({
        ...appContext.ctx,
        error: appProps.pageProps.error,
      });

      appProps.pageProps = {
        ...appProps.pageProps,
        ...errorInitialProps,
      };
    }
  }

  // Return our modified props
  return { ...appProps };
};

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default App;
