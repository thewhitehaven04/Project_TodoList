const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  /** Development tools section */
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    server: 'https',
    static: {
      directory: path.join(__dirname, "./dist")
    },
    open: true
  },
  
  entry: 'index.js',
  output: {
    path: path.resolve(path(__dirname, "./dist")),
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[hash]',
    clean: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'TODO List', 
      template: './src/index.js',
    })
  ],
}