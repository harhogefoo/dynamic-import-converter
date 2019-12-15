module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'standard',
    'plugin:jest/recommended',
    'prettier'
  ],
  plugins: [
    'jest',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'prettier/prettier': 'error'
  }
}
