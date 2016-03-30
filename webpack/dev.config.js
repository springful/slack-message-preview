var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  devtool: "cheap-source-map",
  entry: [
    "./index.js"
  ],
  resolve: {
    root: path.resolve(__dirname, "../"),
    extensions: ["", ".js"],
    modulesDirectories: ["node_modules", "src"]
  },
  output: {
    path: path.join(__dirname, "../static"),
    publicPath: "/static",
    filename: "[name].js"
  },
  plugins: [
    new ExtractTextPlugin("[name].css", { allChunks: true }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: "babel",
        exclude: /node_modules/,
        query: {
          cacheDirectory: true,
          presets: ["es2015", "react"]
        }
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract("style", "css?modules&importLoaders=2&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss-loader?browsers=last 2 version!sass?outputStyle=expanded&sourceMap")
      }
    ]
  }
};
