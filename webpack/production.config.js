var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: [
    "./index.js"
  ],
  resolve: {
    root: path.resolve(__dirname, "../"),
    extensions: ["", ".js"],
    modulesDirectories: ["node_modules", "src"]
  },
  output: {
    path: path.join(__dirname, "generated"),
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    library: ["SlackMessagePreview", "[name]"]
  },
  plugins: [
    new webpack.DefinePlugin({
      // To force React into knowing this is a production build.
      "process.env": { NODE_ENV: JSON.stringify("production") }
    }),
    new ExtractTextPlugin("[name]-[chunkhash].css", { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: { unused: true, dead_code: true }
    })
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
