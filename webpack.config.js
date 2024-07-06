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
    filename: path.substring(6),
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
<<<<<<< HEAD
        use: ["to-string-loader", "css-loader"],
=======
        use: [
          "style-loader", // Injects styles into DOM
          {
            loader: "css-loader", // Translates CSS into CommonJS
            options: {
              importLoaders: 1,
            },
          },
          "postcss-loader", // Process CSS with PostCSS if needed
        ],
>>>>>>> main
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
