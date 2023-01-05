const axios = require('axios')

module.exports = async (req, res) => {
    /* console.log(req.body)
    res.send(req.body) */

    const quizData = {
        userId: req.verifiedUser.id,
        title: req.body.quizTitle,
        description: req.body.quizDescription,
        questions: []
    }

    for (const key in req.body) {
        if (key.includes('questionTitle')) {
            /* Parse out question number and convert to integer */
            const questionNum = parseInt(key.split('questionTitle')[1])

            while(!quizData.questions[questionNum]) {
                quizData.questions.push({})
            }

            quizData.questions[questionNum].title = req.body[key]
        } else if (key.includes('questionAnswer')) {
            /* Parse out question number and convert to integer */
            const questionNum = parseInt(key.split('questionAnswer')[1])

            while(!quizData.questions[questionNum]) {
                quizData.questions.push({})
            }

            quizData.questions[questionNum].correctAnswer = req.body[key]
            quizData.questions[questionNum].order = questionNum
        }
    }

    const mutation = `
        mutation createQuiz($userId: String!, $title: String!, $description: String!, $questions: [QuestionInputType!]!) {
            createQuiz(userId: $userId, title: $title, description: $description, questions: $questions)
        }
    `

    try {
        /* return res.send(quizData) */
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, {
            query: mutation,
            variables: quizData
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const slug = data.data.createQuiz

        res.redirect(`/quiz/success/${slug}`)
    } catch(e) {
        res.send(e)
    }
}