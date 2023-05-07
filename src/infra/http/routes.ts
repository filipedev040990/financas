import { Router } from 'express'
import { expressRouterAdapter } from '../adapters/express-router.adapter'
import { buildCreateUserController } from '../factories/controllers/create-user.factory'

const router = Router()

router.post('/users', expressRouterAdapter(buildCreateUserController()))

export { router }
