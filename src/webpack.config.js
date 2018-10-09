const path = require("path");

module.exports = {
  mode: "development",
  entry: "./app/game.js",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "app", "dist")
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      }
    ]
  },
  devServer: {
    publicPath: "/dist/",
    contentBase: path.join(__dirname, "app"),
    watchContentBase: true
  }
};
