const fs = require('fs'),
  path = require('path'),
  chalk = require('chalk'),
  shell = require('shelljs'),
  { logger } = require('../util'),
  version = require('../../package.json').version

module.exports = function() {
  console.log(`正在使用 qd dev server ${chalk.green(version)} 开发 ${'dev'}，参数${Array.prototype.slice.call(arguments, 1)}`)

  !fs.existsSync('./src') && logger.fatal('出错了～找不到源文件 src 目录！请检查当前路径是否正确！')

  process.env.NODE_ENV = 'development'
  // process.argv = []
  shell.exec(`${path.resolve(__dirname, '../../node_modules/webpack-dev-server/bin/webpack-dev-server.js')} --config ${path.resolve(__dirname, '../webpack/webpack.dev.js')}`)
  // process.exit(1)
  // shell.exec(`webpack-dev-server --config ${path.resolve(__dirname, '../webpack/webpack.dev.js')}`)
}
