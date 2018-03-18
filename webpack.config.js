const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
const tslintrc = require(path.resolve(__dirname, './tslint.json'));

module.exports =  {
  context: path.resolve(__dirname, "./src"),
  entry: ["babel-polyfill", path.resolve(__dirname, "./src/index.tsx")],
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
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].js",
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      inject: false,
      template: require('html-webpack-template'),
      appMountId: 'root',
      meta: [
        {
          name: 'GIPHY Search',
          content: 'Search GIPHY for your favorite GIFs'
        }
      ],
      lang: 'en-US',
      title: 'GIPHY Search'
    }),
    new ExtractTextPlugin({
      filename: 'styles/[name].[contenthash].css',
      disable: process.env.NODE_ENV !== 'production'
    }),
    new webpack.NamedModulesPlugin(),
    new FriendlyErrorsWebpackPlugin(),
    new HardSourceWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /src.*\.tsx?$/,
        enforce: "pre",
        exclude: /node_modules/,
        use: [
          {
            loader: "tslint-loader",
            options: {
              configuration: tslintrc,
            }
          }
        ]
      }, {
        test: /src.*\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader"
          },
          {
            loader: "awesome-typescript-loader",
            options: {
              reportFiles: [
                'src/**/*.{ts,tsx}'
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ["css-loader"]
        })
      }
    ]
  },
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts']
  }
};