const jwt = require('jsonwebtoken')

const unprotectedRoutes = [
    '/auth/login',
    '/auth/register',
    '/graphql'
]

const authenticate = (req, res, next) => {
    const token = req.cookies?.jwtToken || ""
    console.log(token)
    console.log("RUNNING")

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET)

        req.verifiedUser = verified
        console.log('User verified!', verified)
        next()
    } catch(e) {
        console.log(e)
        console.log('User verification failed.')

        if (unprotectedRoutes.includes(req.path)) {
            next()
        } else {
            res.redirect('/auth/login')
        }
    }
}

module.exports = { authenticate }