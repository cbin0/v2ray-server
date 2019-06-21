const express = require('express')
const graphqlHTTP = require('express-graphql')
const { spawn, spawnSync, execSync } = require('child_process')
const schema = require('./schema')
const config = require('./config')
const { log } = require('./lib/utils')
const app = express()

module.exports = program => {
  let data = {}
    , transfer = x => x.replace(/\//g, '\\/')

  try {
    // replace nginx conf
    if (program.domain) {
      config.nginx.access_log = config.nginx.access_log.replace(/__DOMAIN__/g, program.domain)
      config.nginx.error_log = config.nginx.error_log.replace(/__DOMAIN__/g, program.domain)
      execSync(`sed -i 's/__ACCESSLOG__/${transfer(config.nginx.access_log)}/g' ${config.nginx.conf}`)
      log(`set nginx access_log ${config.nginx.access_log} ok.`)
      execSync(`sed -i 's/__ERRORLOG__/${transfer(config.nginx.error_log)}/g' ${config.nginx.conf}`)
      log(`set nginx error_log ${config.nginx.error_log} ok.`)
      execSync(`sed -i 's/__DOMAIN__/${program.domain}/g' ${config.nginx.conf}`)
      log(`domain ${program.domain} replaced.`)
    }

    // replace v2ray conf
    execSync(`sed -i 's/__UUID__/${config.v2ray.uuid}/g' ${config.v2ray.conf}`)
    log(`set v2ray uuid ${program.uuid || config.v2ray.uuid} ok.`)
    execSync(`sed -i 's/__ACCESSLOG__/${transfer(config.v2ray.access_log)}/g' ${config.v2ray.conf}`)
    log(`set v2ray access_log ${config.v2ray.access_log} ok.`)
    execSync(`sed -i 's/__ERRORLOG__/${transfer(config.v2ray.error_log)}/g' ${config.v2ray.conf}`)
    log(`set v2ray error_log ${config.v2ray.error_log} ok.`)

    // replace uuid
    if (program.uuid) {
      execSync(`sed -i 's/__UUID__/${program.uuid}/g' ${config.v2ray.conf}`)
      log(`uuid ${program.uuid} replaced.`)
    }

    // start v2ray
    data.v2ray = spawn('/usr/bin/v2ray/v2ray', ['-config', config.v2ray.conf])
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
