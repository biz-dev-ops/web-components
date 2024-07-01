import HtmlWebpackPlugin from "html-webpack-plugin";
import TerserPlugin from "terser-webpack-plugin";
import CopyPlugin from "copy-webpack-plugin";
import path from "path";
import * as url from "url";
import glob from "glob";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

let multipleHtmlPlugins = glob.sync("./src/**/index.html").map((path) => {
  return new HtmlWebpackPlugin({
    template: path,
    filename: path.substring(6),
  });
});

const config = {
  entry: [...glob.sync("./src/*/index.ts")],
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
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
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
