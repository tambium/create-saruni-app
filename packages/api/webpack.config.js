const CopyWebpackPlugin = require("copy-webpack-plugin");
const path = require("path");
const slsw = require("serverless-webpack");

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
  externals: ["@prisma/client"],
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
