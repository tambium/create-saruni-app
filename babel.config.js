// TODO: clean up babel config with proper override and move them to @saruni
module.exports = {
  presets: [
    "@babel/preset-react",
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
};
