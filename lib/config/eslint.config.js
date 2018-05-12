const R = require('ramda')
const { getConfig } = require('../util')

const {
  rules = {},
  eslintConfig = {}
} = getConfig()

module.exports = R.merge({
  extends: [
    'standard',
    'plugin:vue/essential'
  ],
  rules: R.merge({
    'no-unused-vars': 1,
    'no-new': 0
  }, rules),
  parserOptions: {
    parser: 'babel-eslint',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'vue'
  ]
}, eslintConfig)
