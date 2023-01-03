const queries = require('./queries')
const { GraphQLSchema, GraphQLObjectType } = require('graphql')

const QueryType = new GraphQLObjectType({
    name: 'QueryType',
    description: 'Queries',
    fields: queries
})

module.exports = new GraphQLSchema({
    query: QueryType
})