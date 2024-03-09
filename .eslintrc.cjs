module.exports = {
  extends: [
    'plugin:maintainable/recommended',
    'plugin:maintainable/react',
  ],
  plugins: [],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2023,
    sourceType: 'module',
    allowImportExportEverywhere: true,
  },
  rules: {
    "react/no-unescaped-entities": "off"
  }
};
