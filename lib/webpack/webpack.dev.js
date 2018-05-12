const Webpack = require('webpack')
const merge = require('webpack-merge');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const EasyConfigMock = require('easy-config-mock');
const common = require('./webpack.common.js');
const { cwd } = require('../util')
const R = require('ramda')

const {
  getConfig
} = require('../util')

const {
  port = 8018,
  webpack = {},
  proxy = {},
  devtool = 'inline-source-map'
} = getConfig()

new EasyConfigMock({
  path: cwd('mock.config.js')
})

module.exports = merge.smart(common, {
  mode: 'development',
  devtool,
  devServer: {
    contentBase: cwd('dist'),
    hot: true,
    open: true,
    quiet: true,  // necessary for FriendlyErrorsPlugin
    port,
    proxy,
    // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-
    watchOptions: {
      poll: false
    }
  },
  plugins: [
    new FriendlyErrorsPlugin(),
    new Webpack.NamedModulesPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ]
}, webpack);
