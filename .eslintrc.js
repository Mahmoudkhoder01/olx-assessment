module.exports = {
  root: true, // Important to stop ESLint from looking in parent directories
  extends: [
    'expo', // Extends the base Expo ESLint configuration for legacy format
    'prettier', // Integrates Prettier rules
    // Add other configs you were using in your flat config, e.g.,
    // 'plugin:@typescript-eslint/recommended',
    // 'plugin:@typescript-eslint/stylistic',
  ],
  parser: '@typescript-eslint/parser',
  plugins: [
    '@typescript-eslint',
    'prettier',
    'expo',
    'react-native', // If you were using react-native specific linting
  ],
  parserOptions: {
    ecmaVersion: 'latest', // Or a specific version like 2020, 2021
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
    project: './tsconfig.json', // Point to your tsconfig for type-aware linting
  },
  env: {
    'expo/env': true, // Essential for Expo specific globals
    node: true,
    browser: true,
  },
  rules: {
    // Your custom rules here.
    // For example, if you had this in your flat config:
    // 'prettier/prettier': 'error',
    // 'no-unused-vars': 'warn',
    'prettier/prettier': 'error',
    'no-unused-vars': 'warn',
    // Example of common rules
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    '@typescript-eslint/no-explicit-any': 'warn',
    // Ensure you remove any rules that are specific to ESLint 9 if they cause issues
  },
  ignorePatterns: [
    'node_modules/',
    'dist/',
    '.expo/',
    'babel.config.js',
    'metro.config.js',
    'webpack.config.js',
    // Add any other files/folders you want ESLint to ignore
  ],
  // If you had specific configurations for certain files in your flat config,
  // you'd use the 'overrides' property in .eslintrc.js
  // overrides: [
  //   {
  //     files: ['*.ts', '*.tsx'],
  //     rules: {
  //       // TS specific rules
  //     },
  //   },
  // ],
};
