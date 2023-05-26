import { UpdateBillController } from '@/adapters/controllers/bill/update-bill.controller'
import { buildValidatorBill } from '../helpers/bill-validation.factory'
import { buildCalculateBillStatusUseCase } from '../usecases/calculate-bill-status.factory'
import { buildUpdateBillUseCase } from '../usecases/update-bill.factory'

export const buildUpdateBillController = (): UpdateBillController => {
  const billValidator = buildValidatorBill()
  const calculateStatusBillUseCase = buildCalculateBillStatusUseCase()
  const updateBillUseCase = buildUpdateBillUseCase()
  return new UpdateBillController(billValidator, calculateStatusBillUseCase, updateBillUseCase)
}
