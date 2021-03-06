//

import * as HtmlWebpackPlugin from "html-webpack-plugin";
import * as path from "path";


let config = {
  entry: ["babel-polyfill", "./client/index.tsx"],
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "./script/[name].bundle.js"
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader"
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {modules: {localIdentName: "[name]_[local]_[hash:base64:5]"}, url: false}
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader"
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx", ".scss"],
    alias: {
      "/client": path.resolve(__dirname, "client"),
      "/server": path.resolve(__dirname, "server")
    }
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
    proxy: {
      "/api": "http://localhost:8050"
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./client/public/index.html",
      title: "ZpDIC Online"
    })
  ]
};

export default config;