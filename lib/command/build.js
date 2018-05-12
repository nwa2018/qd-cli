const fs = require('fs'),
  path = require('path'),
  chalk = require('chalk'),
  shell = require('shelljs'),
  { logger } = require('../util'),
  version = require('../../package.json').version

module.exports = function() {
  console.log(`正在使用 qd dev server ${chalk.green(version)} 打包 ${'prod'}，参数${Array.prototype.slice.call(arguments, 1)}`)

  !fs.existsSync('./src') && logger.fatal('出错了～找不到源文件 src 目录！请检查当前路径是否正确！')

  process.env.NODE_ENV = 'production'
  shell.exec(`${path.resolve(__dirname, '../../node_modules/webpack/bin/webpack.js')} --config ${path.resolve(__dirname, '../webpack/webpack.prod.js --progress --report')}`)
}
