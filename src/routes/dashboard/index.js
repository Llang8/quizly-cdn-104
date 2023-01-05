const DashboardRouter = require('express').Router()

DashboardRouter.route('/')
    .get(require('./dashboard.view'))

DashboardRouter.route('/submissions')
    .get(require('./submissions.view'))

module.exports = DashboardRouter