module.exports = require('lodash').merge({
  port: 7300,
  domain: '',
  v2ray: {
    uuid: '461aad1f-687c-4188-9abc-80073a618ca3',
    conf: '/etc/v2ray/config.json',
    access_log: '/var/log/v2ray/access.log',
    error_log: '/var/log/v2ray/error.log'
  },
  nginx: {
    conf: '/etc/nginx/conf.d/https.conf',
    access_log: '/var/log/nginx/access.__DOMAIN__.log',
    error_log: '/var/log/nginx/error.__DOMAIN__.log'
  },
  log: '/var/log/v2ray-admin.log'
}, require(`./config.${process.env.NODE_ENV == 'production' ? 'prod' : 'dev'}.js`))