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
    try {
      shell.exec('git add .')
    } catch (error) {
      // nothing
    }
    shell.exec(`git commit -m "${message}"`)
    if(options.push) {
      shell.exec('git push')
    }
  })

// MR--------------------------------------------------------------------
const MR = program.command('mr').description('pr管理')

MR
  .command('create <branch>')
  .option('-t, --title <title>', '标题')
  .option('-a, --auto', '自动合并')
  .option('-m, --remove', '合并后删除原分支')
  .description('创建PR')
  .action((branch, options) => {
    const t = options.title ? `--title "${options.title}"` : ''
    const m = options.remove ? '--remove-source-branch' : ''
    // -f --fill自动填充标题
    // -y --yes不询问直接提交
    const res = shell.exec(`glab mr create --target-branch ${branch} --description '' ${t} ${m} -y`)

    if(options.auto) {
      const id = res.stdout.match(/^\!(\d*)/)[1]
      shell.exec(`glab mr merge ${id}`)
    }
  })

// auto--------------------------------------------------------------------
const AUTO = program.command('auto').description('快捷键')

AUTO.command('cmr <branch> <title> [detail]')
  .action((branch, title, detail, options) => {
    shell.exec('git add .')
    shell.exec(`git commit -m "${title}"`)
    shell.exec('git push')

    chalk.green('提交代码成功')

    const res = shell.exec(`glab mr create --target-branch ${branch}  --title "${title}" -d "${detail}" -y`)
    const id = res.stdout.match(/^\!(\d*)/)[1]
    shell.exec(`glab mr merge ${id}`)

    chalk.green(`合并到${branch}成功`)
  })

program.parse(process.argv)
