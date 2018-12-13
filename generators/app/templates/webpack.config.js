const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "<%= toolNameComputer %>",
    libraryTarget: "var"
  },
  optimization: {
    minimize: true
  }
};
