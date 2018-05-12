#!/usr/bin/env node

const program = require('commander'),
  cmdDev = require('../lib/command/dev'),
  cmdBuild = require('../lib/command/build'),
  cmdInit = require('../lib/command/init'),
  cmdPrompt = require('../lib/command/prompt')

const version = require('../package').version

program.version(version, '-v, --version')

program.command('init').alias('i').action(cmd => {
  cmdInit()
})
program.command('dev').alias('d').action(cmd => {
  cmdDev()
})
program.command('build').alias('b').action(cmd => {
  cmdBuild()
})


program.parse(process.argv)
if (program.args.length < 1) cmdPrompt()
