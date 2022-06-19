const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = {
  /** Development tools section */
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, './dist'),
    },
    open: true,
    port: 9000,
  },

  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[hash]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TODO List',
      template: './src/index.html',
    }),
    new NodePolyfillPlugin(),
  ],
};
