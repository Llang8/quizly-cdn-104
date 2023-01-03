const { GraphQLList } = require('graphql')
const { UserType } = require('./types')
const { User } = require('../models')

const users = {
    type: new GraphQLList(UserType),
    description: 'Query all users from the database',
    resolve(parent, args) {
        return User.find()
    }
}

module.exports = {
    users
}