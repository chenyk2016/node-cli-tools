const shell = require('shelljs')
const argv = require('yargs')

const { program } = require('commander');
program.version('0.0.1');


module.exports = class Checkout {
  constructor(commend = '_default') {
    const exec = this[commend]
    if(typeof exec === 'function') {
      exec()
    } else {
      shell.echo(`命令checkout ${commend} 不存在`)
    }
  }

  _default() {
    argv.
    shell.exec(`git checkout ${} -b origin/`)
    require('yargs')
      .scriptName("pirate-parser")
      .usage('$0 <cmd> [args]')
      .command('hello [name]', 'welcome ter yargs!', (yargs) => {
        yargs.positional('name', {
          type: 'string',
          default: 'Cambi',
          describe: 'the name to say hello to'
        })
      }, function (argv) {
        console.log('hello', argv.name, 'welcome to yargs!')
      })
      .help()
      .argv
  }


}