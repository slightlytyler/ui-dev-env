const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const webpack = require("webpack");

const ROOT = path.resolve(__dirname, ".");

module.exports = (env = {}) => {
  const port = env.port || "3000";
  return {
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    entry: path.resolve(ROOT, "base/main.js"),
    output: {
      path: path.resolve(ROOT, "dist"),
      filename: "bundle.js"
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(ROOT, "base/index.html")
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: "babel-loader"
        }
      ]
    },
    devServer: {
      host: "0.0.0.0",
      public: `localhost:${port}`,
      noInfo: false,
      port,
      quiet: false,
      stats: {
        assets: false,
        children: false,
        chunks: false,
        chunkModules: false,
        colors: true,
        entrypoints: false,
        hash: false,
        modules: false,
        timings: false,
        version: false
      }
    }
  };
};
