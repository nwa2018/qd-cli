const Webpack = require('webpack')
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const { cwd } = require('../util')

const {
  getConfig
} = require('../util')

const {
  port = 8018,
  webpack = {}
} = getConfig()

module.exports = merge.smart(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: cwd('dist'),
    hot: true,
    open: true,
    quiet: true,
    port
  },
  plugins: [
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
}, webpack);
