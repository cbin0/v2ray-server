const _ = require('lodash')
const {
  // graphql,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList
} = require('graphql')
const rll = require('read-last-lines')
const config = require('../config')
const { typeTools } = require('./utils')
const { aInt, aString } = typeTools

module.exports = {
  process(proc, name) {
    return {
      name,
      type: new GraphQLObjectType({
        name,
        fields: {
          pid: aInt('pid'),
          status: aInt('status'),
          signal: aInt('signal'),
          output: {
            type: new GraphQLList(GraphQLString),
            resolve(root) {
              return root.output && root.output.map((data) => {
                if (!data) return null
                if (Buffer.isBuffer(data))return Buffer.from(data).toString()
                else return '[Unknown type]'
              })
            }
          },
          access_log: {
            type: GraphQLString,
            args: {
              lines: {
                type: GraphQLInt
              }
            },
            async resolve(root, args) {
              return await rll.read(config[name].access_log, Math.min(args.lines || 10, 100))
            }
          },
          error_log: {
            type: GraphQLString,
            args: {
              lines: {
                type: GraphQLInt
              }
            },
            async resolve(root, args) {
              return await rll.read(config[name].error_log, Math.min(args.lines || 10, 100))
            }
          },
          error: {
            type: new GraphQLObjectType({
              name: `${name}_error`,
              fields: {
                errno: aString('errno'),
                code: aString('code'),
                syscall: aString('syscall'),
                path: aString('path'),
                spawnargs: {
                  type: GraphQLString,
                  resolve(root) {
                    return root.spawnargs.join(' ')
                  }
                }
              }
            }),
            resolve(root) {
              return _.pick(root.error, ['errno', 'code', 'syscall', 'path', 'spawnargs'])
            }
          }
        }
      }),
      resolve() {
        return proc
      }
    }
  }
}