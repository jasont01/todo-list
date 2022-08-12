require('dotenv').config()
const express = require('express')
const connectDB = require('./config/db')
const cookieParser = require('cookie-parser')
const path = require('path')

const port = process.env.PORT || 5000

const app = express()

connectDB()

app.use(express.json())
app.use(cookieParser())

//app.use(require('./middleware/errorMiddleware'))

app.use('/api', require('./routes'))

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, './client/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, './', 'client', 'build', 'index.html'))
  )
} else {
  app.get('/', (req, res) => res.send('Please set to production'))
}

app.listen(port, () => console.log(`Server started on port: ${port}`))
