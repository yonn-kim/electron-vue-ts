// Copyright (c) 2015-2016 Yuya Ochiai
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// This file uses CommonJS.
/* eslint-disable import/no-commonjs */
"use strict";

const path = require("path");

const merge = require("webpack-merge");

const base = require("./webpack.config.base");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require('copy-webpack-plugin');
const { VueLoaderPlugin } = require("vue-loader");

module.exports = merge(base, {
  entry: {
    renderer: "./src/renderer/index.ts"
  },
  output: {
    path: path.join(__dirname, "../dist/"),
    publicPath: "",
    filename: "[name]_bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "vue-style-loader" }, { loader: "css-loader" }]
      },
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
          options: {
            extractCSS: process.env.NODE_ENV === "production",
            loaders: {
              sass: "vue-style-loader!css-loader!sass-loader?indentedSyntax=1",
              scss: "vue-style-loader!css-loader!sass-loader",
              less: "vue-style-loader!css-loader!less-loader"
            }
          }
        }
      }
    ]
  },
  node: {
    __filename: true,
    __dirname: true
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({ filename: "css/[name].css" }),
    new CopyWebpackPlugin([
      {
        context: 'src/renderer',
        from: 'index.html',
        to: '../dist'
      },
      {
          context: 'static/html',
          from: '**/*',
          to: '../dist/html'
      },
      {
          context: 'static/js/library',
          from: '**/*',
          to: '../dist/js/library'
      },
      {
          context: 'static/js',
          from: '*',
          to: '../dist/js'
      },
      {
          context: 'static/css',
          from: '**/*',
          to: '../dist/css'
      },
      {
          context: 'static/img',
          from: '**/*',
          to: '../dist/img'
      }
  ]),
  ],
  resolve: {
    alias: {
      "@": path.join(__dirname, "../src/renderer"),
      vue$: "vue/dist/vue.esm.js"
    },
    extensions: [".js", ".vue", ".json", ".css", ".node", ".ts"]
  },
  target: "electron-renderer"
});
