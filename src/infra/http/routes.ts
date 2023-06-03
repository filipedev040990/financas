import { Router } from 'express'
import { expressRouterAdapter } from '@/infra/adapters/express-router.adapter'
import { buildCreateUserController } from '@/infra/factories/controllers/create-user.factory'
import { buildUpdateUserController } from '@/infra/factories/controllers/update-user.factory'
import { buildCreateBillController } from '@/infra/factories/controllers/create-bill.factory'
import { buildGetBillByIdController } from '@/infra/factories/controllers/get-bill-by-id.factory'
import { buildUpdateBillController } from '@/infra/factories/controllers/update-bill.factory'
import { buildGetAllBillController } from '../factories/controllers/get-all-bill.factory'
import { buildCreateCategoryController } from '../factories/controllers/create-category.factory'
import { buildUpdateCategoryController } from '../factories/controllers/update-category.factory'
import { buildGetAllCategoriesController } from '../factories/controllers/get-all-categories.factory'
import { buildGetCategoryByIdController } from '../factories/controllers/get-category-by-id.factory'

const router = Router()

router.post('/users', expressRouterAdapter(buildCreateUserController()))
router.put('/users/:id', expressRouterAdapter(buildUpdateUserController()))

router.post('/bill', expressRouterAdapter(buildCreateBillController()))
router.get('/bill/:id', expressRouterAdapter(buildGetBillByIdController()))
router.get('/bill/', expressRouterAdapter(buildGetAllBillController()))
router.put('/bill/:id', expressRouterAdapter(buildUpdateBillController()))

router.post('/category', expressRouterAdapter(buildCreateCategoryController()))
router.put('/category/:id', expressRouterAdapter(buildUpdateCategoryController()))
router.get('/category/', expressRouterAdapter(buildGetAllCategoriesController()))
router.get('/category/:id', expressRouterAdapter(buildGetCategoryByIdController()))

export { router }
