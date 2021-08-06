#!/usr/bin/env node
console.log('hello ', process.env.PWD)

const packageJSON = require('./utils/packageJSON')
const shell = require('shelljs')


const argv = require('yargs')

argv.demand(['n'])
  .default({n: 'tom'})
  .describe({n: 'your name'})
  .argv

const params = argv.argv
const firstParams = params[0]

switch (firstParams) {
case 'tag':
  tagCommand()
  break

default:
  break
}

function tagCommand() {

  shell.exec('git tag')

}
