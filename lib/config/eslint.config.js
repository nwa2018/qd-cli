const R = require('ramda')
const { getConfig } = require('../util')

const {
  rules = {}
} = getConfig()

module.exports = {
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
  }
}
