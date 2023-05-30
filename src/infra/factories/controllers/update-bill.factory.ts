import { UpdateBillController } from '@/adapters/controllers/bill/update-bill.controller'
import { buildValidatorBill } from '../helpers/bill-validation.factory'
import { buildCalculateBillStatusUseCase } from '../usecases/calculate-bill-status.factory'
import { buildUpdateBillUseCase } from '../usecases/update-bill.factory'
import { ControllerInterface } from '@/application/interfaces/controller.interface'
import { buildLogControllerDecorator } from './log-decorator.factory'

export const buildUpdateBillController = (): ControllerInterface => {
  const billValidator = buildValidatorBill()
  const calculateStatusBillUseCase = buildCalculateBillStatusUseCase()
  const updateBillUseCase = buildUpdateBillUseCase()
  const controller = new UpdateBillController(billValidator, calculateStatusBillUseCase, updateBillUseCase)
  return buildLogControllerDecorator(controller)
}
