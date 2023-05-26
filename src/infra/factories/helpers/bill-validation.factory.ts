import { ValidatorBill } from '@/adapters/helpers/bill-validation'
import { buildGetBillByIdUseCase } from '../usecases/get-bill-by-id.factory'
import { CategoryRepository } from '@/infra/database/repositories/category.repository'

export const buildValidatorBill = (): ValidatorBill => {
  const getBillByIdUseCase = buildGetBillByIdUseCase()
  const categoryRepository = new CategoryRepository()
  return new ValidatorBill(getBillByIdUseCase, categoryRepository)
}
