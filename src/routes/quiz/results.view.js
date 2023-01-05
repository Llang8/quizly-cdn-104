const axios = require('axios')

module.exports = async (req, res) => {
    const submissionId = req.params.id

    const query = `
        query submission($id: ID!) {
            submission(id: $id) {
                id,
                quiz {
                    title
                },
                score
            }
        }
    `

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, {
            query: query,
            variables: {
                id: submissionId
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const submission = data.data.submission

        res.render('quiz-results', { submission })

    } catch(e) {
        res.send(e)
    }
}