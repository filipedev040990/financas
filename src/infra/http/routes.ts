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
import { expressAdapterMiddleware } from '../adapters/express-middleware.adapter'
import { buildAuthenticationMiddleware } from '../factories/middleware/authentication'
import { buildAuthenticateUserController } from '../factories/controllers/authenticate-user.factory'

const router = Router()

router.post('/users', expressAdapterMiddleware(buildAuthenticationMiddleware()), expressRouterAdapter(buildCreateUserController()))
router.put('/users/:id', expressAdapterMiddleware(buildAuthenticationMiddleware()), expressRouterAdapter(buildUpdateUserController()))

router.post('/bill', expressAdapterMiddleware(buildAuthenticationMiddleware()), expressRouterAdapter(buildCreateBillController()))
router.get('/bill/:id', expressAdapterMiddleware(buildAuthenticationMiddleware()), expressRouterAdapter(buildGetBillByIdController()))
router.get('/bill/', expressAdapterMiddleware(buildAuthenticationMiddleware()), expressRouterAdapter(buildGetAllBillController()))
router.put('/bill/:id', expressAdapterMiddleware(buildAuthenticationMiddleware()), expressRouterAdapter(buildUpdateBillController()))

router.post('/category', expressAdapterMiddleware(buildAuthenticationMiddleware()), expressRouterAdapter(buildCreateCategoryController()))
router.put('/category/:id', expressAdapterMiddleware(buildAuthenticationMiddleware()), expressRouterAdapter(buildUpdateCategoryController()))
router.get('/category/', expressAdapterMiddleware(buildAuthenticationMiddleware()), expressRouterAdapter(buildGetAllCategoriesController()))
router.get('/category/:id', expressAdapterMiddleware(buildAuthenticationMiddleware()), expressRouterAdapter(buildGetCategoryByIdController()))

router.post('/auth', expressRouterAdapter(buildAuthenticateUserController()))

export { router }
