// Loading newrelic first to allow it to instrument other modules e.g. express
/* eslint-disable global-require */
/* eslint-disable consistent-return */
const newrelic = require('newrelic');

const express = require('express');
const next = require('next');
const proxy = require('express-http-proxy');
const url = require('url');
const path = require('path');
const fs = require('fs');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, preserveLog: true });
const handle = app.getRequestHandler();
const NodeCache = require('node-cache');
const Config = require('./config');
const categoryPaths = require('./utils/redirects/category-redirects');

global.RouterCache = global.RouterCache || new NodeCache({ stdTTL: 60, checkperiod: 1 });
global.newrelic = newrelic;

/**
 * Log transaction to newrelic by path.
 *
 * @param {*} name transaction name
 * @param {*} queryParams query parameters {}
 * @param {*} req request object
 */
const logRequest = (name, queryParams, req) => {
  if (newrelic) {
    let attributes = {
      originalUrl: req && req.originalUrl,
    };
    if (queryParams) {
      attributes = {
        ...attributes,
        ...queryParams,
      };
    }
    newrelic.addCustomAttributes(attributes);
    newrelic.setTransactionName(name);
  }
};

app
  .prepare()
  .then(() => {
    /* eslint-disable no-useless-escape */
    const server = express();

    if (dev) {
      server.get('/demo/all-post-sections', (req, res) => {
        app.render(req, res, path.resolve('/_demo-pages/all-post-sections'));
      });
    }

    // Healthcheck
    server.get('/hc', (req, res) => {
      newrelic.setTransactionName('healthcheck');
      res.setHeader('content-type', 'text/plain');
      res.send('pong');
    });

    // Service Worker
    server.get('/sw.js', (req, res) => {
      app.serveStatic(req, res, path.resolve('./public/static/sw.js'));
    });

    // Manifest
    server.get('/manifest.json', (req, res) => {
      app.serveStatic(req, res, path.resolve('./public/static/manifest.json'));
    });

    // iOS well-known file
    server.get('/.well-known/apple-developer-merchantid-domain-association', (req, res) => {
      app.serveStatic(req, res, path.resolve('./public/static/.well-known/apple-developer-merchantid-domain-association.txt'));
    });

    // Middleware to remove trailing slash on URLs
    // eslint-disable-next-line no-shadow
    const trailingSlashCheck = (req, res, next) => {
      if (req.path.substr(-1) === '/' && req.path.length > 1) {
        const query = req.url.slice(req.path.length);
        newrelic.setTransactionName('redirect/remove-trailing-slash');
        res.redirect(301, req.path.slice(0, -1) + query);
      } else {
        next();
      }
    };
    server.use(trailingSlashCheck);

    // Load CMS Safe Redirects file
    // eslint-disable-next-line no-shadow, consistent-return
    const loadSafeRedirectsFile = (req, res, next) => {
      let redirects = global.RouterCache.get('srmRedirects');
      if (typeof redirects === 'undefined') {
        const rawRedirects = fs.readFileSync('srm-redirects.json');
        let srmRedirects = [];
        try {
          srmRedirects = JSON.parse(rawRedirects);
        } catch (e) {
          // json not correctly parsed.
        }
        const topicRedirects = fs.readFileSync('utils/redirects/topic-redirects.json');
        redirects = srmRedirects.concat(JSON.parse(topicRedirects));
        global.RouterCache.set('srmRedirects', redirects, 60);
      }
      if (Array.isArray(redirects)) {
        // eslint-disable-next-line no-restricted-syntax
        for (const redirect of redirects) {
          if (req.path === redirect.redirect_from) {
            return res.redirect(redirect.status_code, redirect.redirect_to);
          }
        }
      }
      next();
    };
    server.use(loadSafeRedirectsFile);

    // Define proxy method for certain paths like ads.txt, sitemaps, etc
    const apiProxy = proxy(Config.privateApiUrl.replace('/wp-json', ''), {
      proxyReqPathResolver: (req) => {
        newrelic.setTransactionName('proxy');
        newrelic.addCustomAttributes({ originalUrl: req && req.originalUrl });
        return url.parse(req.originalUrl).path;
      },
    });

    // 405 all POST requests to the FE server
    server.post('*', (req, res) => {
      res.send(405, 'Method Not Allowed');
    });

    // Proxy these paths
    server.use('*.txt', apiProxy);
    server.use('*.xml', apiProxy);
    server.use('/.well-known/*', apiProxy);
    server.use('/feed/', apiProxy);
    server.use('*/feed/', apiProxy);
    server.use('*/feed/*', apiProxy);
    server.use('*/ia_markup$', apiProxy);

    // Redirect bad mustache-template paths
    server.get(/(.+)\/%7B%7B.+%7D%7D/i, (req, res) => {
      newrelic.setTransactionName('redirect/mustache-template-paths');
      res.redirect(301, `${req.params[0]}`);
    });

    // Redirect */rss to */feed
    server.get(/(.+)\/rss/i, (req, res) => {
      newrelic.setTransactionName('redirect/rss-to-feed');
      res.redirect(301, `${req.params[0]}/feed`);
    });

    // Redirect Routes based on old migration paths
    categoryPaths.forEach((catPath) => {
      const pattern = `^\/(${catPath})$`;
      const rePattern = new RegExp(pattern);
      server.get(rePattern, (req, res) => {
        newrelic.setTransactionName('redirect/legacy-migration-paths');
        res.redirect(301, `/category/${req.params[0]}`);
      });
    });

    // Newsletter redirect
    server.get('/newsletter', (req, res) => {
      newrelic.setTransactionName('redirect/newsletter');
      res.redirect(301, 'https://cb.sailthru.com/join/6i4/signup');
    });

    server.get('/subscriptions', (req, res) => {
      newrelic.setTransactionName('redirect/subscriptions');
      res.redirect(301, 'https://inews.co.uk/subscribe');
    });

    // Preview route
    const previewRoute = (req, res) => {
      const queryParams = {
        id: req.params.id,
        revision: req.params.revision,
        type: req.params.type,
        token: req.query._token,

      };
      logRequest('preview', queryParams, req);
      app.render(req, res, '/preview', queryParams);
    };
    server.get('/preview/:type/:id/:revision?', previewRoute);

    // Redirect /author/*inews-co-uk to /author/*
    server.get(/author\/(.+)(?<!-)inews-co-uk/i, (req, res) => {
      newrelic.setTransactionName('redirect/remove-author-inews-co-uk');
      res.redirect(301, `/author/${req.params[0]}`);
    });

    // Puzzles Home page route
    const puzzlesPageRoute = (req, res) => {
      logRequest('puzzles', null, req);
      app.render(req, res, '/puzzles', {});
    };
    server.get('/puzzles', puzzlesPageRoute);

    // Puzzles categroy page route
    const puzzlesCategoryRoute = (req, res) => {
      const queryParams = { slug: req.params[0].split('/').filter(Boolean).pop() };
      logRequest('buzzles', queryParams, req);
      app.render(req, res, '/puzzles-category', queryParams);
    };
    server.get(/^\/puzzles-category\/([a-z0-9_\-\/]+)/i, puzzlesCategoryRoute);

    // Single puzzles route
    const puzzlesSingleRoute = (req, res) => {
      const queryParams = {
        type: req.params.type,
        year: req.params.year,
        month: req.params.month,
        day: req.params.day,
      };
      logRequest('puzzles-single', queryParams, req);
      app.render(req, res, '/puzzle', queryParams);
    };
    server.get('/puzzles/:type([a-z-0-9]{1,})/:year([0-9]{4,4})-:month([0-9]{2,2})-:day([0-9]{2,2})', puzzlesSingleRoute);

    // Author Route
    const authorRoute = (req, res) => {
      const queryParams = { slug: req.params.slug };
      logRequest('author', queryParams, req);
      app.render(req, res, '/author', queryParams);
    };
    server.get('/author/:slug', authorRoute);

    // Topic/tag Route
    const topicRoute = (req, res) => {
      const queryParams = { slug: req.params.slug };
      logRequest('topic', queryParams, req);
      app.render(req, res, '/topic', queryParams);
    };
    server.get('/topic/:slug', topicRoute);

    // Legacy /tag Route
    server.get('/tag/:slug', (req, res) => {
      newrelic.setTransactionName('redirect/tag-to-topic');
      res.redirect(301, req.url.replace('/tag/', '/topic/'));
    });

    // Category Route
    const categoryRoute = (req, res) => {
      const queryParams = { slug: req.params[0].split('/').filter(Boolean).pop() };
      logRequest('category', queryParams, req);
      app.render(req, res, '/category', queryParams);
    };
    server.get(/^\/category\/([a-z0-9_\-\/]+)/i, categoryRoute);

    // Google Custom Search Results
    const searchRoute = (req, res) => {
      const queryParams = { slug: req.params.slug };
      logRequest('search', queryParams, req);
      app.render(req, res, '/search', queryParams);
    };
    server.get(/^\/search$/i, searchRoute);

    // Year Sitemap Route (used for sitemaps)
    const yearSitemapRoute = (req, res) => {
      const queryParams = { slug: req.params.slug };
      logRequest('year', queryParams, req);
      app.render(req, res, '/year', queryParams);
    };
    server.get('/year/:slug([0-9]{4,4})', yearSitemapRoute);

    // Topic Sitemap
    const topicSitemapRoute = (req, res) => {
      const queryParams = { page: req.params.page };
      logRequest('sitemap/topics/page', queryParams, req);
      app.render(req, res, '/sitemap-topics', queryParams);
    };
    server.get('/sitemap/topics/page/:page([0-9]{1,})', topicSitemapRoute);

    // Sitemap Route
    const sitemapRoute = (req, res) => {
      logRequest('sitemap', null, req);
      app.render(req, res, '/sitemap', {});
    };
    server.get('/sitemap', sitemapRoute);

    // Piano management page
    const myAccountRoute = (req, res) => {
      logRequest('my-account', null, req);
      app.render(req, res, '/my-account', {});
    };
    server.get('/my-account', myAccountRoute);

    // Piano password Reset
    const resetPasswordRoute = (req, res) => {
      logRequest('reset-password', null, req);
      app.render(req, res, '/reset-password', {});
    };
    server.get('/reset-password', resetPasswordRoute);

    // Middleware to redirect legacy paged routes e.g.
    // https://inews.co.uk/tag/mothers-day/page/2
    // https://inews.co.uk/author/conrad-landin/page/8
    // https://inews.co.uk/news/politics/budget/page/2
    // eslint-disable-next-line no-shadow
    const legacyPagedRouteCheck = (req, res, next) => {
      const match = req.path.match(/^(\/.+)(?:\/page\/\d{1,})\/?$/);
      if (match) {
        newrelic.setTransactionName('redirect/legacy-paged-route');
        res.redirect(301, match[1]);
      } else {
        next();
      }
    };
    server.use(legacyPagedRouteCheck);

    // Post Route
    const postRoute = (req, res) => {
      const queryParams = { slug: req.params[0], postID: req.params[1] };
      logRequest('post', queryParams, req);
      app.render(req, res, '/post', queryParams);
    };
    server.get(/^\/(?:[a-z0-9\-]+\/)+([[a-z0-9\-\/]+]?[a-z0-9\-])\-(\d{3,})\/?$/, postRoute);

    // Legacy atttachment route route
    const legacyPostAttachmentRoute = (req, res) => {
      const queryParams = { slug: req.params[0], postID: req.params[1] };
      logRequest('legacy/post/attachment', queryParams, req);
      app.render(req, res, '/post', queryParams);
    };
    server.get(/^\/(?:[a-z0-9\-]+\/)+([[a-z0-9\-\/]+]?[a-z0-9\-])\-(\d{3,})\/attachment\/*/i, legacyPostAttachmentRoute);

    // Legacy post route with no Post ID. Will just lookup by slug by forcing a failure on ID lookup
    const legacyPostRoute = (req, res) => {
      const queryParams = { slug: req.params[0], postID: 0 };
      logRequest('legacy/post', queryParams, req);
      app.render(req, res, '/post', queryParams);
    };
    server.get(/^\/(?:[a-z0-9\-]+\/)+([[a-z0-9\-\/]+]?[a-z0-9\-])?$/, legacyPostRoute);

    // Page Route
    const pageRoute = (req, res) => {
      const queryParams = { slug: req.params[0] };
      logRequest('page', queryParams, req);
      app.render(req, res, '/page', queryParams);
    };
    server.get(/^\/([a-z0-9\-]+)\/?$/i, pageRoute);

    // Fallback for ?p=ID calls
    const fallbackPostIdRoute = (req, res, nextRoute) => {
      if ('p' in req.query && req.query.p) {
        const postId = req.query.p.replace(/\D/g, '');
        const queryParams = { slug: 'unknown', postID: postId };
        res.set('X-Robots-Tag', 'noindex');
        logRequest('fallback/post', queryParams, req);
        app.render(req, res, '/post', queryParams);
      } else {
        nextRoute();
      }
    };
    server.get('/', fallbackPostIdRoute);

    // homePage Route
    const homePageRoute = (req, res) => {
      newrelic.setTransactionName('home');
      app.render(req, res, '/');
    };
    server.get('/', homePageRoute);

    // Default route handler
    server.get('*', (req, res) => {
      newrelic.setTransactionName('default-handler');
      handle(req, res);
    });

    server.listen(3333, (err) => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`> Ready on ${Config.feDomain}`);
    });
  })
  .catch((ex) => {
    // eslint-disable-next-line no-console
    console.error(ex.stack);
    process.exit(1);
  });
