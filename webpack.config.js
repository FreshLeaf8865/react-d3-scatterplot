const path = require('path');
const webpack = require('webpack');
const validate = require('webpack-validator');
const APP_FOLDER = 'app';
const INIT_FILE = 'index.js';
const BUILD_DIR = 'build';

const config = {
  entry: {
        app: path.join(__dirname, APP_FOLDER, INIT_FILE)
  },
  output: {
    path: path.join(__dirname, BUILD_DIR),
    filename: 'bundle.js'
  },
  devServer: {
    historyApiFallback: true,
    inline: true,
    host: 'localhost',
    port:8080,
    contentBase: __dirname + '/build',
  },
  watchOptions: {
    aggregateTimeout: 100,
    poll: 100
  },
  watch:true,
  devtool: 'eval-source-map',
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: path.join(__dirname, APP_FOLDER)
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'postcss', 'sass']
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react'],
          plugins: ['syntax-object-rest-spread']
        }
      }
    ]
  },
  resolve: {
    root: [
      path.join(__dirname, APP_FOLDER)
    ],
    modulesDirectories: [
      'node_modules'
    ],
    extensions: ['', '.js', '.jsx']
  },
  postcss: function() {
    return [require('autoprefixer')];
  }
};

module.exports = validate(config);
