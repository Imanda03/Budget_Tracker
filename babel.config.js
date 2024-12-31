module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    'react-native-reanimated/plugin',
    [
      'module:react-native-dotenv', // Changed this line to include 'module:' prefix
      {
        envName: 'APP_ENV',
        moduleName: '@env',
        path: '.env',
        blocklist: null,
        allowlist: ['API_URL', 'API_TOKEN'],
        safe: true,
        allowUndefined: false,
        verbose: false,
      },
    ],
  ],
};
