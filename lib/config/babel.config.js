const { ownDir } = require('../util')

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
  ],
  plugins: [
    'transform-runtime'
  ]
}
