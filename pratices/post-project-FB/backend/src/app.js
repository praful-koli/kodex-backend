const express = require('express')
const cors = require('cors')
const app = express()

app.use(express.json())
app.use(cors(
    {origin : 'http://localhost:5173'}
))
const postRoute = require('./routes/post.route')

app.use('/api/post',postRoute)

module.exports = app