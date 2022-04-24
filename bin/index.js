#!/usr/bin/env node

const path = require('path');
// const program = require('./utils/program')
const { program } = require('commander')
const { version } = require(path.resolve('./package.json'))
const shell = require('../utils/shelljs')

require('./git/index.js')
require('./temp/index.js')

program.command('npm <originName>')
.description('修改npm仓库源地址')
.action((originName = 'npm') => {
  const originMap = {
    'npm': 'registry https://www.npmjs.org',
    'taobao': 'registry https://npm.taobao.org/dist',
    'lianjia': 'registry https://registry.nlark.com/',
    'lianjianall': [
      'registry https://registry.nlark.com/',
      '@lianjia:registry http://artifactory.intra.ke.com/artifactory/api/npm/npm-virtual/',
      '@ke:registry http://artifactory.intra.ke.com/artifactory/api/npm/npm-virtual/',
      '@jiaoyi:registry http://artifactory.intra.ke.com/artifactory/api/npm/npm-virtual/',
      '@talent-fe:registry http://artifactory.intra.ke.com/artifactory/api/npm/npm-virtual/',
    ]
  }

  const origin = originMap[originName]

  if (origin) {
    shell.exec(`npm config set ${origin}`)
  }
})




program.version(version)
program.parse(process.argv)