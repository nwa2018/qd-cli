const ora = require('ora'),
  shell = require('shelljs'),
  inquirer = require('inquirer'),
  { logger } = require('../util')

const projectDefaultName = 'vue-simple-demo'
module.exports = function() {
  if (!shell.which('git')) logger.fatal('找不到 git 命令，请先安装 git！')

  const question = [{
    type: 'input',
    name: 'projectName',
    message: `请输入项目名称：（默认【${projectDefaultName}】）`,
    default: projectDefaultName
  }]

  inquirer
    .prompt(question)
    .then(answer => {
      const { projectName } = answer
      const spinner = ora('clone template...')
      spinner.start()
      shell.exec(`git clone git@github.com:nwa2018/qd-vue-seed.git ${projectName}`, { silent: false }, (code, error) => {
        spinner.stop()
        if (code !== 0) throw new Error('拷贝模板出错')
        shell.cd(projectName)
        shell.rm('-rf', '.git')
        shell.rm('-rf', '.gitignore')
        logger.log(`项目创建成功能`)
        logger.log(`cd ${projectName}`)
        logger.log(`qd d`)
      })
    })
}
