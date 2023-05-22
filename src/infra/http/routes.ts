import { Router } from 'express'
import { expressRouterAdapter } from '../adapters/express-router.adapter'
import { buildCreateUserController } from '../factories/controllers/create-user.factory'
import { buildUpdateUserController } from '../factories/controllers/update-user.factory'
import { buildCreateBillController } from '../factories/controllers/create-bill.factory'

const router = Router()

router.post('/users', expressRouterAdapter(buildCreateUserController()))
router.put('/users/:id', expressRouterAdapter(buildUpdateUserController()))

router.post('/bill', expressRouterAdapter(buildCreateBillController()))

export { router }
