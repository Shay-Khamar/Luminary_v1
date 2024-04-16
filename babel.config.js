module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Other plugins can go here
      'react-native-paper/babel',
      // Ensure Reanimated plugin is the last one
      'react-native-reanimated/plugin',
    ],
  };
};