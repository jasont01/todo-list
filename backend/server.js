import 'dotenv/config'
import express from 'express'
import connectDB from './config/db.js'
import errorHandler from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'

const port = process.env.PORT || 5000

connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', userRoutes)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
