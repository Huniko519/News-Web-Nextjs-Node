const path = require('path');

module.exports = {
  mode: 'development',
  watch: true,
  entry: ['./client.js'],
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'public/dev'),
    filename: 'client.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['next/babel'],
          },
        },
      }, {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Transform postcss syntax
          'postcss-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ],
      },
    ],
  },
};
