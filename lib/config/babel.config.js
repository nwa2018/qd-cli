const { ownDir, getConfig } = require('../util')
const R = require('ramda')
const {
  babelPlugins = [],
  babelPresets = []
} = getConfig()

module.exports = {
  filename: ownDir('lib/config/babel.config.js'),
  presets: [
    [
      'env',
      // 启动懒加载
      {
        modules: false
      }
    ],
    'stage-2'
  ].concat(babelPresets),
  plugins: [
    'transform-runtime',
    'transform-decorators-legacy'
  ].concat(babelPlugins)
}
