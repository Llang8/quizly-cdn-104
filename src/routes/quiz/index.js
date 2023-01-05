const QuizRouter = require('express').Router()

QuizRouter.route('/create')
    .get(require('./create.view'))
    .post(require('./create'))

QuizRouter.route('/success/:slug')
    .get(require('./created.view'))

QuizRouter.route('/:slug')
    .get(require('./form.view'))

QuizRouter.route('/:slug/submit')
    .post(require('./submit'))

QuizRouter.route('/results/:id')
    .get(require('./results.view'))

module.exports = QuizRouter