import { Router } from 'express'
import { expressRouterAdapter } from '../adapters/express-router.adapter'
import { buildCreateUserController } from '../factories/controllers/create-user.factory'
import { buildUpdateUserController } from '../factories/controllers/update-user.factory'

const router = Router()

router.post('/users', expressRouterAdapter(buildCreateUserController()))
router.put('/users/:id', expressRouterAdapter(buildUpdateUserController()))

export { router }
