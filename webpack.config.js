import TerserPlugin from "terser-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { CleanWebpackPlugin } from "clean-webpack-plugin";
import path from "path";
import * as url from "url";
import { globSync } from "glob";
import webpack from "webpack";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default (env, argv) => {
  const plugins = [];

  if (argv.mode === "development") {
    plugins.push(
      ...globSync("./src/**/index.html").map((path) => {
        return new HtmlWebpackPlugin({
          template: path,
          filename: path.substring(4),
        });
      })
    );
  }

  plugins.push(new CleanWebpackPlugin());
  plugins.push(new CopyWebpackPlugin({
          patterns: [
            {
              from: "**/_test-data/**/*",
              to({ context, absoluteFilename }) {
                const relativePath = path.relative(path.resolve(__dirname, "src"), absoluteFilename);
                return relativePath;
              },
              context: path.resolve(__dirname, "src"),
              globOptions: {
                dot: true,
                gitignore: true,
                ignore: ["**/ignore-this-folder/**"],
              },
              noErrorOnMissing: true,
            },
          ],
        })
  );
  plugins.push(
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(argv.mode),
    })
  );

  return {
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
              resourceQuery: /dev/,
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
            {
              use: ["css-loader"],
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
    plugins: plugins,
    optimization: {
      minimizer: [new TerserPlugin()],
    },
    devServer: {
      static: path.join(__dirname, "./dist"),
      compress: true,
      port: 4000,
    },
  };
};
