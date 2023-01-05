const axios = require('axios')

module.exports = async (req, res) => {
    const slug = req.params.slug

    const query = `
        query quizBySlug($slug: String!) {
            quizBySlug(slug: $slug) {
                id,
                slug,
                title,
                description,
                questions {
                    id,
                    title,
                    correctAnswer,
                    order
                }
            }
        }
    `

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, {
            query: query,
            variables: {
                slug
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const quizData = data.data.quizBySlug

        quizData.questions.sort((a,b) => a.order - b.order)

        res.render('quiz', { quiz: quizData })

    } catch(e) {
        res.send(e)
    }
}