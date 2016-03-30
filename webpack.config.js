var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  context: path.join(__dirname),
  entry: "./src/SlackMessagePreview.js",

  output: {
    path: path.join(__dirname, "./dist/"),
    filename: "index.js",
    library: "slack-message-preview",
    libraryTarget: "umd"
  },

  externals: {
    "react": "react",
    "react-dom": "react-dom"
  },

  plugins: [
    new webpack.DefinePlugin({
      // To force React into knowing this is a production build.
      "process.env": { NODE_ENV: JSON.stringify("production") }
    }),
    // new ExtractTextPlugin("[name].css", { allChunks: true }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      output: {
        comments: false
      },
      compress: { unused: true, dead_code: true, warnings: false }
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
        loader: "style!css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader?browsers=last 2 version!sass?outputStyle=expanded"
      },
      {
        test: /\.woff$/,
        loader: "url-loader"
      }
    ]
  }
};
