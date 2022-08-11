const path = require('path');
const glob = require('glob');
const sourceMapSupport = require('source-map-support');
const { readFileSync } = require('fs');
const styledJSX = require('styled-jsx/webpack');

if (process.env.NODE_ENV !== 'production') {
  /**
   * Ensuring Sourcemaps for SSR
   *
   * @see https://github.com/zeit/next.js/issues/5307
   */
  const { relative, basename } = path;

  sourceMapSupport.install({
    retrieveSourceMap(source) {
      if (source.indexOf('.next') > -1) {
        const rel = relative(process.cwd(), source);
        const mapPath = `${rel}.map`;
        return {
          url: basename(rel),
          map: readFileSync(mapPath, 'utf8'),
        };
      }
      return null;
    },
  });
}

// next.config.js
module.exports = {
  webpack: (config) => {
    config.module.rules.push(
      {
        test: /\.(css|scss)/,
        loader: 'emit-file-loader',
        options: {
          name: 'dist/[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        use: ['babel-loader', 'postcss-loader'],
      },
      {
        test: /\.s(a|c)ss$/,
        use: [
          'babel-loader',
          {
            loader: styledJSX.loader,
            options: {
              // eslint-disable-next-line no-bitwise
              type: (fileName) => ((~fileName.indexOf('src/styles/components')) ? 'scoped' : 'global'),
            },
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              prependData: `$fe-domain: '${process.env.INEWS_FE_DOMAIN}';`,
              sassOptions: {
                includePaths: ['styles', 'node_modules']
                  .map((d) => path.join(__dirname, d))
                  .map((g) => glob.sync(g))
                  .reduce((a, c) => a.concat(c), []),
              },
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'react-svg-loader',
            options: {
              svgo: {
                plugins: [
                  { removeViewBox: false },
                ],
              },
            },
          },
        ],
      },
    );
    return config;
  },
  experimental: {
    amp: {
      skipValidation: true,
      optimizer: {
        transformations: [
          // Adds missing AMP tags
          'AddMandatoryTags',
          // Optional Markdown compatibility
          // needs to run before ServerSideRendering
          'Markdown',
          // Adds missing AMP extensions
          'AutoExtensionImporter',
          // Applies image optimizations, must run before PreloadHeroImage
          'OptimizeImages',
          // Detect hero image and preload link rel=preload
          'PreloadHeroImage',
          // Removes the boilerplate
          // needs to run after ServerSideRendering
          'AmpBoilerplateTransformer',
          // Optimizes script import order
          // needs to run after ServerSideRendering
          'ReorderHeadTransformer',
          // needs to run after ReorderHeadTransformer
          'RewriteAmpUrls',
          'GoogleFontsPreconnect',
          'PruneDuplicateResourceHints',
          // Move keyframes into a separate style tag
          'SeparateKeyframes',
          'AddTransformedFlag',
          // Removes unsupported nonce attribute from scripts
          'RemoveCspNonce',
          // Minifies HTML, JSON, inline amp-script
          'MinifyHtml',
          // Inject CSP script has required for inline amp-script
          // needs to run after MinifyHtml which changes the inline script
          'AmpScriptCsp',
          // Removes the AMP attibute from the html element
          'RemoveAmpAttribute',
        ],
      },
    },
  },
};
