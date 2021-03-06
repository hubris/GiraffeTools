const path = require('path');
const webpack = require('webpack');
const BundleTracker = require('webpack-bundle-tracker');
const fs = require('fs');

module.exports = {
  context: __dirname,
  entry: {
    porcupine: path.resolve(__dirname, '../app/porcupine/js/index.js'),
  },

  output: {
    path: path.resolve(__dirname, '../app/assets/webpack_bundles'),
    filename: '[name]-[hash].js'
  },

  performance: {
    hints: process.env.NODE_ENV === 'production' ? 'warning': false
  },
  stats: {
    children: false,
  },
  plugins: [
    new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery',
        'window.jQuery': 'jquery',
        Popper: ['popper.js', 'default'],
      }),
  ],
  module: {
  rules: [
    {
      test: /\.(js|jsx)$/, // Transforms JSX and JS
      exclude: /node_modules/,
      use: {
        loader: "babel-loader",
        query: {
          "presets": [ 'es2015', 'react', 'stage-2' ]
        }
      }
    }]
  }
};
