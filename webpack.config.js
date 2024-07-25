import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import * as url from "url";
import { globSync } from "glob";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

let multipleHtmlPlugins = globSync("./src/**/index.html").map((path) => {
  return new HtmlWebpackPlugin({
    template: path,
    filename: path.substring(4),
  });
});

const config = {
  entry: globSync("./src/*/index.ts"),
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: ["ts-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.svg$/,
        loader: "svg-inline-loader",
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    preferRelative: true,
  },
  output: {
    filename: "web-components.js",
    path: path.resolve(__dirname, "./dist"),
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "node_modules/@biz-dev-ops/md-docs/assets", to: "assets" },
        { from: "assets", to: "assets", force: true },
      ],
    }),
  ].concat(multipleHtmlPlugins),
  optimization: {
    minimizer: [new TerserPlugin()],
  },
};

export default config;
