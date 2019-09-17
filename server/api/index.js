const program = require('commander')
const server = require('./src/server')
const package = require('./package.json')
 
program
  .version(package.version)
  .option('-d, --domain [string]', 'server domain')
  .option('-e, --email [string]', 'your email address')
  .option('-u, --uuid [string]', 'your v2ray uuid')
  .option('-p, --path [string]', 'your v2ray path')
  .parse(process.argv)

// start srever
server(program)
