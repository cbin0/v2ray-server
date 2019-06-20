const {
  GraphQLSchema,
  GraphQLObjectType
} = require('graphql')
const _ = require('lodash')
const types = require('./lib/types')
 
module.exports = ({ v2ray, nginx }) => {
  return new GraphQLSchema({
    query: new GraphQLObjectType({
      name: 'root',
      fields: {
        // processes
        ..._.mapValues({ process, v2ray, nginx }, types.process)
      }
    })
  })
}