module.exports = {
  presets: [
    [
      "@tambium/babel-preset/node",
      {
        corejs: {
          version: 3.6,
          proposals: true,
        },
        targets: {
          node: "current",
        },
        useBuiltIns: "usage",
      },
    ],
  ],
};
