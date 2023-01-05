const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')
const cookieParser = require('cookie-parser')
const { authenticate } = require('./src/middleware/auth')
const { userData } = require('./src/middleware/userData')

dotenv.config()

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/templates/views')

app.use(cookieParser())

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(authenticate)
app.use(userData)

connectDB()


app.use(express.urlencoded({ extended: true }))

/* Initialize our routes */
require('./src/routes')(app)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
}) 