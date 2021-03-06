//var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; --use upon completion of react app to optimize
var path = require ('path');
var webpack = require ('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
  entry: [
    './src/plantpi/reactjs/index.js'
  ],
  output: {
    path: path.resolve(__dirname, './static/bundles/'),
    filename: '[name]-[hash].js'
  },
  plugins: [
    new BundleTracker({filename: './webpack-stats.json'}),
    /*new BundleAnalyzerPlugin({
      analyzerMode: 'static'
    }),*/
  ],
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: 'babel-loader',
      query: {
        presets: ['react', 'es2015', 'stage-1']
      }
    }]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  }
};