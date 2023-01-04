const AuthRouter = require('express').Router()

AuthRouter.route('/login')
    .get(require('./login.view'))
    .post(require('./login'))

AuthRouter.route('/register')
    .get(require('./register.view'))
    .post(require('./register'))

module.exports = AuthRouter