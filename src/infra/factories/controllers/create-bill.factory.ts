import { CreateBillController } from '@/adapters/controllers/bill/create-bill.controller'
import { buildCalculateBillStatusUseCase } from '../usecases/calculate-bill-status.factory'
import { buildCreateBillUseCase } from '../usecases/create-bill.factory'
import { buildValidatorBill } from '../helpers/bill-validation.factory'

export const buildCreateBillController = (): CreateBillController => {
  const billValidator = buildValidatorBill()
  const calculateBillStatusUseCase = buildCalculateBillStatusUseCase()
  const createBillUseCase = buildCreateBillUseCase()
  return new CreateBillController(billValidator, calculateBillStatusUseCase, createBillUseCase)
}
