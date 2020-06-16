module.exports = {
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
};
