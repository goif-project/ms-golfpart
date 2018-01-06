const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpack = require('webpack')
const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin')
const appDir = path.resolve(__dirname, 'src')
const buildDir = path.resolve(__dirname, 'dist')

module.exports = {
  context: appDir,

  entry: {
    // key名がコンパイル後のファイル名
    bundle:   './js/app.js',
  },
  output: {
    path: buildDir,
    filename: 'js/bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015']
        },
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
  			test: /\.styl$/,
        loader: ['style-loader','css-loader','stylus-loader'],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
      },
    ],
  },

  plugins: [
    new htmlWebpackPlugin({
      title:    'page1',
      filename: 'index.html',
      template: './pug/index.pug'
    }),
    new htmlWebpackPlugin({
      title:    'page2',
      filename: 'page2.html',
      template: './pug/page2.pug'
    }),
    new htmlWebpackPlugin({
      title:    'page3',
      filename: 'page3.html',
      template: './pug/page3.pug'
    }),
    /*
    new htmlWebpackPlugin({
      title: 'AGO',
      filename: 'ago.html',
      template: './pug/ago.pug'
    }),
    new htmlWebpackPlugin({
      title: 'AWAKE - Hello',
      filename: 'hello.html',
      template: 'hello.pug'
    }),
    new htmlWebpackPlugin({
      title: 'AWAKE - World',
      filename: 'world.html',
      template: 'world.pug'
    })
    */
  ],

  devtool: 'source-map',
  devServer: {
    contentBase: 'ms/',
    port: 3000,
    inline: true,
    historyApiFallback: true,
    clientLogLevel: "info",
    stats: { colors: true }
  }
};
