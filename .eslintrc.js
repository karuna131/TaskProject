module.exports = {
  'env': {
    'browser': true,
    'commonjs': true,
    'es2021': true,
  },
  'extends': 'google',
  'overrides': [
  ],
  'parserOptions': {
    'ecmaVersion': 'latest',
  },
  'rules': {
    'max-len': [0, 160, 2, {ignoreUrls: true}],
    'new-cap': 0,
    'camelcase': 0,
  },
};
