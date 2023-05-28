import { router } from './routes'
import express from 'express'
import cors from 'cors'
import setupSwagger from '@/infra/adapters/swagger.adapter'

const app = express()

setupSwagger(app)
app.use(cors())
app.use(express.json())
app.use('/api/v1', router)

export { app }
