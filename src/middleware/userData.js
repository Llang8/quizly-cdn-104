const axios = require('axios')

const userData = async (req, res, next) => {
    if (!req.verifiedUser) {
        next()
        return
    }

    const query = `
        query user($id: ID!) {
            user(id: $id) {
                id,
                username
                quizzes {
                    id,
                    slug,
                    title,
                    description,
                    questions {
                        id,
                        title,
                        correctAnswer,
                        order
                    },
                    submissions {
                        id,
                        score,
                        userId
                    },
                    avgScore
                },
                submissions {
                    id,
                    score,
                    quiz {
                        title,
                        description
                    }
                }
            }
        }
    `

    try {
        const { data } = await axios.post(process.env.GRAPHQL_ENDPOINT, {
            query: query,
            variables: {
                id: req.verifiedUser.user._id
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        req.verifiedUser = data.data.user
        next()
    } catch(err) {
        console.log(err)
        res.redirect('/auth/login')
    }
}

module.exports = { userData }