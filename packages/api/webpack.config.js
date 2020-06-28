const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const slsw = require("serverless-webpack");
const nodeExternals = require("webpack-node-externals");

module.exports = {
  entry: slsw.lib.entries,
  target: "node",
  mode: "production",
  resolve: {
    extensions: [".mjs", ".js", ".json", ".ts"],
  },
  devtool: "source-map",
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        path.resolve(__dirname, "./prisma/schema.prisma"),
        path.resolve(__dirname, "./prisma/.env"),
      ],
    }),
  ],
  externals: [
    nodeExternals({
      modulesDir: path.resolve(__dirname, "../../node_modules"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(mjs|js|ts)/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-typescript",
              [
                "@babel/preset-env",
                {
                  targets: {
                    node: true,
                  },
                  useBuiltIns: "usage",
                  corejs: {
                    version: 3.6,
                    proposals: true,
                  },
                },
              ],
            ],
          },
        },
      },
    ],
  },
};
