const webpack = require("webpack");

const isProduction = process.env.NODE_ENV === "production";

module.exports = {
  // Some plugins cause errors on the app, so use few plugins.
  // https://webpack.js.org/concepts/mode/#mode-production
  mode: isProduction ? "production" : "development",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.css$/,
        use: [{ loader: "vue-style-loader" }, { loader: "css-loader" }]
      }
    ]
  },
  plugins: isProduction
    ? [
        new MinifyPlugin(),
        new webpack.DefinePlugin({
          "process.env.NODE_ENV": JSON.stringify("production")
        }),
        new webpack.LoaderOptionsPlugin({
          minimize: true
        })
      ]
    : [],
  devtool: isProduction ? false : "#inline-source-map"
};
