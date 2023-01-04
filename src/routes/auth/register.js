const axios = require('axios')

module.exports = async (req, res) => {
    if (req.body.password !== req.body.confirmPassword) {
        res.redirect('/auth/login')
        return
    }

    const mutation = `
        mutation register($email: String!, $username: String!, $password: String!) {
            register(email: $email, username: $username, password: $password)
        }
    `

    try {
        const { data } = await axios.post('http://localhost:3000/graphql', {
            query: mutation,
            variables: {
                email: req.body.email,
                password: req.body.password,
                username: req.body.username
            }
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        /* console.log(data.data.register)
        res.send(data.data.register) */
        res.cookie('jwtToken', data.data.register, { maxAge: 2592000000, httpOnly: true })
        res.redirect('/')
    } catch(e) {
        res.send(e)
    }
}