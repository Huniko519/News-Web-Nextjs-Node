import React from 'react';
import Head from 'next/head';
import { version } from '../../package.json';
import { getStaticDomain } from '../../utils/URL';
import Config from '../../config';

const prod = Config.feDomain === 'https://inews.co.uk';

const clientConfig = {
  logger: true,
  production: prod,
  domain: Config.feDomain.replace(/^https?:\/\//, ''),
  styles: [
    'https://fonts.googleapis.com/css2?family=Red+Hat+Display:ital,wght@0,500;0,700;1,500;1,700&display=swap',
    'https://fonts.googleapis.com/css2?family=Bitter:ital,wght@0,400;0,700;0,900;1,400;1,700;1,900&display=swap',
  ],
  dataset: {
    brand: {
      privacyPolicyUrl: 'https://inews.co.uk/privacy-policy',
      primaryVendor: {
        policyUrl: 'https://inews.co.uk/privacy-policy',
      },
      level1Heading: 'We and our partners process, store and/or access information on a device.',
      styles: {
        app: {
          fontFamily: 'Red Hat Display, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif',
          fontSize: '18px',
        },
        level1: {
          'background': '#ffffff',
          'color': '#000000',
          '& a': {
            'color': '#004db3',
            '&:hover': {
              color: '#004db3',
            },
          },
        },
        level1Heading: {
          color: '#000000',
          fontFamily: 'Bitter, Georgia, serif',

        },
        level2Heading: {
          fontFamily: 'Bitter, Georgia, serif',

        },
        level1PrimaryButton: {
          'fontFamily': 'Red Hat Display, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif',
          'background': '#1370fb',
          'color': '#ffffff',
          'border': '0',
          '&:hover': {
            background: '#1370fb',
          },
        },
        level1SecondaryButton: {
          'fontFamily': 'Red Hat Display, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif',
          'background': '#e3e3e3',
          'border': '0',
          'color': '#000000',
          'fontWeight': 400,
          '&:hover': {
            background: '#e3e3e3',
          },
        },
        level2PrimaryButton: {
          'fontFamily': 'Red Hat Display, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif',
          'background': '#1370fb',
          'color': '#ffffff',
          'border': '0',
          '&:hover': {
            background: '#1370fb',
          },
        },
        level2SecondaryButton: {
          'fontFamily': 'Red Hat Display, Segoe UI, Roboto, Oxygen-Sans, Ubuntu, Cantarell, Helvetica Neue, sans-serif',
          'background': '#ffffff',
          'border': '0',
          'color': '#07387f',
          'fontWeight': 400,
          '&:hover': {
            background: '#ffffff',
          },
        },
        purposesListItem: {
          '&::before': {
            backgroundColor: '#1370fb',
            color: '#ffffff',
          },
        },

      },

    },
  },
};

const AmpConsentGeo = () => {
  const tcfv2Version = '0.0.30';

  const config = {
    consentInstanceId: 'inews_cmp_consent_v2.1',
    exposesTcfApi: true,
    consentRequired: false,
    uiConfig: {
      overlay: true,
    },
    geoOverride: {
      us: {
        consentRequired: 'remote',
        checkConsentHref: 'https://cmp.dmgmediaprivacy.co.uk/amp/v1/check-consent/',
        promptUISrc: `${getStaticDomain()}/amp/ccpa/1.1.1/index.html?version=${version}`,
      },
      tcfv2: {
        consentRequired: true,
        promptUISrc: `https://cmp.dmgmediaprivacy.co.uk/amp/tcfv2/${tcfv2Version}/index.html?cid=CLIENT_ID`,
        clientConfig,
      },
    },
  };

  const geos = {
    ISOCountryGroups: {
      tcfv2: [
        'at', 'be', 'bg', 'ch', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi', 'fr', 'gb', 'gr', 'hr', 'hu', 'ie', 'is', 'it', 'li', 'lt', 'lu', 'lv', 'mt', 'nl', 'no', 'pl', 'pt', 'ro', 'se', 'si', 'sk', 'uk', 'unknown', 'br',
      ],
      us: [
        'us',
      ],
    },
  };

  return (
    <>
      <Head>
        <script async custom-element="amp-geo" src="https://cdn.ampproject.org/v0/amp-geo-0.1.js" />
        <script async custom-element="amp-consent" src="https://cdn.ampproject.org/v0/amp-consent-0.1.js" />
      </Head>
      <amp-geo layout="nodisplay">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(geos) }}
        />
      </amp-geo>
      <amp-consent layout="nodisplay" id="inews-consent">
        <script
          type="application/json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(config) }}
        />
      </amp-consent>
    </>

  );
};

export default AmpConsentGeo;
