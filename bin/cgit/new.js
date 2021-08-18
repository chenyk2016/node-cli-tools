#!/usr/bin/env node
const path = require('path')
const { version } = require(path.resolve('./package.json'))
const { program } = require('commander')
const shell = require('../utils/shelljs')
const chalk = require('chalk')

program.version(version)

program
  .command('checkout <branchName>')
  .description('拉取远程分支，并在本地创建新的分支')
  .action((branchName) => {
    shell.exec(`git checkout origin/${branchName} -b ${branchName} `)
    chalk.green(`切换到分支 ${branchName}`)
  })

program
  .command('push')
  .description('拉取远程分支，并在本地创建新的分支')
  .option('-u, --set-upstream', '关联远程分支')
  .action((options) => {
    const res = shell.exec('git rev-parse --abbrev-ref HEAD', {silent:true})
    const branchName = res.stdout.trim()
    if(options.setUpstream) {
      shell.exec(`git push -u origin ${branchName}`)
    } else {
      shell.exec('git push')
    }
  })

program
  .command('reset')
  .description('从缓存区删除')
  .action(() => {
    shell.exec('git reset -q HEAD -- .')
  })

program
  .command('cm <message>')
  .description('一键保存提交')
  .option('-p, --push', '执行提交到远程操作')
  .action((message, options) => {
    shell.exec('git add .')
    shell.exec(`git commit -m ${message}`)
    if(options.push) {
      shell.exec('git push')
    }
  })

program
  .command('pr create <branch> <title>')
  .description('创建PR')
  .action((branch, title) => {
    shell.exec(`glab mr create --target-branch ${branch}  --title ${title} -f`)
  })


program.parse(process.argv)
