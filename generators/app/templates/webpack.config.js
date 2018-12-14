const path = require('path');
const webpack = require('webpack'); //to access built-in plugins

module.exports = {
  mode: "production",
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    library: "<%= toolNameCamel %>",
    libraryTarget: "var"
  },
  optimization: {
    minimize: true
  },
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: [
            ['@babel/preset-env'],
          ]
        }
      }

    }, {
      test: /\.html$/,
      use: [{
        loader: 'raw-loader'
      }],
    }, {
      test: /\.css$/,
      use: ['css-loader'],
    }]
  }
};
