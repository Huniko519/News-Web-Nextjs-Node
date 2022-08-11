/* eslint-disable global-require */
module.exports = {
  plugins: [
    require('postcss-easy-import')({
      prefix: '_',
    }), // keep this first
    require('postcss-custom-media'),
    require('postcss-replace')({
      data: {
        starSymbol: '★',
      },
    }),
    require('autoprefixer')({}),
    require('postcss-discard-comments')({
      removeAll: true,
    }),
    require('cssnano'),
  ],
};
