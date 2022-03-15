import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import connectDB from './config/db.js'
import errorHandler from './middleware/errorMiddleware.js'
import userRoutes from './routes/userRoutes.js'
import listRoutes from './routes/listRoutes.js'
import itemRoutes from './routes/itemRoutes.js'

const port = process.env.PORT || 5000

const __dirname = dirname(fileURLToPath(import.meta.url))

connectDB()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', userRoutes)
app.use('/api/lists', listRoutes)
app.use('/api/items', itemRoutes)

app.get('*', (req, res) =>
  res.sendFile(new URL('./404.html', import.meta.url).pathname)
)

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`))
