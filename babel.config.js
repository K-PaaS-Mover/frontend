module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: ["nativewind/babel"],
    presets: ["babel-preset-expo"],
    compact: true,
  };
};
