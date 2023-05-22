import { CreateBillController } from '@/adapters/controllers/bill/create-bill.controller'
import { CategoryRepository } from '@/infra/database/repositories/category.repository'
import { buildCalculateBillStatusUseCase } from '../usecases/calculate-bill-status.factory'
import { buildCreateBillUseCase } from '../usecases/create-bill.factory'

export const buildCreateBillController = (): CreateBillController => {
  const categoryRepository = new CategoryRepository()
  const calculateBillStatusUseCase = buildCalculateBillStatusUseCase()
  const createBillUseCase = buildCreateBillUseCase()
  return new CreateBillController(categoryRepository, calculateBillStatusUseCase, createBillUseCase)
}
