const express = require('express')
const dotenv = require('dotenv')
const { connectDB } = require('./src/db')
const { graphqlHTTP } = require('express-graphql')
const schema = require('./src/graphql/schema')
const cookieParser = require('cookie-parser')
const { authenticate } = require('./src/middleware/auth')

dotenv.config()

const app = express()

app.set('view engine', 'ejs')
app.set('views', './src/templates/views')

app.use(cookieParser())
app.use(authenticate)

connectDB()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}))

app.use(express.urlencoded({ extended: true }))

app.get('/', (req,res) => {
    res.send('Hello world')
}) 

/* Initialize our routes */
require('./src/routes')(app)

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
}) 