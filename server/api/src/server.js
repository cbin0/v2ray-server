const express = require('express')
const graphqlHTTP = require('express-graphql')
const { spawn, spawnSync, execSync } = require('child_process')
const schema = require('./schema')
const config = require('./config')
const { log } = require('./lib/utils')
const app = express()

module.exports = program => {
  let data = {}

  try {
    if (program.domain) execSync(`sed -i 's/__DOMAIN__/${program.domain}/g' ${config.httpconf}`)
    log(`domain ${program.domain} replaced.`)
    // start v2ray
    data.v2ray = spawn('/usr/bin/v2ray/v2ray', ['-config', '/etc/v2ray/config.json'])
    log(`v2ray started. PID: ${data.v2ray.pid}`)
    data.v2ray.on('error', e => log(`v2ray error: ${e.stack}`))
    // start nginx
    data.nginx = spawnSync('nginx')
    log(`nginx started. PID: ${data.nginx.pid}`)
    // cert nginx
    log('certbot working...')
    if (program.email) execSync(
      `certbot --nginx --agree-tos -n -m ${program.email} --domains ${program.domain}`
    )
    log('certbot done.')
  } catch (e) {
    log('start processes error')
    log(e.toString())
  }

  app.use('/data', (req, res) => {
    return res.json(data)
  })

  app.use('/', graphqlHTTP({
    schema: schema(data),
    graphiql: true
  }))

  app.listen(config.port, () => {
    log(`admin server start at ${config.port}`)
  })
}
