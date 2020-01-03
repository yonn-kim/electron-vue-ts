// Copyright (c) 2015-2016 Yuya Ochiai
// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

// This files uses CommonJS.
/* eslint-disable import/no-commonjs */
"use strict";

const path = require("path");

const merge = require("webpack-merge");

const base = require("./webpack.config.base");

module.exports = merge(base, {
  entry: "./src/index.ts",
  output: {
    path: path.join(__dirname, "../dist/"),
    filename: "[name]_bundle.js"
  },
  node: {
    __filename: true,
    __dirname: true
  },
  target: "electron-main"
});

/* eslint-enable import/no-commonjs */