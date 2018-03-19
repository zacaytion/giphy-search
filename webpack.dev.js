const merge = require('webpack-merge');
const common = require('./webpack.common');

module.exports = merge(common, {
  devtool: "cheap-module-eval-source-map",
  devServer: {
    hot: true,
    port: 3000,
    compress: true,
    overlay: true,
    proxy: {
      "/giphy": {
        target: "http://api.giphy.com/v1/gifs",
        pathRewrite: {
          '^/giphy': ''
        },
        "changeOrigin": true,
      }
    }
  }
});
