const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: path.resolve(__dirname,"./src/ts/index.ts"),
  module: {
    rules: [
      {
        test: /\.ts$/i,
        use: "ts-loader"
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.json$/i,
        type: "json"
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource"
      },
      {
        test: /\.html$/i,
        use: "html-loader"
      }
    ]
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "./public")
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/pages/index.html",
    }),
  ]
}