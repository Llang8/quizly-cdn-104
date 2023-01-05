const axios = require('axios')

module.exports = async (req, res) => {
    const slug = req.params.slug

    /* res.send(req.body) */
    let answers = []

    for (const key in req.body) {
        if (key !== 'title' && key !== 'quizId') {
            answers.push({
                answer: req.body[key],
                questionId: key
            })
        }
    }

    const submissionData = {
        quizId: req.body.quizId,
        userId: req.verifiedUser.id,
        answers
    }

    const mutation = `
        mutation submitQuiz($quizId: String!, $userId: String!, $answers: [AnswerInputType!]!) {
            submitQuiz(quizId: $quizId, userId: $userId, answers: $answers)
        }    
    `

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, {
            query: mutation,
            variables: submissionData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const submissionId = data.data.submitQuiz
        res.redirect(`/quiz/results/${submissionId}`)
    } catch(e) {
        res.send(e)
    }
}