const {
  GraphQLInt,
  GraphQLString
} = require('graphql')

module.exports = {
  log(msg) {
    console.log(`[${(new Date).toUTCString()}]: ${msg}`)
  },
  fromPairs(array) {
    return array.reduce((memo, x) => {
      memo[x[0]] = x[1]
      return memo
    }, {})
  },
  typeTools: {
    aString(name) {
      return {
        type: GraphQLString,
        resolve(root) {
          return root[name]
        }
      }
    },
    aInt(name) {
      return {
        type: GraphQLInt,
        resolve(root) {
          return root[name]
        }
      }
    }
  }
}