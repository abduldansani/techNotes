require('dotenv').config()
const express = require('express')
const cors = require('cors')
const { logger, logEvents } = require('./middleware/logger')
const errorLog = require('./middleware/errorLogs')
const cookieParser = require('cookie-parser')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/connetDB')
const mongoose = require('mongoose')

const PORT = process.env.PORT
connectDB()
const app = express()

app.use(express.json())
app.use(cors(corsOptions))
app.use(cookieParser())

app.use(logger)

app.get('/', (req, res) => {
    res.send('hello world')
})

app.use('/users', require('./routes/userRoutes'))
app.use('/notes', require('./routes/noteRoutes'))

app.all('*', (req, res) => {
    if(req.accepts('json')) {
        res.json({message: '404 not found!'})
    } else {
        res.type(txt).send('404 not found')
    }
})

app.use(errorLog)

mongoose.connection.once('open', () => {
    app.listen(PORT, () => {
        console.log('connected to mongoDB')
        console.log(`server running on ${PORT}`)
    })
})
mongoose.connection.on('error', err => {
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})