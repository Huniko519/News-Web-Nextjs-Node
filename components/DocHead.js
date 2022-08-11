import React from 'react';
import PropTypes from 'prop-types';
import Head from 'next/head';
import parse from 'html-react-parser';
import stylesheet from '../src/styles/style.scss';
import { getStaticDomain, getRelativePublicApiUrl } from '../utils/URL';

const dev = process.env.NODE_ENV === 'development';

const DocHead = (props) => {
  const {
    post, tags, authors, categories, yoastHead = '',
  } = props;
  let ampExtensions = [];
  let metaHead = yoastHead;
  const staticDomain = getStaticDomain();

  // Page and Post routes
  if (post) {
    if (post.amp_libraries) {
      ampExtensions = post.amp_libraries.map((amp_library) => (
        <script async custom-element={amp_library.extension} src={amp_library.src} key={`amp-extension-${amp_library.extension}`} />
      ));
    }

    if (!metaHead) {
      metaHead = post.yoast_head ?? '';
    }
  }

  // Author route
  if (authors) {
    if (!metaHead) {
      metaHead = authors[0].yoast_head ?? '';
    }
  }

  // Taxonomy route
  if (categories) {
    if (!metaHead) {
      metaHead = categories[0].yoast_head ?? '';
    }
  }

  // post_tag (topics) route
  if (tags) {
    if (!metaHead) {
      metaHead = tags[0].yoast_head ?? '';
    }
  }

  const publicDomain = getRelativePublicApiUrl().replace('/wp-json', '');
  return (
    <>
      <Head>
        <meta charSet="utf-8" />

        {
          /* Parses and outputs the HTML blob returned from yoast_head in api responses */
          parse(metaHead, {
            /* eslint-disable consistent-return */
            replace: (node) => {
              // If on a post, override the canonical / og:url to ensure they are the post link
              if (post) {
                if (node.name === 'link' && node.attribs && node.attribs.rel === 'canonical') {
                  return (
                    <link rel="canonical" href={post.link} />
                  );
                }

                if (node.name === 'meta' && node.attribs && node.attribs.property === 'og:url') {
                  return (
                    <meta property="og:url" content={post.link} />
                  );
                }
              }
            },
          })
        }

        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#CF351C" />
        <meta name="facebook-domain-verification" content="vaoxc026a7iafo2hxnjnxl48c32gpb" />

        {/* Favicons and app icons */}
        <link rel="icon" type="image/png" href={`${staticDomain}/images/favicon/16x16.png`} sizes="16x16" />
        <link rel="icon" type="image/png" href={`${staticDomain}/images/favicon/32x32.png`} sizes="32x32" />
        <link rel="icon" type="image/png" href={`${staticDomain}/images/favicon/96x96.png`} sizes="96x96" />
        <link rel="apple-touch-icon" href={`${staticDomain}/images/favicon/192x192.png`} />

        {/* DNS Preconnects & Preload */}
        <link rel="preload" href={`//${dev ? 'inewsint.co.uk' : 'inews.co.uk'}/geo/locationjson-v1.3.html`} as="fetch" />
        <link rel="preload" as="script" href="//www.googletagservices.com/tag/js/gpt.js" />
        <link rel="preconnect" href="//securepubads.g.doubleclick.net" />
        <link rel="preconnect" href="//cdn.ampproject.org" />

        <link rel="preconnect" href="//static.inews.co.uk" />
        <link rel="preconnect" href="//cmp.dmgmediaprivacy.co.uk" crossOrigin="use-credentials" />
        <link rel="preconnect" href="//c.amazon-adsystem.com" crossOrigin="true" />
        <link rel="preconnect" href="//ib.adnxs.com" crossOrigin="true" />
        <link rel="preconnect" href="//as-sec.casalemedia.com" crossOrigin="true" />
        <link rel="preconnect" href="//fastlane.rubiconproject.com" crossOrigin="true" />
        <link rel="preconnect" href="//search.spotxchange.com" crossOrigin="true" />
        <link rel="preconnect" href="//bidder.criteo.com" crossOrigin="true" />
        <link rel="preconnect" href="//cdn.permutive.com" />
        <link rel="preconnect" href="//cdn.taboola.com" />
        <link rel="preconnect" href="//gs.inews.com" />
        <link rel="preconnect" href="//imasdk.googleapis.com" />
        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preload" as="style" href="https://fonts.googleapis.com/css?family=Red+Hat+Display:ital,wght@0,500;0,700;1,500;1,700;%7CBitter:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900;%7CSource+Serif+Pro:ital,wght@0,400;0,700;1,400;1,700;&display=swap" />

        <style
          /* The onLoad inside of the Head component is butchered by next.js for whatever reason.

          The below is a "fix" mentioned on an issue on the next.js repo:
          https://github.com/vercel/next.js/issues/12984#issuecomment-809885692

          Note that the redundant <style> tags are stripped from the output. */
          dangerouslySetInnerHTML={{
            __html: `</style>
                <link
                  rel="stylesheet"
                  href="https://fonts.googleapis.com/css?family=Red+Hat+Display:ital,wght@0,500;0,700;1,500;1,700;%7CBitter:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900;%7CSource+Serif+Pro:ital,wght@0,400;0,700;1,400;1,700;&display=swap"
                  media="print"
                  onload="this.media = 'all';"
                />
                <style>`,
          }}
        />

        {/* AMP libraries. Both global and per page */}
        <script async src="https://cdn.ampproject.org/v0.js" />
        <script async custom-element="amp-sidebar" src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js" />
        <script async custom-element="amp-form" src="https://cdn.ampproject.org/v0/amp-form-0.1.js" />
        <script async custom-element="amp-bind" src="https://cdn.ampproject.org/v0/amp-bind-0.1.js" />
        <script async custom-element="amp-position-observer" src="https://cdn.ampproject.org/v0/amp-position-observer-0.1.js" />
        <script async custom-element="amp-animation" src="https://cdn.ampproject.org/v0/amp-animation-0.1.js" />
        {post
          && (
            <script async custom-element="amp-social-share" src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js" />
          )}
        {!post
          && (
            <>
              <script async custom-element="amp-list" src="https://cdn.ampproject.org/v0/amp-list-0.1.js" />
              <script async custom-template="amp-mustache" src="https://cdn.ampproject.org/v0/amp-mustache-0.2.js" />
            </>
          )}

        {ampExtensions}

        { /* Privacy Policy styles */}
        {post && post.slug === 'privacy-policy'
          && (
            <link rel="stylesheet" href={`${publicDomain}/wp-content/plugins/privacy/dmg-privacy-policy.css`} />
          )}

      </Head>
      { /* Privacy Policy script */}
      {post && post.slug === 'privacy-policy' && (
        <script src={`${publicDomain}/wp-content/plugins/privacy/dmg-privacy-policy.js`} />
      )}

      {<style global jsx>{stylesheet}</style>}
    </>
  );
};

DocHead.propTypes = {
  post: PropTypes.objectOf(PropTypes.any),
  tags: PropTypes.arrayOf(PropTypes.any),
  categories: PropTypes.arrayOf(PropTypes.any),
  authors: PropTypes.arrayOf(PropTypes.any),
  yoastHead: PropTypes.string,
};

DocHead.defaultProps = {
  post: null,
  tags: null,
  categories: null,
  authors: null,
  yoastHead: '',
};

export default DocHead;
