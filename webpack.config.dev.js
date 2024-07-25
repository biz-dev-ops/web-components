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
        oneOf: [
          {
            resourceQuery: /shadow/, // foo.css?shadow
            use: ["css-loader"],
          },
          {
            use: [
              "style-loader",
              {
                loader: "css-loader",
                options: {
                  importLoaders: 1,
                },
              },
              "postcss-loader",
            ],
          },
        ],
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
      patterns: [{ from: "assets", to: "assets" }],
    }),
  ].concat(multipleHtmlPlugins),
  optimization: {
    minimizer: [new TerserPlugin()],
  },
  devServer: {
    static: path.join(__dirname, "./dist"),
    compress: true,
    port: 4000,
  },
};

export default config;
