#!/usr/bin/env node
console.log('hello ', process.env.PWD)

const shell = require('shelljs')

const argv = require('yargs')
const Tag = require('./tag')

// argv.demand(['n'])
//   .default({n: 'tom'})
//   .describe({n: 'your name'})
//   .argv

const params = argv.argv._
const firstParams = params[0]
const secondParams = params[1]

console.log('params',params);
switch (firstParams) {
case 'tag':
  new Tag(secondParams)
  break

default:
  break
}
