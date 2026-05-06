import express from 'express'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import authRoute from './routes/auth.route.js'

const app = express()

app.use(cookieParser())
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/auth', authRoute)

export default  app