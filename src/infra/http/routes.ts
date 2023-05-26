import { Router } from 'express'
import { expressRouterAdapter } from '@/infra/adapters/express-router.adapter'
import { buildCreateUserController } from '@/infra/factories/controllers/create-user.factory'
import { buildUpdateUserController } from '@/infra/factories/controllers/update-user.factory'
import { buildCreateBillController } from '@/infra/factories/controllers/create-bill.factory'
import { buildGetBillByIdController } from '@/infra/factories/controllers/get-bill-by-id.factory'
import { buildUpdateBillController } from '@/infra/factories/controllers/update-bill.factory'

const router = Router()

router.post('/users', expressRouterAdapter(buildCreateUserController()))
router.put('/users/:id', expressRouterAdapter(buildUpdateUserController()))

router.post('/bill', expressRouterAdapter(buildCreateBillController()))
router.get('/bill/:id', expressRouterAdapter(buildGetBillByIdController()))
router.put('/bill/:id', expressRouterAdapter(buildUpdateBillController()))

export { router }
