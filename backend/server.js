import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

import authRoutes from './routes/authRoutes.js'
import projectRoutes from './routes/projectRoutes.js'

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("DB connected"))
  .catch(err => console.log(err))

app.use('/api/auth', authRoutes)
app.use('/api/projects', projectRoutes)

app.get('/', (req, res) => {
  res.send('API running')
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Server running on ${port}`))