const express = require('express')
const app = express()
const { PORT, CLIENT_URL } = require('./constants')
const cookieParser = require('cookie-parser')
const cors = require('cors')


//init middlewares
app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: CLIENT_URL, credentials: true }))
//import routes
const authRoutes = require('./routes/auth')

// init routes

app.use('/api', authRoutes)

// app start 
const appStart = () => {
 try {
    app.listen(PORT, () => {
        console.log(`The app is running at http://localhost:${PORT}`)
    })
 }
 catch(error) {
    console.log(`Error: ${error.message}`)
 }
}

appStart()