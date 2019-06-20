const program = require('commander')
const server = require('./src/server')
const package = require('./package.json')
 
program
  .version(package.version)
  .option('-d, --domain [string]', 'server domain')
  .option('-e, --email [string]', 'your email address')
  .parse(process.argv)

// start srever
server(program)
