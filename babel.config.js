module.exports = api => {
  api.cache(false);

  const presets = [
    "@babel/preset-typescript",
    "@babel/preset-env"
  ];

  return {
    presets,
    plugins: [
      "@babel/plugin-proposal-class-properties",
      ["@babel/plugin-proposal-decorators", { decoratorsBeforeExport: true }]]
  };
};