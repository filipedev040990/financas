import { Router } from 'express'
import { expressRouterAdapter } from '../adapters/express-router.adapter'
import { buildCreateUserController } from '../factories/controllers/create-user.factory'
import { buildUpdateUserController } from '../factories/controllers/update-user.factory'
import { buildCreateBillController } from '../factories/controllers/create-bill.factory'
import { buildGetBillByIdController } from '../factories/controllers/get-bill-by-id.factory'

const router = Router()

router.post('/users', expressRouterAdapter(buildCreateUserController()))
router.put('/users/:id', expressRouterAdapter(buildUpdateUserController()))

router.post('/bill', expressRouterAdapter(buildCreateBillController()))
router.get('/bill/:id', expressRouterAdapter(buildGetBillByIdController()))

export { router }
