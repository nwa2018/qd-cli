#!/usr/bin/env node

const program = require('commander'),
  cmdDev = require('../lib/command/dev')
  cmdBuild = require('../lib/command/build')

program
  .version(require('../package').version)
program
  .command('dev').alias('d').action(cmd => {
    cmdDev()
  })
program
  .command('build').alias('b').action(cmd => {
    cmdBuild()
  })
program.parse(process.argv)
