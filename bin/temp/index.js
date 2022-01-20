#!/usr/bin/env node
const path = require('path')
const cFiles = require('../utils/files')
const { program } = require('commander')
const shell = require('../utils/shelljs')
const output = require('../utils/output')

const modulesPath = path.resolve(__dirname, './modules')

program.version('0.0.1')

// allFiles.map(item => {
//   output.info(item.name)
// })

program
  .command('list')
  .description('列出所有模版文件')
  .action(() => {
    const allFiles = cFiles.getAllFile( modulesPath )
    allFiles.map(item => {
      output.info(item.name)
    })
  })

program
  .command('add <tempName> <from>')
  .description('向模版添加文件｜目录')
  .action((tempName, from) => {

    cFiles.copy(path.resolve('./', from), path.resolve(modulesPath, tempName))

    output.success('复制完成')
  })

program
  .command('update <tempName> <from>')
  .description('更新模版文件｜目录')
  .action((tempName, from) => {

    cFiles.copy(path.resolve('./', from), path.resolve(modulesPath, tempName), true)

    output.success('复制完成')
  })

program
  .command('cp <tempName> <toPath>')
  .description('向模版添加文件｜目录')
  .action((tempName, toPath) => {

    cFiles.copy(path.resolve(modulesPath, tempName), path.resolve('./', toPath))

    output.success('复制完成')
  })

program.parse(process.argv)